// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

/**
 * Post bodies were written with their own `# Heading`, but the layout already
 * renders the title as the page h1. Demote body h1s so each page has exactly
 * one h1 and the outline stays valid.
 */
function rehypeDemoteH1() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'h1') node.tagName = 'h2';
		});
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://va3ndf.com',
	integrations: [
		mdx(),
		// Legacy `/<collection>/<slug>/page/` URLs are redirect stubs; keep them out.
		sitemap({ filter: (page) => !/\/page\/$/.test(page) }),
	],
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	build: {
		assets: 'assets',
		inlineStylesheets: 'always',
	},
	markdown: {
		rehypePlugins: [rehypeDemoteH1],
		shikiConfig: {
			themes: {
				light: 'vitesse-light',
				dark: 'vitesse-dark',
			},
			defaultColor: 'light',
			wrap: false,
		},
	},
});
