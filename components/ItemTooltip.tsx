import React, {PropsWithChildren} from 'react';
import {ItemInfo} from "../data/game-data";
import ItemIcon from "./ItemIcon";
import Tippy from "@tippyjs/react";
import css from "./ItemTooltip.module.scss";
import 'tippy.js/dist/svg-arrow.css';
import {roundArrow} from "tippy.js";

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
    return <Tippy content={<ItemTooltipContent item={item}/>} className={css.itemTooltip} arrow={roundArrow}>
        <span>{children}</span>
    </Tippy>;
}

export default ItemTooltip;
