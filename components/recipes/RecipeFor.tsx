import React from 'react';
import {craftingRecipes, inscriberRecipes, smeltingRecipes} from "../../data/game-data";
import CraftingRecipe from "./CraftingRecipe";
import InscriberRecipe from "./InscriberRecipe";
import SmeltingRecipe from "./SmeltingRecipe";

export interface RecipeForProps {
    /**
     * Item ID
     */
    id: string;
}

function RecipeFor({id}: RecipeForProps) {
    const crafting = Object.values(craftingRecipes).filter(recipe => recipe.resultItem === id);
    const smelting = Object.values(smeltingRecipes).filter(recipe => recipe.resultItem === id);
    const inscriber = Object.values(inscriberRecipes).filter(recipe => recipe.resultItem === id);

    if (crafting.length === 0 && smelting.length === 0 && inscriber.length === 0) {
        throw new Error("No recipes for " + id);
    }

    return <>
        {crafting.map((recipe, index) => (<CraftingRecipe key={index} recipe={recipe}/>))}
        {inscriber.map((recipe, index) => (<InscriberRecipe key={index} recipe={recipe}/>))}
        {smelting.map((recipe, index) => (<SmeltingRecipe key={index} recipe={recipe}/>))}
    </>;
}

export default RecipeFor;
