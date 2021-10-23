import React from "react";
import css from "./mctext.module.css";

export interface MinecraftTextProps {
  lines: string[];
}

function MinecraftText({ lines }: MinecraftTextProps) {
  return (
    <div className={css.root}>
      {lines.map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
    </div>
  );
}

export default MinecraftText;
