import React from 'react';
import Link from 'next/link';
import {allPages} from "../data/site-data";

export interface CategoryIndexProps {
    category: string;
}

function CategoryIndex({category}: CategoryIndexProps) {
    const entries = allPages.filter(p => p.categories.includes(category));

    return <ul>
        {entries.map(({title, itemIds, url}) => (<li key={url}><Link href={url}>{title}</Link></li>))}
    </ul>;
}

export default CategoryIndex;
