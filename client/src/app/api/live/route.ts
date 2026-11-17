import { NextResponse } from 'next/server';
import { getLiveAgenda, getLiveCongratulations, getLiveSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [settings, congratulations, agenda] = await Promise.all([
      getLiveSettings(),
      getLiveCongratulations(50),
      getLiveAgenda(),
    ]);
    return NextResponse.json(
      { settings, congratulations, agenda },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch live data' },
      { status: 500 }
    );
  }
}
