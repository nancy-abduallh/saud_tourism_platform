import { NextResponse } from 'next/server';
import { getPublicStats } from '@/lib/db';

export async function GET() {
  const stats = await getPublicStats();
  return NextResponse.json(stats);
}
