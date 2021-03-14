import { FC } from "react";
import { AppProvider } from "../../providers/app";
import { pageDocumentType } from "../../__fixtures__/dev-app-state";
import { FieldInstanceEditor } from "./FieldInstanceEditor";

export default {
  title: "Components/FieldInstanceEditor",
  component: FieldInstanceEditor,
};

export const Primary: FC = () => (
  <div className="p-3">
    <AppProvider>
      <FieldInstanceEditor field={pageDocumentType.fields![0]}>
        Content
      </FieldInstanceEditor>
    </AppProvider>
  </div>
);
