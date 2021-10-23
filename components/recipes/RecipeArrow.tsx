import React from "react";
import css from "./recipe.module.scss";

function RecipeArrow() {
  return (
    <svg className={css.recipeArrow} viewBox="0 0 85 50">
      <path
        d="M 0 20 H 60 V 0 L 85 25 L 60 50 L 60 30 L 0 30 Z"
        fill="#8b8b8b"
      />
    </svg>
  );
}

export default RecipeArrow;
