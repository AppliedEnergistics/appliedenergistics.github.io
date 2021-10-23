import React, {PropsWithChildren} from 'react';
import {ItemInfo} from "../data/game-data";
import ItemIcon from "./ItemIcon";
import Tippy from "@tippyjs/react";
import css from "./ItemTooltip.module.scss";
import 'tippy.js/dist/svg-arrow.css';
import {roundArrow} from "tippy.js";

export type TooltipMode = "text" | "icon";

export interface ItemTooltipProps {
    item: ItemInfo;
    mode?: TooltipMode;
}

/**
 * Displays the name of an item, properly styled to be readable in a tooltip.
 */
function ItemName({item}: { item: ItemInfo }) {
    let rarity: string;
    switch (item.rarity) {
        case "uncommon":
            rarity = css.uncommonRarity;
            break;
        case "rare":
            rarity = css.rareRarity;
            break;
        case "epic":
            rarity = css.epicRarity;
            break;
        default:
        case "common":
            rarity = css.commonRarity;
            break;
    }

    return <span className={`${css.itemName} ${rarity}`}>{item.displayName}</span>;
}

/**
 * Displays the content of an item tooltip.
 */
function ItemTooltipContent({item, mode}: ItemTooltipProps) {
    mode ??= "icon";

    return (
        <div className={css.itemTooltip}>
            {mode === "icon" ? <ItemIcon itemId={item.id} nolink/> : null}
            {mode === "text" ? <ItemName item={item}/> : null}
        </div>
    );
}

/**
 * Wraps other elements such that they display an item tooltip on mouseover.
 */
function ItemTooltip({children, ...rest}: PropsWithChildren<ItemTooltipProps>) {
    return <Tippy content={<ItemTooltipContent {...rest}/>} className={css.itemTooltip} arrow={roundArrow}>
        <span>{children}</span>
    </Tippy>;
}

export default ItemTooltip;
