import { Tree } from "@slotter/types";
import React, { FC } from "react";
import { DropPosition } from "./constants";
import { DraggableItem, DraggableProvider, Dropzone } from "./DraggableContext";

export default {
  title: "Components/Draggable",
  component: DraggableProvider,
};

const Item: FC = (props) => <div className="ml-0" {...props} />;
const List: FC = (props) => <div className="pl-3 list-none" {...props} />;
// setTimeout(() => {
// inspect({ iframe: false });
// }, 1000);

const items: Tree = {
  id: "root",
  children: [
    { id: "1", children: [] },
    {
      id: "2",
      children: [
        { id: "a", children: [] },
        { id: "b", children: [] },
        { id: "c", children: [] },
      ],
    },
    { id: "3", children: [] },
  ],
};

export const TestDraggable: FC = () => {
  // const [state, setstate] = useState<{
  //   items: TreeArray;
  // }>({
  //   items: convertTreeToTreeArray(items),
  // });

  // const tree = convertTreeArrayToTree(state.items, "root");
  return (
    <div className="p-3">
      <DraggableProvider>
        <DraggableItem item={{ id: "item1" }}>
          {({ dragRef, isDraggingThis }) => (
            <div ref={dragRef} data-testid="draggable-element">
              item content: {isDraggingThis ? "isDragging" : ""}
            </div>
          )}
        </DraggableItem>
      </DraggableProvider>
    </div>
  );
};

export const TestDragableDisabled: FC = () => {
  return (
    <div className="p-3">
      <DraggableProvider>
        <DraggableItem item={{ id: "item1" }} dragEnabled={false}>
          {({ dragRef, isDraggingThis }) => (
            <div ref={dragRef} data-testid="draggable-element">
              item content: {isDraggingThis ? "isDragging" : ""}
            </div>
          )}
        </DraggableItem>
      </DraggableProvider>
    </div>
  );
};

export const TestDraggableIsInTestHierarchy: FC = () => {
  return (
    <div className="p-3">
      <DraggableProvider>
        <DraggableItem item={{ id: "item1" }}>
          {({ dragRef, isDraggingThis }) => (
            <div ref={dragRef} data-testid="draggable-element">
              item content: {isDraggingThis ? "isDragging" : ""}
              <DraggableItem item={{ id: "item1" }}>
                {({ dragRef, isInDragHierarchy }) => (
                  <div ref={dragRef} data-testid="draggable-child">
                    child content:
                    {isInDragHierarchy ? "isInDragHierarchy" : ""}
                  </div>
                )}
              </DraggableItem>
            </div>
          )}
        </DraggableItem>
      </DraggableProvider>
    </div>
  );
};

export const TestDropzone: FC = () => {
  return (
    <div className="p-3">
      <DraggableProvider>
        <DraggableItem item={{ id: "item1" }}>
          {({ dragRef, isDraggingThis }) => (
            <div ref={dragRef} data-testid="draggable-element">
              item content
            </div>
          )}
        </DraggableItem>
        <Dropzone dropTarget={{ id: "dropzone1" }}>
          {({ dropRef, ...props }) => (
            <div ref={dropRef} {...props} data-testid="dropzone">
              dropzone content
            </div>
          )}
        </Dropzone>
      </DraggableProvider>
    </div>
  );
};

export const TestNestedDropzone: FC = () => {
  return (
    <div className="p-3">
      <DraggableProvider>
        <DraggableItem item={{ id: "item1" }}>
          {({ dragRef, isDraggingThis }) => (
            <div ref={dragRef} data-testid="draggable-element">
              item content
              <Dropzone dropTarget={{ id: "dropzonenested1" }}>
                {({ dropRef, ...props }) => (
                  <div ref={dropRef} {...props} data-testid="dropzone">
                    dropzone content
                  </div>
                )}
              </Dropzone>
            </div>
          )}
        </DraggableItem>
        <DraggableItem item={{ id: "item2" }}>
          {({ dragRef, isDraggingThis }) => (
            <div ref={dragRef} data-testid="draggable-element">
              item content
              <Dropzone dropTarget={{ id: "dropzonenested2" }}>
                {({ dropRef, ...props }) => (
                  <div ref={dropRef} {...props} data-testid="dropzone">
                    dropzone content
                  </div>
                )}
              </Dropzone>
            </div>
          )}
        </DraggableItem>
      </DraggableProvider>
    </div>
  );
};

export const TestDropzoneDropArea: FC = () => {
  return (
    <div className="p-3">
      <DraggableProvider
        onDrop={({ dragItem, dropPosition, dropTarget }) => {
          console.log({ dragItem, dropPosition, dropTarget });
        }}
      >
        <DraggableItem item={{ id: "item1" }}>
          {({ dragRef, isDraggingThis }) => (
            <div ref={dragRef} data-testid="draggable-element">
              item content
            </div>
          )}
        </DraggableItem>
        <Dropzone
          dropTarget={{ id: "dropzone1" }}
          enabledDropPositions={[
            DropPosition.top,
            DropPosition.bottom,
            DropPosition.inside,
          ]}
        >
          {({ dropRef, ...props }) => (
            <div ref={dropRef} {...props} data-testid="dropzone">
              dropzone content
            </div>
          )}
        </Dropzone>
      </DraggableProvider>
    </div>
  );
};
