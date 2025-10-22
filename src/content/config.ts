import { defineCollection, z } from 'astro:content';

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished', 'want-to-read']),
    dateStarted: z.date().optional(),
    dateFinished: z.date().optional(),
    dateAdded: z.date(),
    rating: z.string().optional(), // e.g., "★★★★★"
    progress: z.number().optional(), // percentage
    currentPage: z.number().optional(),
    totalPages: z.number().optional(),
    quote: z.string().optional(),
    tags: z.array(z.string()),
    language: z.enum(['en', 'ar']).default('en'),
    isbn: z.string().optional(),
    year: z.number(), // Year for grouping
  }),
});

export const collections = {
  books: booksCollection,
};