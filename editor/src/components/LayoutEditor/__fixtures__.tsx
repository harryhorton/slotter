import { ComponentType, LayoutInstance } from "@slotter/types";

export const componentTypes: ComponentType[] = [
  {
    id: "text",
    fields: [
      {
        fieldType: "text",
        id: "value",
        label: "Text",
        placeholder: "Enter some text",
        defaultValue: "",
      },
    ],
  },
];

export const sampleLayout: LayoutInstance = {
  id: "sample-layout",
  components: [
    {
      id: "root",
      parentId: null,
      children: ["1", "2"],
      componentType: "root",
      config: {},
    },
    {
      componentType: "text",
      parentId: "root",
      id: "1",
      config: { value: "parent", className: "block bg-gray-300" },
      children: ["3"],
    },
    {
      componentType: "text",
      id: "3",
      config: { value: "inline-child", className: "bg-gray-400" },
      parentId: "1",
      children: [],
    },
    {
      componentType: "text",
      parentId: "root",
      children: [],
      id: "2",
      config: { value: "sibling" },
    },
  ],
};
