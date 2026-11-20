'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Headphones, MapPin, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: 'تأكيد فوري وإلغاء مرن',
    description: 'حجز مؤكد بلحظات مع مرونة كاملة لتعديل المواعيد أو الإلغاء بدون تعقيدات لمعظم الباقات.',
    badge: 'حجز مضمون 100%',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
  },
  {
    icon: Headphones,
    title: 'كونسيرج VIP متاح 24/7',
    description: 'مساعد سفر وكونسيرج شخصي يرافقك طوال رحلتك لتلبية أدق رغباتك واستفساراتك على مدار الساعة.',
    badge: 'خدمة كبار الشخصيات',
    color: 'from-gold-500/20 to-amber-600/10 border-gold-500/30 text-gold-400',
  },
  {
    icon: MapPin,
    title: 'شبكة فروع المملكة (13 فرعاً)',
    description: 'حضور ميداني رسمي وفروع في كافة مناطق المملكة من الرياض إلى العلا وعسير لخدمتك عن قرب.',
    badge: 'تغطية شاملة بالمملكة',
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
  },
  {
    icon: Sparkles,
    title: 'تجارب سياحية سعودية حصرية',
    description: 'باقات متكاملة تشمل الفلل والمنتجعات الفاخرة، واليخوت الخاصة، وطائرات VIP وسيارات الرنج روفر.',
    badge: 'أعلى معايير الجودة',
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
  },
];

export default function BookingValueProps() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-10 sm:py-14 text-white border-y border-white/5">
      <div className="container-x relative">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/60 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-navy-900/90 hover:shadow-gold"
              >
                {/* Accent Top Line */}
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-gradient-to-br ${item.color} shadow-inner transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={24} />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-sm sm:text-base font-black text-white group-hover:text-gold-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-white/70">
                      {item.description}
                    </p>
                    <span className="inline-block pt-1 text-[10px] font-bold text-gold-400/90 tracking-wide">
                      {item.badge} ←
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
