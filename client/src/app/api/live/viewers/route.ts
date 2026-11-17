import { NextRequest, NextResponse } from 'next/server';
import { getLiveSettings, updateLiveSettings } from '@/lib/db';
import { detectViewersFromLiveUrl } from '@/lib/live-viewers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const settings = await getLiveSettings();
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url') || settings.streamUrl;
    const baseCount = settings.viewerCount || 1420;

    const detected = await detectViewersFromLiveUrl(targetUrl, baseCount);

    // If source is youtube_live, optionally update DB in background
    if (detected.source === 'youtube_live' && detected.count > 0 && detected.count !== settings.viewerCount) {
      updateLiveSettings({ viewerCount: detected.count }).catch(() => {});
    }

    return NextResponse.json(
      {
        count: detected.count,
        source: detected.source,
        isLive: detected.isLive,
        rawText: detected.rawText,
        autoDetectEnabled: settings.autoDetectViewers ?? true,
      },
      {
        headers: { 'Cache-Control': 'no-store, max-age=0' },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { count: 1420, source: 'fallback', error: err?.message },
      { status: 200 }
    );
  }
}
