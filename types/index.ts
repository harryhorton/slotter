export interface IFieldType {
  id: string;
}

export interface IFieldProps<T> extends Partial<IField> {
  onChange: (value: T) => void;
  value: T;
}
export interface IField {
  id: string;
  label: string;
  defaultValue?: any;
  value?: any;
  fieldType: string;
  placeholder?: string;
}

export interface IComponentType {
  id: string;
  label: string;
}

export interface IComponent {
  id: string;
  type: string;
  data: any;
}

export interface IDocumentType {
  id: string;
  label?: string;
  labelPlural?: string;
  singleton?: boolean;
  fields?: IField[];
  components?: IComponent[];
}

export interface IFieldData {
  fieldType: string;
  data: any;
}

export interface IDocument {
  id: string;
  type: string;
  fieldData?: Record<string, any>;
}

export interface ISiteData {
  documents: IDocument[];
  documentTypes: IDocumentType[];
  fieldTypes: IFieldType[];
}

export interface ILink {
  to?: string;
  documentList?: string;
  document?: string;
}

export interface ISidebarItem {
  label: string;
  link?: ILink;
  children?: ISidebarItem[];
}

export interface ISidebar {
  items: ISidebarItem[];
}

export interface IAdminLayout {
  sidebar: ISidebar;
}
