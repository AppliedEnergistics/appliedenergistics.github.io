import React, { useEffect, useState } from "react";
import css from "./recipe.module.scss";
import ItemIcon from "../ItemIcon";

export interface RecipeIngredientProps {
  itemIds: string[];
}

function CyclingIngredient({ itemIds }: RecipeIngredientProps) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((idx) => ++idx % itemIds.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [itemIds]);

  return <ItemIcon itemId={itemIds[visibleIndex]} />;
}

function RecipeIngredient({ itemIds }: RecipeIngredientProps) {
  return (
    <div className={css.ingredientBox}>
      {itemIds.length > 1 ? (
        <CyclingIngredient itemIds={itemIds} />
      ) : (
        <ItemIcon itemId={itemIds[0]} />
      )}
    </div>
  );
}

export default RecipeIngredient;
