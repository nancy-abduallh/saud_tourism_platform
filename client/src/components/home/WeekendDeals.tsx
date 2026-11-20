'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Flame, Heart, MapPin, ShieldCheck, Sparkles, Star, Tag } from 'lucide-react';

const WEEKEND_DEALS = [
  {
    id: 1,
    title: 'إجازة نهاية الأسبوع في فيلا العلا ومسرح مرايا',
    destination: 'العلا',
    duration: '3 أيام / ليلتان',
    originalPrice: '4,800 ر.س',
    dealPrice: '3,360 ر.س',
    discount: 'خصم 30%',
    rating: '9.8',
    ratingLabel: 'استثنائي',
    reviewsCount: '280 تقييم',
    image: '/images/alula.jpg',
    features: ['فيلا خاصة مع مسبح', 'جولة مدائن صالح', 'تذاكر مسرح مرايا'],
    badge: 'عرض نهاية الأسبوع',
  },
  {
    id: 2,
    title: 'ملاذ عسير البانورامي بين السحب وجبال السودة',
    destination: 'عسير - أبها',
    duration: '3 أيام / ليلتان',
    originalPrice: '3,600 ر.س',
    dealPrice: '2,700 ر.س',
    discount: 'خصم 25%',
    rating: '9.7',
    ratingLabel: 'ممتاز جداً',
    reviewsCount: '195 تقييم',
    image: '/images/asir.jpg',
    features: ['شاليه مطل على السحاب', 'هايكنج مع مرشد', 'وجبات جنوبية فاخرة'],
    badge: 'الأكثر طلباً',
  },
  {
    id: 3,
    title: 'عطلة بحرية فاخرة بجزر البحر الأحمر واليخوت',
    destination: 'البحر الأحمر',
    duration: '4 أيام / 3 ليالٍ',
    originalPrice: '6,200 ر.س',
    dealPrice: '4,650 ر.س',
    discount: 'خصم 25%',
    rating: '9.9',
    ratingLabel: 'خيالي',
    reviewsCount: '340 تقييم',
    image: '/images/red-sea.jpg',
    features: ['يخت خاص 4 ساعات', 'إقامة 5 نجوم شاطئية', 'غوص مع مدرب PADI'],
    badge: 'باقة VIP',
  },
  {
    id: 4,
    title: 'عطلة استجمام وتراث في الدرعية ومطل البجيري',
    destination: 'الرياض والدرعية',
    duration: 'ليلتان / 3 أيام',
    originalPrice: '3,100 ر.س',
    dealPrice: '2,325 ر.س',
    discount: 'خصم 25%',
    rating: '9.8',
    ratingLabel: 'استثنائي',
    reviewsCount: '220 تقييم',
    image: '/images/diriyah.jpg',
    features: ['نزل تراثي فاخر', 'عشاء راقٍ في البجيري', 'سيارة خاصة بسائق'],
    badge: 'عطلة ثقافية',
  },
];

export default function WeekendDeals() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20 text-white">
      {/* Decorative Blur */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="container-x relative">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-300">
              <Flame size={14} className="text-red-400 animate-pulse" />
              <span>عروض وتخفيضات لفترة محدودة</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              عروض عطلة نهاية الأسبوع
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl">
              وفر حتى 30% مع باقات حصرية ومميزة صُممت لتمنحك عطلة نهاية أسبوع ساحرة مع كامل خدمات الـ VIP.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors group"
          >
            <span>عرض كافة العروض الترويجية</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WEEKEND_DEALS.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-900/90 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-black">
                {/* Image Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-950">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

                  {/* Discount Ribbon Top Right */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-3 py-1 text-xs font-black text-white shadow-lg">
                    <Tag size={12} />
                    <span>{deal.discount}</span>
                  </div>

                  {/* Favorite Button Top Left */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(e, deal.id)}
                    className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-navy-950/70 border border-white/20 text-white backdrop-blur-md transition hover:scale-110 hover:border-red-400"
                    aria-label="حفظ في المفضلة"
                  >
                    <Heart
                      size={16}
                      className={favorites[deal.id] ? 'fill-red-500 text-red-500' : 'text-white'}
                    />
                  </button>

                  {/* Destination Bottom Right */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/80 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-md">
                    <MapPin size={11} className="text-gold-400" />
                    <span>{deal.destination}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    {/* Rating row */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-8 items-center justify-center rounded-lg bg-gold-gradient text-[11px] font-black text-navy-950 shadow-sm">
                        {deal.rating}
                      </span>
                      <span className="text-xs font-bold text-white">{deal.ratingLabel}</span>
                      <span className="text-[11px] text-white/50">• {deal.reviewsCount}</span>
                    </div>

                    <h3 className="font-display text-base font-black text-white group-hover:text-gold-300 transition-colors line-clamp-2">
                      {deal.title}
                    </h3>

                    <div className="mt-2.5 flex items-center gap-1 text-[11px] text-white/60">
                      <Clock size={12} className="text-gold-400" />
                      <span>{deal.duration}</span>
                    </div>

                    {/* Feature bullets */}
                    <ul className="mt-3 space-y-1 text-[11px] text-white/70">
                      {deal.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-gold-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Section & CTA */}
                  <div className="mt-5 border-t border-white/10 pt-3 flex items-end justify-between">
                    <div>
                      <span className="block text-[11px] text-white/50 line-through">
                        {deal.originalPrice}
                      </span>
                      <div className="font-display text-lg font-black text-gold-gradient">
                        {deal.dealPrice}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">شامل الضريبة والخدمة</span>
                    </div>

                    <Link
                      href="/packages"
                      className="inline-flex items-center gap-1 rounded-xl bg-gold-gradient px-4 py-2 text-xs font-black text-navy-950 shadow-gold transition-transform hover:scale-105"
                    >
                      <span>احجز الآن</span>
                      <span>←</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
