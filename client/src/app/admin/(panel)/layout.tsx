'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarCheck, ConciergeBell, Images, LayoutDashboard, LogOut, MapPin, Mail, Menu, Package, Share2, Star, X } from 'lucide-react';
import clsx from 'clsx';

const nav = [
  { href: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'الباقات', icon: Package },
  { href: '/admin/destinations', label: 'الوجهات', icon: MapPin },
  { href: '/admin/hero', label: 'شرائح الهيرو', icon: Images },
  { href: '/admin/services', label: 'خدمات VIP', icon: ConciergeBell },
  { href: '/admin/reviews', label: 'التقييمات', icon: Star },
  { href: '/admin/bookings', label: 'الحجوزات', icon: CalendarCheck },
  { href: '/admin/messages', label: 'الرسائل والمشتركون', icon: Mail },
  { href: '/admin/settings', label: 'روابط الفوتر والتواصل', icon: Share2 },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('st_token')) router.replace('/admin/login');
    else { setName(localStorage.getItem('st_user') ?? ''); setReady(true); }
  }, [router]);
  useEffect(() => setOpen(false), [pathname]);

  if (!ready) return null;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className={clsx('fixed inset-y-0 right-0 z-40 flex w-64 flex-col bg-navy-950 text-white transition-transform lg:static lg:translate-x-0', open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center gap-3 border-b border-white/10 p-5">
          <img src="/logo.png" alt="SA للسياحة" className="h-11 w-11 rounded-full ring-2 ring-gold-500/60" />
          <div className="flex flex-col text-start leading-none">
            <span
              className="allura-regular font-allura text-3xl leading-none text-gold-gradient"
              style={{ fontFamily: '"Allura", cursive' }}
              dir="ltr"
            >
              SA
            </span>
            <span className="font-display text-[10px] font-bold tracking-[0.2em] text-white leading-tight mt-0.5">
              للسياحة
            </span>
            <div className="text-[10px] text-white/50 mt-1">{name}</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} className={clsx('flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition', active ? 'bg-gold-gradient text-navy-950 shadow-gold' : 'text-white/75 hover:bg-white/10')}>
                <n.icon size={18} /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-white/10 p-3">
          <Link href="/" target="_blank" className="block rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/10">عرض الموقع ↗</Link>
          <button onClick={() => { localStorage.removeItem('st_token'); router.replace('/admin/login'); }} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-300 hover:bg-white/10"><LogOut size={18} /> تسجيل الخروج</button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between bg-navy-950 p-4 text-white lg:hidden">
          <span className="font-display font-bold text-gold-300">لوحة التحكم</span>
          <button onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
