import { NextResponse } from 'next/server';
import { getHeroSlides } from '@/lib/db';

export async function GET() {
  const slides = await getHeroSlides();
  return NextResponse.json(slides);
}
