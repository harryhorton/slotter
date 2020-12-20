import { IDocument, IDocumentType, ISidebar } from "@slotter/types";
import { Interface } from "readline";
import { AppState } from "../providers/app";

const pageDocumentType: IDocumentType = {
  id: "page",
  label: "Page",
  labelPlural: "Pages",
};

const samplePages: IDocument[] = [
  { id: "page1", type: pageDocumentType.id },
  { id: "page2", type: pageDocumentType.id },
  { id: "page3", type: pageDocumentType.id },
];

const sidebar: ISidebar = {
  items: [
    {
      label: "Pages",
      link: { documentList: "page" },
    },
  ],
};

export const devAppState: AppState = {
  adminLayout: { sidebar },
  siteData: {
    documentTypes: [pageDocumentType],
    documents: [...samplePages],
  },
};
