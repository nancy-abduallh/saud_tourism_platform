'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Compass, Feather, MapPin, Quote, ShieldCheck, Sparkles } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';
import { DEFAULT_SETTINGS } from '@/lib/default-data';

interface OwnerMessageProps {
  settings?: SiteSettings | null;
}

export default function OwnerMessage({ settings }: OwnerMessageProps) {
  const ownerName = settings?.ownerName || DEFAULT_SETTINGS.ownerName || 'سعود الشمري';
  const ownerTitle = settings?.ownerTitle || DEFAULT_SETTINGS.ownerTitle || 'المالك';
  const ownerImage = settings?.ownerImage || DEFAULT_SETTINGS.ownerImage || '';
  const messageText = settings?.ownerMessage || DEFAULT_SETTINGS.ownerMessage || '';

  // Split into paragraphs for editorial layout
  const paragraphs = messageText
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-20 lg:py-28 text-white">
      {/* Ambient Luxury Lighting */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-pattern opacity-20" />

      <div className="container-x relative">
        {/* Top Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-bold text-gold-300 shadow-gold"
          >
            <Sparkles size={14} className="text-gold-400" />
            <span>كلمة القيادة والرؤية</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl"
          >
            كلمة الأستاذ / <span className="text-gold-gradient">{ownerName}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-sm text-gold-300/80 font-medium tracking-wide sm:text-base"
          >
            {ownerTitle} — الشركة السياحية (SA للسياحة)
          </motion.p>
        </div>

        {/* Main Card with Gold Outline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-gold-500/35 bg-gradient-to-br from-navy-900/90 via-navy-950/95 to-navy-900/90 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/80 backdrop-blur-xl"
        >
          {/* Subtle Watermark Quote Icon */}
          <div className="pointer-events-none absolute -bottom-10 -left-10 text-gold-500/5 select-none">
            <Quote size={240} className="rotate-180" />
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
            {/* Owner Image / VIP Executive Portrait Card (5 Columns) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Gold Outer Glow Ring */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-gold-500/40 via-amber-500/30 to-gold-400/40 blur-md opacity-75" />

                <div className="relative overflow-hidden rounded-3xl border-2 border-gold-500/50 bg-navy-950 p-3 shadow-2xl shadow-black">
                  {ownerImage ? (
                    /* When image is provided */
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900">
                      <img
                        src={ownerImage}
                        alt={`الأستاذ ${ownerName} - ${ownerTitle}`}
                        className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                    </div>
                  ) : (
                    /* Dignified Executive VIP Seal (Before photo upload) */
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 p-6 flex flex-col items-center justify-between text-center border border-gold-500/30">
                      <div className="flex items-center justify-between w-full">
                        <span className="inline-flex items-center gap-1 rounded-full border border-gold-500/40 bg-gold-500/10 px-2.5 py-1 text-[10px] font-bold text-gold-300">
                          <ShieldCheck size={12} />
                          رؤية 2030
                        </span>
                        <span className="text-[10px] text-white/50 font-mono">SA-TOURISM</span>
                      </div>

                      {/* Royal Crest Monogram */}
                      <div className="my-auto flex flex-col items-center">
                        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold-500/60 bg-gradient-to-br from-gold-500/20 via-navy-950 to-amber-500/20 shadow-gold">
                          <div className="absolute -inset-2 rounded-full border border-gold-500/30 animate-pulse" />
                          <div className="flex flex-col items-center text-center">
                            <span
                              className="allura-regular font-allura text-5xl leading-none text-gold-gradient drop-shadow-[0_2px_10px_rgba(243,211,122,0.45)]"
                              style={{ fontFamily: '"Allura", cursive' }}
                              dir="ltr"
                            >
                              SA
                            </span>
                            <span className="text-[9px] font-bold tracking-widest text-gold-300 -mt-1">
                              LEADERSHIP
                            </span>
                          </div>
                        </div>

                        <div className="mt-5">
                          <h4 className="font-display text-lg font-black text-white">
                            الأستاذ / {ownerName}
                          </h4>
                          <p className="text-xs font-bold text-gold-400 mt-0.5">
                            {ownerTitle} — الشركة السياحية
                          </p>
                        </div>
                      </div>

                      {/* Bottom Seal Notice */}
                      <div className="w-full pt-3 border-t border-gold-500/20 text-center">
                        <p className="text-[11px] text-white/70 font-medium">
                          صانع تجارب سياحية سعودية بمعايير عالمية
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Floating Identity Strip */}
                  <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl bg-navy-900/80 border border-gold-500/20 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gold-400 animate-ping" />
                      <span className="font-bold text-white">{ownerName}</span>
                    </div>
                    <span className="rounded-md bg-gold-500/20 px-2 py-0.5 text-[11px] font-black text-gold-300">
                      {ownerTitle} — الشركة السياحية
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Text Content (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3 text-gold-400">
                <Quote size={28} className="text-gold-400 shrink-0" />
                <span className="text-xs font-bold tracking-widest text-gold-400/90 uppercase">
                  رسالة من القلب إلى ضيوفنا الكرام
                </span>
              </div>

              {/* Editorial Paragraphs */}
              <div className="space-y-4 text-white/90 leading-relaxed font-sans text-sm sm:text-base lg:text-lg">
                {paragraphs.map((para, i) => {
                  const hasBasmala = para.includes('بسم الله الرحمن الرحيم');
                  const hasSalam = para.includes('السلام عليكم ورحمة الله وبركاته');
                  const isIntro =
                    para.includes('يسعدني ويشرفني') ||
                    para.includes('اعرفكم بنفسي') ||
                    para.includes('أعرفكم بنفسي');
                  const isRoyalTribute =
                    para.includes('خادم الحرمين') ||
                    para.includes('سلمان بن عبدالعزيز') ||
                    para.includes('محمد بن سلمان') ||
                    para.includes('رؤية 2030');
                  const isFarewell = para.trim() === 'والسلام عليكم ورحمة الله وبركاته';
                  const isCallout = para.includes('السياحة ليست مجرد رحلة');
                  const isWelcoming = para.includes('أرحب بكم');

                  if (hasBasmala && hasSalam) {
                    return (
                      <div key={i} className="flex flex-col items-start gap-1 pb-3 border-b border-gold-500/20">
                        <span className="font-display font-bold text-gold-400 text-base sm:text-lg tracking-wide">
                          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </span>
                        <span className="text-white/85 font-medium text-xs sm:text-sm">
                          السلام عليكم ورحمة الله وبركاته
                        </span>
                      </div>
                    );
                  }

                  if (hasBasmala) {
                    return (
                      <div key={i} className="font-display font-bold text-gold-400 text-base sm:text-lg tracking-wide pb-1">
                        {para}
                      </div>
                    );
                  }

                  if (hasSalam && i <= 2) {
                    return (
                      <div key={i} className="text-white/85 font-medium text-xs sm:text-sm pb-2 border-b border-gold-500/20">
                        {para}
                      </div>
                    );
                  }

                  if (isFarewell) {
                    return (
                      <div key={i} className="font-bold text-gold-300 text-sm sm:text-base pt-2">
                        {para}
                      </div>
                    );
                  }

                  if (isIntro) {
                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-gold-500/35 bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-transparent p-4 text-sm sm:text-base"
                      >
                        <p className="font-medium text-gold-200 leading-relaxed">
                          {para}
                        </p>
                      </div>
                    );
                  }

                  if (isRoyalTribute) {
                    return (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-2xl border border-gold-500/40 bg-gradient-to-br from-navy-900/95 via-navy-950 to-navy-900/90 p-5 sm:p-6 shadow-xl backdrop-blur-md"
                      >
                        <div className="mb-3 flex items-center justify-between gap-2 border-b border-gold-500/20 pb-2.5">
                          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-300">
                            <ShieldCheck size={16} className="text-gold-400" />
                            <span>في ظل القيادة الرشيدة ورؤية المملكة 2030</span>
                          </div>
                          <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                            🇸🇦 وطن العطاء والنماء
                          </span>
                        </div>
                        <p className="text-white/95 text-sm sm:text-base leading-loose font-normal">
                          {para}
                        </p>
                      </div>
                    );
                  }

                  if (isCallout) {
                    return (
                      <p
                        key={i}
                        className="font-medium text-white text-base sm:text-lg lg:text-xl leading-relaxed border-r-2 border-gold-500 pr-4"
                      >
                        {para}
                      </p>
                    );
                  }

                  if (isWelcoming) {
                    return (
                      <p key={i} className="font-bold text-gold-200 text-base sm:text-lg pt-1">
                        {para}
                      </p>
                    );
                  }

                  return (
                    <p key={i} className="text-white/85 text-sm sm:text-base leading-loose">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Signature & Official Accreditation Block */}
              <div className="pt-6 border-t border-gold-500/25 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <div className="font-display text-2xl font-black text-gold-gradient tracking-wide">
                    أخوكم / {ownerName}
                  </div>
                  <div className="text-xs text-white/70 font-semibold mt-0.5">
                    {ownerTitle} — الشركة السياحية
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/packages"
                    className="btn-gold !py-2.5 !px-5 text-xs font-black shadow-gold hover:scale-105"
                  >
                    استكشف تجاربنا الفاخرة
                  </Link>
                  <Link
                    href="/branches"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2.5 text-xs font-bold text-gold-300 hover:bg-gold-500 hover:text-navy-950 transition-colors"
                  >
                    <MapPin size={13} />
                    <span>فروعنا الـ 13</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
