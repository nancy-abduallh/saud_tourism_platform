'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Plane, Sparkles, Tag, Timer } from 'lucide-react';

interface PlannerItem {
  id: string;
  name: string;
  region: string;
  travelTime: string;
  priceFrom: string;
  image: string;
  rating: string;
  badge: string;
}

const CATEGORIES: { id: string; label: string; icon: string; items: PlannerItem[] }[] = [
  {
    id: 'beach',
    label: 'شواطئ وجزر ساحلية',
    icon: '🏖️',
    items: [
      {
        id: 'red-sea-1',
        name: 'منتجع جزر أمهات الشيخ',
        region: 'البحر الأحمر',
        travelTime: 'طيران مباشر 1 س و 40 د من الرياض',
        priceFrom: '3,800 ر.س',
        image: '/images/red-sea.jpg',
        rating: '4.9 ★',
        badge: 'جزر عذراء ويخوت',
      },
      {
        id: 'farasan-1',
        name: 'أرخبيل جزر فرسان البكر',
        region: 'جازان',
        travelTime: 'طيران + عبارة فاخرة ساعتان',
        priceFrom: '2,200 ر.س',
        image: '/images/pkg-5.jpg',
        rating: '4.8 ★',
        badge: 'محمية بحرية',
      },
      {
        id: 'haql-1',
        name: 'شواطئ حقل ومقنا الفيروزية',
        region: 'تبوك',
        travelTime: 'طيران إلى تبوك ساعتان',
        priceFrom: '1,950 ر.س',
        image: '/images/hero-2.jpg',
        rating: '4.9 ★',
        badge: 'سفينة جورجيوس الغارقة',
      },
      {
        id: 'jeddah-1',
        name: 'شاليهات درة العروس وإبحار اليخوت',
        region: 'جدة',
        travelTime: 'طيران 1 س و 30 د من الرياض',
        priceFrom: '2,400 ر.س',
        image: '/images/pkg-3.jpg',
        rating: '4.8 ★',
        badge: 'إبحار وغروب VIP',
      },
    ],
  },
  {
    id: 'nature',
    label: 'طبيعة واسترخاء جبلي',
    icon: '⛰️',
    items: [
      {
        id: 'asir-1',
        name: 'مرتفعات السودة والغيوم',
        region: 'عسير - أبها',
        travelTime: 'طيران مباشر 1 س و 35 د',
        priceFrom: '2,100 ر.س',
        image: '/images/asir.jpg',
        rating: '4.9 ★',
        badge: 'أعلى قمة بالمملكة',
      },
      {
        id: 'disah-1',
        name: 'واحة وادي الديسة الطبيعية',
        region: 'تبوك',
        travelTime: 'طيران إلى تبوك ساعتان',
        priceFrom: '1,800 ر.س',
        image: '/images/gallery-2.jpg',
        rating: '4.9 ★',
        badge: 'عيون نخيل ومياه عذبة',
      },
      {
        id: 'taif-1',
        name: 'منتجعات الهدا وجبال الشفا',
        region: 'الطائف',
        travelTime: 'طيران أو سيارة 1 س من جدة',
        priceFrom: '1,500 ر.س',
        image: '/images/pkg-4.jpg',
        rating: '4.7 ★',
        badge: 'عروس المصائف',
      },
      {
        id: 'qassim-1',
        name: 'مزارع النخيل والنزل الريفية',
        region: 'القصيم - عنيزة',
        travelTime: 'ساعتان ونصف بالسيارة من الرياض',
        priceFrom: '1,200 ر.س',
        image: '/images/gallery-4.jpg',
        rating: '4.8 ★',
        badge: 'هدوء ريفي أصيل',
      },
    ],
  },
  {
    id: 'heritage',
    label: 'تراث وثقافة أصيلة',
    icon: '🏛️',
    items: [
      {
        id: 'diriyah-1',
        name: 'حي الطريف ومطل البجيري',
        region: 'الدرعية - الرياض',
        travelTime: '25 دقيقة من مركز الرياض',
        priceFrom: '1,100 ر.س',
        image: '/images/diriyah.jpg',
        rating: '5.0 ★',
        badge: 'تراث عالمي (يونسكو)',
      },
      {
        id: 'hegra-1',
        name: 'مدينة الحجر الأثرية (مدائن صالح)',
        region: 'العلا',
        travelTime: 'طيران مباشر 1 س و 45 د',
        priceFrom: '3,200 ر.س',
        image: '/images/alula.jpg',
        rating: '5.0 ★',
        badge: 'آثار الأنباط الخالدة',
      },
      {
        id: 'rijal-alma-1',
        name: 'قرية رجال ألمع الحجرية',
        region: 'عسير',
        travelTime: '45 دقيقة من مطار أبها',
        priceFrom: '1,650 ر.س',
        image: '/images/pkg-6.jpg',
        rating: '4.9 ★',
        badge: 'عمارة عسيرية فريدة',
      },
      {
        id: 'hail-1',
        name: 'قصر القشلة ونقوش جبة الأثرية',
        region: 'حائل',
        travelTime: 'قطار سار ساعتان و 50 د',
        priceFrom: '1,400 ر.س',
        image: '/images/gallery-3.jpg',
        rating: '4.8 ★',
        badge: 'كرم حاتمي أصيل',
      },
    ],
  },
  {
    id: 'safari',
    label: 'سفاري ومغامرات صحراوية',
    icon: '🚙',
    items: [
      {
        id: 'tuwaiq-1',
        name: 'حافة العالم وجبال طويق',
        region: 'الرياض',
        travelTime: 'ساعة ونصف بسيارات الدفع الرباعي',
        priceFrom: '950 ر.س',
        image: '/images/tuwaiq-edge.jpg',
        rating: '4.9 ★',
        badge: 'سفاري وهايكنج VIP',
      },
      {
        id: 'desert-1',
        name: 'مخيم نفود قنا ومغامرة الكثبان',
        region: 'حائل',
        travelTime: 'طيران أو قطار إلى حائل',
        priceFrom: '1,750 ر.س',
        image: '/images/tuwaiq-safari.jpg',
        rating: '4.8 ★',
        badge: 'تخييم وشواء نجدي',
      },
      {
        id: 'empty-quarter-1',
        name: 'رحلة استكشاف الربع الخالي الملكية',
        region: 'المنطقة الشرقية',
        travelTime: 'قافلة دفع رباعي وطيران خاص',
        priceFrom: '4,500 ر.س',
        image: '/images/pkg-1.jpg',
        rating: '5.0 ★',
        badge: 'أكبر بحر رمال بالعالم',
      },
      {
        id: 'kharj-1',
        name: 'سفاري عيون الخرج وقصر الملك عبدالعزيز',
        region: 'الخرج',
        travelTime: 'ساعة واحدة من جنوب الرياض',
        priceFrom: '750 ر.س',
        image: '/images/hero-1.jpg',
        rating: '4.7 ★',
        badge: 'رحلة اليوم الواحد',
      },
    ],
  },
  {
    id: 'spiritual',
    label: 'عمرة وزيارة بمعايير ملكية',
    icon: '✨',
    items: [
      {
        id: 'makkah-1',
        name: 'باقة العمرة الملكية - إطلالة الحرم',
        region: 'مكة المكرمة',
        travelTime: 'قطار الحرمين من مطار جدة 35 د',
        priceFrom: '3,500 ر.س',
        image: '/images/pkg-2.jpg',
        rating: '5.0 ★',
        badge: 'أبراج الساعة وأجنحة VIP',
      },
      {
        id: 'madinah-1',
        name: 'زيارة الروضة الشريفة ومزارات المدينة',
        region: 'المدينة المنورة',
        travelTime: 'طيران مباشر إلى مطار الأمير محمد',
        priceFrom: '2,800 ر.س',
        image: '/images/gallery-1.jpg',
        rating: '5.0 ★',
        badge: 'روحانية وضيافة متكاملة',
      },
    ],
  },
];

