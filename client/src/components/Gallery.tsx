'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';
import { Img } from './Img';

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = images.slice(0, 5);
  const big = shown.length >= 3;

  return (
    <>
      <div className={clsx('grid h-[260px] gap-3 sm:h-[420px]', big ? 'grid-cols-4 grid-rows-2' : 'grid-cols-2')}>
        {shown.map((src, i) => (
          <motion.button
            key={i} onClick={() => setOpen(i)}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            className={clsx('group relative overflow-hidden rounded-2xl bg-navy-900', big && i === 0 && 'col-span-2 row-span-2', big && i > 0 && 'hidden sm:block')}
          >
            <Img src={src} alt={`${title} ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 bg-navy-950/0 transition group-hover:bg-navy-950/25" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-navy-950/95 p-4" onClick={() => setOpen(null)}>
            <button className="absolute end-5 top-5 text-white" aria-label="إغلاق"><X size={30} /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % images.length); }} className="absolute start-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-navy-950" aria-label="التالي"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + images.length) % images.length); }} className="absolute end-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-navy-950" aria-label="السابق"><ChevronRight /></button>
            <motion.div key={open} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl">
              <Img src={images[open]} alt={title} className="max-h-[85vh] w-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
