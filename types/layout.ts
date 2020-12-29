import { FieldInstance } from "./field";

export type ComponentInstanceId = string;

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
  config: ComponentConfig;
  parentId: "root" | string;
  children: ComponentInstanceId[];
}

export type ComponentInstanceWithoutId = Omit<ComponentInstance, "id">;

export interface LayoutInstance {
  id: string;
  components: ComponentInstance[];
}
