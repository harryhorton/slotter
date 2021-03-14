import { FC } from "react";
import { HtmlComponent } from "./HtmlComponent";

export default {
  title: "Components/HtmlComponent",
  component: HtmlComponent,
};

export const Primary: FC = () => (
  <div className="p-3">
    <HtmlComponent>Content</HtmlComponent>
  </div>
);
