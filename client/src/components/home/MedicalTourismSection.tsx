'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass,
  Heart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
  Sun,
  Trees,
  Waves,
  Wind,
} from 'lucide-react';

const HIGHLIGHT_DESTINATIONS = [
  {
    id: 'abha',
    name: 'أبها',
    title: 'منتجع جبلي هادئ',
    desc: 'منحدرات خضراء وهواء بارد نقي في منتزه عسير الوطني لسلام داخلي عميق.',
    image: '/images/medical-abha.jpg',
    badge: 'استرخاء جبلي',
  },
  {
    id: 'red-sea',
    name: 'ساحل البحر الأحمر',
    title: 'ملاذ صحي وشاطئي',
    desc: 'يوغا شاطئية وعلاجات السبا المريحة أمام مياه البحر الأحمر الصافية بكورنيش جدة.',
    image: '/images/medical-redsea-jeddah.jpg',
    badge: 'ملاذ صحي',
  },
  {
    id: 'ahsa',
    name: 'الأحساء',
    title: 'جمال الطبيعة وينابيع ساخنة',
    desc: 'ينابيع الهفوف ذات الخصائص العلاجية وحمامات طينية وواحات النخيل وجبل القارة.',
    image: '/images/medical-ahsa.jpg',
    badge: 'ينابيع علاجية',
  },
  {
    id: 'taif',
    name: 'الطائف',
    title: 'جنة زهور للاسترخاء',
    desc: 'مدينة الورود بهوائها الجبلي وحدائق قصر شبرا لتهدئة الحواس واستعادة النشاط.',
    image: '/images/medical-taif.jpg',
    badge: 'علاج عطري',
  },
  {
    id: 'alula',
    name: 'العلا',
    title: 'التوازن بين الحاضر والماضي',
    desc: 'تأمل وسكينة بين الصخور القديمة والبلدة القديمة وصخرة الفيل لإعادة التوازن الروحي.',
    image: '/images/medical-alula.jpg',
    badge: 'سكينة وتأمل',
  },
  {
    id: 'rub-al-khali',
    name: 'الصحراء العربية',
    title: 'السكينة والهدوء بالربع الخالي',
    desc: 'رحلات استرخاء روحية وممارسة اليوغا ورؤية النجوم وسط الكثبان الرملية الشاسعة.',
    image: '/images/medical-rub-al-khali.jpg',
    badge: 'سكينة الصحراء',
  },
  {
    id: 'riyadh',
    name: 'الرياض',
    title: 'حديقة السلام ومرافق العافية',
    desc: 'استرخاء في حديقة السلام والبحيرة ومراكز اللياقة والمنتجعات الصحية بالحي الدبلوماسي.',
    image: '/images/medical-salam-park.jpg',
    badge: 'عافية العاصمة',
  },
];

export default function MedicalTourismSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24 border-t border-slate-200">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="container-x relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800 shadow-sm">
              <Sun size={15} className="text-emerald-600" />
              <span>السياحة العلاجية والاستشفائية في المملكة</span>
            </div>

            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 leading-tight">
              7 وجهات للسياحة العلاجية والاستشفاء الطبيعي بالمملكة
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              بيئات طبيعية ساحرة وملاذات هادئة صُممت لتمنح الجسد والروح فرصة للاسترخاء، واستعادة النشاط، والسلام الداخلي.
            </p>
          </div>

          <Link
            href="/medical-tourism"
            className="inline-flex items-center gap-2 rounded-2xl bg-gold-gradient px-5 py-2.5 text-xs font-black text-navy-950 shadow-gold transition-transform hover:scale-105 self-start sm:self-auto shrink-0"
          >
            <span>استعراض كافة الوجهات الـ 7 وكيفية الحجز</span>
            <span>←</span>
          </Link>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHT_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                href={`/medical-tourism#dest-${dest.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent opacity-90" />

                  {/* Top Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/85 px-3 py-1 text-[11px] font-bold text-gold-300 backdrop-blur-md">
                    <Sparkles size={11} className="text-gold-400" />
                    <span>{dest.badge}</span>
                  </div>

                  {/* Name on image bottom */}
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white">
                    <div className="font-display text-lg font-black">{dest.name}</div>
                    <span className="text-xs text-gold-300 font-bold">{dest.title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dest.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="font-bold text-emerald-700 group-hover:underline">
                      تفاصيل الوجهة وكيفية الحجز
                    </span>
                    <span className="text-slate-400 transition-transform group-hover:-translate-x-1">
                      ←
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Booking Callout */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 mb-2">
              <Heart size={14} className="text-gold-400 fill-gold-400" />
              <span>استشارة مجانية وبرامج مخصصة</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              هل تبحث عن تجربة استشفاء وهدوء مخصصة لك؟
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              تواصل مع كونسيرج العافية لتصميم برنامج استشفائي خاص بك في أبها، البحر الأحمر، الأحساء، الطائف، العلا، الصحراء، أو الرياض مع كافة ترتيبات السكن والتنقل.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/medical-tourism#booking-form-section"
              className="btn-gold !py-3 !px-6 text-xs font-black shadow-gold"
            >
              احجز رحلتك العلاجية الآن
            </Link>
            <a
              href="https://wa.me/966571713078?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20%D9%88%D9%88%D8%AC%D9%87%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9%20%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D8%AC%D9%8A%D8%A9%20%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B4%D9%81%D8%A7%D8%A6%D9%8A%D8%A9."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-3 text-xs font-bold text-white transition-all backdrop-blur-md"
            >
              <MessageCircle size={15} />
              <span>واتساب كونسيرج العافية</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
