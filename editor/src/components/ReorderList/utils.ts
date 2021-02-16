import { DragEvent } from "react";
import { DRAG_EDGES_THRESHHOLD } from "./constants";
import { DropPosition } from "./stateMachine";

export const hoverEventToPosition = (event: DragEvent<HTMLElement>) => {
  const clientHeight = event.currentTarget.clientHeight;
  const clientY = event.clientY;
  const offsetTop = event.currentTarget.offsetTop;

  const itemHeight = clientHeight;
  const mousePositionInRect = clientY - offsetTop;

  if (mousePositionInRect < DRAG_EDGES_THRESHHOLD) {
    return DropPosition.top;
  }
  if (mousePositionInRect >= itemHeight - DRAG_EDGES_THRESHHOLD) {
    return DropPosition.bottom;
  }

  return DropPosition.inside;
};
