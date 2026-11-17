import { NextRequest, NextResponse } from 'next/server';
import {
  getLiveAgenda,
  getLiveCongratulations,
  getLiveSettings,
  saveLiveAgenda,
  updateLiveSettings,
} from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [settings, congratulations, agenda] = await Promise.all([
      getLiveSettings(),
      getLiveCongratulations(100),
      getLiveAgenda(),
    ]);
    return NextResponse.json(
      { settings, congratulations, agenda },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
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
    let updatedAgenda = null;

    if (Array.isArray(body.agenda)) {
      updatedAgenda = await saveLiveAgenda(body.agenda);
    }

    const updated = await updateLiveSettings(body);
    const agenda = updatedAgenda || (await getLiveAgenda());

    return NextResponse.json(
      { settings: updated, agenda },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
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
