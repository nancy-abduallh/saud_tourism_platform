'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { EASE } from '@/lib/motion';

const links = [
  { href: '/#destinations', label: 'الوجهات' },
  { href: '/packages', label: 'الباقات الفاخرة' },
  { href: '/#vip', label: 'خدمات VIP' },
  { href: '/#testimonials', label: 'آراء الضيوف' },
  { href: '/contact', label: 'تواصل معنا' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || pathname !== '/' || open;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid ? 'border-b border-gold-500/20 bg-navy-950/90 shadow-lg shadow-black/20 backdrop-blur-xl' : 'bg-gradient-to-b from-navy-950/80 to-transparent',
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3">
          <img src="/logo.png" alt="SA للسياحة" className="h-12 w-12 rounded-full ring-2 ring-gold-500/60 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col text-start leading-none">
            <span
              className="allura-regular font-allura text-4xl leading-none text-gold-gradient drop-shadow-[0_2px_10px_rgba(243,211,122,0.45)]"
              style={{ fontFamily: '"Allura", cursive' }}
              dir="ltr"
            >
              SA
            </span>
            <span className="font-display text-[11px] font-bold tracking-[0.25em] text-white leading-tight -mt-0.5">
              للسياحة
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group relative py-2 text-sm font-medium text-white/85 transition-colors hover:text-gold-300">
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/packages" className="btn-gold hidden !py-2.5 text-sm sm:inline-flex">احجز الآن</Link>
          <button className="text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="القائمة">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
            <div className="container-x flex flex-col gap-1 pb-6">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-lg px-3 py-3 text-white/90 hover:bg-white/10 hover:text-gold-300">{l.label}</Link>
              ))}
              <Link href="/packages" className="btn-gold mt-3">احجز الآن</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
