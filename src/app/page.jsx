import { Link } from "next-view-transitions";
import PostList from "../lib/post-list";
import { getSortedPostsData } from "../lib/posts";

export default function Home() {
    const allPostsData = getSortedPostsData();

    return (
        <>
            <header className="hero">
                <div className="hero-content">
                    <div className="intro">
                        <h1>Hey I'm Nick</h1>
                        <p>
                            I'm a young programmer, ham radio operator, networks enthusiast, and crafter. Feel free to snoop around or check out some of my socials!
                        </p>
                    </div>

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
                    </ul>
                </div>
            </header>

            <section className="post-list__wrapper">
                {/* <Link href=""> */}
                    <h2 className="post-list__heading">All Posts</h2>
                {/* </Link>
                <Link href="posts">
                    <h2 className="post-list__heading">Tech</h2>
                </Link>
                <Link href="crafts">
                    <h2 className="post-list__heading">Crafts</h2>
                </Link> */}

                <PostList posts={allPostsData} />
            </section>
{/* 
            <Link className="all-posts-link" href="/posts">
                View All Posts
            </Link> */}
        </>
    );
}
