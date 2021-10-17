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
}

function ItemLink({id, children}: ItemLinkProps) {
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

    // Do not render a link if we're already on that page, or there is no link
    if (!pageUrl || asPath === pageUrl) {
        return <ItemTooltip item={itemInfo}>
            <span className={css.itemTooltip}>{children}</span>
        </ItemTooltip>
    } else {
        return (
            <ItemTooltip item={itemInfo}>
                <Link href={pageUrl} passHref><a>{children}</a></Link>
            </ItemTooltip>
        );
    }
}

export default ItemLink;
