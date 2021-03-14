import { FC } from "react";
import { CheckboxField } from "./Checkboxfield";

export default {
  title: "FieldTypes/Checkboxfield",
  component: CheckboxField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <CheckboxField value={true} label="checked" onChange={() => {}} />
    <CheckboxField value={false} label="unchecked" onChange={() => {}} />
  </div>
);
