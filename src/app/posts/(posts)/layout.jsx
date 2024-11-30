import { getPathname } from "@nimpl/getters/get-pathname";
import { getSortedPostsData } from "@lib/posts";

export default function App({ children }) {
    const allPostsData = getSortedPostsData();
    const pathname = getPathname();
    const post = allPostsData.filter((p) => p.id == pathname.slice(pathname.length - p.id.length))[0];
    const postIdx = allPostsData.indexOf(post);
    let prev, next;
    if (postIdx > 0) prev = allPostsData[postIdx - 1];
    if (postIdx < allPostsData.length - 1) next = allPostsData[postIdx + 1];

    return (
        <>
            <article className="post">
                <header className="post__header">
                    <h1>{post.title}</h1>
                    <div className="post__details">
                        <time dateTime={post.date}>{post.date}</time>
                        <span> | </span>
                        <span>{post.readingTime}</span>
                    </div>
                </header>

                <main className="post__content">{children}</main>

                <aside className="post__aside">
                    <div className="post__tags">
                        {post.tags && post.tags.map((tag) => (
                            <a key={tag} href={`/tags/${tag}`}>{tag}</a>
                        ))}
                    </div>

                    <nav className="post__pagination">
                        {next && (
                            <a href={`/posts/${next.id}`}>
                                <span>←</span>
                                <span>{next.title}</span>
                            </a>
                        )}

                        {prev && (
                            <a href={`/posts/${prev.id}`}>
                                <span>{prev.title}</span>
                                <span>→</span>
                            </a>
                        )}
                    </nav>
                </aside>
            </article>
        </>
    );
}
