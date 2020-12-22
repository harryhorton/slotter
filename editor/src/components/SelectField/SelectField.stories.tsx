import { FC } from "react";
import { SelectField } from "./SelectField";

export default {
  title: "Components/SelectField",
  component: SelectField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <SelectField>Content</SelectField>
  </div>
);
