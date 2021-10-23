import React from "react";
import {
  craftingRecipes,
  inscriberRecipes,
  smeltingRecipes,
} from "../../data/game-data";
import CraftingRecipe from "./CraftingRecipe";
import InscriberRecipe from "./InscriberRecipe";
import SmeltingRecipe from "./SmeltingRecipe";
import css from "./recipe.module.scss";

export interface RecipeForProps {
  /**
   * Item ID
   */
  id: string;
}

function RecipeFor({ id }: RecipeForProps) {
  const crafting = Object.values(craftingRecipes).filter(
    (recipe) => recipe.resultItem === id
  );
  const smelting = Object.values(smeltingRecipes).filter(
    (recipe) => recipe.resultItem === id
  );
  const inscriber = Object.values(inscriberRecipes).filter(
    (recipe) => recipe.resultItem === id
  );

  if (
    crafting.length === 0 &&
    smelting.length === 0 &&
    inscriber.length === 0
  ) {
    throw new Error("No recipes for " + id);
  }

  return (
    <div className={css.recipeContainer}>
      {crafting.map((recipe, index) => (
        <CraftingRecipe key={recipe.id} recipe={recipe} />
      ))}
      {inscriber.map((recipe, index) => (
        <InscriberRecipe key={recipe.id} recipe={recipe} />
      ))}
      {smelting.map((recipe, index) => (
        <SmeltingRecipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeFor;
