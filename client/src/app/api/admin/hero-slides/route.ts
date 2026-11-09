import { NextRequest, NextResponse } from 'next/server';
import { createHeroSlide, getAllHeroSlidesAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllHeroSlidesAdmin();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createHeroSlide(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل إنشاء الشريحة' }, { status: 400 });
  }
}
