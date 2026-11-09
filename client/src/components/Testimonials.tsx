'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import clsx from 'clsx';
import SectionTitle from './SectionTitle';
import { Stars } from './Stars';
import type { Review } from '@/lib/types';

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = reviews.length;

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  if (!n) return null;
  const r = reviews[i];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy-gradient py-20 md:py-28">
      <div className="absolute inset-0 bg-pattern opacity-50" />
      <div className="container-x relative">
        <SectionTitle light eyebrow="GUEST IMPRESSIONS" title="انطباعات ضيوفنا" />
        <div className="mx-auto max-w-3xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative rounded-3xl border border-gold-500/40 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-12">
            <Quote className="absolute -top-6 start-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-gold-gradient p-3 text-navy-950" />
            <AnimatePresence mode="wait">
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <Stars rating={r.rating} size={20} className="mb-5" />
                <p className="text-xl leading-9 text-white/90">{r.comment}</p>
                <div className="mt-6 font-display text-lg font-bold text-gold-300">{r.name}</div>
                {r.location && <div className="text-sm text-white/50">{r.location}</div>}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-5">
            <button onClick={() => setI((i - 1 + n) % n)} className="glass grid h-11 w-11 place-items-center rounded-full text-white hover:bg-gold-400 hover:text-navy-950" aria-label="السابق"><ChevronRight /></button>
            <div className="flex gap-2">
              {reviews.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`تقييم ${k + 1}`} className={clsx('h-2 rounded-full transition-all', k === i ? 'w-8 bg-gold-400' : 'w-2 bg-white/30')} />
              ))}
            </div>
            <button onClick={() => setI((i + 1) % n)} className="glass grid h-11 w-11 place-items-center rounded-full text-white hover:bg-gold-400 hover:text-navy-950" aria-label="التالي"><ChevronLeft /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
