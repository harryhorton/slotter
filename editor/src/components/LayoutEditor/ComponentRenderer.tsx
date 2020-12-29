import { ComponentInstance } from "@slotter/types";
import { FC, useContext, MouseEvent, useRef, useState, useEffect } from "react";
import { hideMenu } from "react-contextmenu/modules/actions";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useAppContext } from "../../providers/app";
import { zIndexContext, ZIndexProvider } from "../../providers/ZIndexProvider";
import { RightClickMenu } from "../RightClickMenu";
import { TextComponent } from "../TextComponent";
import { useLayoutEditor } from "./LayoutEditorProvider";
import hash from "object-hash";

const RenderedComponentInteractionBlock = styled.div<{ isSelected: boolean }>(
  ({ isSelected }) => [
    tw`flex absolute justify-items-stretch w-full h-full left-0 top-0 cursor-pointer`,
    tw`bg-transparent text-transparent hover:text-white hover:border hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-50`,
    isSelected && tw`border border-blue-500`,
    // This is required to get the menu trigger to fill its container
    css`
      & > * {
        flex: 1;
      }
    `,
  ]
);
const RenderedComponentInteractionWrapper: FC<{
  component: ComponentInstance;
}> = ({ children, component }) => {
  const zIndex = useContext(zIndexContext);
  const [display, setDisplay] = useState("block");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const computedStyles = getComputedStyle(ref.current?.children[0]!);
    if (ref.current?.children[0]) {
      setDisplay(
        computedStyles.display.includes("inline") ? "inline" : "block"
      );
    }
  }, []);
  const {
    selectedComponent,
    selectComponent,
    addComponent,
    deleteComponent,
    deselectAllComponents,
  } = useLayoutEditor();

  const handleAddChild = () => {
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

  const handleDeleteComponent = () => {
    deselectAllComponents();
    deleteComponent(component.id);
    hideMenu();
  };

  return (
    <ZIndexProvider>
      <div className="relative" ref={ref} style={{ display }}>
        {children}
        <RenderedComponentInteractionBlock
          isSelected={component.id === selectedComponent}
          onClick={(e) => {
            e.stopPropagation();
            selectComponent(component.id);
          }}
          style={{ zIndex }}
          data-testid="rendered-component-interaction-block"
          data-componentid={component.id}
        >
          <RightClickMenu
            renderTrigger={(props) => <div {...props}></div>}
            onShow={() => selectComponent(component.id)}
          >
            <div className="bg-gray-600 text-white rounded-sm text-sm">
              <ul>
                <li>
                  <button className="text-left block w-full px-2 border-b border-gray-700 rounded-t-sm">
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
                    onClick={handleAddChild}
                  >
                    Add Child
                  </button>
                </li>
                <li>
                  <button
                    className="text-left block w-full px-2 border-b border-red-800 bg-red-700 rounded-b-sm"
                    onClick={handleDeleteComponent}
                  >
                    Delete
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
          <RenderedComponentInteractionWrapper
            component={comp}
            key={hash(comp)}
          >
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
