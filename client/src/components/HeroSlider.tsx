'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import clsx from 'clsx';
import { Img } from './Img';
import HeroSearch from './HeroSearch';
import { EASE } from '@/lib/motion';
import type { Destination, HeroSlide } from '@/lib/types';

const DURATION = 7; // seconds per slide

const FALLBACK: HeroSlide[] = [
  { id: 0, title: 'اكتشف سحر المملكة بفخامة', titleEn: 'Experience Saudi in Ultimate Luxury', subtitle: 'إقامات استثنائية بين صخور العلا الذهبية ومنتجعات البحر الأحمر', image: '/images/hero-1.jpg', ctaText: 'استكشف الآن', ctaLink: '/packages' },
];

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.35 } },
};
const word: Variants = { hidden: { y: '115%' }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } };
const fade: Variants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

export default function HeroSlider({ slides, destinations }: { slides: HeroSlide[]; destinations: Destination[] }) {
  const list = slides.length ? slides : FALLBACK;
  const count = list.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') next(); // RTL: left = next
      if (e.key === 'ArrowRight') prev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev]);

  const slide = list[index];

  return (
    <motion.section
      className="relative z-30 min-h-[820px] w-full bg-navy-950 lg:min-h-[880px]"
      style={{ touchAction: 'pan-y' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPanEnd={(_, info) => {
        if (info.offset.x < -80) next();
        if (info.offset.x > 80) prev();
      }}
    >
      {/* Background layer with overflow-hidden for scaling animation and particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id + '-' + index}
            className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <motion.div className="absolute inset-0" initial={{ scale: 1.18 }} animate={{ scale: 1 }} transition={{ duration: DURATION + 3, ease: 'linear' }}>
              <Img src={slide.image} alt={slide.title} priority className="h-full w-full object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-l from-navy-950/90 via-navy-950/45 to-navy-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

        {/* Floating gold particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold-300/80"
            style={{ left: `${(i * 73) % 100}%`, top: `${(i * 41) % 80}%` }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.9, 0] }}
            transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-x relative z-40 grid min-h-[820px] items-center gap-8 pb-48 pt-28 lg:min-h-[880px] lg:grid-cols-[1fr_auto]">
        <AnimatePresence mode="wait">
          <motion.div key={index} variants={group} initial="hidden" animate="show" exit="exit" className="max-w-2xl xl:max-w-3xl">
            {slide.titleEn && (
              <motion.div variants={fade} className="mb-4 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-gold-300" dir="ltr">
                <span className="h-px w-10 bg-gold-gradient" /> {slide.titleEn}
              </motion.div>
            )}
            <motion.h1
              variants={fade}
              className="font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl drop-shadow-lg"
            >
              {slide.title.includes('..') ? (
                <>
                  <span className="text-gold-gradient inline-block pt-8 pb-2 -mt-8 mb-2 leading-[1.35] overflow-visible">
                    {slide.title.split('..')[0]}
                  </span>
                  <span className="text-white block leading-snug">
                    {slide.title.split('..')[1]?.trim()}
                  </span>
                </>
              ) : slide.title.includes('بفخامة') ? (
                <>
                  <span>{slide.title.split('بفخامة')[0]}</span>
                  <span className="text-gold-gradient inline-block pt-6 pb-2 -mt-6 -mb-2 overflow-visible">بفخامة</span>
                  <span>{slide.title.split('بفخامة')[1]}</span>
                </>
              ) : (
                <span className="inline-block pt-6 pb-2 -mt-6 overflow-visible">{slide.title}</span>
              )}
            </motion.h1>
            {slide.subtitle && <motion.p variants={fade} className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">{slide.subtitle}</motion.p>}
            <motion.div variants={fade} className="mt-7 flex flex-wrap items-center gap-4">
              <Link href={slide.ctaLink} className="btn-gold px-8 text-lg">{slide.ctaText}</Link>
              <Link href="/contact" className="btn-outline px-8 text-lg">استشارة خاصة</Link>
            </motion.div>

            {/* Slider Switcher Controls */}
            {count > 1 && (
              <motion.div variants={fade} className="mt-8 flex items-center gap-4">
                <div className="font-display text-2xl font-bold text-white" dir="ltr">
                  <span className="text-gold-300">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-white/40"> / {String(count).padStart(2, '0')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {list.map((s, i) => (
                    <button
                      key={s.id + '-' + i}
                      onClick={() => setIndex(i)}
                      aria-label={`شريحة ${i + 1}`}
                      className={clsx('relative h-2 overflow-hidden rounded-full bg-white/25 transition-all duration-500', i === index ? 'w-16' : 'w-4 hover:bg-white/50')}
                    >
                      {i === index && (
                        <span
                          key={index}
                          onAnimationEnd={next}
                          className="absolute inset-0 origin-right bg-gold-gradient"
                          style={{ animation: `heroProgress ${DURATION}s linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="hidden w-[460px] lg:w-[480px] xl:w-[520px] justify-self-end lg:block relative z-50">
          <HeroSearch destinations={destinations} />
        </div>
      </div>
    </motion.section>
  );
}
