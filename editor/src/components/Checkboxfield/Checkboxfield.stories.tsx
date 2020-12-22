import { FC } from "react";
import { Checkboxfield } from "./Checkboxfield";

export default {
  title: "Components/Checkboxfield",
  component: Checkboxfield,
};

export const Primary: FC = () => (
  <div className="p-3">
    <Checkboxfield>Content</Checkboxfield>
  </div>
);
