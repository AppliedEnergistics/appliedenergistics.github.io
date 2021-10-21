import React, {ReactNode} from 'react';
import {useRouter} from "next/router";
import {getItemInfo} from "../data/game-data";
import Link from 'next/link'
import {itemIdToPageIndex} from "../data/site-data";
import css from "./ItemLink.module.scss";
import ItemTooltip from "./ItemTooltip";

export interface ItemLinkProps {
    id: string;
    children: ReactNode | undefined;
    notooltip?: boolean;
}

function ItemLink({id, children, notooltip}: ItemLinkProps) {
    let {asPath} = useRouter();

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
        content = <Link href={pageUrl} passHref><a>{children}</a></Link>;
    }

    if (notooltip) {
        return content;
    } else {
        return <ItemTooltip item={itemInfo}>
            {content}
        </ItemTooltip>;
    }
}

export default ItemLink;
