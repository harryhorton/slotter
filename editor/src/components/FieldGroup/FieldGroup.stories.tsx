import { FC } from "react";
import { FieldGroup } from "./FieldGroup";

export default {
  title: "Components/FieldGroup",
  component: FieldGroup,
};

export const Primary: FC = () => (
  <div className="p-3">
    <FieldGroup>Content</FieldGroup>
  </div>
);
