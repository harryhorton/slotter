import { Tree, TreeArray, TreeArrayItem } from "@slotter/types";
import React, { FC, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  convertTreeArrayToTree,
  convertTreeToTreeArray,
  findTreeArrayItemById,
  getTreeArrayItemChildIndex,
  moveTreeArrayItem,
} from "../../utils/layoutUtils";
import { ReorderListItem } from "./ReorderList";
import { ReorderListProvider } from "./ReorderListContext";
import { DropPosition } from "./stateMachine";
import { ReorderList } from "./styled";

export default {
  title: "Components/ReorderList",
  component: ReorderList,
};

const Item: FC = (props) => <div className="ml-0" {...props} />;
const List: FC = (props) => <div className="pl-3 list-none" {...props} />;
// setTimeout(() => {
// inspect({ iframe: false });
// }, 1000);

export const Render: FC<{ items: TreeArray; itemId: string }> = ({
  items,
  itemId,
}) => {
  const item = findTreeArrayItemById(items, itemId);

  if (!item) return null;

  if (item.id === "root") {
    return (
      <List>
        {item?.children.map((childId) => (
          <Render items={items} itemId={childId} key={childId} />
        ))}
      </List>
    );
  }

  return (
    <ReorderListItem item={item}>
      {item.id !== "root" && <Item>Item {item?.id}</Item>}
      <List>
        {item?.children.map((childId) => (
          <Render items={items} itemId={childId} key={childId} />
        ))}
      </List>
    </ReorderListItem>
  );
};

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

export const Primary: FC = () => {
  const [state, setstate] = useState<{
    items: TreeArray;
  }>({
    items: convertTreeToTreeArray(items),
  });

  const tree = convertTreeArrayToTree(state.items, "root");

  return (
    <div className="p-3">
      <DndProvider backend={HTML5Backend}>
        <ReorderListProvider<TreeArrayItem>
          idKey="id"
          onOrderChange={({ dragItem, dropTarget, dropPosition }) => {
            const dropTargetChildIndex = getTreeArrayItemChildIndex(
              state.items,
              dropTarget.id
            );
            const positionMap = {
              [DropPosition.inside]: undefined,
              [DropPosition.top]: dropTargetChildIndex,
              [DropPosition.bottom]: dropTargetChildIndex + 1,
            };
            setstate({
              items: moveTreeArrayItem(
                state.items,
                dragItem.id,
                dropPosition === DropPosition.inside
                  ? dropTarget.id!
                  : dropTarget.parentId!,
                positionMap[dropPosition]
              ),
            });
          }}
        >
          <List>
            <Render items={state.items} itemId="root"></Render>
          </List>
        </ReorderListProvider>
      </DndProvider>
    </div>
  );
};
