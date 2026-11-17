'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Calendar, Check, Copy, Radio, Share2 } from 'lucide-react';

interface LiveCountdownProps {
  targetDate: string;
  title: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReady: boolean;
}

export default function LiveCountdown({ targetDate, title }: LiveCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isReady: false,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function calculate() {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isReady: false,
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // When timer hits zero, automatically refresh page to show LIVE stream
  useEffect(() => {
    if (timeLeft.isReady) {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [timeLeft.isReady]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(
        `🔴 ندعوكم لحضور البث المباشر لحفل تدشين منصة SA للسياحة:\n${window.location.href}`
      );
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  // Google Calendar event URL generator
  const getGoogleCalendarUrl = () => {
    const startTime = new Date(targetDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = new Date(new Date(targetDate).getTime() + 2 * 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      'حفل التدشين الرسمي لمنصة SA للسياحة عبر الرابط: https://saudtourism.ksaplatforms.com/live'
    )}&location=${encodeURIComponent('المملكة العربية السعودية - بث مباشر')}`;
  };

  // State when countdown reaches zero
  if (timeLeft.isReady) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-red-500/50 bg-gradient-to-br from-navy-950 via-red-950/40 to-navy-900 p-8 sm:p-12 shadow-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-500/20 px-4 py-1.5 text-xs font-black text-red-300 animate-pulse">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          حان موعد انطلاق الحفل الرسمي الآن 🔴
        </div>

        <h3 className="mt-4 font-display text-2xl font-black text-white sm:text-4xl">
          البث المباشر ينطلق الآن!
        </h3>
        <p className="mt-2 text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
          وصلنا بحمد الله إلى موعد حفل التدشين الرسمي لمنصة SA للسياحة وفروع المملكة الـ 13. جاري تحديث الشاشة لنقل البث المباشر فوراً...
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 px-6 py-3 text-sm font-black text-white shadow-xl shadow-red-600/30 hover:scale-105 transition-all"
          >
            <span>انضم للبث المباشر الآن 🔴</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1 text-xs font-bold text-gold-300">
        <Bell size={13} className="animate-bounce" />
        موعد انطلاق البث المباشر وحفل التدشين
      </div>

      <h3 className="mt-4 font-display text-2xl font-black text-white sm:text-3xl">
        العد التنازلي لانطلاق الحفل
      </h3>
      <p className="mt-2 text-sm text-white/70 max-w-xl mx-auto">
        ينطلق البث المباشر الموحد لكافة فروع المملكة ومكاتب التمثيل الرسمية والضيوف الكرام في الموعد المحدد أدناه.
      </p>

      {/* Countdown Digits */}
      <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
        {[
          { label: 'يوم', value: timeLeft.days },
          { label: 'ساعة', value: timeLeft.hours },
          { label: 'دقيقة', value: timeLeft.minutes },
          { label: 'ثانية', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-2xl border border-gold-500/30 bg-navy-950/80 p-3 sm:p-5 shadow-inner"
          >
            <span className="font-display text-2xl font-black text-gold-gradient sm:text-5xl">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="mt-1 text-[11px] font-bold text-white/70 sm:text-xs">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-gold-500/50 bg-gold-500/15 px-5 py-2.5 text-xs font-bold text-gold-300 transition hover:bg-gold-500 hover:text-navy-950"
        >
          <Calendar size={15} />
          <span>إضافة إلى تقويمي (Google Calendar)</span>
        </a>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-2.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500 hover:text-navy-950"
        >
          <Share2 size={15} />
          <span>مشاركة عبر واتساب</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
          <span>{copied ? 'تم نسخ الرابط!' : 'نسخ رابط البث'}</span>
        </button>
      </div>
    </div>
  );
}
