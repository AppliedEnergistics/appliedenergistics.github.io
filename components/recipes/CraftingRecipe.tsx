import React from 'react';
import {CraftingRecipe as CraftingRecipeType, getItemInfo} from "../../data/game-data";
import RecipeIngredientGrid from "./RecipeIngredientGrid";
import css from './recipe.module.css';
import RecipeIngredient from "./RecipeIngredient";

export interface CraftingRecipeProps {
    recipe: CraftingRecipeType;
}

function CraftingRecipe({recipe}: CraftingRecipeProps) {
    const resultItem = getItemInfo(recipe.resultItem);

    return (
        <div className={css.recipeBox}>
            <strong>{resultItem.displayName} {recipe.shapeless ? " (Shapeless)" : null}</strong>
            <RecipeIngredientGrid ingredients={recipe.ingredients} shapeless={recipe.shapeless}/>
            <svg width="85" height="50" className={css.recipeArrow}>
                <path d="M 0 20 H 60 V 0 L 85 25 L 60 50 L 60 30 L 0 30 Z" fill="#8b8b8b"/>
            </svg>
            <RecipeIngredient itemIds={[recipe.resultItem]}/>
        </div>
    );
}

export default CraftingRecipe;

