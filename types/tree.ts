
export interface TreeArrayItem {
  id: string;
  parentId: string | null;
  children: string[];
  [x: string]: any;
}

export interface Tree {
  id: string;
  children: Tree[];
  [x: string]: any;
}

export type TreeArray = TreeArrayItem[];