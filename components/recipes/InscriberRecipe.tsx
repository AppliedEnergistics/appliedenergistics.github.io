import React from 'react';
import {getItemInfo, InscriberRecipe as InscriberRecipeType} from "../../data/game-data";
import css from './recipe.module.scss';
import RecipeIngredient from "./RecipeIngredient";
import RecipeArrow from "./RecipeArrow";

export interface InscriberRecipeProps {
    recipe: InscriberRecipeType;
}

function InscriberRecipe({recipe}: InscriberRecipeProps) {
    const resultItem = getItemInfo(recipe.resultItem);

    return (
        <div className={css.recipeBoxLayout}>
            <strong>{resultItem.displayName}</strong>
            <RecipeArrow/>
            <RecipeIngredient itemIds={[recipe.resultItem]}/>
        </div>
    );
}

export default InscriberRecipe;
