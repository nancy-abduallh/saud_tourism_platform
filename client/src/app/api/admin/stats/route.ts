import { NextResponse } from 'next/server';
import { getAdminStats } from '@/lib/db';

export async function GET() {
  const data = await getAdminStats();
  return NextResponse.json(data);
}
