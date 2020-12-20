import { FC } from "react";
import { DocumentList } from "./DocumentList";

export default {
  title: "Components/DocumentList",
  component: DocumentList,
};

export const Primary: FC = () => (
  <div className="p-3">
    <DocumentList>Content</DocumentList>
  </div>
);
