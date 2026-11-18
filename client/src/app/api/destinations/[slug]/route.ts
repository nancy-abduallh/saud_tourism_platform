import { NextRequest, NextResponse } from 'next/server';
import { getDestinations } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const destinations = await getDestinations();
    const dest = destinations.find((d) => d.slug === slug || String(d.id) === slug);
    if (!dest) {
      return NextResponse.json({ message: 'الوجهة غير موجودة' }, { status: 404 });
    }
    return NextResponse.json(dest);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || 'فشل في استرجاع تفاصيل الوجهة' },
      { status: 500 }
    );
  }
}
