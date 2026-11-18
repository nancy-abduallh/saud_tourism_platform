import { NextRequest, NextResponse } from 'next/server';
import { getPackageBySlug } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const pkg = await getPackageBySlug(slug);
    if (!pkg) {
      return NextResponse.json({ message: 'الباقة غير موجودة' }, { status: 404 });
    }
    return NextResponse.json(pkg);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || 'فشل في استرجاع تفاصيل الباقة' },
      { status: 500 }
    );
  }
}
