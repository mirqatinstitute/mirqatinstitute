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
    /** Where a student should be before starting — drives the "find your step" picker on /courses. */
    startingPoint: z.enum(['beginner', 'reader', 'tajweed', 'memorised']),
    /** Real reviews only, shared with the student's permission. */
    reviews: z
      .array(
        z.object({
          name: z.string(),
          detail: z.string().optional(), // e.g. "Parent of a Hifz student · Kollam"
          text: z.string(),
          rating: z.number().int().min(1).max(5).optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { courses };
