import { AppSidebarInstance } from "@slotter/types";
import { FC } from "react";
import { SidebarItem } from "../SidebarItem";

interface IAppSidebarProps {
  sidebar: AppSidebarInstance;
}

export const AppSidebar: FC<IAppSidebarProps> = ({ sidebar }) => {
  const { items } = sidebar;
  return (
    <aside className="bg-blue-100  py-2 px-4">
      <nav>
        <ul>
          {items.map((item) => {
            return <SidebarItem item={item} />;
          })}
        </ul>
      </nav>
    </aside>
  );
};
