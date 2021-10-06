import React, {ReactNode} from 'react';
import {useRouter} from "next/router";
import {getItemInfo} from "../data/game-data";
import Link from 'next/link'
import {itemIdToPageIndex} from "../data/site-data";

export interface ItemLinkProps {
    id: string;
    children: ReactNode | undefined;
}

function ItemLink({id, children}: ItemLinkProps) {
    const {pathname} = useRouter();

    let pageUrl: string | undefined;
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

    // Do not render a link if we're already on that page, or there is no link
    if (!pageUrl || pathname === pageUrl) {
        return <span>{children}</span>;
    } else {
        return (
            <Link href={pageUrl} passHref><a>{children}</a></Link>
        );
    }
}

export default ItemLink;
