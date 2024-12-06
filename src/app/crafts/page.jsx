import Image from "next/image";
import PostList from "../../lib/post-list";
import { getMasonryData, getSortedPostsData } from "../../lib/posts";

export default function Crafts() {
    const allPostsData = getMasonryData("crafts");
    console.log(allPostsData)


    return <Image src={allPostsData[0].image} width={50} height={50}></Image>
}