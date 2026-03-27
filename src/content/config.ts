import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    fecha: z.date(),
    resumen: z.string().optional(),
    imagen: z.string().url().optional(),
    imagenAlt: z.string().optional(),
    area: z.string().optional(),
    autor: z.string().default('Iuris Consultus'),
    tags: z.array(z.string()).default([]),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { blog };
