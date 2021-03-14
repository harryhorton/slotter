import { FC } from "react";
import { ConditionalField } from "./ConditionalField";

export default {
  title: "FieldTypes/ConditionalField",
  component: ConditionalField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <ConditionalField>Content</ConditionalField>
  </div>
);
