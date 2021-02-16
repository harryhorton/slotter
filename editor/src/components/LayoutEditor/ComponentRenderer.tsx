import { ComponentInstance } from "@slotter/types";
import hash from "object-hash";
import { FC, RefObject, useContext, useEffect, useRef, useState } from "react";
import {} from "react-dnd";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useAppContext } from "../../providers/app";
import { zIndexContext, ZIndexProvider } from "../../providers/ZIndexProvider";
import { findTreeArrayItemById } from "../../utils/layoutUtils";
import {
  draggableContext,
  DraggableDropzone,
  DropPosition,
} from "../Draggable";
import { TextComponent } from "../TextComponent";
import { ComponentRightClickMenu } from "./ComponentRightClickMenu";
import { useLayoutEditor } from "./LayoutEditorProvider";

const RenderedComponentInteractionBlock = styled.div<{
  isSelected: boolean;
  isDragging: boolean;
  isDraggingThis: boolean;
  hoverPosition: DropPosition | null;
}>(({ isSelected, isDragging, hoverPosition, isDraggingThis }) => [
  tw`flex fixed justify-items-stretch cursor-pointer`,
  tw`bg-transparent text-transparent`,
  // isDragging && tw`bg-transparent text-transparent `,
  hoverPosition === DropPosition.top && tw`border-t-4 border-blue-500`,
  hoverPosition === DropPosition.bottom && tw`border-b-4 border-blue-500`,
  hoverPosition === DropPosition.right && tw`border-r-4 border-blue-500`,
  hoverPosition === DropPosition.left && tw`border-l-4 border-blue-500`,
  hoverPosition === DropPosition.inside && tw`border-4 border-blue-500`,
  !isDragging &&
    tw`bg-transparent text-transparent hover:text-white hover:border hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-50`,
  isSelected && tw`border border-blue-500`,
  isDraggingThis && tw`border border-blue-500`,
  // This is required to get the menu trigger to fill its container
  css`
    & > * {
      flex: 1;
    }
  `,
]);

const RenderedComponentInteractionWrapper: FC<{
  component: ComponentInstance;
  componentRef: HTMLElement | null;
}> = ({ children, component, componentRef }) => {
  const zIndex = useContext(zIndexContext);

  const { selectedComponent, selectComponent, layout } = useLayoutEditor();
  const { state: dragState } = useContext(draggableContext);

  const display = componentRef
    ? getComputedStyle(componentRef!).display.includes("inline")
      ? "inline"
      : "block"
    : "block";
  useEffect(() => {}, []);

  const left = componentRef?.getBoundingClientRect().left || 10;
  const top = componentRef?.getBoundingClientRect().top || 10;
  const width = componentRef?.getBoundingClientRect().width || 10;
  const height = componentRef?.getBoundingClientRect().height || 10;

  return (
    <ZIndexProvider>
      {children}
      <DraggableDropzone
        item={component}
        treeArray={layout.components}
        enabledDropPositions={
          display === "inline"
            ? [DropPosition.left, DropPosition.right, DropPosition.inside]
            : [DropPosition.top, DropPosition.bottom, DropPosition.inside]
        }
      >
        {({ ref, dropPosition, onDragLeave, onDragOver, isDraggingThis }) => (
          <RenderedComponentInteractionBlock
            ref={ref}
            isDragging={dragState.state !== "idle"}
            isDraggingThis={dragState.dragItem?.id === component.id}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            hoverPosition={dropPosition}
            isSelected={component.id === selectedComponent}
            onClick={(e) => {
              e.stopPropagation();
              selectComponent(component.id);
            }}
            style={{ zIndex, left, top, width, height }}
            data-testid="rendered-component-interaction-block"
            data-componentid={component.id}
          >
            {dragState.state === "idle" && (
              <ComponentRightClickMenu component={component} />
            )}
          </RenderedComponentInteractionBlock>
        )}
      </DraggableDropzone>
    </ZIndexProvider>
  );
};
const registeredComponents: Record<string, any> = {
  text: TextComponent,
};

export const ComponentRenderer: FC<{
  components: ComponentInstance[];
  rootId?: string;
}> = ({ components, rootId = "root" }) => {
  const {
    appState: {
      adminConfig: { componentTypes },
    },
  } = useAppContext();
  const component = findTreeArrayItemById(components, rootId);
  const [
    registeredComponentRef,
    setRegisteredComponentRef,
  ] = useState<HTMLElement | null>(null);
  if (!component) return null;

  if (component.id === "root") {
    return (
      <>
        {component.children.map((childId) => (
          <ComponentRenderer components={components} rootId={childId} />
        ))}
      </>
    );
  }

  const componentType = componentTypes.find(
    (type) => type.id === component.componentType
  );

  const RegisteredComponent = registeredComponents[component.componentType];

  if (!componentType)
    return (
      <div className="text-red-500">
        Component type {component.componentType} not found.
      </div>
    );
  if (!RegisteredComponent)
    return (
      <div className="text-red-500">
        Component {component.componentType} is not a registered component.
      </div>
    );

  return (
    <RenderedComponentInteractionWrapper
      component={component}
      key={hash(component)}
      componentRef={registeredComponentRef}
    >
      <RegisteredComponent
        ref={(newRef: any) => setRegisteredComponentRef(newRef)}
        component={component}
      >
        {component.children.map((childId) => (
          <ComponentRenderer components={components} rootId={childId} />
        ))}
      </RegisteredComponent>
    </RenderedComponentInteractionWrapper>
  );
};
