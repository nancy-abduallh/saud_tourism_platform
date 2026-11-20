'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Crown, Gift, ShieldCheck, Sparkles, Star } from 'lucide-react';
import type { VipBannerConfig } from '@/lib/types';

export default function VipClubBanner({ config }: { config?: VipBannerConfig }) {
  const title = config?.title || 'سافر أكثر، واستمتع بمزايا فندقية وحصرية لا تضاهى';
  const subtitle =
    config?.subtitle ||
    'انضم مجاناً إلى برنامج النخبة لنادي النجوم للسياحة واستفد فوراً من خصومات تبدأ من 10% إلى 20% على كافة حجوزاتك، مع ترقية مجانية للفلل والأجنحة، وخدمة كونسيرج واستقبال خاص بسيارات Range Rover الفارهة.';
  const badge = config?.badge || 'برنامج الولاء ونادي النخبة';
  const ctaText = config?.ctaText || 'انضم لنادي النجوم مجاناً الآن';
  const ctaLink = config?.ctaLink || '/contact';

  return (
    <section className="relative overflow-hidden bg-navy-950 py-12 sm:py-16 text-white border-y border-white/5">
      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-gold-500/40 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-8 sm:p-12 shadow-2xl backdrop-blur-xl"
        >
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-pattern opacity-15" />

          <div className="relative grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Column: Visual VIP Badge */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-gold-500/50 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 text-center shadow-gold">
                <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500/30 to-amber-500/10 border border-gold-500/40">
                  <Crown size={36} className="text-gold-400" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-gold-500" />
                  </span>
                </div>
                <span className="font-display text-lg font-black text-white">نادي النجوم</span>
                <span className="text-[10px] font-bold tracking-widest text-gold-400">SA STARS VIP</span>
                <span className="mt-2 rounded-full bg-gold-500/15 border border-gold-500/30 px-3 py-0.5 text-[10px] font-bold text-gold-300">
                  عضوية مجانية دائمة
                </span>
              </div>
            </div>

            {/* Right Column: Information & Actions */}
            <div className="lg:col-span-9 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold text-gold-300">
                  <Sparkles size={13} className="text-gold-400" />
                  <span>{badge}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed max-w-3xl">
                  {subtitle}
                </p>
              </div>

              {/* 4 Benefit Pills */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-2">
                {[
                  { text: 'خصم فوري 10% إلى 20%', icon: Gift },
                  { text: 'ترقية مجانية للفلل والأجنحة', icon: Award },
                  { text: 'استقبال خاص بسيارات VIP', icon: Crown },
                  { text: 'تسجيل وصول مبكر ومغادرة متأخرة', icon: ShieldCheck },
                ].map((b, i) => {
                  const BIcon = b.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-navy-950/60 p-3 text-xs font-bold text-white/90 backdrop-blur-md"
                    >
                      <BIcon size={16} className="text-gold-400 shrink-0" />
                      <span>{b.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 text-xs font-black text-navy-950 shadow-gold transition-all hover:scale-105"
                >
                  <Sparkles size={14} />
                  <span>{ctaText}</span>
                </Link>

                <Link
                  href="/#vip"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-white/10 hover:border-gold-500/40"
                >
                  <span>استكشف مزايا العضوية VIP</span>
                  <span>←</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
