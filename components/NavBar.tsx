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
                        <a className="navbar-item">Home</a>
                    </Link>

                    <Link passHref href="/frequently-asked-questions/">
                        <a className="navbar-item">FAQ</a>
                    </Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider"/>
                            <a className="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default NavBar;