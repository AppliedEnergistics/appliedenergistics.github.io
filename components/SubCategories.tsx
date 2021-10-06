import React from 'react';
import {findCategory} from "../data/site-data";
import css from './SubCategories.module.scss';
import CategoryIndex from "./CategoryIndex";

export interface SubCategoriesProps {
    category: string;
}

function SubCategories({category: id}: SubCategoriesProps) {
    const category = findCategory(id);

    return (
        <div className={css.subCategories}>
            {category.categories.map(subCategory => (<div>
                <CategoryIndex key={subCategory.title} category={subCategory.fullPath}/>
            </div>))}
        </div>
    );
}

export default SubCategories;
