import { prisma } from '@/app/db';
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { add_category_schema, id_schema } from '@/app/types';


export async function GET(request: Request) {
    try {
        const media = await prisma.media.findMany()
        return NextResponse.json(media)
    } catch (err) {
        return NextResponse.json(err)
    }
}