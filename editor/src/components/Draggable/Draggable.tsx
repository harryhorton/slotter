import { FC, ReactElement, useContext, useMemo } from "react";
import { useDrag } from "react-dnd";
import { draggableContext } from "./DraggableContext";
import { hierarchyContext } from "./HierarchyContext";

export interface DraggableChildrenProps {
  dragRef: any;
  isDraggingThis: boolean;
  isInDragHierarchy: boolean;
}

export interface DraggableItemProps {
  dragType?: string;
  item: any;
  dragEnabled?: boolean;
  children: (props: DraggableChildrenProps) => ReactElement<any, any> | null;
}

export const DraggableItem: FC<DraggableItemProps> = ({
  item,
  children,
  dragType = "component",
  dragEnabled = true,
}) => {
  const { state, dispatch } = useContext(draggableContext);

  const { isInDragHierarchy } = useContext(hierarchyContext);
  // const isDraggingThis = state.context?.dragItem?.[idKey] === item[idKey];

  const [{ isDragging }, drag] = useDrag({
    item: { type: dragType, item },
    begin() {
      dispatch({ type: "BEGIN_DRAG", payload: { dragItem: item } });
    },
    end() {
      // // only change if it was dropped on a target
      // const { dragItem, dropPosition, dropTarget } = state;
      // console.log(dropTarget, dropPosition);
      // if (dropTarget && dropPosition) {
      //   onOrderChange({ dragItem, dropPosition, dropTarget });
      // }
      dispatch({ type: "DROP" });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const isDragEnabled =
    dragEnabled && (state.state === "idle" || state.dragItem?.id === item.id);

  return (
    <hierarchyContext.Provider
      value={useMemo(
        () => ({
          isInDragHierarchy: isInDragHierarchy || isDragging,
        }),
        [isDragging, isInDragHierarchy]
      )}
    >
      {children({
        dragRef: isDragEnabled ? drag : null,
        isDraggingThis: isDragging,
        isInDragHierarchy: isInDragHierarchy || isDragging,
      })}
    </hierarchyContext.Provider>
  );
};
