import React from 'react';
import css from './recipe.module.scss';
import RecipeIngredient from "./RecipeIngredient";

export interface RecipeIngredientsProps {
    ingredients: string[][];
    shapeless: boolean;
    width: number;
    height: number;
}

function RecipeIngredientGrid({ingredients, shapeless, width, height}: RecipeIngredientsProps) {
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
    } else {
        // Pad out the ingredient grid to 3x3 for shaped recipes
        const sparseIngredients: string[][] = [[],[],[],[],[],[],[],[],[]];
        for (let i = 0; i < ingredients.length; i++) {
            // Map index over to the sparse array
            const row = Math.floor(i / width);
            let col = Math.floor(i % width);
            // Shift recipes that only have 1 column to the middle
            if (width === 1) {
                col++;
            }
            sparseIngredients[row * 3 + col] = ingredients[i];
        }
        ingredients = sparseIngredients;
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

