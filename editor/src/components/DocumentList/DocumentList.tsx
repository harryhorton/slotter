import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../providers/app";

interface IDocumentListProps {}

export const DocumentList: FC<IDocumentListProps> = () => {
  const { appState } = useAppContext();
  const {
    siteData: { documentTypes, documents },
  } = appState;
  const { documentType } = useParams<{ documentType: string }>();

  const selectedDocumentType = documentTypes.find(
    (type) => type.id === documentType
  );
  if (!selectedDocumentType) {
    return (
      <div>
        <h1>Document Type "{documentType}" not found</h1>
        <ul></ul>
      </div>
    );
  }

  const selectedDocuments = documents.filter(
    (doc) => doc.type === selectedDocumentType.id
  );

  const titleText =
    selectedDocumentType.labelPlural ||
    selectedDocumentType.label ||
    selectedDocumentType.id;

  return (
    <div>
      <h1>{titleText}</h1>
      {selectedDocuments.length === 0 ? (
        <div>No documents found</div>
      ) : (
        <ul>
          {selectedDocuments.map((doc) => {
            return <li>{doc.id}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
