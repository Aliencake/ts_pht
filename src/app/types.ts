import z from 'zod';

export const add_social_link_schema = z.object({
  title: z
    .string()
    .min(1)
    .refine((s) => s[0] != ' ', 'Назва не має мати пробіл на початку!'),
  href: z
    .string()
    .url({ message: 'Неправильний url' })
    .or(z.string().email({ message: 'Неправильна пошта' })),
});

export const id_schema = z.object({
  _id: z.number(),
});

export const add_category_schema = z.object({
  title: z
    .string()
    .min(1)
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
  size: z.number(),
});

export const update_settings_schema = z.object({
  delay: z.coerce.number().nonnegative().max(2147483645),
});

const email_schema = z.string().email();

export function isEmail(input: string): boolean {
  const { success } = email_schema.safeParse(input);
  return success;
}
