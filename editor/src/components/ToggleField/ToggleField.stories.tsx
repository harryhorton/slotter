import { FC } from "react";
import { ToggleField } from "./ToggleField";

export default {
  title: "Components/ToggleField",
  component: ToggleField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <ToggleField>Content</ToggleField>
  </div>
);
