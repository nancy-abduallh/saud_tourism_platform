import { NextRequest, NextResponse } from 'next/server';
import { createDestination, getAllDestinationsAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllDestinationsAdmin();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createDestination(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل إنشاء الوجهة' }, { status: 400 });
  }
}
