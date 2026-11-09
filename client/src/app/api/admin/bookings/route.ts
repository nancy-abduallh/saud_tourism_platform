import { NextResponse } from 'next/server';
import { getAllBookingsAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllBookingsAdmin();
  return NextResponse.json(data);
}
