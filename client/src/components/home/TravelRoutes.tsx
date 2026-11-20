'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Car, Compass, MapPin, Navigation, Plane, Train } from 'lucide-react';

interface RouteItem {
  to: string;
  type: string;
  duration: string;
  priceFrom: string;
  icon: typeof Plane;
  badge: string;
  slug: string;
}

const DEPARTURES: { city: string; label: string; routes: RouteItem[] }[] = [
  {
    city: 'riyadh',
    label: 'من الرياض',
    routes: [
      {
        to: 'العلا (مدائن صالح ومرايا)',
        type: 'طيران مباشر',
        duration: '1 ساعة و 45 دقيقة',
        priceFrom: '1,850 ر.س',
        icon: Plane,
        badge: 'الأكثر حجزاً',
        slug: 'alula',
      },
      {
        to: 'أبها وعسير (جبال السودة)',
        type: 'طيران مباشر',
        duration: '1 ساعة و 35 دقيقة',
        priceFrom: '1,600 ر.س',
        icon: Plane,
        badge: 'أجواء ضبابية',
        slug: 'asir',
      },
      {
        to: 'البحر الأحمر وأمالا',
        type: 'طيران مباشر',
        duration: 'ساعتان',
        priceFrom: '2,400 ر.س',
        icon: Plane,
        badge: 'جزر بكر',
        slug: 'red-sea',
      },
      {
        to: 'حائل (قصر القشلة ونفود جبة)',
        type: 'قطار سار الفاخر أو طيران',
        duration: 'ساعتان و 50 دقيقة',
        priceFrom: '950 ر.س',
        icon: Train,
        badge: 'رحلة قطار مريحة',
        slug: 'hail',
      },
      {
        to: 'الدرعية وحافة العالم طويق',
        type: 'سيارات دفع رباعي VIP',
        duration: 'ساعة و 15 دقيقة',
        priceFrom: '750 ر.س',
        icon: Car,
        badge: 'رحلة يومية',
        slug: 'diriyah',
      },
      {
        to: 'الأحساء (واحة النخيل وجبل القارة)',
        type: 'قطار أو سيارة خاصة',
        duration: 'ساعتان و 45 دقيقة',
        priceFrom: '850 ر.س',
        icon: Train,
        badge: 'واحة عالمية',
        slug: 'ahsa',
      },
    ],
  },
  {
    city: 'jeddah',
    label: 'من جدة والمنطقة الغربية',
    routes: [
      {
        to: 'العلا والمدينة المنورة',
        type: 'طيران مباشر أو سيارة خاصة',
        duration: '1 ساعة و 15 دقيقة',
        priceFrom: '1,450 ر.س',
        icon: Plane,
        badge: 'سياحة وتراث',
        slug: 'alula',
      },
      {
        to: 'منتجعات البحر الأحمر وأمالا',
        type: 'يخت خاص أو طيران',
        duration: 'ساعة واحدة',
        priceFrom: '2,100 ر.س',
        icon: Plane,
        badge: 'فخامة ساحلية',
        slug: 'red-sea',
      },
      {
        to: 'مرتفعات الطائف والهدا',
        type: 'سيارة VIP خاصة',
        duration: 'ساعة و 30 دقيقة',
        priceFrom: '650 ر.س',
        icon: Car,
        badge: 'مصيف سياحي',
        slug: 'taif',
      },
      {
        to: 'جزر فرسان وجازان',
        type: 'طيران مباشر',
        duration: '1 ساعة و 20 دقيقة',
        priceFrom: '1,500 ر.س',
        icon: Plane,
        badge: 'محمية مرجانية',
        slug: 'farasan',
      },
    ],
  },
  {
    city: 'dammam',
    label: 'من الدمام والشرقية',
    routes: [
      {
        to: 'الرياض والدرعية التاريخية',
        type: 'قطار أو طيران سريع',
        duration: 'ساعة و 10 دقائق',
        priceFrom: '650 ر.س',
        icon: Train,
        badge: 'سياحة وثقافة',
        slug: 'diriyah',
      },
      {
        to: 'العلا وعجائب التاريخ',
        type: 'طيران مباشر',
        duration: 'ساعتان و 15 دقيقة',
        priceFrom: '1,900 ر.س',
        icon: Plane,
        badge: 'رحلة أثرية',
        slug: 'alula',
      },
      {
        to: 'عسير والجنوب الأخضر',
        type: 'طيران مباشر',
        duration: 'ساعتان',
        priceFrom: '1,750 ر.س',
        icon: Plane,
        badge: 'طبيعة جبلية',
        slug: 'asir',
      },
    ],
  },
];

export default function TravelRoutes() {
  const [selectedCity, setSelectedCity] = useState('riyadh');

  const currentDeparture =
    DEPARTURES.find((d) => d.city === selectedCity) || DEPARTURES[0];

  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20 text-white border-t border-white/5">
      <div className="container-x relative">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold text-gold-300">
              <Navigation size={13} className="text-gold-400" />
              <span>خطوط السير والربط بين المدن</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              مسارات رائجة للمسافرين داخل المملكة
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl">
              تصفح أشهر مسارات التنقل السياحية بين فروع ومناطق المملكة مع متوسط أوقات الرحلات وأفضل الأسعار.
            </p>
          </div>

          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors group"
          >
            <span>استعراض فروع المملكة الـ 13</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* Departure City Pills */}
        <div className="mb-8 flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {DEPARTURES.map((dep) => {
            const isActive = dep.city === selectedCity;
            return (
              <button
                key={dep.city}
                type="button"
                onClick={() => setSelectedCity(dep.city)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gold-gradient text-navy-950 shadow-gold font-black scale-105'
                    : 'border border-white/10 bg-navy-900/70 text-white/80 hover:border-gold-500/40 hover:bg-navy-900 hover:text-white'
                }`}
              >
                <MapPin size={14} className={isActive ? 'text-navy-950' : 'text-gold-400'} />
                <span>{dep.label}</span>
              </button>
            );
          })}
        </div>

        {/* Routes Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCity}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentDeparture.routes.map((route, idx) => {
              const Icon = route.icon;
              return (
                <Link
                  key={idx}
                  href={`/packages?destination=${route.slug}`}
                  className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-navy-900/60 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:bg-navy-900/90 hover:shadow-xl"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-sm font-bold text-white group-hover:text-gold-300 transition-colors truncate">
                          {route.to}
                        </h4>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-white/60">
                        <span>{route.type}</span>
                        <span>•</span>
                        <span>{route.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-start pr-3 border-r border-white/10 shrink-0">
                    <span className="block text-[10px] text-white/50">ابتداءً من</span>
                    <span className="font-display text-xs font-black text-gold-gradient">
                      {route.priceFrom}
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
