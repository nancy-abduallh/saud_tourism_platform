import { NextResponse } from 'next/server';
import { getAllMessagesAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllMessagesAdmin();
  return NextResponse.json(data);
}
