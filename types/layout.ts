import { FieldInstance } from "./field";
import { TreeArrayItem } from "./tree";

export type ComponentInstanceId = string;

export interface ComponentType {
  id: string;
  label?: string;
  fields: FieldInstance[];
}

export type ComponentConfig = Record<string, any>;

export interface ComponentInstance extends TreeArrayItem {
  id: string;
  name?: string;
  componentType: ComponentType["id"];
  config: ComponentConfig;
  parentId: string | null;
  children: ComponentInstanceId[];
}

export type ComponentInstanceWithoutId = Omit<ComponentInstance, "id">;

export interface LayoutInstance {
  id: string;
  components: ComponentInstance[];
}
