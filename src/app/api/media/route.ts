import { prisma } from '@/app/db';
import { Media, Prisma, Type } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse, type NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/auth';
import {
  add_media_schema,
  id_schema,
  update_array_index_schema,
} from '@/app/types';
import { edgeStoreClient } from '../edgestore/[...edgestore]/edgestore';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('Category_ID');
    const session = await getServerSession(authOptions);

    if (!session) {
      const media: Media[] = await prisma.media.findMany({
        where: {
          categoryId: Number(query),
        },
        orderBy: [{ index: 'asc' }],
      });
      return NextResponse.json(media);
    } else {
      const media: Media[] = await prisma.media.findMany({
        where: {
          categoryId: Number(query),
        },
        orderBy: [{ index: 'asc' }],
      });
      return NextResponse.json(media);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}

export async function PUT(request: Request, response: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('You must be log in!', { status: 401 });
    }
    const parsedMedia = add_media_schema.parse(await request.json());
    const media: Prisma.MediaCreateInput = {
      href: parsedMedia.href,
      thumbnail: parsedMedia.thumbnail,
      type: parsedMedia.type,
      category: {
        connect: {
          id: parsedMedia.categoryid,
        },
      },
      size: parsedMedia.size,
    };
    const savedMedia = await prisma.media.create({ data: media });
    return NextResponse.json(savedMedia);
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
    const media_id = id_schema.parse(await request.json());
    const deleted_media: Media = await prisma.media.delete({
      where: {
        id: media_id._id,
      },
    });
    if (deleted_media) {
      if (deleted_media.type === Type.PHOTO) {
        await edgeStoreClient.Photos.deleteFile({ url: deleted_media.href });
      } else if (deleted_media.type === Type.VIDEO) {
        await edgeStoreClient.Files.deleteFile({ url: deleted_media.href });
      }
    }
    return NextResponse.json(deleted_media);
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
    const res = await request.json();
    const media = update_array_index_schema.parse(res['data']);
    const results = await prisma.$transaction(
      media.map((item) =>
        prisma.media.update({
          where: { id: item._id },
          data: { index: item.index },
        }),
      ),
    );
    return NextResponse.json(results);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
