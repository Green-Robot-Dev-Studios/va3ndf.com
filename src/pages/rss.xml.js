import rss from '@astrojs/rss';
import { getImage } from 'astro:assets';
import { getAllEntries, summary } from '../lib/content';
import { SITE_TITLE, SITE_AUTHOR, SITE_DESCRIPTION } from '../consts';

const escapeHTML = (value) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

export async function GET(context) {
	const entries = await getAllEntries();

	const items = await Promise.all(
		entries.map(async (entry) => {
			const description = summary(entry);
			const link = new URL(entry.href, context.site).href;

			// Most builds are a photograph and nothing else, so the feed carries
			// the image alongside the excerpt rather than a bare headline.
			const parts = [];
			if (entry.data.heroImage) {
				const image = await getImage({
					src: entry.data.heroImage,
					width: 1200,
					height: 630,
					format: 'jpeg',
					quality: 82,
				});
				const src = new URL(image.src, context.site).href;
				parts.push(
					`<p><a href="${link}"><img src="${src}" alt="" width="1200" height="630" /></a></p>`,
				);
			}
			parts.push(`<p>${escapeHTML(description)}</p>`);
			parts.push(`<p><a href="${link}">Read this on va3ndf.com &rarr;</a></p>`);

			return {
				title: entry.data.title,
				description,
				content: parts.join(''),
				pubDate: entry.data.date,
				categories: entry.data.tags,
				link: entry.href,
			};
		}),
	);

	return rss({
		title: `${SITE_TITLE} — ${SITE_AUTHOR}`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
		customData: '<language>en-ca</language>',
	});
}
