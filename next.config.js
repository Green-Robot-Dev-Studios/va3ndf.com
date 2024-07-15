import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkFrontmatter, remarkMath],
        rehypePlugins: [rehypeKatex, rehypeHighlight],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "mdx", "md", "ts", "tsx"],
    output: "export",
    reactStrictMode: false,
};

export default withMDX(nextConfig);
