'use client';
import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from './Reveal';

function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2.2, ease: 'easeOut',
      onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix; },
    });
    return () => c.stop();
  }, [inView, to, decimals, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

import type { PublicStats } from '@/lib/types';

export default function Stats({ data }: { data?: PublicStats }) {
  const items = [
    { to: data?.happyGuests ?? 12000, suffix: '+', label: 'ضيف سعيد' },
    { to: data?.exclusiveExperiences ?? 7, suffix: '+', label: 'تجربة حصرية' },
    { to: data?.averageRating ?? 4.9, decimals: 1, suffix: '', label: 'متوسط التقييم' },
    { to: 24, suffix: '/7', label: 'كونسيرج VIP' },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-gradient py-16">
      <div className="absolute inset-0 bg-pattern opacity-60" />
      <div className="container-x relative">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <div className="font-display text-4xl font-black sm:text-5xl">
                <span className="text-gold-gradient inline-block pt-3 pb-1 -mt-3 -mb-1 overflow-visible">
                  <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
                </span>
              </div>
              <div className="mt-2 text-white/70">{s.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
