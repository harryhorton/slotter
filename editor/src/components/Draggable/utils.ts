import { DragEvent } from "react";
import { DRAG_EDGES_THRESHHOLD, DropPosition } from "./constants";

const calculateDragThreshhold = (measurement: number) => {
  return Math.ceil(measurement / 3);
};

/**
 * TODO: does not take into account vertical plus horizontal
 * would need to do math to cut the corners to determine if top+left is top or left.
 *
 */
export const hoverEventToPosition = (
  event: DragEvent<HTMLElement>,
  enabledPositions: DropPosition[]
) => {
  const clientHeight = event.currentTarget.getBoundingClientRect().height;
  const clientWidth = event.currentTarget.getBoundingClientRect().width;
  const clientY = event.clientY;
  const clientX = event.clientX;
  const offsetTop = event.currentTarget.getBoundingClientRect().top;
  const offsetLeft = event.currentTarget.getBoundingClientRect().left;

  const itemHeight = clientHeight;
  const itemWidth = clientWidth;
  const verticalMousePositionInRect = clientY - offsetTop;
  const horizontalMousePositionInRect = clientX - offsetLeft;

  const isInsideEnabled = enabledPositions.includes(DropPosition.inside);

  const halfHeight = Math.ceil(itemHeight / 2);
  const isTop =
    verticalMousePositionInRect <=
    (isInsideEnabled ? calculateDragThreshhold(itemHeight) : halfHeight);
  const isBottom =
    verticalMousePositionInRect >=
    itemHeight -
      (isInsideEnabled ? calculateDragThreshhold(itemHeight) : halfHeight);
  const isMiddle = !isTop && !isBottom;

  const halfWidth = Math.ceil(itemWidth / 2);
  const isLeft =
    horizontalMousePositionInRect <=
    (isInsideEnabled ? calculateDragThreshhold(itemWidth) : halfWidth);
  const isRight =
    horizontalMousePositionInRect >=
    itemWidth -
      (isInsideEnabled ? calculateDragThreshhold(itemWidth) : halfWidth);
  const isCenter = !isLeft && !isRight;

  if (enabledPositions.includes(DropPosition.top) && isTop) {
    return DropPosition.top;
  }
  if (enabledPositions.includes(DropPosition.bottom) && isBottom) {
    return DropPosition.bottom;
  }
  if (enabledPositions.includes(DropPosition.left) && isLeft) {
    return DropPosition.left;
  }
  if (enabledPositions.includes(DropPosition.right) && isRight) {
    return DropPosition.right;
  }

  if (
    enabledPositions.includes(DropPosition.inside) &&
    (isMiddle || isCenter)
  ) {
    return DropPosition.inside;
  }

  return null;
};
