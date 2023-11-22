import { prisma } from '@/app/db';
import { Category, Media, Prisma, Type } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/auth';
import { add_category_schema, id_schema, update_array_index_schema } from '@/app/types';
import { edgeStoreClient } from '../edgestore/[...edgestore]/edgestore';


export async function GET(request: Request) {
    try {
        const categories: Category[] = await prisma.category.findMany({
            orderBy: [
                { index: 'asc' },
            ]
        })
        return NextResponse.json(categories)
    } catch (err) {
        return NextResponse.json(err)
    }
}


export async function PUT(request: Request, response: Response) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('You must be log in!')
        }
        const category: Prisma.CategoryCreateInput = add_category_schema.parse(await request.json())
        const savedCategory = await prisma.category.create({ data: category });
        return NextResponse.json(savedCategory)
    } catch (err) {
        return NextResponse.json(err)
    }
}


export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('You must be log in!')
        }
        const category_id = id_schema.parse(await request.json())
        const media: Media[] = await prisma.media.findMany({
            where: {
                categoryId: Number(category_id._id),
            },
            orderBy: [
                { index: 'asc' },
            ]
        })
        if (media && media.length) {
            console.log('deleting media')
            media.map(async (item) => {
                if (item.type === Type.PHOTO) {
                    await edgeStoreClient.Photos.deleteFile({ url: item.href })
                }
                else if (item.type === Type.VIDEO) {
                    await edgeStoreClient.Files.deleteFile({ url: item.href })
                }
            })
        }
        await prisma.media.deleteMany({
            where: {
                categoryId: category_id._id,
            },
        })
        const deleted_category: Category = await prisma.category.delete({
            where: {
                id: category_id._id,
            },
        })
        return NextResponse.json(deleted_category)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('You must be log in!')
        }
        const res = await request.json()
        const categories = update_array_index_schema.parse(res['data'])
        const results = await prisma.$transaction(
            categories.map((category) =>
                prisma.category.update({
                    where: { id: category._id },
                    data: { index: category.index },
                })
            )
        )
        return NextResponse.json(results)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}