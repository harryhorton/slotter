import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ReorderList,


  ReorderListItem, ReorderListProvider
} from "./ReorderList";

export default {
  title: "Components/ReorderList",
  component: ReorderList,
};

const Item: FC = (props) => <div className="ml-0" {...props} />;
const List: FC = (props) => <div className="pl-3 list-none" {...props} />;

export const Primary: FC = () => {
  return (
    <div className="p-3">
      <DndProvider backend={HTML5Backend}>
        <ReorderListProvider
          onOrderChange={(e) => {
            console.log(e);
          }}
        >
          <List>
            <ReorderListItem item={{ name: "" }}>
              <Item>Item 1</Item>
            </ReorderListItem>
            <ReorderListItem item={{ name: "" }}>
              Item 2
              <List>
                <ReorderListItem item={{ name: "" }}>
                  <Item>Item A</Item>
                </ReorderListItem>
                <ReorderListItem item={{ name: "" }}>
                  <Item>Item B</Item>
                </ReorderListItem>
                <ReorderListItem item={{ name: "" }}>
                  <Item>Item C</Item>
                </ReorderListItem>
              </List>
            </ReorderListItem>
            <ReorderListItem item={{ name: "" }}>
              <Item>Item 3</Item>
            </ReorderListItem>
          </List>
        </ReorderListProvider>
      </DndProvider>
    </div>
  );
};
