'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Radio, X } from 'lucide-react';
import type { LiveStreamSettings } from '@/lib/types';

interface LiveBannerProps {
  settings?: LiveStreamSettings | null;
}

export default function LiveBanner({ settings }: LiveBannerProps) {
  const [liveData, setLiveData] = useState<LiveStreamSettings | null>(settings || null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // If not passed initially, or to get latest status
    if (!settings) {
      fetch('/api/live')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.settings) {
            setLiveData(data.settings);
          }
        })
        .catch(() => {});
    }

    if (typeof window !== 'undefined') {
      const isDismissed = sessionStorage.getItem('st_live_banner_dismissed');
      if (isDismissed === 'true') {
        setDismissed(true);
      }
    }
  }, [settings]);

  if (dismissed || !liveData || !liveData.bannerEnabled) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('st_live_banner_dismissed', 'true');
    }
  };

  const isLiveNow = liveData.status === 'LIVE' || liveData.isLive;

  return (
    <div className="relative z-50 overflow-hidden border-b border-gold-500/30 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 py-2.5 px-4 text-white shadow-lg">
      <div className="container-x flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          {isLiveNow ? (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
          ) : (
            <Radio size={14} className="text-gold-400 animate-pulse shrink-0" />
          )}

          <span className="font-semibold leading-tight text-white/95">
            {liveData.bannerText || '🔴 بث مباشر لحفل التدشين الرسمي لمنصة SA للسياحة'}
          </span>
        </div>

        <div className="flex items-center gap-3 ms-auto">
          <Link
            href="/live"
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient px-3.5 py-1 text-[11px] font-black text-navy-950 shadow-gold transition hover:scale-105"
          >
            <span>{isLiveNow ? 'شاهد البث الآن' : 'تفاصيل البث والموعد'}</span>
            <ArrowLeft size={13} />
          </Link>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="إغلاق التنبيه"
            className="grid h-6 w-6 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
