import { FC } from "react";
import { LayoutEditor } from "./LayoutEditor";

export default {
  title: "Components/LayoutEditor",
  component: LayoutEditor,
};

export const Primary: FC = () => (
  <div className="p-3">
    <LayoutEditor>Content</LayoutEditor>
  </div>
);
