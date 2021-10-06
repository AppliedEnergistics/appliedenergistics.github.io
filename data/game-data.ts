import GameDataExport from "../site-export/site_export.json";
import {ImageProps} from "next/image";

export interface Recipe {
    id: string;
    resultItem: string;
    resultCount: number
}

export interface CraftingRecipe extends Recipe {
    shapeless: boolean;
    ingredients: string[][];
}

export interface SmeltingRecipe extends Recipe {
    ingredient: string[];
}

export interface InscriberRecipe extends Recipe {
    top: string[];
    middle: string[];
    bottom: string[];
}

export interface ItemInfo {
    id: string;
    displayName: string;
    tooltipLines: string[];
    icon: ImageProps["src"];
}

export const craftingRecipes: Record<string, CraftingRecipe> = GameDataExport.craftingRecipes;
export const smeltingRecipes: Record<string, SmeltingRecipe> = GameDataExport.smeltingRecipes;
export const inscriberRecipes: Record<string, InscriberRecipe> = GameDataExport.inscriberRecipes;

const indexByItemId = new Map<string, ItemInfo>(
    Object.values(GameDataExport.items).map(item => {
        const iconName = item.icon.replaceAll('\\', '/').replaceAll(/^icons\//g, '');
        const icon = require(__dirname + "/../site-export/icons/" + iconName)

        return [item.id, {
            ...item,
            icon
        }];
    })
);

export function getItemInfo(itemId: string): ItemInfo {
    const entry = indexByItemId.get(itemId);
    if (!entry) {
        throw new Error(`Missing item-info for '${itemId}'.`);
    }
    return entry;
}

export {GameDataExport};
