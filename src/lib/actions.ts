import { Category, Link, Media, Prisma } from '@prisma/client';
import { prisma } from '../app/db';

export async function getCategories() {
  'use server';
  try {
    const categories: Category[] = await prisma.category.findMany({
      orderBy: [{ index: 'asc' }],
    });
    return categories;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function getMedia() {
  'use server';
  try {
    const media: Media[] = await prisma.media.findMany({
      orderBy: [{ index: 'asc' }],
    });
    return media;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function getLinks() {
  'use server';
  try {
    const links: Link[] = await prisma.link.findMany({
      orderBy: [{ index: 'asc' }],
    });
    return links;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
