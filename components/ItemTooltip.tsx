import React, {PropsWithChildren} from 'react';
import {ItemInfo} from "../data/game-data";
import ItemIcon from "./ItemIcon";
import Tippy from "@tippyjs/react";
import 'tippy.js/themes/light.css';
import css from "./ItemTooltip.module.scss";

export interface ItemTooltipProps {
    item: ItemInfo;
}

function ItemTooltipContent({item}: ItemTooltipProps) {
    return (
        <div className={css.itemTooltip}>
            <ItemIcon itemId={item.id} nolink/>
        </div>
    );
}

function ItemTooltip({item, children}: PropsWithChildren<ItemTooltipProps>) {
    return <Tippy content={<ItemTooltipContent item={item}/>} theme="light">
        <span>{children}</span>
    </Tippy>;
}

export default ItemTooltip;
