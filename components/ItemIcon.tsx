import React from 'react';
import {getItemInfo} from "../data/game-data";
import Tooltip from "./Tooltip";
import ItemLink from "./ItemLink";
import Image from "next/image";
import loadImage from "./loadImage";

export interface ItemIconProps {
    itemId: string;
}

function ItemIcon({itemId}: ItemIconProps) {
    const itemInfo = getItemInfo(itemId);

    return <Tooltip lines={itemInfo.tooltipLines}>
        <ItemLink id={itemId}>
            <Image src={itemInfo.icon} loader={loadImage} alt={itemInfo.displayName} title={itemInfo.displayName}
                   className="item-icon" unoptimized/>
        </ItemLink>
    </Tooltip>;
}

export default ItemIcon;
