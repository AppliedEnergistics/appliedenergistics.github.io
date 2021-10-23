import GameDataExport from "./game-data.json";

export interface Recipe {
  id: string;
  resultItem: string;
  resultCount: number;
}

export interface CraftingRecipe extends Recipe {
  shapeless: boolean;
  ingredients: string[][];
  width: number;
  height: number;
}

export interface SmeltingRecipe extends Recipe {
  ingredient: string[];
}

export interface InscriberRecipe extends Recipe {
  top: string[];
  middle: string[];
  bottom: string[];
  consumesTopAndBottom: boolean;
}

const validRarity = ["common", "uncommon", "rare", "epic"];
export type Rarity = "common" | "uncommon" | "rare" | "epic";

export interface ItemInfo {
  id: string;
  displayName: string;
  rarity: Rarity;
  icon: string;
}

export const craftingRecipes: Record<string, CraftingRecipe> =
  GameDataExport.craftingRecipes;
export const smeltingRecipes: Record<string, SmeltingRecipe> =
  GameDataExport.smeltingRecipes;
export const inscriberRecipes: Record<string, InscriberRecipe> =
  GameDataExport.inscriberRecipes;

const indexByItemId = new Map<string, ItemInfo>(
  Object.values(GameDataExport.items).map((item) => {
    const icon = item.icon
      .replaceAll("\\", "/")
      .replaceAll(/^icons\//g, "/icons/");
    if (!validRarity.includes(item.rarity)) {
      throw new Error(`Invalid rarity: ${item.rarity}`);
    }
    const info: ItemInfo = {
      ...item,
      rarity: item.rarity as Rarity,
      icon,
    };
    return [item.id, info];
  })
);

export function getItemInfo(itemId: string): ItemInfo {
  if (!itemId.includes(":")) {
    itemId = "appliedenergistics2:" + itemId;
  }

  const entry = indexByItemId.get(itemId);
  if (!entry) {
    throw new Error(`Missing item-info for '${itemId}'.`);
  }
  return entry;
}

export { GameDataExport };
