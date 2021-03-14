import { DocumentType } from "@slotter/types";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../providers/app";
import { CheckboxField } from "../../Fields/Checkboxfield";
import { DocumentTypeFieldsEditor } from "../DocumentTypeFieldsEditor";
import { TextField } from "../../Fields/TextField";

interface DocumentTypeEditorProps {}

export const DocumentTypeEditor: FC<DocumentTypeEditorProps> = () => {
  const { appState, setAppState } = useAppContext();
  const {
    siteData: { documents },
    adminConfig: { documentTypes },
  } = appState;
  const { documentType = "page" } = useParams<{ documentType: string }>();
  const selectedDocument = documentTypes.find((doc) => doc.id === documentType);
  const [document, setdocument] = useState<DocumentType>(
    selectedDocument ?? {
      id: "",
      label: "",
      labelPlural: "",
      singleton: false,
      fields: [],
    }
  );
  return (
    <div>
      <h1 className="mb-3 text-lg">Document Type Editor</h1>
      <TextField
        label="Unique ID"
        value={document.id}
        onChange={(value) => {
          setdocument({ ...document, id: value });
        }}
      />
      <TextField
        label="Label"
        value={document.label ?? ""}
        onChange={(value) => {
          setdocument({ ...document, label: value });
        }}
      />
      <TextField
        label="Plural Label"
        value={document.labelPlural ?? ""}
        onChange={(value) => {
          setdocument({ ...document, labelPlural: value });
        }}
      />
      <CheckboxField
        label="Is Singleton"
        value={document.singleton ?? false}
        onChange={(value) => {
          setdocument({ ...document, singleton: value });
        }}
      />
      <DocumentTypeFieldsEditor fields={document.fields} />
    </div>
  );
};
