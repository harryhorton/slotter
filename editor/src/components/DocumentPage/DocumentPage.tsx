import { FC } from "react";
import { useAppContext } from "../../providers/app";
import { useParams } from "react-router-dom";

interface IDocumentPageProps {}

export const DocumentPage: FC<IDocumentPageProps> = () => {
  const { appState } = useAppContext();
  const {
    siteData: { documentTypes, documents },
  } = appState;
  const { documentId } = useParams<{ documentId: string }>();

  const selectedDocument = documents.find((doc) => doc.id === documentId);

  if (!selectedDocument) {
    return (
      <div>
        <h1>Document with id: "{documentId}" not found</h1>
      </div>
    );
  }

  const documentType = documentTypes.find(
    (type) => type.id === selectedDocument.type
  );
  if (!documentType) {
    return (
      <div>
        <h1>Document Type "{selectedDocument.type}" not found</h1>
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
    </div>
  );
};
