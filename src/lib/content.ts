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

/**
 * Rank for a pinned entry, or `null` if it isn't pinned. A number is an
 * explicit position (1 first); `true` pins without choosing one, so it sorts
 * after everything numbered.
 */
export function pinRank(entry: Entry): number | null {
	const pinned = entry.data.pinned;
	if (pinned === undefined || pinned === false) return null;
	return pinned === true ? Number.MAX_SAFE_INTEGER : pinned;
}

/**
 * Splits a date-sorted list into the pinned selection and the archive that
 * follows it. An entry appears in exactly one of the two, so the home page
 * never shows the same thing twice. Pinning is a home-page concern only —
 * /blog, /builds and the feed stay strictly chronological.
 */
export function partitionPinned(entries: Entry[]) {
	const pinned: Entry[] = [];
	const rest: Entry[] = [];
	for (const entry of entries) {
		(pinRank(entry) === null ? rest : pinned).push(entry);
	}
	pinned.sort(
		(a, b) =>
			pinRank(a)! - pinRank(b)! ||
			(b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0),
	);
	return { pinned, rest };
}
