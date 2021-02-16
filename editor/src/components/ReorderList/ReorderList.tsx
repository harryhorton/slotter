import React, { FC, useContext, useMemo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { hierarchyContext } from "./HierarchyContext";
import { reorderListContext } from "./ReorderListContext";
import { DropPosition } from "./stateMachine";
import { StyledReorderListItem } from "./styled";
import { hoverEventToPosition } from "./utils";

export const ReorderListItem: FC<{
  item: any;
  onDrop?: (payload: {
    above: boolean;
    below: boolean;
    inside: boolean;
    item: any;
  }) => void;
}> = ({ children, item }) => {
  const { isInDragHierarchy } = useContext(hierarchyContext);
  const { state, send, idKey, onOrderChange } = useContext(reorderListContext);

  const isDraggingThis = state.context?.dragItem?.[idKey] === item[idKey];
  const isHoveringThis = state.context?.dropTarget?.[idKey] === item[idKey];
  const isDropZone =
    !state.matches("idle") && !isDraggingThis && !isInDragHierarchy;

  const [{ isOver }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "component", item },
    begin() {
      send({ type: "BEGIN_DRAG", payload: { dragItem: item } });
    },
    end() {
      // only change if it was dropped on a target
      const { dragItem, dropPosition, dropTarget } = state.context;
      if (dropTarget && dropPosition) {
        onOrderChange({ dragItem, dropPosition, dropTarget });
      }
      send({ type: "DROP" });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  /**
   *
   *
   *
   *     NEXT UP:
   * - Make sure stories can order to root.
   * - CONSIDER RENAMING HOVERING TO HOVERINGDROPZONE
   * - FIGURE OUT DROP EVENT FUNCTIONALITY
   * - REFACTOR STATE MACHINE ACTIONS AND CONTEXT SETTING
   * - REFACTOR THIS FILE
   * - MAKE REORDERING ACTUALLY WORK IN STORYBOOK
   * - CONSIDER HOW THIS WOULD WORK IN PREVIEW WINDOW
   */

  const previousDragOverState = useRef<{
    clientX: number | null;
    clientY: number | null;
  }>({ clientX: null, clientY: null });

  return (
    <hierarchyContext.Provider
      value={useMemo(
        () => ({
          isInDragHierarchy: isInDragHierarchy || isDraggingThis,
        }),
        [isDraggingThis, isInDragHierarchy]
      )}
    >
      <StyledReorderListItem
        ref={state.matches("idle") ? drag : isDropZone ? drop : null}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        hoverPosition={
          isDropZone && isHoveringThis && state.context.dropPosition
        }
        onDragOver={(event) => {
          // prevents drop animation from html5 backend...
          event.preventDefault();
          // Prevent parent from handling
          event.stopPropagation();
          if (!isDropZone) return;
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

          let dropPosition: DropPosition = hoverEventToPosition(event);

          // only update if position has changed
          if (state.context.dropPosition !== dropPosition) {
            send({
              type: "HOVER",
              payload: {
                dropTarget: item,
                dropPosition,
              },
            });
          }
        }}
        onDragLeave={(e) => {
          if (!isDropZone) return;
          if (!isOver) {
            send({ type: "DRAG" });
          }
        }}
      >
        {children}
      </StyledReorderListItem>
    </hierarchyContext.Provider>
  );
};

//@ts-ignore
ReorderListItem.whyDidYouRender = true;
