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
                    </ul>
                </div>
            </header>

            <section className="post-list__wrapper">
                <h2 className="post-list__heading">Recent Posts</h2>

                <PostList posts={allPostsData.slice(0,5)} />
            </section>

            <a className="all-posts-link" href="/posts">
                View All Posts
            </a>
        </>
    );
}
