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
      id: "1",
      config: { value: "parent" },
      children: [
        {
          componentType: "text",
          id: "3",
          config: { value: "child" },
          children: [],
        },
      ],
    },
    {
      componentType: "text",
      id: "2",
      config: { value: "sibling" },
    },
  ],
};
