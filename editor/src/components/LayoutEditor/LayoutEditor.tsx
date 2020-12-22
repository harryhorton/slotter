import {
  ComponentInstance,
  ComponentType,
  LayoutInstance,
} from "@slotter/types";
import { FC } from "react";
import { TextComponent } from "../TextComponent";

interface LayoutEditorProps {
  layout: LayoutInstance;
}

const componentTypes: ComponentType[] = [{ id: "text", fields: [] }];

const sampleLayout: LayoutInstance = {
  id: "sample-layout",
  components: [
    {
      componentType: "text",
      id: "1",
      config: { value: "parent" },
      children: [
        {
          componentType: "text",
          id: "1",
          config: { value: "child" },
          children: [],
        },
      ],
    },
  ],
};

export const ComponentHeirarchy: FC<{
  components: ComponentInstance[];
}> = ({ components }) => (
  <ul>
    {components.map((comp) => {
      return (
        <li className="pl-1">
          {comp.name || `[${comp.componentType}]`}
          {comp.children && comp.children.length ? (
            <>
              <br />
              <ComponentHeirarchy components={comp.children} />
            </>
          ) : null}
        </li>
      );
    })}
  </ul>
);

const registeredComponents: Record<
  string,
  FC<{ component: ComponentInstance }>
> = {
  text: TextComponent,
};

export const ComponentRenderer: FC<{
  components: ComponentInstance[];
}> = ({ components }) => {
  return (
    <>
      {components.map((comp) => {
        const FoundComponent = registeredComponents[comp.componentType];

        if (!FoundComponent)
          return (
            <div className="text-red-500">
              Component type {comp.componentType} not found.
            </div>
          );

        return (
          <FoundComponent component={comp}>
            {comp.children && <ComponentRenderer components={comp.children} />}
          </FoundComponent>
        );
      })}
    </>
  );
};

export const LayoutEditor: FC<LayoutEditorProps> = ({
  layout = sampleLayout,
}) => {
  const components = layout.components;

  return (
    <div className="flex border border-gray-100 h-screen">
      <div className="bg-gray-100 px-1 py-1">
        <ComponentHeirarchy components={components} />
      </div>
      <div className="flex-1">
        <ComponentRenderer components={components} />
      </div>
      <div className="w-64 bg-gray-100 px-2 py-1">Sidebar</div>
    </div>
  );
};
