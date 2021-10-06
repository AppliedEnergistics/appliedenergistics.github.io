import React from 'react';
import {getItemInfo} from "../data/game-data";
import Tooltip from "./Tooltip";
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
        return <Tooltip lines={itemInfo.tooltipLines}>
            <ItemLink id={itemId}>
                {icon}
            </ItemLink>
        </Tooltip>;
    } else {
        return <Tooltip lines={itemInfo.tooltipLines}>
            {icon}
        </Tooltip>;
    }
}

export default ItemIcon;
