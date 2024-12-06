import "../css/about.css";
import "../css/footer.css";
import "../css/global.css";
import "../css/header.css";
import "../css/hero.css";
import "../css/main.css";
import "../css/not-found.css";
import "../css/post-list.css";
import "../css/post.css";
import "../css/prism-theme.css";
import "../css/typography.css";
import "../css/variable.css";

import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.min.css";

import { Link, ViewTransitions } from "next-view-transitions";

import { IBM_Plex_Sans } from "next/font/google";
const plex = IBM_Plex_Sans({ subsets: ["latin-ext"], weight: ["400"] });

export default function Layout({ children }) {
    return (
        <ViewTransitions>
            <html lang='en'>
                <head>
                    <title>Nick's Blog</title>
                    <link rel="icon" href="/favicon.ico" />
                </head>
                <body>
                    <div className={plex.className}>
                        <div className="layout-wrapper">
                            <header className="header">
                                <div className="header__content">
                                    <h1 className="site-title">
                                        <Link href={"/"}>Nick's Blog</Link>
                                    </h1>

                                    <nav className="nav">
                                        <ul className="nav__list">
                                            {/* <li className="nav-item">
                                                <Link href="/school">School</Link>
                                            </li> */}
                                            <li className="nav-item">
                                                <Link href="/">Posts</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/crafts">Crafts</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/about">About</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </header>

                            <main className="main">
                                {children}
                            </main>

                            <footer className="footer">
                                <div className="footer__content">
                                    <ul className="hero__social-links">
                                        <li>
                                            <Link
                                                href="https://nicholasficara.dev/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Personal Site
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="https://github.com/Green-Robot-Dev-Studios"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                GitHub
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="https://www.qrz.com/db/VA3NDF"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                QRZ
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="https://www.linkedin.com/in/nicholasficara/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                LinkedIn
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/feed.xml"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                RSS
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </footer>
                        </div>
                    </div>
                </body>
            </html>
        </ViewTransitions>
    );
}
