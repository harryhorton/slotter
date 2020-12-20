import { FC } from "react";
import { AppHeader } from "./AppHeader";

export default {
  title: "Components/AppHeader",
  component: AppHeader,
};

export const Primary: FC = () => (
  <div className="p-3">
    <AppHeader>Content</AppHeader>
  </div>
);
