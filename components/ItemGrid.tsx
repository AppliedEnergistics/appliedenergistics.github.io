import React, {PropsWithChildren} from 'react';
import css from './ItemGrid.module.scss';

function ItemGrid({children}: PropsWithChildren<{}>) {
    return (
        <div className={css.itemGrid}>{children}</div>
    );
}

export default ItemGrid;
