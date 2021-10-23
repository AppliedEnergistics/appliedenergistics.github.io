import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { getItemInfo } from "../data/game-data";
import Link from "next/link";
import { itemIdToPageIndex } from "../data/site-data";
import css from "./ItemLink.module.scss";
import ItemTooltip, { TooltipMode } from "./ItemTooltip";

export interface ItemLinkProps {
  id: string;
  children: ReactNode | undefined;
  tooltip?: TooltipMode;
}

function ItemLink({ id, children, tooltip }: ItemLinkProps) {
  let { asPath } = useRouter();

  // Markdown Formatting can insert whitespace into MDX attributes
  id = id.replaceAll(/\s+/g, "");

  let pageUrl: string | undefined;
  if (!id.includes(":")) {
    id = "appliedenergistics2:" + id;
  }
  if (id.startsWith("appliedenergistics2:")) {
    pageUrl = itemIdToPageIndex[id];

    if (!pageUrl) {
      throw new Error("No page found for " + id);
    }
  }

  const itemInfo = getItemInfo(id);

  if (!children) {
    children = itemInfo.displayName;
  }

  if (!asPath.endsWith("/")) {
    asPath += "/";
  }

  let content;
  // Do not render a link if we're already on that page, or there is no link
  if (!pageUrl || asPath === pageUrl) {
    content = <span className={css.itemTooltip}>{children}</span>;
  } else {
    content = (
      <Link href={pageUrl} passHref>
        <a>{children}</a>
      </Link>
    );
  }
  return (
    <ItemTooltip item={itemInfo} mode={tooltip}>
      {content}
    </ItemTooltip>
  );
}

export default ItemLink;
