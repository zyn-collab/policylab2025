import { defineCollection, z } from 'astro:content';

const chaptersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  chapters: chaptersCollection,
};
