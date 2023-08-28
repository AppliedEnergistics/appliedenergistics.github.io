import React from "react";
import Link from "next/link";
import Icon from "@mdi/react";
import {
  mdiBookOpenPageVariant,
  mdiDiscord,
  mdiDownload,
  mdiHome,
} from "@mdi/js";
import { usePathname } from "next/navigation";

export type ButtonBarProps = {};

function ButtonBar() {
  const pathname = usePathname();

  return (
    <div
      className="is-flex is-justify-content-space-between is-flex-wrap-wrap block"
      style={{ gap: "10px" }}
    >
      {pathname !== "/" && (
        <Link href="/" className="button is-large is-flex-grow-1">
          <span className="icon">
            <Icon path={mdiHome} />
          </span>
          <span>Home</span>
        </Link>
      )}
      {pathname !== "/guides" && (
        <Link href="/guides" className="button is-large is-flex-grow-1">
          <span className="icon">
            <Icon path={mdiBookOpenPageVariant} />
          </span>
          <span>Guide</span>
        </Link>
      )}
      {pathname !== "/download" && (
        <Link href="/download" className="button is-large is-flex-grow-1">
          <span className="icon">
            <Icon path={mdiDownload} />
          </span>
          <span>Download</span>
        </Link>
      )}
      <a
        href="https://discord.gg/Zd6t9ka7ne"
        target="_blank"
        rel="noreferrer"
        className="button is-large is-flex-grow-1"
      >
        <span className="icon">
          <Icon path={mdiDiscord} />
        </span>
        <span>Join our Discord</span>
      </a>
    </div>
  );
}

export default ButtonBar;
