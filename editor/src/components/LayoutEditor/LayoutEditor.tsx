import { LayoutInstance } from "@slotter/types";
import { FC, MouseEvent } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ComponentHeirarchy } from "./ComponentHeirarchy";
import { ComponentRenderer } from "./ComponentRenderer";
import { LayoutEditorProvider, useLayoutEditor } from "./LayoutEditorProvider";
import { LayoutEditorSidebar } from "./LayoutEditorSidebar";
import { DraggableProvider, DropPosition } from "../Draggable";
import { getTreeArrayItemChildIndex } from "../../utils/layoutUtils";
interface LayoutEditorProps {
  layout: LayoutInstance;
}

export const LayoutEditor: FC<LayoutEditorProps> = ({ layout }) => {
  return (
    <LayoutEditorProvider initialLayout={layout}>
      <DndProvider backend={HTML5Backend}>
        <LayoutEditorView />
      </DndProvider>
    </LayoutEditorProvider>
  );
};

export const LayoutEditorView: FC = () => {
  const { layout, deselectAllComponents, moveComponent } = useLayoutEditor();

  const components = layout.components;
  const handleEmptySpaceClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    deselectAllComponents();
  };

  return (
    <DraggableProvider
      onDrop={({ dropTarget, dropPosition, dragItem }) => {
        if (!dropTarget || !dragItem || !dropPosition) {
          return;
        }
        const dropTargetChildIndex = getTreeArrayItemChildIndex(
          components,
          dropTarget.id
        );
        const positionMap = {
          [DropPosition.inside]: undefined,
          [DropPosition.top]: dropTargetChildIndex,
          [DropPosition.left]: dropTargetChildIndex,
          [DropPosition.bottom]: dropTargetChildIndex + 1,
          [DropPosition.right]: dropTargetChildIndex + 1,
        };
        moveComponent({
          componentId: dragItem.id,
          parentId:
            dropPosition === DropPosition.inside
              ? dropTarget.id!
              : dropTarget.parentId!,
          index: positionMap[dropPosition],
        });
      }}
    >
      <div className="flex border border-gray-100 h-screen">
        <div className="bg-gray-100 px-1 py-1" onClick={handleEmptySpaceClick}>
          <ComponentHeirarchy components={components} />
        </div>
        <div className="flex-1" onClick={handleEmptySpaceClick}>
          <ComponentRenderer components={components} />
        </div>
        <LayoutEditorSidebar />
      </div>
    </DraggableProvider>
  );
};
