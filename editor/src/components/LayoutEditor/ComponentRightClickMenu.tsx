import { ComponentInstance } from "@slotter/types";
import { FC } from "react";
import { RightClickMenu } from "../RightClickMenu";
import { useLayoutEditor } from "./LayoutEditorProvider";
import { hideMenu } from "react-contextmenu/modules/actions";

export const ComponentRightClickMenu: FC<{ component: ComponentInstance }> = ({
  component,
}) => {
  const {
    selectComponent,
    addComponent,
    deleteComponent,
    deselectAllComponents,
    getComponentById,
  } = useLayoutEditor();

  const handleAddChild = () => {
    addComponent({
      component: {
        parentId: component.id,
        componentType: "text",
        children: [],
        config: {
          value: "need to apply defaults",
          className: "",
        },
        name: "",
      },
    });
    hideMenu();
  };

  const handleAddChildBefore = () => {
    const parent = getComponentById(component.parentId);
    const index = parent!.children.indexOf(component.id);
    console.log(index);

    addComponent({
      index,
      component: {
        parentId: component.parentId,
        componentType: "text",
        children: [],
        config: {
          value: "need to apply defaults",
          className: "",
        },
        name: "",
      },
    });
    hideMenu();
  };

  const handleAddChildAfter = () => {
    const parent = getComponentById(component.parentId);
    let currentIndex = parent!.children.indexOf(component.id);

    addComponent({
      index: currentIndex + 1,
      component: {
        parentId: component.parentId,
        componentType: "text",
        children: [],
        config: {
          value: "need to apply defaults",
          className: "",
        },
        name: "",
      },
    });
    hideMenu();
  };

  const handleDeleteComponent = () => {
    deselectAllComponents();
    deleteComponent(component.id);
    hideMenu();
  };

  return (
    <RightClickMenu
      renderTrigger={(props) => <div {...props}></div>}
      onShow={() => selectComponent(component.id)}
    >
      <div className="bg-gray-600 text-white rounded-sm text-sm">
        <ul>
          <li>
            <button
              className="text-left block w-full px-2 border-b border-gray-700 rounded-t-sm"
              onClick={handleAddChildBefore}
            >
              Add Before
            </button>
          </li>
          <li>
            <button
              className="text-left block w-full px-2 border-b border-gray-700"
              onClick={handleAddChild}
            >
              Add Child
            </button>
          </li>
          <li>
            <button
              className="text-left block w-full px-2 border-b border-gray-700"
              onClick={handleAddChildAfter}
            >
              Add After
            </button>
          </li>
          <li>
            <button
              className="text-left block w-full px-2 border-b border-red-800 bg-red-700 rounded-b-sm"
              onClick={handleDeleteComponent}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </RightClickMenu>
  );
};
