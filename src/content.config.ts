import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { allLocales, themeConfig } from '@/config'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    // required
    title: z.string(),
    published: z.date(),
    // optional
    description: z.string().optional().default(''),
    updated: z.preprocess(
      val => val === '' ? undefined : val,
      z.date().optional(),
    ),
    tags: z.array(z.string()).optional().default([]),
    // Advanced
    draft: z.boolean().optional().default(false),
    pin: z.number().int().min(0).max(99).optional().default(0),
    toc: z.boolean().optional().default(themeConfig.global.toc),
    lang: z.enum(['', ...allLocales]).optional().default(''),
    abbrlink: z.string().optional().default('').refine(
      abbrlink => !abbrlink || /^[a-z0-9\-]*$/.test(abbrlink),
      { message: 'Abbrlink can only contain lowercase letters, numbers and hyphens' },
    ),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    lang: z.enum(['', ...allLocales]).optional().default(''),
  }),
})

const books = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished', 'want-to-read']),
    dateStarted: z.date().optional(),
    dateFinished: z.date().optional(),
    dateAdded: z.date(),
    rating: z.string().optional(),
    progress: z.number().optional(),
    currentPage: z.number().optional(),
    totalPages: z.number().optional(),
    quote: z.string().optional(),
    quotes: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    language: z.enum(['en', 'ar']).default('en'),
    isbn: z.string().optional(),
    year: z.number(),
    coverImage: z.string().optional(),
    genre: z.string().optional(),
    timeline: z.array(z.object({
      date: z.date(),
      note: z.string(),
    })).optional(),
  }),
})

export const collections = { posts, about, books }
