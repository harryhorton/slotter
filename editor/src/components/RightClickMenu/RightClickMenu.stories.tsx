import { FC } from "react";
import { RightClickMenu } from "./RightClickMenu";

export default {
  title: "Components/RightClickMenu",
  component: RightClickMenu,
};

export const Primary: FC = () => (
  <div className="p-3">
    <RightClickMenu>Content</RightClickMenu>
  </div>
);
