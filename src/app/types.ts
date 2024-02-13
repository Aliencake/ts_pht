import z from 'zod';

export const add_social_link_schema = z.object({
  title: z
    .string()
    .min(3)
    .refine((s) => s[0] != ' ', 'Назва не має мати пробіл на початку!'),
  href: z.string().url({ message: 'Invalid url' }),
});

export const id_schema = z.object({
  _id: z.number(),
});

export const add_category_schema = z.object({
  title: z
    .string()
    .min(3)
    .refine((s) => s[0] != ' ', 'Назва не має мати пробіл на початку!'),
});

export const update_array_index_schema = z
  .object({
    _id: z.number(),
    index: z.number(),
  })
  .array();

export const add_media_schema = z.object({
  href: z.string().url(),
  thumbnail: z.optional(z.string().url()),
  categoryid: z.number(),
  type: z.enum(['PHOTO', 'VIDEO']),
});
