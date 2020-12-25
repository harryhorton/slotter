import { ComponentInstance, LayoutInstance } from "@slotter/types";
import { useContext, useState } from "react";
import { createContext, FC, MouseEvent } from "react";
import { TextComponent } from "../TextComponent";
import { LayoutEditorProvider, useLayoutEditor } from "./LayoutEditorProvider";
import { componentTypes } from "./__fixtures__";
import styled from "styled-components";
import tw from "twin.macro";
import { FieldEditor } from "../FieldEditor";
import { useAppContext } from "../../providers/app";
import { ContextMenuTrigger, ContextMenu, hideMenu } from "react-contextmenu";
import { RightClickMenu } from "../RightClickMenu";

export const ComponentHeirarchyItem = styled.li<{ isSelected: boolean }>(
  ({ isSelected }) => [
    tw`pl-1 cursor-pointer text-gray-900`,
    isSelected && tw`text-blue-400`,
  ]
);

export const ComponentHeirarchy: FC<{
  components?: ComponentInstance[];
}> = ({ components }) => {
  const { layout, selectedComponent, selectComponent } = useLayoutEditor();

  return (
    <ul>
      {(components ?? layout.components).map((comp) => {
        return (
          <ComponentHeirarchyItem
            isSelected={comp.id === selectedComponent}
            onClick={(e) => {
              e.stopPropagation();
              selectComponent(comp.id);
            }}
          >
            {comp.name || `[${comp.componentType}]`}
            {comp.children && comp.children.length ? (
              <>
                <br />
                <ComponentHeirarchy components={comp.children} />
              </>
            ) : null}
          </ComponentHeirarchyItem>
        );
      })}
    </ul>
  );
};

const zContext = createContext(1);
const ZProvider: FC<{ value?: number }> = ({ value, children }) => {
  const prevZIndex = useContext(zContext);
  const zIndex = value ?? prevZIndex + 1;

  return <zContext.Provider value={zIndex}>{children}</zContext.Provider>;
};

const RenderedComponentInteractionBlock = styled.div<{ isSelected: boolean }>(
  ({ isSelected }) => [
    tw`absolute w-full h-full left-0 top-0 cursor-pointer `,
    tw`bg-transparent text-transparent hover:text-white hover:border hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-50`,
    isSelected && tw`border border-blue-500`,
  ]
);


const RenderedComponentInteractionWrapper: FC<{
  component: ComponentInstance;
}> = ({ children, component }) => {
  const zIndex = useContext(zContext);
  const { layout, selectedComponent, selectComponent } = useLayoutEditor();
  return (
    <ZProvider>
      <div className="relative">
        {children}
        <RenderedComponentInteractionBlock
          isSelected={component.id === selectedComponent}
          onClick={(e) => {
            e.stopPropagation();
            selectComponent(component.id);
          }}
          style={{ zIndex }}
        >
          <RightClickMenu
            renderTrigger={(props) => (
              <div className="relative" {...props}>
                <span className="text-center block">
                  {component.name || component.componentType}
                </span>
              </div>
            )}
          >
            <div className="bg-green-500 p-4 text-white">
              {component.id} <input type="text" placeholder="text" />
            </div>
          </RightClickMenu>
        </RenderedComponentInteractionBlock>
      </div>
    </ZProvider>
  );
};

const registeredComponents: Record<
  string,
  FC<{ component: ComponentInstance }>
> = {
  text: TextComponent,
};

export const ComponentRenderer: FC<{
  components: ComponentInstance[];
}> = ({ components }) => {
  return (
    <>
      {components.map((comp) => {
        const componentType = componentTypes.find(
          (type) => type.id === comp.componentType
        );
        const RegisteredComponent = registeredComponents[comp.componentType];

        if (!componentType)
          return (
            <div className="text-red-500">
              Component type {comp.componentType} not found.
            </div>
          );

        if (!RegisteredComponent)
          return (
            <div className="text-red-500">
              Component {comp.componentType} is not a registered component.
            </div>
          );

        return (
          <RenderedComponentInteractionWrapper component={comp}>
            <RegisteredComponent component={comp}>
              {comp.children && (
                <ComponentRenderer components={comp.children} />
              )}
            </RegisteredComponent>
          </RenderedComponentInteractionWrapper>
        );
      })}
    </>
  );
};

const getComponentById = (
  components: ComponentInstance[],
  id: string
): ComponentInstance | false => {
  for (const component of components) {
    const isComponent = component.id === id;
    if (isComponent) {
      return component;
    }

    if (component.children) {
      const foundComponent = getComponentById(component.children, id) || false;
      if (foundComponent) {
        return foundComponent;
      }
    }
  }
  return false;
};

export const LayoutEditorSidebar: FC = () => {
  const {
    appState: {
      adminConfig: { componentTypes },
    },
  } = useAppContext();
  const { layout, selectedComponent, updateComponent } = useLayoutEditor();
  const foundSelectedcomponent =
    (selectedComponent &&
      getComponentById(layout.components, selectedComponent)) ||
    null;

  const foundComponentType = componentTypes.find(
    (type) => type.id === foundSelectedcomponent?.componentType
  );

  const sidebarTitleText = foundSelectedcomponent
    ? foundSelectedcomponent.name ||
      `[${foundSelectedcomponent?.componentType}]`
    : "No component selected";

  return (
    <div className="w-64 bg-gray-100 px-2 py-1">
      <h1>{sidebarTitleText}</h1>
      {foundSelectedcomponent &&
        (!foundComponentType ? (
          <div>
            Unable to find component type
            {foundSelectedcomponent?.componentType}
          </div>
        ) : (
          <FieldEditor
            data={foundSelectedcomponent.config!}
            fields={foundComponentType.fields}
            onChange={(data) => {
              updateComponent({ ...foundSelectedcomponent, config: data });
            }}
          />
        ))}
    </div>
  );
};

interface LayoutEditorProps {
  layout: LayoutInstance;
}

export const LayoutEditorView: FC = () => {
  const { layout, deselectAllComponents } = useLayoutEditor();

  const components = layout.components;
  const handleEmptySpaceClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    deselectAllComponents();
  };

  return (
    <div className="flex border border-gray-100 h-screen">
      <div className="bg-gray-100 px-1 py-1" onClick={handleEmptySpaceClick}>
        <ComponentHeirarchy components={components} />
      </div>
      <div className="flex-1" onClick={handleEmptySpaceClick}>
        <ComponentRenderer components={components} />
      </div>
      <LayoutEditorSidebar />
    </div>
  );
};

export const LayoutEditor: FC<LayoutEditorProps> = ({ layout }) => {
  return (
    <LayoutEditorProvider initialLayout={layout}>
      <LayoutEditorView />
    </LayoutEditorProvider>
  );
};
