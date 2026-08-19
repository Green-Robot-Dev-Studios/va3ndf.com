import rss from '@astrojs/rss';
import { getAllEntries, cleanDescription } from '../lib/content';
import { SITE_TITLE, SITE_AUTHOR, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const entries = await getAllEntries();
	return rss({
		title: `${SITE_TITLE} — ${SITE_AUTHOR}`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: entries.map((entry) => ({
			title: entry.data.title,
			description: cleanDescription(entry),
			pubDate: entry.data.date,
			categories: entry.data.tags,
			link: entry.href,
		})),
		customData: '<language>en-ca</language>',
	});
}
