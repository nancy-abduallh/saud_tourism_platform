import { NextRequest, NextResponse } from 'next/server';
import { createReview, getAllReviewsAdmin } from '@/lib/db';

export async function GET() {
  const data = await getAllReviewsAdmin();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createReview(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'فشل إنشاء التقييم' }, { status: 400 });
  }
}
