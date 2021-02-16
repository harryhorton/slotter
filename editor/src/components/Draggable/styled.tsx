import styled from "styled-components";
import tw from "twin.macro";
import { DropPosition } from "./constants";

export const St = styled.li<{
  hoverPosition?: DropPosition | false | null;
}>(({ hoverPosition }) => [
  hoverPosition === DropPosition.top && tw`border-t border-blue-500`,
  hoverPosition === DropPosition.bottom && tw`border-b border-blue-500`,
  hoverPosition === DropPosition.inside && tw`border border-blue-500`,
  hoverPosition === DropPosition.left && tw`border-l border-blue-500`,
  hoverPosition === DropPosition.right && tw`border-r border-blue-500`,
]);
