export interface IFieldType {
  id: string;
}

export interface IField {
  id: string;
  label: string;
  default: any;
  value: any;
  type: string;
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

export interface IDocument {
  id: string;
  type: string;
}

export interface ISiteData {
  documents: IDocument[];
  documentTypes: IDocumentType[];
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
