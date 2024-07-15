import PostList from "../../../lib/post-list";
import { getSortedPostsData } from "../../../lib/posts";

export default function Tag({ params }) {
    const allPostsData = getSortedPostsData();
    const { tag } = params;

    const tagged = allPostsData.filter(post => post.tags && post.tags.includes(tag));

    return <PostList posts={tagged}></PostList>;
}

export function generateStaticParams() {
    const allPostsData = getSortedPostsData();
    const tags = allPostsData.flatMap(post => post.tags)

    return tags.map(tag => ({tag}))
}
