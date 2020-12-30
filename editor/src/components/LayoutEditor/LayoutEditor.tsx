import { LayoutInstance } from "@slotter/types";
import { FC, MouseEvent } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ComponentHeirarchy, HeirarchyProvider } from "./ComponentHeirarchy";
import { ComponentRenderer } from "./ComponentRenderer";
import { LayoutEditorProvider, useLayoutEditor } from "./LayoutEditorProvider";
import { LayoutEditorSidebar } from "./LayoutEditorSidebar";
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
        <HeirarchyProvider>
          <ComponentHeirarchy components={components} isRoot />
        </HeirarchyProvider>
      </div>
      <div className="flex-1" onClick={handleEmptySpaceClick}>
        <ComponentRenderer components={components} isRoot />
      </div>
      <LayoutEditorSidebar />
    </div>
  );
};
