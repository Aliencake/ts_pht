import { prisma } from '@/app/db';
import { Link, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/auth';
import { add_social_link_schema, id_schema } from '@/app/types';


export async function GET(request: Request) {
    try {
        const links: Link[] = await prisma.link.findMany()
        return NextResponse.json(links)
    } catch (err) {
        return NextResponse.json(err)
    }
}


export async function POST(request: Request, response: Response) {
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