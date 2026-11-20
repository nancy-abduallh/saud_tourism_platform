import { NextRequest, NextResponse } from 'next/server';
import { getHomeSectionsData, updateHomeSectionsData } from '@/lib/db';

export const revalidate = 0;

export async function GET() {
  try {
    const data = await getHomeSectionsData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'فشل جلب بيانات أقسام الصفحة الرئيسية' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateHomeSectionsData(body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'فشل حفظ إعدادات الأقسام' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
