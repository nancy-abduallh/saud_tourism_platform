'use client';

import React, { useMemo, useState } from 'react';
import { Maximize2, Minimize2, Radio, Volume2, ShieldCheck, Sparkles, Tv } from 'lucide-react';

interface LivePlayerProps {
  streamUrl: string;
  title: string;
  isLive: boolean;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
  viewerCount?: number;
}

export function parseVideoUrl(rawUrl: string): { type: 'youtube' | 'vimeo' | 'direct' | 'custom'; embedUrl: string } {
  if (!rawUrl || !rawUrl.trim()) {
    return { type: 'custom', embedUrl: '' };
  }

  let url = rawUrl.trim();
  if (url.includes('3nQ6L8bQeYc')) {
    url = 'https://www.youtube.com/watch?v=R6D7jQI4BD0';
  }

  // If already an embed url
  if (url.includes('youtube.com/embed/')) {
    return {
      type: 'youtube',
      embedUrl: url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`,
    };
  }

  // Standard YouTube watch: youtube.com/watch?v=ID
  const ytWatchMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytWatchMatch && ytWatchMatch[1]) {
    const videoId = ytWatchMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1&modestbranding=1`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=0`,
    };
  }

  // Direct video file (mp4 / webm)
  if (/\.(mp4|webm|m3u8)(\?.*)?$/i.test(url)) {
    return {
      type: 'direct',
      embedUrl: url,
    };
  }

  return {
    type: 'custom',
    embedUrl: url,
  };
}

export default function LivePlayer({
  streamUrl,
  title,
  isLive,
  status,
  viewerCount = 1420,
}: LivePlayerProps) {
  const [theaterMode, setTheaterMode] = useState(false);
  const parsed = useMemo(() => parseVideoUrl(streamUrl), [streamUrl]);

  return (
    <div
      className={`relative mx-auto transition-all duration-500 ${
        theaterMode ? 'w-full max-w-7xl' : 'w-full max-w-5xl'
      }`}
    >
      {/* Outer Glow & Luxury Frame */}
      <div className="relative overflow-hidden rounded-3xl border border-gold-500/40 bg-navy-900/90 shadow-2xl shadow-black/80 backdrop-blur-xl">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-navy-950/80 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            {status === 'LIVE' ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/15 px-3 py-1 text-xs font-black tracking-wide text-red-400">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                مباشر الآن 🔴
              </span>
            ) : status === 'UPCOMING' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-300">
                <Radio size={13} className="animate-pulse" />
                قريباً (بث مجدول) ⏳
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-300">
                <Tv size={13} />
                تسجيل الحفل 🎬
              </span>
            )}

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/70">
              <ShieldCheck size={14} className="text-gold-400" />
              <span>بث رسمي مشفر وعالي الدقة (Full HD)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {status === 'LIVE' && (
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-bold text-gold-300">
                  {viewerCount.toLocaleString('ar-SA')}
                </span>
                <span className="text-[11px] text-white/60">يشاهدون الآن</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setTheaterMode(!theaterMode)}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-white"
              title={theaterMode ? 'عرض عادي' : 'وضع السينما الشامل'}
            >
              {theaterMode ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              <span className="hidden sm:inline">
                {theaterMode ? 'تصغير العرض' : 'وضع السينما'}
              </span>
            </button>
          </div>
        </div>

        {/* Video Canvas / Player Area (16:9 Aspect Ratio) */}
        <div className="relative aspect-video w-full bg-black">
          {parsed.embedUrl ? (
            parsed.type === 'direct' ? (
              <video
                src={parsed.embedUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <iframe
                src={parsed.embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-gold-500/40 bg-gold-500/10 text-gold-400">
                <Tv size={32} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white sm:text-xl">
                بث حفل التدشين الرسمي لمنصة SA للسياحة
              </h3>
              <p className="mt-2 max-w-md text-xs text-white/70 sm:text-sm">
                سيتم بث فعاليات الحفل مباشرة هنا. يرجى ضبط الرابط من لوحة تحكم الإدارة.
              </p>
            </div>
          )}
        </div>

        {/* Video Bottom Title & Kingdom Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-navy-950/90 p-4 sm:p-5 border-t border-white/10">
          <div>
            <h2 className="font-display text-base font-bold text-white sm:text-lg">
              {title}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
              <Sparkles size={13} className="text-gold-400" />
              <span>
                تغطية حية ممتدة لكافة فروع ومناطق المملكة (الرياض، القصيم، حائل، العلا، تبوك، عسير، والشرقية)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-lg bg-gold-500/10 border border-gold-500/30 px-3 py-1 text-xs font-semibold text-gold-300">
              🇸🇦 بث وطني موحّد
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
