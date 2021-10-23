/**
 * Creates an index of all pages.
 */

export interface CategoryNode {
  title: string;
  fullPath: string;
  level: number;
  pages: PageNode[];
  categories: CategoryNode[];
}

export interface PageNode {
  title: string;
  path: string;
  url: string;
  itemIds: string[];
  categories: string[];
}

export interface PageTree {
  rootCategories: CategoryNode[];
  pages: PageNode[];
}

function findOrCreateCategory(
  start: CategoryNode[],
  category: string
): CategoryNode {
  let level = 0;
  let node: CategoryNode | undefined = undefined;
  let subNodes: CategoryNode[] = start;
  const fullPath: string[] = [];

  for (const title of category.split("/")) {
    node = subNodes.find((c) => c.title === title);
    fullPath.push(title);
    if (!node) {
      node = {
        title,
        fullPath: fullPath.join("/"),
        level,
        categories: [],
        pages: [],
      };
      subNodes.push(node);
      subNodes.sort((a, b) => a.title.localeCompare(b.title));
    }

    subNodes = node.categories;
    level++;
  }

  if (!node) {
    throw new Error("Empty category found");
  }
  return node;
}

export function createPageTree(allPages: PageNode[]): PageTree {
  const tree: PageTree = {
    rootCategories: [],
    pages: [],
  };

  for (const page of allPages) {
    tree.pages.push(page);

    for (const categoryPath of page.categories) {
      const category = findOrCreateCategory(tree.rootCategories, categoryPath);
      category.pages.push(page);
      category.pages.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  return tree;
}
