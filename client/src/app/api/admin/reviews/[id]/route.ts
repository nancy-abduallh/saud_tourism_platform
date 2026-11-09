import { NextRequest, NextResponse } from 'next/server';
import { deleteReview, updateReview } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateReview(Number(id), body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل التعديل' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteReview(Number(id));
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل الحذف' }, { status: 400 });
  }
}
