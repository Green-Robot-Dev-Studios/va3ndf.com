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


import { IBM_Plex_Sans } from "next/font/google";
const plex = IBM_Plex_Sans({ subsets: ["latin-ext"], weight: ["400"] });

export default function Layout({ children }) {
    return (
        <html>
            {/* <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww" crossorigin="anonymous"/>
            </head> */}
            {/* <Head>
                <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww" crossorigin="anonymous"/>
            </head>
            </Head> */}
            <body>
                <div className={plex.className}>
                    <div className="layout-wrapper">
                        <header className="header">
                            <div className="header__content">
                                <h1 className="site-title">
                                    <a href={"/"}>Nick's Blog</a>
                                </h1>

                                <nav className="nav">
                                    <ul className="nav__list">
                                        {/* <li className="nav-item">
                                            <a href="/school">School</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/crafts">Crafts</a>
                                        </li> */}
                                        <li className="nav-item">
                                            <a href="/posts">Blog</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/about">About</a>
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
                                        <a
                                            href="https://nicholasficara.dev/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Personal Site
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="https://github.com/Green-Robot-Dev-Studios"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="https://www.qrz.com/db/VA3NDF"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            QRZ
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="https://www.linkedin.com/in/nicholasficara/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="/feed.xml"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            RSS
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                    </div>
                </div>
            </body>
        </html>
    );
}
