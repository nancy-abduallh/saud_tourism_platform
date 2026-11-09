'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <div className="fixed bottom-6 start-6 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="grid h-12 w-12 place-items-center rounded-full bg-navy-900 text-gold-300 shadow-xl ring-1 ring-gold-500/50" aria-label="للأعلى"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" className="relative grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-xl" aria-label="واتساب">
        <span className="absolute inset-0 animate-ring rounded-full bg-green-500" />
        <MessageCircle className="relative" />
      </a>
    </div>
  );
}
