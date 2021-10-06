import React from 'react';
import {getItemInfo, SmeltingRecipe as SmeltingRecipeType} from "../../data/game-data";
import css from './recipe.module.scss';
import RecipeIngredient from "./RecipeIngredient";
import smelt from './smelt.png';

export interface SmeltingRecipeProps {
    recipe: SmeltingRecipeType;
}

function SmeltingRecipe({recipe}: SmeltingRecipeProps) {
    const resultItem = getItemInfo(recipe.resultItem);

    return (
        <div className={css.recipeBoxLayout}>
            <strong>Smelting - {resultItem.displayName}</strong>
            <div className={css.smeltingInputBox}>
                <RecipeIngredient itemIds={recipe.ingredient}/>
                <div className={css.ingredientBox}>
                    <img className="item-icon" src={smelt.src}/>
                </div>
            </div>
            <svg width="85" height="50" className={css.recipeArrow}>
                <path d="M 0 20 H 60 V 0 L 85 25 L 60 50 L 60 30 L 0 30 Z" fill="#8b8b8b"/>
            </svg>
            <RecipeIngredient itemIds={[recipe.resultItem]}/>
        </div>
    );
}

export default SmeltingRecipe;
