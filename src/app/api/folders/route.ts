import { prisma } from '@/app/db';
import { Folder, Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/auth';
import {
  add_category_schema,
  id_schema,
  update_folder_schema,
} from '@/app/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      const folders: Folder[] = await prisma.folder.findMany({
        orderBy: [{ index: 'asc' }],
      });
      return NextResponse.json(folders);
    } else {
      const folders: Folder[] = await prisma.folder.findMany({
        orderBy: [{ index: 'asc' }],
      });
      return NextResponse.json(folders);
    }
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

export async function PUT(request: Request, response: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('You must be log in!', { status: 401 });
    }

    const folder: Prisma.FolderCreateInput = add_category_schema.parse(
      await request.json(),
    );
    const savedFolder = await prisma.folder.create({ data: folder });
    return NextResponse.json(savedFolder);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('You must be log in!', { status: 401 });
    }
    const folder_id = id_schema.parse(await request.json());
    const deleted_folder: Folder = await prisma.folder.delete({
      where: {
        id: folder_id._id,
      },
    });
    return NextResponse.json(deleted_folder);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('You must be log in!', { status: 401 });
    }
    const parsed_data = update_folder_schema.parse((await request.json()).data);
    const result: Folder = await prisma.folder.update({
      where: {
        id: parsed_data.id,
      },
      data: {
        categories: parsed_data.categories,
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
