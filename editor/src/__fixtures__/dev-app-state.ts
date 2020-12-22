import {
  DocumentInstance,
  DocumentType,
  FieldType,
  AppSidebarInstance,
} from "@slotter/types";
import { AppState } from "../providers/app";

const fieldTypes: FieldType[] = [{ id: "text" }];

const pageDocumentType: DocumentType = {
  id: "page",
  label: "Page",
  labelPlural: "Pages",
  fields: [
    {
      id: "title",
      label: "Title",
      fieldType: "text",
      placeholder: "Page title",
    },
    {
      id: "slug",
      label: "Slug",
      fieldType: "text",
      placeholder: "page slug",
    },
    {
      id: "notReal",
      label: "not real",
      fieldType: "notARealField",
    },
  ],
};

const postDocumentType: DocumentType = {
  id: "post",
  label: "Post",
  labelPlural: "Posts",
};

const samplePages: DocumentInstance[] = [
  {
    id: "page1",
    documentType: pageDocumentType.id,
    fieldData: { title: "Page 1" },
  },
  { id: "page2", documentType: pageDocumentType.id },
  { id: "page3", documentType: pageDocumentType.id },
];

const samplePosts: DocumentInstance[] = [
  { id: "post1", documentType: postDocumentType.id },
  { id: "post2", documentType: postDocumentType.id },
  { id: "post3", documentType: postDocumentType.id },
];

const appSidebar: AppSidebarInstance = {
  items: [
    {
      label: pageDocumentType.labelPlural!,
      link: { documentList: pageDocumentType.id },
    },
    {
      label: postDocumentType.labelPlural!,
      link: { documentList: postDocumentType.id },
    },
  ],
};

export const devAppState: AppState = {
  adminConfig: {
    appSidebar,
    fieldTypes,
    documentTypes: [pageDocumentType, postDocumentType],
  },
  siteData: {
    documents: [...samplePages, ...samplePosts],
  },
};
