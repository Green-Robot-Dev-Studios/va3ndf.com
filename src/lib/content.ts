import { getCollection, type CollectionEntry } from 'astro:content';

export type Kind = 'blog' | 'builds';
export type Entry = (CollectionEntry<'blog'> | CollectionEntry<'builds'>) & {
	kind: Kind;
	/** `entry.slug` with the trailing `/page` stripped — see `cleanSlug`. */
	urlSlug: string;
	href: string;
};

/**
 * Entries live at `<collection>/<name>/page.md`, which Astro turns into the
 * slug `<name>/page`. Drop that trailing segment so URLs read `/blog/<name>/`.
 */
export function cleanSlug(slug: string) {
	return slug.replace(/\/page$/, '');
}

/** Frontmatter descriptions that are placeholders left over from the old template. */
const PLACEHOLDER_DESCRIPTIONS = new Set(['test', 'todo', 'tbd', '']);

export function cleanDescription(entry: { data: { title: string; description?: string } }) {
	const d = (entry.data.description ?? '').trim();
	const title = entry.data.title.trim().toLowerCase();
	if (PLACEHOLDER_DESCRIPTIONS.has(d.toLowerCase())) return '';
	// Several posts repeat (or near-repeat) the title as the description.
	if (title.includes(d.toLowerCase()) || d.toLowerCase().includes(title)) return '';
	return d;
}

/** Rough reading time from the raw markdown body. */
export function readingTime(body: string) {
	const words = body.trim().split(/\s+/).length;
	return Math.max(1, Math.round(words / 220));
}

const byDateDesc = (a: Entry, b: Entry) =>
	(b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0);

export async function getEntries(kind: Kind): Promise<Entry[]> {
	const entries = await getCollection(kind, ({ data }) => !data.draft);
	return entries
		.map((entry) => {
			const urlSlug = cleanSlug(entry.slug);
			return { ...entry, kind, urlSlug, href: `/${kind}/${urlSlug}/` } as Entry;
		})
		.sort(byDateDesc);
}

export async function getAllEntries(): Promise<Entry[]> {
	const [posts, builds] = await Promise.all([getEntries('blog'), getEntries('builds')]);
	return [...posts, ...builds].sort(byDateDesc);
}

export const KIND_LABEL: Record<Kind, string> = { blog: 'Writing', builds: 'Build' };
