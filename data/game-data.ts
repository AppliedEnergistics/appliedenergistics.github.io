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

export interface P2PTypeInfo {
  tunnelItemId: string;

  attunementItemIds: string[];
  attunementModIds: string[];
  attunementApiClasses: string[];
}

export const craftingRecipes: Record<string, CraftingRecipe> =
  GameDataExport.craftingRecipes;
export const smeltingRecipes: Record<string, SmeltingRecipe> =
  GameDataExport.smeltingRecipes;
export const inscriberRecipes: Record<string, InscriberRecipe> =
  GameDataExport.inscriberRecipes;

export const p2pTunnelTypes: P2PTypeInfo[] = GameDataExport.p2pTunnelTypes;

/**
 * Find all item ids of items that are just colored versions of something else.
 */
const coloredVersionItemIds = new Set<string>();
for (const [, variants] of Object.entries(GameDataExport.coloredVersions)) {
  for (const coloredItemId of Object.values(variants)) {
    coloredVersionItemIds.add(coloredItemId);
  }
}

/**
 * Test if an item id is a colored version of something else.
 */
export function isColoredVariant(itemId: string) {
  return coloredVersionItemIds.has(itemId);
}

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
    itemId = "ae2:" + itemId;
  }

  const entry = indexByItemId.get(itemId);
  if (!entry) {
    throw new Error(`Missing item-info for '${itemId}'.`);
  }
  return entry;
}

export { GameDataExport };
