import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { DropPosition } from "./stateMachine";

// TODO: is this wrapper necessary?
export interface ReorderListProps {}
export const ReorderList: FC<ReorderListProps> = ({ children, ...props }) => {
  return (
    <ul className="" {...props}>
      {children}
    </ul>
  );
};

export const StyledReorderListItem = styled.li<{
  hoverPosition?: DropPosition | false | null;
}>(({ hoverPosition }) => [
  hoverPosition === DropPosition.top && tw`border-t border-blue-500`,
  hoverPosition === DropPosition.bottom && tw`border-b border-blue-500`,
  hoverPosition === DropPosition.inside && tw`border border-blue-500`,
]);
