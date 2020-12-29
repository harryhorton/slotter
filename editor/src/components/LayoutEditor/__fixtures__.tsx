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
      componentType: "text",
      parentId: "root",
      id: "1",
      config: { value: "parent" },
      children: ["3"],
    },
    {
      componentType: "text",
      id: "3",
      config: { value: "child" },
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
