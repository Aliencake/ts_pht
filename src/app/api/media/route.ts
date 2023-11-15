import { prisma } from '@/app/db';
import { Media, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/auth';
import { add_media_schema, id_schema, update_array_index_schema } from '@/app/types';


export async function GET(request: Request) {
    try {
        const media: Media[] = await prisma.media.findMany({
            orderBy: [
                { index: 'asc' },
            ]
        })
        return NextResponse.json(media)
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
        const parsedMedia = add_media_schema.parse(await request.json())
        const media: Prisma.MediaCreateInput = {
            href: parsedMedia.href,
            thumbnail: parsedMedia.thumbnail,
            type: parsedMedia.type,
            category: {connect: {
                id: parsedMedia.categoryid,
              }}
        }
        const savedMedia = await prisma.media.create({ data: media });
        console.log(savedMedia)
        return NextResponse.json(savedMedia)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}


export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('You must be log in!')
        }
        const media_id = id_schema.parse(await request.json())
        const deleted_media: Media = await prisma.media.delete({
            where: {
                id: media_id._id,
            },
        })
        return NextResponse.json(deleted_media)
    } catch (err) {
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
        const media = update_array_index_schema.parse(res['data'])
        const results = await prisma.$transaction(
            media.map((item) =>
                prisma.media.update({
                    where: { id: item._id },
                    data: { index: item.index },
                })
            )
        )
        return NextResponse.json(results)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}