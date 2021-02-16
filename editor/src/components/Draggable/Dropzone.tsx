import { FC, ReactElement, useContext, useRef } from "react";
import { useDrop } from "react-dnd";
import { draggableContext } from "./DraggableContext";
import { hierarchyContext } from "./HierarchyContext";
import { DropPosition } from "./constants";
import { hoverEventToPosition } from "./utils";
import { TreeArrayItem } from "@slotter/types";
import { isItemInHierarchy } from "../../utils/layoutUtils";

export interface DropzoneProps {
  acceptDragType?: string;
  dropTarget: any;
  dropEnabled?: boolean;
  children: (props: DropzoneChildrenProps) => ReactElement<any, any> | null;
  enabledDropPositions?: DropPosition[];
  treeArray?: TreeArrayItem[];
}

interface DropzoneChildrenProps {
  dropRef: any;
  onDragOver: any;
  onDragLeave: any;
  dropPosition: DropPosition | null;
}

export const Dropzone: FC<DropzoneProps> = ({
  acceptDragType = "component",
  dropEnabled = true,
  dropTarget,
  children,
  enabledDropPositions = [DropPosition.inside],
  treeArray,
}) => {
  const { state, dispatch } = useContext(draggableContext);

  const { isInDragHierarchy } = useContext(hierarchyContext);

  const isInHierarchy =
    isInDragHierarchy ||
    ((treeArray &&
      dropTarget &&
      state.dragItem &&
      /**
       * Needed to be able to check against data, rather than component
       * hierarchy because of different render trees (sideabr vs preview)
       */
      isItemInHierarchy(treeArray, dropTarget.id, state.dragItem.id)) ??
      false);

  const isDropEnabled = state.state !== "idle" && dropEnabled && !isInHierarchy;

  const [{ isOver }, drop] = useDrop({
    accept: acceptDragType,
    collect(monitor) {
      return {
        isOver: monitor.isOver({ shallow: true }),
      };
    },
  });
  const isHoveringOverDroppableArea = isOver && !isInHierarchy;

  const previousDragOverState = useRef<{
    clientX: number | null;
    clientY: number | null;
  }>({ clientX: null, clientY: null });

  const onDragOver = (event: any) => {
    // prevents drop animation from html5 backend...
    event.preventDefault();
    // Prevent parent from handling
    event.stopPropagation();
    if (isInHierarchy) return;
    /**
     * Prevent continuously calling by caching mouse position
     */
    if (
      previousDragOverState.current.clientX === event.clientX &&
      previousDragOverState.current.clientY === event.clientY
    ) {
      return;
    }

    previousDragOverState.current.clientX = event.clientX;
    previousDragOverState.current.clientY = event.clientY;

    const dropPosition = hoverEventToPosition(event, enabledDropPositions);

    // only update if position has changed
    if (state.dropPosition !== dropPosition) {
      dispatch({
        type: "HOVER",
        payload: {
          dropTarget,
          dropPosition,
        },
      });
    }
  };

  const onDragLeave = () => {
    if (!isOver) {
      dispatch({ type: "DRAG" });
    }
  };

  return children({
    dropRef: isDropEnabled ? drop : null,
    onDragOver,
    onDragLeave,
    dropPosition: isHoveringOverDroppableArea ? state.dropPosition : null,
  });
};
