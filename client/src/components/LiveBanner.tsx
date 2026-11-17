'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Radio, Tv, X } from 'lucide-react';
import type { LiveStreamSettings } from '@/lib/types';

interface LiveBannerProps {
  settings?: LiveStreamSettings | null;
}

export default function LiveBanner({ settings }: LiveBannerProps) {
  const [liveData, setLiveData] = useState<LiveStreamSettings | null>(settings || null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (settings) {
      setLiveData(settings);
      return;
    }

    let isMounted = true;
    const fetchLive = () => {
      fetch('/api/live', { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (isMounted && data?.settings) {
            setLiveData(data.settings);
          }
        })
        .catch(() => {});
    };

    fetchLive();
    // Poll every 30 seconds so users get updated status in real-time
    const interval = setInterval(fetchLive, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [settings]);

  const currentStatus = liveData?.status || (liveData?.isLive ? 'LIVE' : 'UPCOMING');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDismissed = sessionStorage.getItem(`st_live_banner_dismissed_${currentStatus}`);
      setDismissed(isDismissed === 'true');
    }
  }, [currentStatus]);

  if (dismissed || !liveData || !liveData.bannerEnabled) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`st_live_banner_dismissed_${currentStatus}`, 'true');
    }
  };

  // Determine appearance & content strictly aligned with the current broadcast status
  const getStatusConfig = () => {
    if (currentStatus === 'LIVE') {
      const defaultText =
        '🔴 بث مباشر الآن: انطلاق وقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع المملكة (13 فرعاً)';
      const text =
        liveData.bannerText &&
        !liveData.bannerText.includes('ترقبوا') &&
        !liveData.bannerText.includes('انتهى البث')
          ? liveData.bannerText
          : defaultText;

      return {
        badgeText: 'مباشر الآن 🔴',
        badgeClass: 'bg-red-500/25 border-red-500/60 text-red-200 animate-pulse',
        text,
        buttonText: 'شاهد البث الآن 🔴',
        buttonClass:
          'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-black shadow-lg shadow-red-600/30 hover:scale-105 border border-red-400/40',
        containerClass:
          'border-b border-red-500/40 bg-gradient-to-r from-navy-950 via-red-950/40 to-navy-950 text-white shadow-xl shadow-red-950/20',
        icon: (
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
        ),
      };
    }

    if (currentStatus === 'ENDED') {
      const defaultText =
        '🎬 انتهى البث المباشر: يمكنك الآن مشاهدة التسجيل الكامل لوقائع حفل التدشين الرسمي لمنصة SA للسياحة';
      const text =
        liveData.bannerText &&
        !liveData.bannerText.includes('بث مباشر الآن') &&
        !liveData.bannerText.includes('ترقبوا')
          ? liveData.bannerText
          : defaultText;

      return {
        badgeText: 'تسجيل الحفل 🎬',
        badgeClass: 'bg-blue-500/20 border-blue-400/40 text-blue-200',
        text,
        buttonText: 'مشاهدة تسجيل الحفل 🎬',
        buttonClass:
          'bg-gradient-to-r from-blue-600 to-navy-800 text-white font-bold hover:scale-105 border border-blue-400/50 shadow-md',
        containerClass:
          'border-b border-blue-500/30 bg-gradient-to-r from-navy-950 via-blue-950/40 to-navy-950 text-white shadow-lg',
        icon: <Tv size={14} className="text-blue-400 shrink-0" />,
      };
    }

    // Default: UPCOMING (مجدول / قريباً)
    const defaultText =
      '⏳ ترقبوا: انطلاق حفل التدشين الرسمي لمنصة SA للسياحة وفروع المملكة الـ 13';
    const text =
      liveData.bannerText &&
      !liveData.bannerText.includes('بث مباشر الآن') &&
      !liveData.bannerText.includes('انتهى البث')
        ? liveData.bannerText
        : defaultText;

    return {
      badgeText: 'بث مجدول ⏳',
      badgeClass: 'bg-gold-500/20 border-gold-400/40 text-gold-300',
      text,
      buttonText: 'تفاصيل الموعد والفعاليات ⏳',
      buttonClass:
        'bg-gold-gradient text-navy-950 font-black shadow-gold hover:scale-105 transition-transform',
      containerClass:
        'border-b border-gold-500/30 bg-gradient-to-r from-navy-950 via-amber-950/30 to-navy-950 text-white shadow-lg',
      icon: <Radio size={14} className="text-gold-400 animate-pulse shrink-0" />,
    };
  };

  const config = getStatusConfig();

  return (
    <div className={`relative z-50 overflow-hidden py-2.5 px-4 text-xs transition-colors duration-500 ${config.containerClass}`}>
      <div className="container-x flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {config.icon}

          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-black shrink-0 ${config.badgeClass}`}>
            {config.badgeText}
          </span>

          <span className="font-semibold leading-tight text-white/95 truncate">
            {config.text}
          </span>
        </div>

        <div className="flex items-center gap-3 ms-auto shrink-0">
          <Link
            href="/live"
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-black transition-all ${config.buttonClass}`}
          >
            <span>{config.buttonText}</span>
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
