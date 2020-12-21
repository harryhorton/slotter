export const routes = {
  documentList: "/documentList/:documentType",
  document: "/document/:documentId",
};

export const createDocumentListLink = (documentType: string) =>
  routes.documentList.replace(":documentType", documentType);

export const createDocumentLink = (documentId: string) =>
  routes.document.replace(":documentId", documentId);
