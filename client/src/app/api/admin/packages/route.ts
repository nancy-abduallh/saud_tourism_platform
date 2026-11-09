import { NextResponse } from 'next/server';
import { getAllPackagesAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllPackagesAdmin();
  return NextResponse.json(data);
}
