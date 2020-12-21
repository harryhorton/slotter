import { IDocument, IDocumentType, IFieldType, ISidebar } from "@slotter/types";
import { AppState } from "../providers/app";

const fieldTypes: IFieldType[] = [{ id: "text" }];

const pageDocumentType: IDocumentType = {
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
      id:'notReal',
      label:'not real',
      fieldType:'notARealField'
    }
  ],
};

const postDocumentType: IDocumentType = {
  id: "post",
  label: "Post",
  labelPlural: "Posts",
};

const samplePages: IDocument[] = [
  { id: "page1", type: pageDocumentType.id, fieldData: { title: "Page 1" } },
  { id: "page2", type: pageDocumentType.id },
  { id: "page3", type: pageDocumentType.id },
];

const samplePosts: IDocument[] = [
  { id: "post1", type: postDocumentType.id },
  { id: "post2", type: postDocumentType.id },
  { id: "post3", type: postDocumentType.id },
];

const sidebar: ISidebar = {
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
  adminLayout: { sidebar },
  siteData: {
    fieldTypes,
    documentTypes: [pageDocumentType, postDocumentType],
    documents: [...samplePages, ...samplePosts],
  },
};
