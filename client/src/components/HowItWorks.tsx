'use client';
import { motion } from 'framer-motion';
import { CalendarCheck, Compass, Plane, Sparkles } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { Stagger, StaggerItem } from './Reveal';

const steps = [
  { icon: Compass, title: 'اختر وجهتك', text: 'تصفح الباقات أو أخبرنا بحلمك.' },
  { icon: Sparkles, title: 'صمّم رحلتك', text: 'يخصص الكونسيرج كل تفصيل وفق ذوقك.' },
  { icon: CalendarCheck, title: 'أكّد حجزك', text: 'حجز آمن مع إلغاء مرن وضمان أفضل سعر.' },
  { icon: Plane, title: 'عِش التجربة', text: 'نرافقك خطوة بخطوة حتى آخر لحظة.' },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionTitle eyebrow="HOW IT WORKS" title="رحلتك الفاخرة في أربع خطوات" />
        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-x-[12%] top-10 hidden h-px origin-right bg-gold-gradient lg:block"
          />
          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.2}>
            {steps.map((s, i) => (
              <StaggerItem key={s.title} className="relative text-center">
                <div className="relative mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-navy-900 text-gold-300 shadow-xl ring-4 ring-gold-400/30">
                  <s.icon size={30} strokeWidth={1.5} />
                  <span className="absolute -end-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold-gradient text-sm font-black text-navy-950">{i + 1}</span>
                </div>
                <h3 className="font-display text-lg font-extrabold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-navy-900/60">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
