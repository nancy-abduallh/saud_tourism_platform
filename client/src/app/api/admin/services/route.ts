import { NextRequest, NextResponse } from 'next/server';
import { createVipService, getAllVipServicesAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllVipServicesAdmin();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createVipService(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل إنشاء الخدمة' }, { status: 400 });
  }
}
