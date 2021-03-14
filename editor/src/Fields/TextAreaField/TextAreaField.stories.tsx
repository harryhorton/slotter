import { FC } from "react";
import { TextAreaField } from "./TextAreaField";

export default {
  title: "FieldTypes/TextAreaField",
  component: TextAreaField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <TextAreaField>Content</TextAreaField>
  </div>
);
