import { defineCollection, z } from 'astro:content';

const base = ({ image }: { image: any }) =>
	z.object({
		title: z.string(),
		description: z.string().optional().default(''),
		date: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		tags: z.array(z.string()).optional().default([]),
		authors: z.union([z.string(), z.array(z.string())]).optional(),
		draft: z.boolean().optional().default(false),
		// Force-rank on the home page: 1 is first. `true` pins without a
		// position, landing after any numbered entries. See `pinRank`.
		pinned: z.union([z.boolean(), z.number()]).optional(),
	});

const blog = defineCollection({ type: 'content', schema: base });
const builds = defineCollection({ type: 'content', schema: base });

export const collections = { blog, builds };
