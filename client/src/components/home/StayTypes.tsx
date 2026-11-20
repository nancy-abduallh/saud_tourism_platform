'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BedDouble, Building, Castle, Compass, Sparkles, Tent, Trees } from 'lucide-react';

const STAY_TYPES = [
  {
    title: 'فلل وشاليهات خاصة',
    subtitle: 'مسابح خاصة وإطلالات بانورامية خلابة',
    count: '28 وجهة وفيلا',
    image: '/images/pkg-2.jpg',
    href: '/packages?type=villas',
    badge: 'خصوصية VIP مطلقة',
    icon: Castle,
  },
  {
    title: 'مخيمات ملكية وسفاري',
    subtitle: 'خيام فندقية 5 نجوم تحت أضواء النجوم',
    count: '19 مخيماً ملكياً',
    image: '/images/tuwaiq-safari.jpg',
    href: '/packages?type=glamping',
    badge: 'تخييم فاخر',
    icon: Tent,
  },
  {
    title: 'أجنحة فندقية 5 نجوم',
    subtitle: 'أرقى سلاسل الضيافة العالمية بالمملكة',
    count: '42 فندقاً وجناحاً',
    image: '/images/pkg-1.jpg',
    href: '/packages?type=hotels',
    badge: 'خدمة كبار الشخصيات',
    icon: Building,
  },
  {
    title: 'نزل ريفية وتراثية أصيلة',
    subtitle: 'عيش عبق التاريخ في الدرعية ورجال ألمع',
    count: '16 نزلاً تراثياً',
    image: '/images/diriyah.jpg',
    href: '/packages?type=heritage',
    badge: 'أصالة سعودية',
    icon: Trees,
  },
];

export default function StayTypes() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container-x relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold text-gold-300">
              <Sparkles size={13} className="text-gold-400" />
              <span>تنوع الإقامة والتجارب</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              ابحث حسب نوع مكان الإقامة والتجربة
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl">
              اختر أسلوب إقامتك المفضل في رحلتك القادمة عبر تشكيلة من أفخم أماكن الضيافة في المملكة العربية السعودية.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors group"
          >
            <span>استعراض كافة الباقات</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* 4 Responsive Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAY_TYPES.map((stay, idx) => {
            const Icon = stay.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={stay.href}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-navy-900/80 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-black"
                >
                  {/* Image Aspect Box */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-950">
                    <img
                      src={stay.image}
                      alt={stay.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Pill */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/80 px-3 py-1 text-[11px] font-bold text-gold-300 backdrop-blur-md">
                      <Icon size={12} className="text-gold-400" />
                      <span>{stay.badge}</span>
                    </div>

                    {/* Count Badge Bottom Right of Image */}
                    <div className="absolute bottom-3 right-3">
                      <span className="inline-block rounded-xl bg-gold-gradient px-2.5 py-1 text-[10px] font-black text-navy-950 shadow-md">
                        {stay.count}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-black text-white group-hover:text-gold-300 transition-colors">
                      {stay.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-white/70 leading-relaxed">
                      {stay.subtitle}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                      <span className="text-gold-400 font-bold group-hover:underline">
                        اكتشف الإقامات
                      </span>
                      <span className="text-white/50 transition-transform group-hover:-translate-x-1">
                        ←
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
