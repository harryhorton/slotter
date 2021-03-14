import { FC } from "react";
import { TagField } from "./TagField";

export default {
  title: "FieldTypes/TagField",
  component: TagField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <TagField>Content</TagField>
  </div>
);
