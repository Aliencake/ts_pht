import { Category, Link, Media, Prisma } from "@prisma/client"
import { prisma } from "./db"

export async function getCategories() {
    'use server'
    try {
        const categories: Category[] = await prisma.category.findMany({
            orderBy: [
                { index: 'asc' },
            ],
            where: { isActive: true }
        })
        return categories

    }
    catch (err) {
        if (err instanceof Prisma.PrismaClientInitializationError) {
        }
        return null
    }
}

export async function getMedia() {
    'use server'
    try {
        const media: Media[] = await prisma.media.findMany({
            orderBy: [
                { index: 'asc' },
            ],
            where: { isActive: true }
        })
        return media

    }
    catch (err) {
        console.log(err)
        return null
    }
}

export async function getLinks() {
    'use server'
    try {
        const links: Link[] = await prisma.link.findMany({
            orderBy: [
                { index: 'asc' },
            ],
            where: { isActive: true }
        })
        return links

    }
    catch (err) {
        console.log(err)
        return null
    }
}
