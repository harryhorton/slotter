import { FieldInstance } from "./field";

export interface ComponentType {
  id: string;
  label?: string;
  fields: FieldInstance[];
}

export type ComponentConfig = Record<string, any>;

export interface ComponentInstance {
  id: string;
  name?: string;
  componentType: ComponentType["id"];
  config?: ComponentConfig;
  children?: ComponentInstance[];
}

export interface LayoutInstance {
  id: string;
  components: ComponentInstance[];
}
