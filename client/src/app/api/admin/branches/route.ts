import { NextRequest, NextResponse } from 'next/server';
import { createBranch, getAllBranchesAdmin } from '@/lib/db';

export const revalidate = 0;

export async function GET() {
  const data = await getAllBranchesAdmin();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.city || !body.region) {
      return NextResponse.json({ message: 'الاسم، المدينة، والمنطقة حقول مطلوبة' }, { status: 400 });
    }
    const created = await createBranch(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل إنشاء الفرع' }, { status: 400 });
  }
}
