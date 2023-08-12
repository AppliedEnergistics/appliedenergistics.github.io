import React from "react";
import {
  getItemInfo,
  SmeltingRecipe as SmeltingRecipeType,
} from "../../data/game-data";
import css from "./recipe.module.scss";
import RecipeIngredient from "./RecipeIngredient";
import smelt from "./smelt.png";
import RecipeArrow from "./RecipeArrow";

export interface SmeltingRecipeProps {
  recipe: SmeltingRecipeType;
}

function SmeltingRecipe({ recipe }: SmeltingRecipeProps) {
  const resultItem = getItemInfo(recipe.resultItem);

  return (
    <div className={css.recipeBoxLayout}>
      <strong>Smelting - {resultItem.displayName}</strong>
      <div className={css.smeltingInputBox}>
        <RecipeIngredient itemIds={recipe.ingredient} />
        <div className={css.ingredientBox}>
          <img className="item-icon" src={smelt.src} alt="" />
        </div>
      </div>
      <RecipeArrow />
      <RecipeIngredient itemIds={[recipe.resultItem]} />
    </div>
  );
}

export default SmeltingRecipe;
