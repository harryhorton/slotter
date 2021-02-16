import { Tree, TreeArray } from "@slotter/types";
import {
  convertTreeArrayToTree,
  convertTreeToTreeArray,
  getTreeArrayItemChildIndex,
  injectTreeArrayItem,
  moveTreeArrayItem,
  removeTreeArrayItem,
} from "./layoutUtils";

const treeFixture: Tree = {
  id: "root",
  children: [
    { id: "1", children: [] },
    {
      id: "2",
      children: [
        { id: "a", children: [] },
        { id: "b", children: [] },
        { id: "c", children: [] },
      ],
    },
    { id: "3", children: [] },
  ],
};
const treeArrayFixture: TreeArray = [
  {
    id: "root",
    parentId: null,
    children: ["1", "2", "3"],
  },
  {
    id: "1",
    parentId: "root",
    children: [],
  },
  {
    id: "2",
    parentId: "root",
    children: ["a", "b", "c"],
  },
  {
    id: "a",
    parentId: "2",
    children: [],
  },
  {
    id: "b",
    parentId: "2",
    children: [],
  },
  {
    id: "c",
    parentId: "2",
    children: [],
  },
  {
    id: "3",
    parentId: "root",
    children: [],
  },
];

describe("layoutUtils", () => {
  describe(convertTreeToTreeArray, () => {
    it("should convert", () => {
      const result = convertTreeToTreeArray(treeFixture);
      expect(result).toMatchObject(treeArrayFixture);
    });
  });

  describe(convertTreeArrayToTree, () => {
    it("should convert", () => {
      const result = convertTreeArrayToTree(treeArrayFixture, "root");

      expect(result).toMatchObject(treeFixture);
    });
  });

  describe(getTreeArrayItemChildIndex, () => {
    it("should get index", () => {
      const result = getTreeArrayItemChildIndex(treeArrayFixture, "b");

      expect(result).toBe(1);
    });
  });

  describe(removeTreeArrayItem, () => {
    it("should remove", () => {
      const result = removeTreeArrayItem(treeArrayFixture, "b");
      // console.log(JSON.stringify(result, null, 4));
      expect(result).toMatchObject([
        {
          id: "root",
          parentId: null,
          children: ["1", "2", "3"],
        },
        {
          id: "1",
          parentId: "root",
          children: [],
        },
        {
          id: "2",
          parentId: "root",
          children: ["a", "c"],
        },
        {
          id: "a",
          parentId: "2",
          children: [],
        },
        {
          id: "c",
          parentId: "2",
          children: [],
        },
        {
          id: "3",
          parentId: "root",
          children: [],
        },
      ]);
    });
  });

  describe(injectTreeArrayItem, () => {
    it("should inject at provided position", () => {
      const result = injectTreeArrayItem(
        treeArrayFixture,
        { id: "aa", parentId: "2", children: [] },
        1
      );
      // console.log(JSON.stringify(result, null, 4));
      expect(result).toMatchObject([
        {
          id: "root",
          parentId: null,
          children: ["1", "2", "3"],
        },
        {
          id: "1",
          parentId: "root",
          children: [],
        },
        {
          id: "2",
          parentId: "root",
          children: ["a", "aa", "b", "c"],
        },
        {
          id: "a",
          parentId: "2",
          children: [],
        },
        {
          id: "b",
          parentId: "2",
          children: [],
        },
        {
          id: "c",
          parentId: "2",
          children: [],
        },
        {
          id: "3",
          parentId: "root",
          children: [],
        },
        {
          id: "aa",
          parentId: "2",
          children: [],
        },
      ]);
    });

    it("should inject last if no position", () => {
      const result = injectTreeArrayItem(treeArrayFixture, {
        id: "d",
        parentId: "2",
        children: [],
      });
      // console.log(JSON.stringify(result, null, 4));
      expect(result).toMatchObject([
        {
          id: "root",
          parentId: null,
          children: ["1", "2", "3"],
        },
        {
          id: "1",
          parentId: "root",
          children: [],
        },
        {
          id: "2",
          parentId: "root",
          children: ["a", "b", "c", "d"],
        },
        {
          id: "a",
          parentId: "2",
          children: [],
        },
        {
          id: "b",
          parentId: "2",
          children: [],
        },
        {
          id: "c",
          parentId: "2",
          children: [],
        },
        {
          id: "3",
          parentId: "root",
          children: [],
        },
        {
          id: "d",
          parentId: "2",
          children: [],
        },
      ]);
    });
  });

  describe(moveTreeArrayItem, () => {
    it("should inject at provided position", () => {
      const result = moveTreeArrayItem(treeArrayFixture, "b", "root", 1);
      // console.log(JSON.stringify(result, null, 4));
      expect(result).toMatchObject([
        {
          id: "root",
          parentId: null,
          children: ["1", "b", "2", "3"],
        },
        {
          id: "1",
          parentId: "root",
          children: [],
        },
        {
          id: "2",
          parentId: "root",
          children: ["a", "c"],
        },
        {
          id: "a",
          parentId: "2",
          children: [],
        },
        {
          id: "c",
          parentId: "2",
          children: [],
        },
        {
          id: "3",
          parentId: "root",
          children: [],
        },
        {
          id: "b",
          parentId: "root",
          children: [],
        },
      ]);
    });
  });
});
