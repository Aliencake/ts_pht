import { prisma } from '@/app/db';
import { Link, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/auth';
import { add_social_link_schema, id_schema, update_social_link_index_schema } from '@/app/types';


export async function GET(request: Request) {
    try {
        const links: Link[] = await prisma.link.findMany({
            orderBy: [
                { index: 'asc' },
            ]
        })
        return NextResponse.json(links)
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

        const link: Prisma.LinkCreateInput = add_social_link_schema.parse(await request.json())
        const savedLink = await prisma.link.create({ data: link });
        return NextResponse.json(savedLink)
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
        const link_id = id_schema.parse(await request.json())
        const deleted_link: Link = await prisma.link.delete({
            where: {
                id: link_id._id,
            },
        })
        return NextResponse.json(deleted_link)
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
        const links = update_social_link_index_schema.parse(res['data'])
        const results = await prisma.$transaction(
            links.map((link) =>
            prisma.link.update({
                where: { id: link._id },
                data: { index: link.index },
              })
            )
          )
        return NextResponse.json(results)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}