import { ComponentInstance } from "@slotter/types";
import { createContext, FC, useContext, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useLayoutEditor } from "./LayoutEditorProvider";
import { useDrag, useDrop } from "react-dnd";

interface HeirarchyState {
  isDragging: boolean;
  draggingComponent: ComponentInstance | null;
}

interface HeirarchyContext extends HeirarchyState {
  setDragging: (component: ComponentInstance | null) => void;
}

const heirarchyContext = createContext<HeirarchyContext>({
  isDragging: false,
  draggingComponent: null,
  setDragging() {},
});

export const HeirarchyProvider: FC = ({ ...props }) => {
  const [state, setstate] = useState<HeirarchyState>({
    isDragging: false,
    draggingComponent: null,
  });

  const setDragging = (draggingComponent: ComponentInstance | null) =>
    setstate({
      ...state,
      isDragging: Boolean(draggingComponent),
      draggingComponent,
    });
  return (
    <heirarchyContext.Provider value={{ ...state, setDragging }} {...props} />
  );
};

export const StyledComponentHeirarchyItem = styled.li<{
  isSelected: boolean;
  isThisDragging: boolean;
  isDragging: boolean;
}>(({ isSelected, isDragging, isThisDragging }) => [
  tw`ml-1 cursor-pointer text-gray-900 leading-none`,
  isSelected && tw`text-blue-400`,
  isThisDragging && tw`opacity-25`,
  !isDragging && tw`mb-1`,
]);

export const ComponentHeirarchyItem: FC<{
  isSelected: boolean;
  component: ComponentInstance;
  onClick: (e: any) => void;
}> = ({ children, isSelected, component }) => {
  const { isDragging, setDragging, draggingComponent } = useContext(
    heirarchyContext
  );

  const [, drag] = useDrag({
    item: { type: "component", component },
    begin(monitor) {
      setDragging(component);
    },
    end(item, monitor) {
      alert(JSON.stringify(monitor.getDropResult()));
      setDragging(null);
    },
  });

  return (
    <StyledComponentHeirarchyItem
      isSelected={isSelected}
      isThisDragging={draggingComponent?.id === component.id}
      isDragging={isDragging}
      ref={drag}
    >
      {children}
    </StyledComponentHeirarchyItem>
  );
};

const StyledDropZone = styled.li<{ isOver?: boolean; isFirst?: boolean }>(
  ({ isOver, isFirst }) => [
    tw`bg-blue-500 h-1 w-full opacity-0 z-10`,
    isOver && tw` opacity-100`,
    !isFirst && tw`transform translate-y-1`,
  ]
);

const DropZone: FC<{ isFirst?: boolean }> = ({ isFirst, ...props }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "component",
    drop: (item) => ({
      ...item,
    }),
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <StyledDropZone {...props} ref={drop} isOver={isOver} isFirst={isFirst} />
  );
};

export const ComponentHeirarchy: FC<{
  components: ComponentInstance[];
  isRoot?: boolean;
  isDraggingThis?: boolean;
}> = ({ components, isRoot = false, isDraggingThis }) => {
  const {
    selectedComponent,
    selectComponent,
    getComponentsById,
  } = useLayoutEditor();
  const { isDragging, setDragging, draggingComponent } = useContext(
    heirarchyContext
  );

  const showDropZones = !isDraggingThis && isDragging;
  return (
    <ul className={`relative ${isDragging ? "" : "pt-1 mb-1"}`}>
      {showDropZones && <DropZone isFirst />}
      {(isRoot
        ? components.filter(({ parentId }) => parentId === "root")
        : components
      ).map((comp, index, list) => {
        return (
          <>
            <ComponentHeirarchyItem
              isSelected={comp.id === selectedComponent}
              component={comp}
              onClick={(e: any) => {
                e.stopPropagation();
                selectComponent(comp.id);
              }}
            >
              {comp.name || `[${comp.componentType}]`}
              {comp.children.length ? (
                <>
                  <ComponentHeirarchy
                    components={getComponentsById(comp.children)}
                    isDraggingThis={comp.id === draggingComponent?.id}
                  />
                </>
              ) : null}
            </ComponentHeirarchyItem>
            {showDropZones && <DropZone />}
          </>
        );
      })}
    </ul>
  );
};
