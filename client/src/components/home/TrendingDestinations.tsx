'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Compass, Flame, MapPin, Sparkles, Star } from 'lucide-react';

const TRENDING_TOP = [
  {
    name: 'الرياض',
    subtitle: 'عاصمة الفعاليات العالمية، قصر الملك عبدالعزيز، والدرعية التاريخية',
    tag: '24 تجربة وباقة فاخرة',
    image: '/images/gallery-1.jpg',
    href: '/packages?destination=riyadh',
    rating: '4.9 ★',
    popularBadge: 'الأكثر زيارة هذا الموسم',
  },
  {
    name: 'العلا',
    subtitle: 'سحر مدائن صالح، وادي عشار، ومسرح مرايا وسط الصخور الشامخة',
    tag: '18 باقة واستكشاف',
    image: '/images/alula.jpg',
    href: '/packages?destination=alula',
    rating: '5.0 ★',
    popularBadge: 'الوجهة الأولى عالمياً',
  },
];

const TRENDING_BOTTOM = [
  {
    name: 'البحر الأحمر وأمالا',
    subtitle: 'جزر بكر عذراء، منتجعات شاطئية فائقة الفخامة ويخوت خاصة',
    tag: '14 تجربة بحرية',
    image: '/images/red-sea.jpg',
    href: '/packages?destination=red-sea',
    rating: '4.9 ★',
  },
  {
    name: 'عسير وأبها',
    subtitle: 'أجواء ضبابية وقمم جبال السودة الخضراء وقرية رجال ألمع',
    tag: '12 مساراً جبلياً',
    image: '/images/asir.jpg',
    href: '/packages?destination=asir',
    rating: '4.8 ★',
  },
  {
    name: 'الدرعية التاريخية',
    subtitle: 'مهد الدولة السعودية الأولى، حي الطريف التراثي ومطل البجيري الفاخر',
    tag: '10 تجارب ثقافية',
    image: '/images/diriyah.jpg',
    href: '/packages?destination=diriyah',
    rating: '4.9 ★',
  },
];

export default function TrendingDestinations() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20 text-white">
      <div className="container-x relative">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold text-gold-300">
              <Flame size={14} className="text-amber-400" />
              <span>خيارات شائعة بين المسافرين</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              الوجهات الرائجة في المملكة
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl">
              استكشف أكثر الوجهات السعودية طلباً وإقبالاً لقضاء عطلات استثنائية تصنع أروع الذكريات.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors group"
          >
            <span>عرض كافة الوجهات</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* Top Grid: 2 Large Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {TRENDING_TOP.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={dest.href}
                className="group relative block aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-navy-900 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-gold"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Top Right Saudi Flag Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/85 px-3.5 py-1 text-xs font-black text-white backdrop-blur-md shadow-lg">
                    <span className="text-base leading-none">🇸🇦</span>
                    <span>{dest.name}</span>
                  </span>
                  {dest.popularBadge && (
                    <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-black text-navy-950 shadow-md">
                      <Sparkles size={11} />
                      {dest.popularBadge}
                    </span>
                  )}
                </div>

                {/* Rating Top Left */}
                <div className="absolute top-4 left-4 rounded-xl border border-gold-500/30 bg-navy-950/80 px-2.5 py-1 text-xs font-black text-gold-300 backdrop-blur-md">
                  {dest.rating}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8">
                  <span className="inline-block rounded-xl bg-gold-500/20 border border-gold-500/40 px-3 py-1 text-[11px] font-bold text-gold-300 mb-2">
                    {dest.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-gold-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2 max-w-lg leading-relaxed">
                    {dest.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Grid: 3 Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRENDING_BOTTOM.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Link
                href={dest.href}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-navy-900 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-black"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/85 px-3 py-1 text-xs font-black text-white backdrop-blur-md">
                    <span>🇸🇦</span>
                    <span>{dest.name}</span>
                  </span>
                </div>

                <div className="absolute top-3 left-3 rounded-lg border border-gold-500/30 bg-navy-950/80 px-2 py-0.5 text-[11px] font-bold text-gold-300">
                  {dest.rating}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 right-0 left-0 p-5">
                  <span className="inline-block text-[10px] font-bold text-gold-400 mb-1">
                    {dest.tag}
                  </span>
                  <h3 className="font-display text-xl font-black text-white group-hover:text-gold-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {dest.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
