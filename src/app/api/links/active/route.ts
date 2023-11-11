import { prisma } from '@/app/db';
import { Link, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { id_schema } from '@/app/types';

export async function PUT(request: Request, response: Response) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('You must be log in!')
        }
        const res = await request.json()
        const data = id_schema.parse(res['data'])
        const link = await prisma.link.findFirst({ where: { id: data._id } })
        const results = await
            prisma.link.update({
                where: { id: data._id },
                data: { isActive: !link?.isActive },
            })

        return NextResponse.json(results)
    } catch (err) {
        return NextResponse.json(err)
    }
}