import PostList from "../../lib/post-list";
import { getSortedPostsData } from "../../lib/posts";

export default function Crafts() {
    const allPostsData = getSortedPostsData("crafts");

    return <PostList posts={allPostsData} />
}