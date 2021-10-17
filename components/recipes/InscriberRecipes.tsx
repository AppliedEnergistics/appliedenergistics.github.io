import React from 'react';
import {inscriberRecipes} from "../../data/game-data";
import InscriberRecipe from "./InscriberRecipe";
import css from './recipe.module.scss';

function InscriberRecipes() {
    return <div className={css.recipeContainer}>
        {Object.values(inscriberRecipes).map((recipe) => (<InscriberRecipe key={recipe.id} recipe={recipe}/>))}
    </div>;
}

export default InscriberRecipes;
