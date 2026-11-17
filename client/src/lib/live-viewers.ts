export interface DetectedViewerResult {
  count: number;
  source: 'youtube_live' | 'youtube_views' | 'fallback';
  isLive: boolean;
  rawText?: string;
}

export async function detectViewersFromLiveUrl(
  rawUrl?: string,
  fallbackCount: number = 1420
): Promise<DetectedViewerResult> {
  if (!rawUrl || !rawUrl.trim()) {
    return { count: fallbackCount, source: 'fallback', isLive: false };
  }

  const url = rawUrl.trim();
  // Extract YouTube video id
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
        },
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.text();

        // 1. Direct concurrent live viewers (e.g. "2,418 watching now" or JSON payload)
        const liveMatch =
          data.match(/([0-9,]+)\s*(?:watching now|concurrent viewers|waiting|يشاهدون|متابع)/i) ||
          data.match(/"videoViewCountRenderer":\{"viewCount":\{"runs":\[\{"text":"([0-9,]+)"/i) ||
          data.match(/concurrentViewers["']?:\{[^}]*simpleText["']?:["']([0-9,]+)["']/i);

        if (liveMatch && liveMatch[1]) {
          const num = parseInt(liveMatch[1].replace(/,/g, ''), 10);
          if (!isNaN(num) && num > 0) {
            return {
              count: num,
              source: 'youtube_live',
              isLive: true,
              rawText: liveMatch[1],
            };
          }
        }

        // 2. Video total views if not currently a live broadcast
        const viewMatch =
          data.match(/"viewCount":\{"simpleText":"([0-9,]+)/i) ||
          data.match(/"views":\{"simpleText":"([0-9,]+)/i);

        if (viewMatch && viewMatch[1]) {
          const views = parseInt(viewMatch[1].replace(/,/g, ''), 10);
          if (!isNaN(views) && views > 0) {
            return {
              count: Math.max(fallbackCount, Math.min(views, 50000)),
              source: 'youtube_views',
              isLive: data.includes('"isLive":true') || data.includes('"isLiveContent":true'),
              rawText: viewMatch[1],
            };
          }
        }
      }
    } catch (err) {
      console.warn('YouTube viewer detection notice:', err);
    }
  }

  // Graceful organic fluctuation for realistic presence
  const jitter = Math.floor(Math.sin(Date.now() / 12000) * 9);
  return {
    count: Math.max(1, fallbackCount + jitter),
    source: 'fallback',
    isLive: false,
  };
}
