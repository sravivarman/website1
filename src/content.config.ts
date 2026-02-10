import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';


// Helper for handling dates that might be empty strings from JSON
const dateSchema = z.preprocess((arg) => {
    if (typeof arg === "string" && arg.trim() === "") return undefined;
    return arg;
}, z.coerce.date());
const optionalDateSchema = z.preprocess((arg) => {
    if (typeof arg === "string" && arg.trim() === "") return undefined;
    return arg;
}, z.coerce.date().optional());

const postsCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        published: dateSchema,
        updated: optionalDateSchema,
        draft: z.boolean().optional().default(false),
        description: z.string().optional().default(""),
        cover: z.string().optional().default(""),
        tags: z.array(z.string()).optional().default([]),
        category: z.string().optional().nullable().default(""),
        lang: z.string().optional().default(""),
        pinned: z.boolean().optional().default(false),
        author: z.string().optional().default(""),
        sourceLink: z.string().optional().default(""),
        licenseName: z.string().optional().default(""),
        licenseUrl: z.string().optional().default(""),

        /* Page encryption fields */
        encrypted: z.boolean().optional().default(false),
        password: z.string().optional().default(""),

        /* Custom routeName */
        routeName: z.string().optional(),

        /* For internal use */
        prevTitle: z.string().default(""),
        prevSlug: z.string().default(""),
        nextTitle: z.string().default(""),
        nextSlug: z.string().default(""),
    }),
});

const specCollection = defineCollection({
    loader: glob({ pattern: '[^_]*.{md,mdx}', base: "./src/content" }),
    schema: z.object({}),
});

const coursesCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/courses" }),
    schema: z.object({
        title: z.string(),
        code: z.string().optional().default(""),  // Course code e.g., CS101
        description: z.string().optional().default(""),
        cover: z.string().optional().default(""),
        academicYear: z.string(),  // e.g., "2025-2026"
        semester: z.enum(["Fall", "Spring", "Summer", "Winter", "Odd", "Even"]),
        credits: z.number().optional(),
        tags: z.array(z.string()).optional().default([]),
        active: z.boolean().optional().default(true),  // Is this the current offering?
        order: z.number().optional().default(0),
    }),
});

export const collections = {
    posts: postsCollection,
    spec: specCollection,
    courses: coursesCollection,
};