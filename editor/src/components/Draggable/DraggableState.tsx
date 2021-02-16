import { Reducer, useEffect, useReducer } from "react";
import { DropPosition } from "./constants";

interface DraggableReducerState {
  state: "idle" | "dragging" | "hoveringDropzone" | "dropped";
  dragItem: any | null;
  dropTarget: any | null;
  dropPosition: DropPosition | null;
}

type DraggableReducerAction<T extends any = any> =
  | { type: "BEGIN_DRAG"; payload: { dragItem: T } }
  | { type: "DRAG" }
  | {
      type: "HOVER";
      payload: {
        dropTarget: T;
        dropPosition: DropPosition | null;
      };
    }
  | { type: "DROP" }
  | { type: "IDLE" };

export const draggableReducer: Reducer<
  DraggableReducerState,
  DraggableReducerAction
> = (state, action) => {
  switch (action.type) {
    case "IDLE":
      return {
        ...state,
        state: "idle",
        dragItem: null,
        dropTarget: null,
        dropPosition: null,
      };
    case "BEGIN_DRAG":
      return { ...state, state: "dragging", dragItem: action.payload.dragItem };
    case "DRAG":
      return {
        ...state,
        state: "dragging",
        dropTarget: null,
        dropPosition: null,
      };
    case "HOVER":
      return {
        ...state,
        state: "hoveringDropzone",
        dropTarget: action.payload.dropTarget,
        dropPosition: action.payload.dropPosition,
      };
    case "DROP":
      return {
        ...state,
        state: "dropped",
      };
    default:
      return state;
  }
};

export interface UseDraggableStateProps {
  onDrop?(state: DraggableReducerState): void;
}

export const useDraggableState = ({
  onDrop = () => {},
}: UseDraggableStateProps = {}) => {
  const reduce = useReducer(draggableReducer, {
    state: "idle",
    dragItem: null,
    dropTarget: null,
    dropPosition: null,
  });
  const [state, dispatch] = reduce;

  useEffect(() => {
    if (state.state === "dropped") {
      onDrop(state);
      dispatch({ type: "IDLE" });
    }
  }, [state, dispatch, onDrop]);

  return reduce;
};
