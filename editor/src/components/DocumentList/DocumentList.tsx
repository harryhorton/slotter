import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../providers/app";
import { Link } from "react-router-dom";
import { createDocumentLink } from "../../router";
interface DocumentListProps {}

export const DocumentList: FC<DocumentListProps> = () => {
  const { appState } = useAppContext();
  const {
    siteData: { documents },
    adminConfig: { documentTypes },
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
    (doc) => doc.documentType === selectedDocumentType.id
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
            return (
              <li>
                <Link to={createDocumentLink(doc.id)}>{doc.id}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
