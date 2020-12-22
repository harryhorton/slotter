import { FieldInstance } from "./field";

export interface DocumentType {
  id: string;
  label?: string;
  labelPlural?: string;
  singleton?: boolean;
  fields?: FieldInstance[];
}

export type DocumentFieldData = Record<string, any>;

export interface DocumentInstance {
  id: string;
  documentType: DocumentType["id"];
  fieldData?: DocumentFieldData;
}
