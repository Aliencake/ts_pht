import z from "zod"

export type social_link = {
    id: number,
    name: string,
    href: string,
    index: number
}

export const add_social_link_schema = z.object({
  name: z.string().min(3),
  link: z.string().url({ message: "Invalid url" })
})