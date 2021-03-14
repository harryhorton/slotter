import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../../providers/app";
import { DocumentTypeEditor } from "./DocumentTypeEditor";

export default {
  title: "Components/DocumentTypeEditor",
  component: DocumentTypeEditor,
};

export const Primary: FC = () => (
  <div className="p-3">
    <BrowserRouter>
      <AppProvider>
        <DocumentTypeEditor />
      </AppProvider>
    </BrowserRouter>
  </div>
);
