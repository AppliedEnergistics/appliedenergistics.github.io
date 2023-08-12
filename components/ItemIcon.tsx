import React from "react";
import { getItemInfo } from "../data/game-data";
import ItemLink from "./ItemLink";

export interface ItemIconProps {
  itemId: string;
  nolink?: boolean;
}

function ItemIcon({ itemId, nolink }: ItemIconProps) {
  const itemInfo = getItemInfo(itemId);

  const icon = (
    <img src={itemInfo.icon} alt={itemInfo.displayName} className="item-icon" />
  );

  if (!nolink) {
    return (
      <ItemLink id={itemId} tooltip="text">
        {icon}
      </ItemLink>
    );
  } else {
    return icon;
  }
}

export default ItemIcon;
