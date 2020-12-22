import { SidebarItemInstance } from "@slotter/types";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ISidebarItemProps {
  item: SidebarItemInstance;
}

export const SidebarItem: FC<ISidebarItemProps> = ({ item }) => {
  return (
    <li>
      {!item.link && <span>{item.label}</span>}
      {item.link?.to && <a href={item.link.to}>{item.label}</a>}
      {item.link?.documentList && (
        <Link to={`/documentlist/${item.link.documentList}`}>{item.label}</Link>
      )}
      {item.link?.document && (
        <Link to={`/document/${item.link.document}`}>{item.label}</Link>
      )}
      {item.children?.length && (
        <ul>
          {item.children.map((child) => (
            <SidebarItem item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};
