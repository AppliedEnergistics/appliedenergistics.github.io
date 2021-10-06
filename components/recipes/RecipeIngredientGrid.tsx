import React from 'react';
import css from './recipe.module.scss';
import RecipeIngredient from "./RecipeIngredient";

export interface RecipeIngredientsProps {
    ingredients: string[][];
    shapeless: boolean;
}

function RecipeIngredientGrid({ingredients, shapeless}: RecipeIngredientsProps) {
    // Shapeless recipes do not show empty cells
    let className = css.ingredientsBox;
    if (shapeless) {
        ingredients = ingredients.filter(i => i.length);

        if (ingredients.length <= 1) {
            className = css.ingredientsBoxShapeless1Col;
        } else if (ingredients.length <= 2) {
            className = css.ingredientsBoxShapeless2Col;
        } else {
            className = css.ingredientsBoxShapeless3Col;
        }
    }

    return (
        <div className={className}>{ingredients.map((ingredient, slot) => {
            if (ingredient.length > 0) {
                return <RecipeIngredient key={slot} itemIds={ingredient}/>;
            } else {
                return <div key={slot} className={css.emptyIngredientBox}/>;
            }
        })}</div>
    );
}

export default RecipeIngredientGrid;

