import { Link } from "next-view-transitions";

export default function PostList({ posts }) {
    return <>
        <ul className="post-list">
            {posts.map(({ id, date, title, excerpt, readingTime, tags }) => (
                         
                <li key={id} className="post-list__item">
                <div>
                    <div className="post-list__meta">
                    <time dateTime={date}>
                        {date}
                    </time>
                    <span> | </span>
                    <span>{readingTime}</span>
                    </div>

                    <div className="post-list__tags">
                        {tags && tags.map(tag => <Link key={tag} href={`/tags/${tag}`}>{tag}</Link>)}
                    </div>
                </div>

                <h3 className="post-list__title">
                    <Link href={`/posts/${id}`}>{title}</Link>
                </h3>

                <p className="post-list__excerpt">{excerpt}</p>

                <Link className="post-list__read-more" href={`/posts/${id}`}>read article</Link>
                </li>
            ))}
        </ul>
    </>
}