export default function QuickTripPlanner() {
  const [activeTab, setActiveTab] = useState('beach');

  const activeCategory =
    CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 text-navy-950 border-t border-slate-200">
      <div className="container-x relative">
        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <Compass size={14} className="text-gold-600" />
              <span>مخطط الرحلات الذكي</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950">
              مخطط رحلة سريع وسهل
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
              اختر الأجواء التي تفضلها لاستكشاف أفضل الوجهات المقترحة لك مع مدة السفر ومتوسط الأسعار.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-gold-700 hover:text-gold-800 transition-colors group"
          >
            <span>استكشف باقات {activeCategory.label}</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* Scrollable Horizontal Tabs */}
        <div className="mb-8 flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gold-gradient text-navy-950 shadow-md font-black scale-105'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-gold-500/40 hover:bg-white hover:text-navy-950 shadow-sm'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {activeCategory.items.map((item) => (
              <Link
                key={item.id}
                href="/packages"
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Right Region */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/80 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-md">
                    <MapPin size={11} className="text-gold-400" />
                    <span>{item.region}</span>
                  </div>

                  {/* Top Left Rating */}
                  <div className="absolute top-3 left-3 rounded-lg border border-gold-500/40 bg-navy-950/85 px-2 py-0.5 text-[10px] font-bold text-gold-300 backdrop-blur-md">
                    {item.rating}
                  </div>

                  {/* Badge Bottom Right */}
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-lg bg-navy-950/90 border border-gold-500/30 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-base font-black text-navy-950 group-hover:text-gold-700 transition-colors">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Plane size={12} className="text-gold-600 shrink-0" />
                      <span className="truncate">{item.travelTime}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <span className="block text-[10px] text-slate-500">يبدأ من</span>
                      <span className="font-display text-sm font-black text-navy-950">
                        {item.priceFrom}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-xl bg-gold-50 border border-gold-300/50 px-3 py-1 text-xs font-bold text-gold-800 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                      <span>عرض الباقة</span>
                      <span>←</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
