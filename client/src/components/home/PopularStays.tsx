'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Castle, Heart, MapPin, Sparkles, Star, Trees } from 'lucide-react';

const POPULAR_STAYS = [
  {
    id: 1,
    name: 'منتجع فلل الحجر الصخرية الخاصة',
    city: 'العلا',
    region: 'منطقة المدينة المنورة',
    rating: '9.9',
    ratingLabel: 'استثنائي',
    reviewsCount: '412 تقييم',
    price: '3,850 ر.س / الليلة',
    image: '/images/alula.jpg',
    badge: 'الأعلى تقييماً',
    highlights: 'مسبح صخري خاص • إطلالة على الجبال • كونسيرج 24/7',
  },
  {
    id: 2,
    name: 'فيلا أمالا الملكية العائمة على البحر',
    city: 'البحر الأحمر',
    region: 'منطقة تبوك',
    rating: '9.8',
    ratingLabel: 'خيالي',
    reviewsCount: '328 تقييم',
    price: '4,500 ر.س / الليلة',
    image: '/images/red-sea.jpg',
    badge: 'فخامة شاطئية',
    highlights: 'مدخل خاص للشاطئ • طاهٍ خاص • يخت مع الباقة',
  },
  {
    id: 3,
    name: 'شاليه السحاب البانورامي بين الغيوم',
    city: 'السودة - أبها',
    region: 'منطقة عسير',
    rating: '9.7',
    ratingLabel: 'ممتاز جداً',
    reviewsCount: '265 تقييم',
    price: '2,200 ر.س / الليلة',
    image: '/images/asir.jpg',
    badge: 'طبيعة ساحرة',
    highlights: 'إطلالة حافة الجبل • مدفأة حطب تراثية • أجواء معتدلة',
  },
  {
    id: 4,
    name: 'نزل البجيري التراثي الفاخر',
    city: 'الدرعية',
    region: 'منطقة الرياض',
    rating: '9.9',
    ratingLabel: 'استثنائي',
    reviewsCount: '380 تقييم',
    price: '2,600 ر.س / الليلة',
    image: '/images/diriyah.jpg',
    badge: 'أصالة وتاريخ',
    highlights: 'طراز نجدي أصيل • مطل على وادي حنيفة • ضيافة ملكية',
  },
];

export default function PopularStays() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 text-navy-950 border-t border-slate-200">
      <div className="container-x relative">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <Star size={13} className="text-gold-600 fill-gold-600" />
              <span>تجارب حازت على ثقة ضيوفنا</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950">
              بيوت وملاذات يفضلها الضيوف
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
              أماكن إقامة استثنائية حصدت أعلى تقييمات الرضا لرواد الفخامة والباحثين عن أرقى تجارب الضيافة السعودية.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-gold-700 hover:text-gold-800 transition-colors group"
          >
            <span>استعراض كافة الإقامات</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* 4 Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_STAYS.map((stay, idx) => (
            <motion.div
              key={stay.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href="/packages"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/80 px-3 py-1 text-[11px] font-bold text-gold-300 backdrop-blur-md">
                    <Sparkles size={11} className="text-gold-400" />
                    <span>{stay.badge}</span>
                  </div>

                  {/* City Bottom Right */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-white/20 bg-navy-950/85 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-md">
                    <MapPin size={11} className="text-gold-400" />
                    <span>{stay.city}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    {/* Rating row */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-8 items-center justify-center rounded-lg bg-gold-gradient text-[11px] font-black text-navy-950 shadow-sm">
                        {stay.rating}
                      </span>
                      <span className="text-xs font-bold text-navy-950">{stay.ratingLabel}</span>
                      <span className="text-[11px] text-slate-500">• {stay.reviewsCount}</span>
                    </div>

                    <h3 className="font-display text-base font-black text-navy-950 group-hover:text-gold-700 transition-colors line-clamp-1">
                      {stay.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{stay.region}</p>

                    <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200/80 p-2 text-[11px] text-slate-700 line-clamp-1">
                      {stay.highlights}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-400">السعر ابتداءً من</span>
                      <span className="font-display text-sm font-black text-navy-950">
                        {stay.price}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-gold-700 group-hover:text-gold-800 group-hover:underline">
                      عرض الإقامة ←
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
