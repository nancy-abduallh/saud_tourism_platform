import { NextRequest, NextResponse } from 'next/server';
import { deleteMessage } from '@/lib/db';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteMessage(Number(id));
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل حذف الرسالة' }, { status: 400 });
  }
}
