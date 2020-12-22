import { FC } from "react";
import { ContentField } from "./ContentField";

export default {
  title: "Components/ContentField",
  component: ContentField,
};

export const Primary: FC = () => (
  <div className="p-3">
    <ContentField>Content</ContentField>
  </div>
);
