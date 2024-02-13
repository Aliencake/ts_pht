import { prisma } from '@/app/db';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { id_schema } from '@/app/types';

export async function PUT(request: Request, response: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('You must be log in!', { status: 401 });
    }
    const res = await request.json();
    const data = id_schema.parse(res['data']);
    const category = await prisma.category.findFirst({
      where: { id: data._id },
    });
    const results = await prisma.category.update({
      where: { id: data._id },
      data: { isActive: !category?.isActive },
    });

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
