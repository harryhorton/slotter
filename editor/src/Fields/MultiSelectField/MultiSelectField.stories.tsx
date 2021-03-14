import { FC } from "react";
import { MultiSelectField } from "./MultiSelectField";

export default {
  title: "FieldTypes/MultiSelectField",
  component: MultiSelectField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <MultiSelectField>Content</MultiSelectField>
  </div>
);
