import React from "react";
import Link from "next/link";
import { findCategory } from "../data/site-data";
import { PageNode } from "../data/page-index";
import ItemIcon from "./ItemIcon";
import ItemGrid from "./ItemGrid";

export interface CategoryIndexProps {
  category: string;
}

function PageTile({ page: { title, itemIds, url } }: { page: PageNode }) {
  if (itemIds.length) {
    return (
      (<Link href={url} passHref>

        <ItemIcon itemId={itemIds[0]} nolink />

      </Link>)
    );
  } else {
    return <Link href={url} legacyBehavior>{title}</Link>;
  }
}

function CategoryIndex({ category }: CategoryIndexProps) {
  const { title, pages } = findCategory(category);

  return (
    <>
      <div>
        <div className="title is-4">{title}</div>
      </div>
      <ItemGrid>
        {pages.map((page) => (
          <PageTile key={page.url} page={page} />
        ))}
      </ItemGrid>
    </>
  );
}

export default CategoryIndex;
