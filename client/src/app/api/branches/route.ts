import { NextResponse } from 'next/server';
import { getBranches } from '@/lib/db';

export const revalidate = 0;

export async function GET() {
  const branches = await getBranches();
  return NextResponse.json(branches, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
