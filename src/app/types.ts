import z from "zod"

export type social_link = {
    id: number,
    title: string,
    href: string,
    index: number
}

export type Category = {
  id: number,
  title: string,
  photos?: [],
  index: number
}

export const add_social_link_schema = z.object({
  title: z.string().min(3).refine(s => s[0]!=' ', 'Назва не має мати пробіл на початку!'),
  href: z.string().url({ message: "Invalid url" })
})

export const id_schema = z.object({
  _id: z.number()
})

export const add_category_schema = z.object({
  title: z.string().min(3).refine(s => s[0]!=' ', 'Назва не має мати пробіл на початку!')
})