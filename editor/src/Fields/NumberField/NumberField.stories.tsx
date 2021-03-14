import { FC } from "react";
import { NumberField } from "./NumberField";

export default {
  title: "Components/NumberField",
  component: NumberField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <NumberField>Content</NumberField>
  </div>
);
