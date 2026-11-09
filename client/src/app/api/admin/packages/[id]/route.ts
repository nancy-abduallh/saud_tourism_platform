import { NextRequest, NextResponse } from 'next/server';
import { deletePackageAdmin, getPackageByIdAdmin } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await getPackageByIdAdmin(Number(id));
  if (!pkg) return NextResponse.json({ message: 'الباقة غير موجودة' }, { status: 404 });
  return NextResponse.json(pkg);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deletePackageAdmin(Number(id));
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل الحذف' }, { status: 400 });
  }
}
