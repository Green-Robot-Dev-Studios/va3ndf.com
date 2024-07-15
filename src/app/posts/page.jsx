import PostList from "../../lib/post-list";
import { getSortedPostsData } from "../../lib/posts";

export default function List() {
    const allPostsData = getSortedPostsData();

    return <PostList posts={allPostsData} />
}