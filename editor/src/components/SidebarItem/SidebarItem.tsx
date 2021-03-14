import { SidebarItemInstance } from "@slotter/types";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

interface ISidebarItemProps {
  item: SidebarItemInstance;
}

const StyledLink = styled.a<{ isLabel?: boolean }>(({ isLabel = false }) => [
  tw`block text-gray-900`,
  isLabel && tw``,
  !isLabel && tw`hover:underline`,
]);

export const SidebarItem: FC<ISidebarItemProps> = ({ item }) => {
  return (
    <li>
      {!item.link && (
        <StyledLink as="span" isLabel>
          {item.label}
        </StyledLink>
      )}
      {item.link?.to && (
        <StyledLink href={item.link.to}>{item.label}</StyledLink>
      )}
      {item.link?.documentList && (
        <StyledLink as={Link} to={`/documentlist/${item.link.documentList}`}>
          {item.label}
        </StyledLink>
      )}
      {item.link?.document && (
        <StyledLink as={Link} to={`/document/${item.link.document}`}>
          {item.label}
        </StyledLink>
      )}
      {item.children?.length && (
        <ul className="pl-4">
          {item.children.map((child) => (
            <SidebarItem item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};
