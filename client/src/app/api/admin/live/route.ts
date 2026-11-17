import { NextRequest, NextResponse } from 'next/server';
import { getLiveCongratulations, getLiveSettings, updateLiveSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [settings, congratulations] = await Promise.all([
      getLiveSettings(),
      getLiveCongratulations(100),
    ]);
    return NextResponse.json({ settings, congratulations });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'فشل جلب إعدادات البث' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateLiveSettings(body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'فشل تحديث إعدادات البث المباشر' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
