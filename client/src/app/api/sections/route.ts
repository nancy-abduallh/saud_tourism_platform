import { NextResponse } from 'next/server';
import { getHomeSectionsData } from '@/lib/db';

export const revalidate = 0;

export async function GET() {
  try {
    const data = await getHomeSectionsData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'فشل جلب الأقسام' },
      { status: 500 }
    );
  }
}
