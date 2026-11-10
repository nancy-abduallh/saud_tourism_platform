'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { DEFAULT_SETTINGS } from '@/lib/default-data';
import type { SiteSettings } from '@/lib/types';

export default function FloatingActions({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const currentSettings = settings || DEFAULT_SETTINGS;
  const rawNumber = currentSettings.whatsappNumber || DEFAULT_SETTINGS.whatsappNumber;
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const message = currentSettings.whatsappMessage || DEFAULT_SETTINGS.whatsappMessage || '';
  const waUrl = cleanNumber
    ? `https://wa.me/${cleanNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`
    : 'https://wa.me/966500000000';

  return (
    <div className="fixed bottom-6 start-6 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="grid h-12 w-12 place-items-center rounded-full bg-navy-900 text-gold-300 shadow-xl ring-1 ring-gold-500/50 hover:bg-navy-800 transition-colors"
            aria-label="للأعلى"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 transition-colors"
        aria-label="تواصل عبر واتساب"
        title="تواصل معنا عبر واتساب"
      >
        <span className="absolute inset-0 animate-ring rounded-full bg-green-500" />
        <MessageCircle className="relative" size={26} />
      </a>
    </div>
  );
}
