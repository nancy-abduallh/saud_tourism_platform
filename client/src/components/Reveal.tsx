'use client';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

export function Reveal({ children, className, delay = 0, y = 40, x = 0 }: { children: React.ReactNode; className?: string; delay?: number; y?: number; x?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, delay = 0, gap = 0.12 }: { children: React.ReactNode; className?: string; delay?: number; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}
