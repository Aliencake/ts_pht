import { prisma } from '@/app/db';
import { getServerSession } from 'next-auth/next';
import { NextResponse, type NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('You must be log in!', { status: 401 });
    } else {
      const sizes: number[] = (
        await prisma.media.findMany({
          select: {
            size: true,
          },
        })
      ).map((m) => m.size);

      const totalSize: number = sizes.reduce((acc, curr) => acc + curr, 0);

      return NextResponse.json(totalSize);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}
