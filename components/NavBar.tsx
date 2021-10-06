import React from 'react';
import logo from './controller.png';
import Image from 'next/image';
import Link from 'next/link';
import loadImage from "./loadImage";

function NavBar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://appliedenergistics.github.io">
                    <Image src={logo} alt="AE2 Logo" loader={loadImage} unoptimized/>
                    Applied Energistics 2
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link passHref href="/">
                        <a className="navbar-item">About</a>
                    </Link>

                    <Link passHref href="/getting-started/">
                        <a className="navbar-item">Getting Started</a>
                    </Link>

                    <Link passHref href="/frequently-asked-questions/">
                        <a className="navbar-item">FAQ</a>
                    </Link>

                    <a className="navbar-item" href="https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2/files">Downloads</a>
                </div>

            </div>
        </nav>
    );
}

export default NavBar;