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
	});

const blog = defineCollection({ type: 'content', schema: base });
const builds = defineCollection({ type: 'content', schema: base });

export const collections = { blog, builds };
