import { prisma } from '@/app/db';
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/auth';
import { Category, add_category_schema, id_schema } from '@/app/types';


export async function GET(request: Request) {
    try {
        const category: Category[] = await prisma.category.findMany()
        return NextResponse.json(category)
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
        await prisma.photo.deleteMany({
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
        return NextResponse.json(err)
    }
}