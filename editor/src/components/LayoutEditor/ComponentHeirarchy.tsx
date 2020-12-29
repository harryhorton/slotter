import { ComponentInstance } from "@slotter/types";
import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useLayoutEditor } from "./LayoutEditorProvider";

export const ComponentHeirarchyItem = styled.li<{ isSelected: boolean }>(
  ({ isSelected }) => [
    tw`pl-1 cursor-pointer text-gray-900`,
    isSelected && tw`text-blue-400`,
  ]
);
export const ComponentHeirarchy: FC<{
  components?: ComponentInstance[];
}> = ({ components }) => {
  const { layout, selectedComponent, selectComponent } = useLayoutEditor();

  return (
    <ul>
      {(components ?? layout.components).map((comp) => {
        return (
          <ComponentHeirarchyItem
            isSelected={comp.id === selectedComponent}
            onClick={(e) => {
              e.stopPropagation();
              selectComponent(comp.id);
            }}
          >
            {comp.name || `[${comp.componentType}]`}
            {comp.children && comp.children.length ? (
              <>
                <br />
                <ComponentHeirarchy components={comp.children} />
              </>
            ) : null}
          </ComponentHeirarchyItem>
        );
      })}
    </ul>
  );
};
