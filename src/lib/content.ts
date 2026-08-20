import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_AUTHOR, SITE_TITLE } from '../consts';

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
	// `getCollection` narrows per-collection, so widen once here rather than
	// annotating the union at every call site.
	const entries = (await getCollection(kind)) as CollectionEntry<Kind>[];
	return entries
		.filter((entry) => !entry.data.draft)
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

/**
 * First readable prose from a markdown body, for metadata and feed items.
 * Deliberately crude — it only has to survive being read as a sentence, not
 * round-trip to markdown.
 */
export function excerpt(body: string, maxChars = 200): string {
	const cleaned = body
		.replace(/```[\s\S]*?```/g, '\n')
		.replace(/<!--[\s\S]*?-->/g, ' ')
		.replace(/^\s*import\s.+$/gm, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[*_~`]/g, '');

	const paragraphs: string[] = [];
	const listItems: string[] = [];

	for (const rawLine of cleaned.split('\n')) {
		const line = rawLine.trim();
		if (!line) continue;
		if (/^#{1,6}\s/.test(line)) continue; // headings are labels, not prose
		const listItem = line.match(/^(?:[-*+]|\d+[.)])\s+(.*)$/);
		if (listItem) {
			if (listItem[1]) listItems.push(listItem[1]);
			continue;
		}
		paragraphs.push(line.replace(/^>\s?/, ''));
	}

	// Prefer real sentences; only fall back to bullets when a post is all list.
	const source = paragraphs.length > 0 ? paragraphs : listItems;
	const text = source.join(' ').replace(/\s+/g, ' ').trim();

	if (!text) return '';
	if (text.length <= maxChars) return text;

	const cut = text.slice(0, maxChars);
	// Prefer ending on a sentence, but only if one lands reasonably far in.
	const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
	if (sentenceEnd > maxChars * 0.5) return cut.slice(0, sentenceEnd + 1);

	const lastSpace = cut.lastIndexOf(' ');
	return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}\u2026`;
}

/**
 * Something reasonable to put in a meta description or feed item for any
 * entry: the written description if there is one, otherwise the opening of
 * the body, otherwise a sentence describing what the thing is. Never empty.
 *
 * Lists deliberately don't use this — they show authored descriptions only,
 * so the archive stays terse.
 */
export function summary(entry: Entry): string {
	const authored = cleanDescription(entry);
	if (authored) return authored;

	const opening = excerpt(entry.body);
	if (opening) return opening;

	const noun = entry.kind === 'builds' ? 'build' : 'post';
	const when = entry.data.date
		? entry.data.date.toLocaleDateString('en-CA', {
				month: 'long',
				year: 'numeric',
				timeZone: 'UTC',
			})
		: null;
	return `${entry.data.title}: a ${noun} by ${SITE_AUTHOR} (${SITE_TITLE})${when ? `, ${when}` : ''}.`;
}
