import { TreeArrayItem } from "@slotter/types";
import {
  createContext,

  PropsWithChildren,


  useMemo
} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DropPosition } from "./constants";
import { useDraggableState } from "./DraggableState";

interface DraggableContext {
  state: ReturnType<typeof useDraggableState>[0];
  dispatch: ReturnType<typeof useDraggableState>[1];
}

export const draggableContext = createContext<DraggableContext>(
  {} as DraggableContext
);

export type DropEvent<
  DragItem extends TreeArrayItem = TreeArrayItem,
  DropTarget extends TreeArrayItem = DragItem
> = {
  dragItem: DragItem | null;
  dropTarget: DropTarget | null;
  dropPosition: DropPosition | null;
};

export interface DraggableProviderProps<
  T extends TreeArrayItem = TreeArrayItem
> {
  onDrop?(event: DropEvent<T>): void;
}

export const DraggableProvider = <T extends TreeArrayItem = TreeArrayItem>({
  children,
  onDrop = () => {},
}: PropsWithChildren<DraggableProviderProps<T>>) => {
  const [state, dispatch] = useDraggableState({
    onDrop({ dragItem, dropTarget, dropPosition }) {
      onDrop({ dragItem, dropTarget, dropPosition });
    },
  });

  const context: DraggableContext = useMemo(() => ({ state, dispatch }), [
    state,
    dispatch,
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <draggableContext.Provider value={context}>
        {children}
      </draggableContext.Provider>
    </DndProvider>
  );
};

