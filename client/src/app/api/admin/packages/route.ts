import { NextRequest, NextResponse } from 'next/server';
import { createPackageAdmin, getAllPackagesAdmin } from '@/lib/db';

export const revalidate = 0;

export async function GET() {
  const data = await getAllPackagesAdmin();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ message: 'عنوان الباقة مطلوب' }, { status: 400 });
    }
    const created = await createPackageAdmin(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل إنشاء الباقة' }, { status: 400 });
  }
}
