import { FieldData, FieldInstance } from "./field";

export interface DocumentType {
  id: string;
  label?: string;
  labelPlural?: string;
  singleton?: boolean;
  fields?: FieldInstance[];
}

export interface DocumentInstance {
  id: string;
  documentType: DocumentType["id"];
  fieldData?: FieldData;
}
