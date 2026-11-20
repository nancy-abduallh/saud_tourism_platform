'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Compass, MapPin, Sparkles } from 'lucide-react';
import type { ExploreCityItem } from '@/lib/types';

const CITIES = [
  {
    name: 'حائل',
    title: 'عروس الشمال ونفود جبة',
    count: '18 باقة وتجربة',
    image: '/images/gallery-3.jpg',
    href: '/packages?destination=hail',
    badge: 'كرم حاتمي',
  },
  {
    name: 'تبوك',
    title: 'وادي الديسة وسواحل حقل',
    count: '14 باقة وتجربة',
    image: '/images/gallery-2.jpg',
    href: '/packages?destination=tabuk',
    badge: 'طبيعة بكر',
  },
  {
    name: 'الطائف',
    title: 'عروس المصائف وقمم الهدا',
    count: '15 باقة وتجربة',
    image: '/images/pkg-4.jpg',
    href: '/packages?destination=taif',
    badge: 'أجواء صيفية',
  },
  {
    name: 'القصيم',
    title: 'واحات النخيل وعنيزة التراثية',
    count: '12 باقة وتجربة',
    image: '/images/gallery-4.jpg',
    href: '/packages?destination=qassim',
    badge: 'نزل ريفية',
  },
  {
    name: 'الخرج',
    title: 'عيون الماء وقصر الملك عبدالعزيز',
    count: '9 باقات وتجربة',
    image: '/images/hero-1.jpg',
    href: '/packages?destination=kharj',
    badge: 'قريبة من الرياض',
  },
  {
    name: 'جازان',
    title: 'جزر فرسان وأرخبيل المرجان',
    count: '11 باقة وتجربة',
    image: '/images/red-sea.jpg',
    href: '/packages?destination=jazan',
    badge: 'جزر فيروزية',
  },
];

export default function ExploreCities({ items }: { items?: ExploreCityItem[] }) {
  const displayCities = items && items.length > 0 ? items : CITIES;

  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-14 sm:py-16 text-navy-950 border-t border-slate-200/80">
      <div className="container-x relative">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <Compass size={13} className="text-gold-600" />
              <span>اكتشف تنوع المملكة</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-navy-950">
              استكشف مدن ومناطق المملكة
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
              وجهات سياحية مميزة توفر لك تجارب ترفيهية، وتاريخية، وطبيعية استثنائية.
            </p>
          </div>

          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:text-gold-800 transition-colors group"
          >
            <span>عرض فروعنا الـ 13</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* 6 Responsive Grid Cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {displayCities.map((city, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
            >
              <Link
                href={city.href}
                className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-xl"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badge */}
                  <span className="absolute bottom-2 right-2 rounded-md bg-navy-950/90 border border-gold-500/30 px-2 py-0.5 text-[9px] font-bold text-gold-300">
                    {city.badge}
                  </span>
                </div>

                <div className="space-y-0.5 text-start">
                  <h4 className="font-display text-sm font-black text-navy-950 group-hover:text-gold-700 transition-colors">
                    {city.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {city.title}
                  </p>
                  <span className="block pt-1 text-[10px] font-bold text-gold-700">
                    {city.count}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
