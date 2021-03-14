import { AppSidebarInstance } from "@slotter/types";
import { FC } from "react";
import { SidebarItem } from "../SidebarItem";

interface IAppSidebarProps {
  sidebar: AppSidebarInstance;
}

export const AppSidebar: FC<IAppSidebarProps> = ({ sidebar }) => {
  const { items } = sidebar;
  return (
    <aside className="bg-white border-r border-gray-100 my-3 pl-6 pr-4">
      <nav>
        <ul className="-mt-1">
          {items.map((item) => {
            return <SidebarItem item={item} />;
          })}
        </ul>
      </nav>
    </aside>
  );
};
