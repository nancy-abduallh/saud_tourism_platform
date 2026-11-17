import { NextRequest, NextResponse } from 'next/server';
import { deleteLiveCongratulation } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = Number(id);
    if (!numId) {
      return NextResponse.json({ error: 'المعرف غير صالح' }, { status: 400 });
    }
    await deleteLiveCongratulation(numId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'فشل حذف التهنئة' },
      { status: 500 }
    );
  }
}
