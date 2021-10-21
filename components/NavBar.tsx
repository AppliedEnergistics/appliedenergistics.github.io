import React from 'react';
import Link from 'next/link';

function NavBar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://appliedenergistics.github.io">
                    <img alt="" src="/assets/logo/logo_00.png" />
                    Applied Energistics 2
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link passHref href="/">
                        <a className="navbar-item">Docs</a>
                    </Link>

                    <a className="navbar-item" href="https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2/files">Downloads</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;