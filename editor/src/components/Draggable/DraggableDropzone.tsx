import { TreeArrayItem } from "@slotter/types";
import { FC, ReactElement } from "react";
import { DropPosition } from "./constants";
import { DraggableItem } from "./Draggable";
import { Dropzone } from "./Dropzone";

export interface DraggableDropzoneChildrenProps {
  ref: any;
  isDraggingThis: boolean;
  isInDragHierarchy: boolean;
  onDragOver: any;
  onDragLeave: any;
  dropPosition: DropPosition | null;
}

export interface DraggableDropzoneProps {
  dragType?: string;
  item: any;
  dragEnabled?: boolean;
  children: (
    props: DraggableDropzoneChildrenProps
  ) => ReactElement<any, any> | null;
  acceptDragType?: string;
  dropEnabled?: boolean;
  enabledDropPositions?: DropPosition[];
  treeArray?: TreeArrayItem[];
}

export const DraggableDropzone: FC<DraggableDropzoneProps> = ({
  item,
  children,
  enabledDropPositions,
  dropEnabled,
  dragEnabled,
  acceptDragType,
  dragType,
  treeArray,
}) => (
  <DraggableItem item={item} dragEnabled={dragEnabled} dragType={dragType}>
    {({ dragRef, isDraggingThis, isInDragHierarchy }) => (
      <Dropzone
        dropTarget={item}
        enabledDropPositions={enabledDropPositions}
        dropEnabled={dropEnabled}
        acceptDragType={acceptDragType}
        treeArray={treeArray}
      >
        {({ dropRef, dropPosition, onDragLeave, onDragOver }) =>
          children({
            ref: dragRef || dropRef,
            onDragLeave,
            onDragOver,
            isDraggingThis,
            isInDragHierarchy,
            dropPosition,
          })
        }
      </Dropzone>
    )}
  </DraggableItem>
);
