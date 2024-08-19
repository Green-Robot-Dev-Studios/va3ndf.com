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
                        {tags && tags.map(tag => <a key={tag} href={`/tags/${tag}`}>{tag}</a>)}
                    </div>
                </div>

                <h3 className="post-list__title">
                    <a href={`/posts/${id}`}>{title}</a>
                </h3>

                <p className="post-list__excerpt">{excerpt}</p>

                <a className="post-list__read-more" href={`/posts/${id}`}>read article</a>
                </li>
            ))}
        </ul>
    </>
}