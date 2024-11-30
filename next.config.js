import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeMdxImportMedia from 'rehype-mdx-import-media'
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkFrontmatter, remarkMath],
        rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeMdxImportMedia],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "mdx", "md", "ts", "tsx"],
    output: "export",
    reactStrictMode: false,
    images: {
        unoptimized: true
    }
};

export default withMDX(nextConfig);
