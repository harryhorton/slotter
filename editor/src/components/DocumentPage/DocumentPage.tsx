import { DocumentFieldData } from "@slotter/types";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../providers/app";
import { Field } from "../Field";

interface IDocumentPageProps {}

export const DocumentPage: FC<IDocumentPageProps> = () => {
  const { appState } = useAppContext();
  const {
    siteData: { documents },
    adminConfig: { documentTypes },
  } = appState;
  const { documentId } = useParams<{ documentId: string }>();

  const selectedDocument = documents.find((doc) => doc.id === documentId);
  const documentType = documentTypes.find(
    (type) => type.id === selectedDocument?.documentType
  );
  const defaultFieldData =
    documentType?.fields?.reduce<DocumentFieldData>((prev, field) => {
      prev[field.id] = field.defaultValue;
      return prev;
    }, {}) ?? {};
  const [fieldData, setFieldData] = useState<DocumentFieldData>({
    ...defaultFieldData,
    ...selectedDocument?.fieldData,
  });

  if (!selectedDocument) {
    return (
      <div>
        <h1>Document with id: "{documentId}" not found</h1>
      </div>
    );
  }

  if (!documentType) {
    return (
      <div>
        <h1>Document Type "{selectedDocument.documentType}" not found</h1>
        <ul></ul>
      </div>
    );
  }

  const documentLabelText = documentType.label || documentType.id;
  return (
    <div>
      <h1>
        {documentLabelText}: {selectedDocument.id}
      </h1>
      <div>
        {documentType.fields?.map((field) => {
          console.log(field, Field);
          return (
            <Field
              key={field.id}
              {...field}
              value={fieldData[field.id]}
              onChange={(value: any) => {
                setFieldData({
                  ...fieldData,
                  [field.id]: value,
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
