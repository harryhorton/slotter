import { FC } from "react";
import { useAppContext } from "../../providers/app";
import { FieldEditor } from "../FieldEditor";
import { getComponentById, useLayoutEditor } from "./LayoutEditorProvider";

export const LayoutEditorSidebar: FC = () => {
  const {
    appState: {
      adminConfig: { componentTypes },
    },
  } = useAppContext();
  const { layout, selectedComponent, updateComponent } = useLayoutEditor();
  const foundSelectedcomponent =
    (selectedComponent &&
      getComponentById(layout.components, selectedComponent)) ||
    null;

  const foundComponentType = componentTypes.find(
    (type) => type.id === foundSelectedcomponent?.componentType
  );

  const sidebarTitleText = foundSelectedcomponent
    ? foundSelectedcomponent.name ||
      `[${foundSelectedcomponent?.componentType}]`
    : "No component selected";

  return (
    <div className="w-64 bg-gray-100 px-2 py-1">
      <h1>{sidebarTitleText}</h1>
      {foundSelectedcomponent &&
        (!foundComponentType ? (
          <div>
            Unable to find component type
            {foundSelectedcomponent?.componentType}
          </div>
        ) : (
          <FieldEditor
            data={foundSelectedcomponent.config!}
            fields={foundComponentType.fields}
            onChange={(data) => {
              updateComponent({ ...foundSelectedcomponent, config: data });
            }}
          />
        ))}
    </div>
  );
};
