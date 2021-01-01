import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import tw from "twin.macro";

// TODO: Make sure parent can't be drug onto child

const reorderListContext = createContext({
  onOrderChange: (payload: {
    above: boolean;
    below: boolean;
    inside: boolean;
    item: any;
    target: any;
  }) => {},
  isDragging: false,
  setIsDragging(value: boolean) {},
});

export const ReorderListProvider: FC<{
  onOrderChange: (value: any) => void;
}> = ({ onOrderChange, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <reorderListContext.Provider
      value={{ onOrderChange, isDragging, setIsDragging }}
    >
      {children}
    </reorderListContext.Provider>
  );
};

export interface ReorderListProps {}

export const ReorderList: FC<ReorderListProps> = ({ children, ...props }) => {
  return (
    <ul className="" {...props}>
      {children}
    </ul>
  );
};

const StyledReorderListItem = styled.li<{
  isTop: boolean;
  isBottom: boolean;
  isInside: boolean;
  isHoveringChild: boolean;
}>(({ isTop, isInside, isBottom, isHoveringChild }) => [
  !isHoveringChild && isTop && tw`border-t border-blue-500`,
  !isHoveringChild && isBottom && tw`border-b border-blue-500`,
  !isHoveringChild && isInside && tw`border border-blue-500`,
]);

const hierarchyContext = createContext({
  setParentIsHoveringChild(value: boolean) {},
});

const DRAG_EDGES_THRESHHOLD = 7;

export const ReorderListItem: FC<{
  item: any;
  onDrop?: (payload: {
    above: boolean;
    below: boolean;
    inside: boolean;
    item: any;
  }) => void;
}> = ({ children, item, ...props }) => {
  const [isTop, setisTop] = useState(false);
  const [isBottom, setisBottom] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const [isHoveringChild, setIsHoveringChild] = useState(false);
  const { setParentIsHoveringChild } = useContext(hierarchyContext);
  const { onOrderChange, setIsDragging, isDragging } = useContext(
    reorderListContext
  );

  useEffect(() => {
    setisTop(false);
    setisBottom(false);
    setIsInside(false);
    setParentIsHoveringChild(false);
    console.log("triggered reset");
  }, [isDragging, setParentIsHoveringChild]);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "component",
    drop: (item) => ({
      ...item,
    }),
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const [, drag] = useDrag({
    item: { type: "component", item },
    begin(monitor) {
      setIsDragging(true);
    },
    end(item, monitor) {
      console.log(monitor.getDropResult());
      setIsDragging(false);
    },
  });

  const handleSetParentIsHoveringChild = useCallback(
    (value: boolean) => {
      setIsHoveringChild(value);
      // Set the parent to hovering child result;
      setParentIsHoveringChild(value);
    },
    [setParentIsHoveringChild]
  );

  return (
    <hierarchyContext.Provider
      value={{
        // A child calls this
        setParentIsHoveringChild: handleSetParentIsHoveringChild,
      }}
    >
      <StyledReorderListItem
        ref={!isDragging ? drag : isHoveringChild ? null : drop}
        isTop={isTop}
        isBottom={isBottom}
        isHoveringChild={isHoveringChild}
        isInside={isInside}
        onDragLeave={(e) => {
          if (!isDragging) return;
          console.log("leaving", e.currentTarget.textContent);
          setisTop(false);
          setisBottom(false);
          setIsInside(false);
          setParentIsHoveringChild(false);
        }}
        onDragEnter={(e) => {
          if (!isDragging) return;
          console.log("entering", e.currentTarget.textContent);
          setParentIsHoveringChild(true);
        }}
        onDragOver={({ clientX, clientY, currentTarget, ...e }) => {
          if (!isDragging) return;
          if (isHoveringChild) return;
          setParentIsHoveringChild(true);

          var { offsetTop } = currentTarget;
          const itemHeight = currentTarget.clientHeight;
          const mousePositionInRect = clientY - offsetTop;
          if (mousePositionInRect < DRAG_EDGES_THRESHHOLD && !isTop) {
            setisTop(true);
            setisBottom(false);
            setIsInside(false);
          } else if (
            mousePositionInRect >= itemHeight - DRAG_EDGES_THRESHHOLD &&
            !isBottom
          ) {
            setisTop(false);
            setisBottom(true);
            setIsInside(false);
          } else if (
            mousePositionInRect >= DRAG_EDGES_THRESHHOLD &&
            mousePositionInRect < itemHeight - DRAG_EDGES_THRESHHOLD &&
            !isInside
          ) {
            setisTop(false);
            setisBottom(false);
            setIsInside(true);
          }
        }}
      >
        {children}
      </StyledReorderListItem>
    </hierarchyContext.Provider>
  );
};
