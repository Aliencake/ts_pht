import { prisma } from '@/app/db';
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { Category, add_category_schema, id_schema } from '@/app/types';


export async function GET(request: Request) {
    try {
        const photo = await prisma.photo.findMany()
        return NextResponse.json(photo)
    } catch (err) {
        return NextResponse.json(err)
    }
}