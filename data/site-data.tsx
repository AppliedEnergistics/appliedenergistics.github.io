import allPagesUntyped from './all-pages.json';
import {createPageTree, PageNode} from "./page-index";

export const allPages = allPagesUntyped as PageNode[];

export const itemIdToPageIndex: Record<string, string> = {};
for (let {url, itemIds} of allPages) {
    for (let itemId of itemIds) {
        itemIdToPageIndex[itemId] = url;
    }
}

export const pageTree = createPageTree(allPages);
