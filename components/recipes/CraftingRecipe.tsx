import React from "react";
import {
  CraftingRecipe as CraftingRecipeType,
  getItemInfo,
} from "../../data/game-data";
import RecipeIngredientGrid from "./RecipeIngredientGrid";
import css from "./recipe.module.scss";
import RecipeIngredient from "./RecipeIngredient";
import RecipeArrow from "./RecipeArrow";

export interface CraftingRecipeProps {
  recipe: CraftingRecipeType;
}

function CraftingRecipe({ recipe }: CraftingRecipeProps) {
  const resultItem = getItemInfo(recipe.resultItem);

  return (
    <div>
      <div className={css.recipeBoxLayout}>
        <strong>
          {resultItem.displayName} {recipe.shapeless ? " (Shapeless)" : null}
        </strong>
        <RecipeIngredientGrid {...recipe} />
        <RecipeArrow />
        <RecipeIngredient itemIds={[recipe.resultItem]} />
      </div>
    </div>
  );
}

export default CraftingRecipe;
