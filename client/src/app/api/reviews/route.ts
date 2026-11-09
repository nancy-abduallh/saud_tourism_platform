import { NextResponse } from 'next/server';
import { getReviews } from '@/lib/db';

export async function GET() {
  const reviews = await getReviews();
  return NextResponse.json(reviews);
}
