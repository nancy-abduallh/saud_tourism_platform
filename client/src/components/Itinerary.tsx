'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export default function Itinerary({ days }: { days: { id: number; dayNumber: number; title: string; description: string }[] }) {
  const [open, setOpen] = useState<number | null>(days[0]?.id ?? null);
  return (
    <div className="relative space-y-4 pe-0">
      <div className="absolute bottom-4 top-4 start-[11px] w-px bg-gold-gradient" />
      {days.map((d) => {
        const isOpen = open === d.id;
        return (
          <div key={d.id} className="relative ps-10">
            <span className={clsx('absolute start-0 top-5 h-6 w-6 rounded-full border-2 border-gold-500 transition-colors', isOpen ? 'bg-gold-gradient shadow-gold' : 'bg-white')} />
            <button onClick={() => setOpen(isOpen ? null : d.id)} className="flex w-full items-center justify-between rounded-xl bg-white px-5 py-4 text-start shadow ring-1 ring-navy-900/5 transition hover:ring-gold-400">
              <span className="flex items-center gap-3">
                <span className="font-bold text-gold-600">اليوم {d.dayNumber}</span>
                <span className="font-display font-bold text-navy-900">{d.title}</span>
              </span>
              <ChevronDown className={clsx('transition-transform', isOpen && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 py-4 leading-8 text-navy-900/70">{d.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
