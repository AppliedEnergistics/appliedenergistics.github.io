import React, { useState } from "react";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiDiscord, mdiGithub } from "@mdi/js";
import { DocSearch } from "@docsearch/react";

export interface NavBarProps {
  pagePath?: string;
}

function NavBar({ pagePath }: NavBarProps) {
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" href="/">
            <img alt="" src="/assets/logo/logo_00.png" />
            Applied Energistics 2
          </Link>
        </div>

        <div className={"navbar-menu"}>
          <div className="navbar-start">
            <Link href="/guide" className="navbar-item">
              Documentation
            </Link>

            <Link href="/download" className="navbar-item">
              Download
            </Link>

            <a
              className="navbar-item"
              href="https://github.com/AppliedEnergistics/Applied-Energistics-2/issues/new/choose"
            >
              Report Issue
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a
                  href="https://discord.gg/Zd6t9ka7ne"
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                >
                  <span className="icon">
                    <Icon path={mdiDiscord} color="#5865F2" />
                  </span>
                  <span>Discord</span>
                </a>
                <a
                  href="https://github.com/AppliedEnergistics/Applied-Energistics-2"
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                >
                  <span className="icon">
                    <Icon path={mdiGithub} color="#181717" />
                  </span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
