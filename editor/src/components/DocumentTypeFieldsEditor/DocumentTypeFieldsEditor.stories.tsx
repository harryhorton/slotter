import { FC } from "react";
import { DocumentTypeFieldsEditor } from "./DocumentTypeFieldsEditor";

export default {
  title: "Components/DocumentTypeFieldsEditor",
  component: DocumentTypeFieldsEditor,
};

export const Primary: FC = () => (
  <div className="p-3">
    <DocumentTypeFieldsEditor>Content</DocumentTypeFieldsEditor>
  </div>
);
