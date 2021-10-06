import React from 'react';
import css from './recipe.module.css';
import RecipeIngredient from "./RecipeIngredient";

export interface RecipeIngredientsProps {
    ingredients: string[][];
    shapeless: boolean;
}

function RecipeIngredientGrid({ingredients, shapeless}: RecipeIngredientsProps) {
    // Shapeless recipes do not show empty cells
    if (shapeless) {
        ingredients = ingredients.filter(i => i.length);
    }

    return (
        <div className={css.ingredientsBox}>{ingredients.map((ingredient, slot) => {
            if (ingredient.length > 0) {
                return <RecipeIngredient key={slot} itemIds={ingredient}/>;
            } else {
                return <div key={slot} className={css.emptyIngredientBox}/>;
            }
        })}</div>
    );
}

export default RecipeIngredientGrid;

