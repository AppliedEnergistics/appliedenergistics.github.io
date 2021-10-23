import allPagesUntyped from "./all-pages.json";
import { CategoryNode, createPageTree, PageNode } from "./page-index";

export const allPages = allPagesUntyped as PageNode[];

export const itemIdToPageIndex: Record<string, string> = {};
for (let { url, itemIds } of allPages) {
  for (let itemId of itemIds) {
    itemIdToPageIndex[itemId] = url;
  }
}

export const pageTree = createPageTree(allPages);

/**
 * Find a category by full title.
 */
export function findCategory(name: string): CategoryNode {
  let nextLevel = pageTree.rootCategories;
  let category: CategoryNode | undefined;
  for (const part of name.split("/")) {
    category = nextLevel.find((c) => c.title === part);
    if (!category) {
      break;
    }
    nextLevel = category.categories;
  }

  if (!category) {
    throw new Error("Couldn't find category: " + name);
  }

  return category;
}
