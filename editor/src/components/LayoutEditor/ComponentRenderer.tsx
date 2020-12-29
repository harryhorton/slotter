import { ComponentInstance } from "@slotter/types";
import { FC, useContext, MouseEvent } from "react";
import { hideMenu } from "react-contextmenu/modules/actions";
import styled from "styled-components";
import tw from "twin.macro";
import { useAppContext } from "../../providers/app";
import { zIndexContext, ZIndexProvider } from "../../providers/ZIndexProvider";
import { RightClickMenu } from "../RightClickMenu";
import { TextComponent } from "../TextComponent";
import { useLayoutEditor } from "./LayoutEditorProvider";

const RenderedComponentInteractionBlock = styled.div<{ isSelected: boolean }>(
  ({ isSelected }) => [
    tw`absolute w-full h-full left-0 top-0 cursor-pointer`,
    tw`bg-transparent text-transparent hover:text-white hover:border hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-50`,
    isSelected && tw`border border-blue-500`,
  ]
);
const RenderedComponentInteractionWrapper: FC<{
  component: ComponentInstance;
}> = ({ children, component }) => {
  const zIndex = useContext(zIndexContext);
  const {
    selectedComponent,
    selectComponent,
    addComponent,
  } = useLayoutEditor();

  const addChild = (e: MouseEvent) => {
    e.stopPropagation();
    console.log('click event')
    addComponent({
      component: {
        parentId: component.id,
        componentType: "text",
        children: [],
        config: {
          value: "need to apply defaults",
          className: "",
        },
        name: "",
      },
    });
    hideMenu();
  };

  return (
    <ZIndexProvider>
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
            <div className="bg-gray-600 text-white rounded-sm text-sm">
              <ul>
                <li>
                  <button className="text-left block w-full px-2 border-b border-gray-700">
                    Add before
                  </button>
                </li>
                <li>
                  <button className="text-left block w-full px-2 border-b border-gray-700">
                    Add After
                  </button>
                </li>
                <li>
                  <button
                    className="text-left block w-full px-2 border-b border-gray-700"
                    onClick={addChild}
                  >
                    Add Child
                  </button>
                </li>
              </ul>
            </div>
          </RightClickMenu>
        </RenderedComponentInteractionBlock>
      </div>
    </ZIndexProvider>
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
  isRoot?: boolean;
}> = ({ components, isRoot = false }) => {
  const {
    appState: {
      adminConfig: { componentTypes },
    },
  } = useAppContext();
  const { getComponentsById } = useLayoutEditor();

  if (!components.length) return null;

  return (
    <>
      {(isRoot
        ? components.filter(({ parentId }) => parentId === "root")
        : components
      ).map((comp) => {
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
          <RenderedComponentInteractionWrapper component={comp} key={comp.id}>
            <RegisteredComponent component={comp}>
              <ComponentRenderer
                components={getComponentsById(comp.children)}
              />
            </RegisteredComponent>
          </RenderedComponentInteractionWrapper>
        );
      })}
    </>
  );
};
