import { FC } from "react";
import { DocumentPage } from "./DocumentPage";

export default {
  title: "Components/DocumentPage",
  component: DocumentPage,
};

export const Primary: FC = () => (
  <div className="p-3">
    <DocumentPage>Content</DocumentPage>
  </div>
);
