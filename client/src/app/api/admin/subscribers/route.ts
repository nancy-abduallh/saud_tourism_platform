import { NextResponse } from 'next/server';
import { getAllSubscribersAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllSubscribersAdmin();
  return NextResponse.json(data);
}
