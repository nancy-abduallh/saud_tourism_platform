'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Img } from './Img';
import { Reveal } from './Reveal';

export default function CtaBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] h-[130%]">
        <Img src="/images/gallery-3.jpg" alt="رحلتك الفاخرة تبدأ من هنا - SA للسياحة السعودية" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-l from-navy-950/95 via-navy-950/80 to-navy-950/60" />
      <div className="container-x relative text-center">
        <Reveal>
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-gold-300">YOUR JOURNEY BEGINS</div>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            رحلتك <span className="text-gold-gradient">الفاخرة</span> تبدأ من هنا
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">دع خبراء الكونسيرج يصممون لك تجربة سعودية لا تتكرر.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold px-9 text-lg">احجز استشارة خاصة</Link>
            <Link href="/packages" className="btn-outline px-9 text-lg">تصفح الباقات</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
