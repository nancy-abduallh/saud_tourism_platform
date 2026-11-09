import { NextRequest, NextResponse } from 'next/server';
import { markMessageRead } from '@/lib/db';

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updated = await markMessageRead(Number(id));
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل تحديث الرسالة' }, { status: 400 });
  }
}
