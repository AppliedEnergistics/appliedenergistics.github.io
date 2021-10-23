import React, {useState} from 'react';
import Link from 'next/link';
import Icon from "@mdi/react";
import {mdiDiscord, mdiFileDocumentEdit, mdiGithub} from "@mdi/js";
import FeaturesSideNav from "./FeaturesSideNav";

export interface NavBarProps {
    pagePath?: string;
}

/**
 * Shows a link to edit the current page on GitHub
 */
function EditPageLink({pagePath}: { pagePath: string }) {
    let editBaseUrl = "https://github.com/AppliedEnergistics/appliedenergistics.github.io/edit/source/content";
    return <a href={editBaseUrl + pagePath} className="button" target="_blank" rel="noreferrer">
        <span className="icon">
            <Icon path={mdiFileDocumentEdit}/>
        </span>
        <span>Edit Page</span>
    </a>;
}

function NavBar({pagePath}: NavBarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuOpen(o => !o);
    };

    function closeMenuOnNavigation(e: React.MouseEvent) {
        console.log(e);
        // Close the menu when a link is clicked
        if (e.target instanceof HTMLAnchorElement) {
            setMenuOpen(false);
        }
    }

    return (
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://appliedenergistics.github.io">
                    <img alt="" src="/assets/logo/logo_00.png"/>
                    Applied Energistics 2
                </a>

                <a role="button" className={menuOpen ? "navbar-burger is-active" : "navbar-burger"} aria-label="menu"
                   aria-expanded={menuOpen} onClick={toggleMenu}>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>

            <div className={menuOpen ? "navbar-menu is-active" : "navbar-menu"}>
                <div className="navbar-start">
                    <Link passHref href="/">
                        <a className="navbar-item">Documentation</a>
                    </Link>

                    <Link passHref href="/download">
                        <a className="navbar-item">
                            Download
                        </a>
                    </Link>

                    <a className="navbar-item"
                       href="https://github.com/AppliedEnergistics/Applied-Energistics-2/issues/new/choose">Report
                        Issue</a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a href="https://discord.gg/nVUYTfZy" target="_blank"
                               rel="noreferrer" className="button">
                            <span className="icon">
                               <Icon path={mdiDiscord} color="#5865F2"/>
                            </span>
                                <span>Discord</span>
                            </a>
                            <a href="https://github.com/AppliedEnergistics/Applied-Energistics-2" target="_blank"
                               rel="noreferrer" className="button">
                            <span className="icon">
                               <Icon path={mdiGithub} color="#181717"/>
                            </span>
                                <span>GitHub</span>
                            </a>
                            {pagePath ? <EditPageLink pagePath={pagePath}/> : null}
                        </div>
                    </div>

                    <div className="navbar-item is-hidden-desktop" onClick={closeMenuOnNavigation}>
                        <FeaturesSideNav/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;