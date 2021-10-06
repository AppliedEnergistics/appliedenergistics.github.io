import React, {PropsWithChildren} from 'react';
import MinecraftText from "./mctext/MinecraftText";

export interface TooltipProps {
    lines: string[];
}

function Tooltip({children, lines}: PropsWithChildren<TooltipProps>) {
    return (
        <>
            {children}
            {/*<MinecraftText lines={lines}/>*/}
        </>
    );
}

export default Tooltip;
