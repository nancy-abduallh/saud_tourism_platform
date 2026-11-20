'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowLeft,
  Building2,
  CheckCircle2,
  FileCheck,
  HeartHandshake,
  HeartPulse,
  Hospital,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';

const MEDICAL_FEATURES = [
  {
    icon: Hospital,
    title: 'صروح ومدن طبية مرجعية عالمية',
    subtitle: 'تنسيق مباشر مع مستشفى الملك فيصل التخصصي، مدينة سلطان بن عبدالعزيز الإنسانية، ومدينة الملك فهد الطبية المعتمدة دولياً (JCI).',
    badge: 'اعتماد دولي JCI',
    color: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-700',
  },
  {
    icon: HeartHandshake,
    title: 'كونسيرج ورعاية المرضى الدوليين 24/7',
    subtitle: 'تسهيل إصدار التأشيرات العلاجية للمريض ومرافقيه، ومرافق ومترجم طبي خاص على مدار الساعة طوال فترة الإقامة.',
    badge: 'خدمة كبار الشخصيات',
    color: 'from-gold-500/10 to-amber-500/5 border-gold-500/20 text-gold-700',
  },
  {
    icon: Plane,
    title: 'إخلاء واستقبال طبي VIP من الطائرة',
    subtitle: 'أسطول إسعاف جوي مجهز بأحدث وحدات العناية المركزة واستقبال حصري من مدرج المطار حتى الجناح الملكي بالمستشفى.',
    badge: 'نقل طبي فوري',
    color: 'from-blue-500/10 to-sky-500/5 border-blue-500/20 text-blue-700',
  },
  {
    icon: Sparkles,
    title: 'برامج نقاهة واستشفاء طبيعي ملكي',
    subtitle: 'مرحلة تعافٍ واسترخاء بعد العلاج في مصحات ومنتجعات البحر الأحمر وأمالا الاستشفائية، وهواء جبال عسير وواحات العلا.',
    badge: 'استشفاء وسياحة',
    color: 'from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-700',
  },
];

const STATS = [
  { value: '+95%', label: 'نسبة نجاح الجراحات المعقدة' },
  { value: '100%', label: 'مستشفيات معتمدة دولياً (JCI)' },
  { value: '24/7', label: 'مرافقة طبية ومترجم خاص' },
  { value: '13 فرعاً', label: 'تغطية وتنسيق ميداني شامل' },
];

export default function MedicalTourismSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24 border-t border-slate-200">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="container-x relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800 shadow-sm">
            <HeartPulse size={15} className="text-emerald-600 animate-pulse" />
            <span>بوابة السياحة العلاجية والاستشفائية في المملكة</span>
          </div>

          <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 leading-tight">
            رعاية طبية تخصصية فائقة ونقاهة استثنائية في وطن الخير
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            نستقبل المرضى من كافة أنحاء العالم لتقديم أرقى مستويات العلاج الطبي في كبرى المستشفيات والمدن الطبية المرجعية بالمملكة العربية السعودية، مترافقة مع خدمات كونسيرج متكاملة وإقامة فاخرة وبرامج استشفاء سياحية في أروع معالم المملكة.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MEDICAL_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between rounded-3xl border bg-gradient-to-b p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${feat.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm border border-slate-100 text-navy-950">
                      <Icon size={24} className="text-navy-950" />
                    </div>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-black tracking-wider text-navy-950 shadow-xs border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-base font-black text-navy-950">
                    {feat.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {feat.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Banner: Journey & Action */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-gold-500/30 bg-navy-950 p-6 sm:p-10 text-white shadow-xl relative">
          <div className="absolute top-0 right-0 h-40 w-40 bg-gold-500/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-3 py-1 text-[11px] font-bold text-gold-300">
                <CheckCircle2 size={13} className="text-gold-400" />
                <span>برنامج كونسيرج المريض الدولي المكتمل</span>
              </div>

              <h3 className="mt-3 font-display text-xl sm:text-2xl font-black text-white">
                رحلة علاجية واستشفائية مصممة خصيصاً لكل مريض ومرافقيه
              </h3>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  <span>تأشيرات علاجية ميسرة</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  <span>استشارة وتقييم عن بُعد</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  <span>أجنحة وفنادق 5 نجوم</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  <span>متابعة ما بعد التعافي</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href="/medical-tourism"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-gradient px-6 py-3.5 text-xs font-black text-navy-950 shadow-gold transition hover:scale-105"
              >
                <span>دليل السياحة العلاجية الشامل</span>
                <ArrowLeft size={15} />
              </Link>
              <Link
                href="/medical-tourism#consultation"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <Stethoscope size={15} className="text-gold-400" />
                <span>طلب استشارة وتقييم حالة</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-8 border-t border-white/10 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {STATS.map((s, idx) => (
              <div key={idx} className="rounded-xl bg-white/5 p-3 backdrop-blur-xs">
                <div className="font-display text-xl sm:text-2xl font-black text-gold-400">{s.value}</div>
                <div className="mt-1 text-[11px] text-slate-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
