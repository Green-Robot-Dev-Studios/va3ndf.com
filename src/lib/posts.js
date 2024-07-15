import fs, { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/app/posts/(posts)/");
const readingTime = (post) => Math.ceil(post.split(" ").length / 238.0) + " min read";

export function getSortedPostsData() {
    const fileNames = readdirSync(postsDirectory, { withFileTypes: true }).filter(d => d.isDirectory());
    const allPostsData = fileNames
        .map(dir => readdirSync(path.join(dir.parentPath, dir.name))
                    .map(name => `${dir.name}/${name}`)
                    .filter(name => name.endsWith(".mdx") || name.endsWith(".md"))[0])
        .map((fileName) => {
            const id = fileName.replace(/\.mdx?$/, "").split("/").slice(0,1).join("/");
            const fullPath = path.join(postsDirectory, fileName);

            const fileContents = fs.readFileSync(fullPath, "utf8");
            const matterResult = matter(fileContents, { excerpt:(f)=>f.excerpt = f.content.split(" ").slice(0, 50).join(" ").replaceAll("#", "").replaceAll("*", "") + "..."});

            return {
                id,
                ...matterResult.data,
                excerpt: matterResult.excerpt,
                content: matterResult.content,
                readingTime: readingTime(matterResult.content)
            };
        });

    return allPostsData
        .sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        })
        .map((el) => {
            el.date = el.date.toLocaleDateString();
            return el;
        });
}
