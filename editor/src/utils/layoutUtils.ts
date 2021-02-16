import { Tree, TreeArray, TreeArrayItem } from "@slotter/types";

/**
 * Convert nested tree structure to custom tree array format
 */
export const convertTreeToTreeArray = (
  { id, children }: Tree,
  list: TreeArray = [],
  parentId: string | null = null
): TreeArray => {
  const listWithRootItem = [
    ...list,
    { id, parentId, children: children.map((child) => child.id) },
  ];

  const listWithChildren = children.reduce((prev, child) => {
    return convertTreeToTreeArray(child, prev, id);
  }, listWithRootItem);

  return listWithChildren;
};

/**
 * Finds an item in a tree array
 */
export const findTreeArrayItemById = <T extends TreeArrayItem>(
  items: T[],
  id: string | null
) => items.find((item) => item.id === id);

/**
 * Converts a Tree Array to a nested tree structure
 */
export const convertTreeArrayToTree = (
  items: TreeArray,
  rootId: string
): Tree => {
  const root = findTreeArrayItemById(items, rootId);

  if (!root) {
    throw new Error(`Unable to find item with id: ${rootId}`);
  }

  return {
    id: root.id,
    children: root.children.map((childId) =>
      convertTreeArrayToTree(items, childId)
    ),
  };
};

export const removeTreeArrayItem = <T extends TreeArrayItem>(
  list: T[],
  itemId: string
): T[] => {
  const item = findTreeArrayItemById(list, itemId);
  if (!item) {
    throw new Error(`Unable to find item with id: ${itemId}`);
  }

  return list
    .filter((iter) => iter.id !== itemId)
    .map((iter) =>
      iter.id === item.parentId
        ? {
            ...iter,
            children: iter.children.filter((childId) => childId !== itemId),
          }
        : iter
    );
};

export const updateTreeArrayItem = <T extends TreeArrayItem>(
  list: T[],
  updatedItem: T
) => {
  const item = findTreeArrayItemById(list, updatedItem.id);
  if (!item) {
    throw new Error(`Unable to find item with id: ${updatedItem}`);
  }

  if (updatedItem.parentId !== item.parentId) {
    throw new Error("updateTreeArrayItem cannot be used to change parents");
  }

  return list.map((iter) => (iter.id === item.id ? { ...updatedItem } : iter));
};

export const injectTreeArrayItem = <T extends TreeArrayItem>(
  list: T[],
  item: T,
  position?: number
): T[] => {
  const existingItem = findTreeArrayItemById(list, item.id);
  if (existingItem) {
    throw new Error(`Item with id:${existingItem.id} already exists.`);
  }

  const parent = findTreeArrayItemById(list, item.parentId);
  if (!parent) {
    throw new Error(`Unable to find parent item with id: ${item.parentId}`);
  }

  const childIndex = position ?? parent.children.length;

  const newChildren = [...parent.children];
  newChildren.splice(childIndex, 0, item.id);

  const updatedParentList = updateTreeArrayItem([...list, item], {
    ...parent,
    children: newChildren,
  });

  return updatedParentList;
};

/**
 * Get the the index of a child in its parent's children.
 */
export const getTreeArrayItemChildIndex = (
  list: TreeArray,
  itemId: string
): number => {
  const item = findTreeArrayItemById(list, itemId);
  if (!item) {
    throw new Error(`Unable to find item with id: ${itemId}`);
  }
  const parent = findTreeArrayItemById(list, item.parentId);
  if (!parent) {
    throw new Error(`Unable to find parent item with id: ${item.parentId}`);
  }

  return parent.children.indexOf(itemId);
};

export const moveTreeArrayItem = <T extends TreeArrayItem>(
  list: T[],
  itemId: string,
  parentId: string,
  position?: number
): T[] => {
  const item = findTreeArrayItemById(list, itemId);
  if (!item) {
    throw new Error(`Unable to find item with id: ${itemId}`);
  }

  const currentParent = findTreeArrayItemById(list, item.parentId);
  if (!currentParent) {
    throw new Error(`Unable to find parent item with id: ${parentId}`);
  }

  const isSameParent = item.parentId === parentId;
  const newParent = isSameParent
    ? currentParent
    : findTreeArrayItemById(list, parentId);
  if (!newParent) {
    throw new Error(`Unable to find parent item with id: ${newParent}`);
  }

  const originalIndex = getTreeArrayItemChildIndex(list, itemId);

  /**
   * Need to do this for array ordering.
   * Probably a better way to handle it.
   */
  if (isSameParent && position && position > originalIndex) {
    const newChildren = [...newParent.children];
    // adds it at the expected index while leaving a copy at old index
    newChildren.splice(position, 0, itemId);
    //removes original with the result of shifting the array back
    newChildren.splice(originalIndex, 1);

    //No need to do anything other thn update the parent.
    return updateTreeArrayItem(list, { ...newParent, children: newChildren });
  }

  const listWithoutItem = removeTreeArrayItem(list, itemId);

  const listWithUpdatedItem = injectTreeArrayItem(
    listWithoutItem,
    {
      ...item,
      parentId: newParent.id,
    },
    position
  );

  return listWithUpdatedItem;
  // }
};

export const isItemInHierarchy = (
  list: TreeArray,
  itemId: string,
  parentId: string
): boolean => {
  if (itemId === parentId) return true;

  if (parentId === null) {
    return false;
  }

  const child = findTreeArrayItemById(list, itemId);

  if (!child) {
    return false;
  }

  if (child.parentId === parentId) {
    return true;
  }

  return isItemInHierarchy(list, child.parentId!, parentId);
};
