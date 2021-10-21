import React from 'react';
import {getItemInfo} from "../data/game-data";
import ItemLink from "./ItemLink";

export interface ItemIconProps {
    itemId: string;
    nolink?: boolean;
}

function ItemIcon({itemId, nolink}: ItemIconProps) {
    const itemInfo = getItemInfo(itemId);

    // eslint-disable-next-line @next/next/no-img-element
    const icon = <img src={itemInfo.icon}
                      alt={itemInfo.displayName}
                      title={itemInfo.displayName}
                      className="item-icon"/>;

    if (!nolink) {
        return <ItemLink id={itemId} notooltip>
            {icon}
        </ItemLink>;
    } else {
        return icon;
    }
}

export default ItemIcon;
