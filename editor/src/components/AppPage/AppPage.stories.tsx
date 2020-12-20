import { FC } from "react";
import { AppPage } from "./AppPage";

export default {
  title: "Components/AppPage",
  component: AppPage,
};

export const Primary: FC = () => (
  <div className="p-3">
    <AppPage>Content</AppPage>
  </div>
);
