import { DocumentInstance, DocumentType } from "./document";
import { FieldType } from "./field";
import { AppSidebarInstance } from "./sidebar";

export interface SiteData {
  documents: DocumentInstance[];
}
export interface AdminConfig {
  fieldTypes: FieldType[];
  documentTypes: DocumentType[];
  appSidebar: AppSidebarInstance;
}

export * from "./document";
export * from "./field";
export * from "./layout";
export * from "./link";
export * from "./sidebar";
