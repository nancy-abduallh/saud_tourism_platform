import { NextRequest, NextResponse } from 'next/server';
import { getPackages } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get('destination') || undefined;
  const featured = searchParams.get('featured') === '1';
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;

  const packages = await getPackages({ destination, featuredOnly: featured, limit });
  return NextResponse.json(packages);
}
