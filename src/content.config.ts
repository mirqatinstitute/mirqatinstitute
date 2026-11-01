import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string().max(170),
    summary: z.string(),
    order: z.number(),
    icon: z.string(),
    level: z.string(),
    schedule: z.string(),
    format: z.string().default('1-on-1 · Online'),
    plan: z.enum(['basic', 'tajweed', 'hifz']).nullable(),
    formCourse: z.string(),
    learn: z.array(z.string()),
    forWhom: z.array(z.string()),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
});

export const collections = { courses };
