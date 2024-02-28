import { prisma } from '@/app/db';
import { Prisma, Settings } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse, type NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { update_settings_schema } from '@/app/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, response: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('You must be log in!', { status: 401 });
    }
    const parsedSettings = update_settings_schema.parse(await request.json());
    const fetched_settings: Settings | null = await prisma.settings.findFirst();
    const settings: Prisma.SettingsCreateInput = {
      autoPlayDelay: parsedSettings.delay,
    };
    if(fetched_settings) {
      const savedSettings = await prisma.settings.update({
        where: { id: fetched_settings?.id },
        data: settings,
      });
      return NextResponse.json(savedSettings);
    }
    else {
      const savedSettings = await prisma.settings.create({
        data: settings,
      });
      return NextResponse.json(savedSettings);
    }
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

export async function GET(request: Request, response: Response) {
  try {
    const settings: Settings | null = await prisma.settings.findFirst();
    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
