import React from 'react';
import {CategoryNode} from "../data/page-index";
import Link from 'next/link';
import {pageTree} from "../data/site-data";

function NestedMenu({category}: { category: CategoryNode }) {
    return <>
        <a>{category.title}</a>
        <ul>
            {category.categories.map((subCategory => <li key={subCategory.title}><NestedMenu key={subCategory.title}
                                                                                                category={subCategory}/>
            </li>))}
            {category.pages.map((page => <li key={page.url}><Link href={page.url}>{page.title}</Link></li>))}
        </ul>
    </>;
}

function FeaturesSideNav() {
    return (
        <aside className="menu">
            {
                pageTree.rootCategories.map(category => (<React.Fragment key={category.title}>
                    <p className="menu-label">
                        {category.title}
                    </p>
                    <ul className="menu-list">
                        {category.categories.map(subCategory => (<li key={category.title}>
                            <NestedMenu category={subCategory}/>
                        </li>))}
                        {category.pages.map((page => <li key={page.url}><Link href={page.url}>{page.title}</Link>
                        </li>))}
                    </ul>
                </React.Fragment>))
            }
        </aside>
    );
}

export default FeaturesSideNav;
