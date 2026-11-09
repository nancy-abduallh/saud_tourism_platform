import { NextRequest, NextResponse } from 'next/server';
import { updateBookingStatus } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    const updated = await updateBookingStatus(Number(id), status);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل تحديث حالة الحجز' }, { status: 400 });
  }
}
