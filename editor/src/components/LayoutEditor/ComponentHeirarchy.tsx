import { ComponentInstance } from "@slotter/types";
import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { findTreeArrayItemById } from "../../utils/layoutUtils";
import {
  DraggableDropzone,
  DraggableItem,
  DropPosition,
  Dropzone,
} from "../Draggable";
import { useLayoutEditor } from "./LayoutEditorProvider";

export const ComponentHeirarchyItem = styled.li<{
  isSelected: boolean;
  hoverPosition: DropPosition | null;
}>(({ isSelected, hoverPosition }) => [
  tw`ml-1 cursor-pointer text-gray-900 leading-none`,
  isSelected && tw`text-blue-400`,
  hoverPosition === DropPosition.top && tw`border-t border-blue-500`,
  hoverPosition === DropPosition.bottom && tw`border-b border-blue-500`,
  hoverPosition === DropPosition.inside && tw`border border-blue-500`,
]);

/**
 *
 * TODO:
 * - add onclick and selected style handlers to the reorderListItem
 *
 */
const List: FC = (props) => <ul className="pl-3 list-none" {...props} />;

export const ComponentHeirarchy: FC<{
  components: ComponentInstance[];
  rootId?: string;
}> = ({ components, rootId = "root" }) => {
  const { selectedComponent, selectComponent, layout } = useLayoutEditor();
  const component = findTreeArrayItemById(components, rootId);

  if (!component) return null;

  if (component.id === "root") {
    return (
      <ul>
        {component.children?.length &&
          component.children.map((childId) => {
            return (
              <ComponentHeirarchy
                components={components}
                rootId={childId}
                key={component.id}
              />
            );
          })}
      </ul>
    );
  }
  // TODO: Replace rendering with new standard format.
  return (
    <DraggableDropzone
      item={component}
      treeArray={layout.components}
      enabledDropPositions={[
        DropPosition.top,
        DropPosition.bottom,
        DropPosition.inside,
      ]}
    >
      {({ ref, dropPosition, onDragLeave, onDragOver }) => (
        <ComponentHeirarchyItem
          ref={ref}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          isSelected={component.id === selectedComponent}
          hoverPosition={dropPosition}
          onClick={(e) => {
            e.stopPropagation();

            selectComponent(component.id);
          }}
        >
          {component.name ?? component.componentType}
          {(component.children?.length && (
            <List>
              {component.children.map((childId) => {
                return (
                  <ComponentHeirarchy
                    key={component.id}
                    components={components}
                    rootId={childId}
                  />
                );
              })}
            </List>
          )) ||
            null}
        </ComponentHeirarchyItem>
      )}
    </DraggableDropzone>
  );
};
