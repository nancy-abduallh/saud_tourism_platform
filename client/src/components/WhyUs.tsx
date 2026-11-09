'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BadgeCheck, Gem, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Img } from './Img';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const features = [
  { icon: Gem, title: 'تجارب حصرية', text: 'وصول إلى أماكن وفعاليات لا تُتاح للعامة.' },
  { icon: ShieldCheck, title: 'خصوصية تامة', text: 'رحلات خاصة بالكامل وفرق تحترم خصوصيتك.' },
  { icon: HeartHandshake, title: 'ضيافة سعودية أصيلة', text: 'كرم الضيافة بأرقى صورها في كل محطة.' },
  { icon: BadgeCheck, title: 'ضمان أفضل الأسعار', text: 'نطابق أي عرض مماثل ونضمن إلغاءً مرناً.' },
];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal x={60}>
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-gold-500">WHY SA TOURISM</div>
          <h2 className="font-display text-3xl font-black leading-snug text-navy-900 sm:text-4xl lg:text-5xl">لماذا يختارنا نخبة المسافرين؟</h2>
          <p className="mt-5 text-lg leading-8 text-navy-900/60">نؤمن بأن الفخامة الحقيقية تكمن في التفاصيل. لذلك نصمم كل رحلة كعمل فني فريد يحكي قصتك الخاصة.</p>
          <Stagger className="mt-9 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="flex gap-4 rounded-2xl border-2 border-gold-400/60 bg-white p-5 shadow transition-all hover:border-gold-400 hover:shadow-xl hover:shadow-gold-500/20">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-300"><f.icon size={22} /></span>
                  <div>
                    <h3 className="font-display font-bold text-navy-900">{f.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-navy-900/60">{f.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <div className="relative mx-auto grid h-[520px] w-full max-w-lg grid-cols-2 gap-5">
          <motion.div style={{ y: y1 }} className="mt-10 overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
            <Img src="/images/gallery-1.jpg" alt="تجربة سياحية فاخرة في صحراء المملكة العربية السعودية" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="mb-10 overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
            <Img src="/images/gallery-2.jpg" alt="ضيافة سعودية أصيلة في مخيم فاخر" className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-float rounded-2xl border-2 border-gold-400 bg-navy-900 px-6 py-4 text-center shadow-2xl shadow-navy-950/80">
              <div className="font-display text-3xl font-black text-gold-gradient" dir="ltr">15+</div>
              <div className="mt-1 whitespace-nowrap text-sm font-medium text-white/90">عاماً من التميّز</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
