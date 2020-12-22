import { LinkInstance } from "./link";

export interface SidebarItemInstance {
  label: string;
  link?: LinkInstance;
  children?: SidebarItemInstance[];
}

export interface AppSidebarInstance {
  items: SidebarItemInstance[];
}
