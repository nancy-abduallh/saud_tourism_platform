'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import clsx from 'clsx';
import PackageCard from './PackageCard';
import { formatPrice } from '@/lib/format';
import { CATEGORY_LABEL, type Destination, type PackageSummary } from '@/lib/types';
import CustomSelect from './CustomSelect';

interface Props {
  packages: PackageSummary[];
  destinations: Destination[];
  initial: { destination?: string; category?: string; guests?: number; date?: string };
}

export default function PackagesBrowser({ packages, destinations, initial }: Props) {
  const prices = packages.map((p) => p.priceSar);
  const maxAll = Math.max(10000, Math.ceil(Math.max(0, ...prices) / 1000) * 1000);

  const [active, setActive] = useState(initial.destination ? `d:${initial.destination}` : initial.category ? `c:${initial.category}` : 'all');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(maxAll);
  const [guests, setGuests] = useState(initial.guests || 1);
  const [date, setDate] = useState(initial.date ?? '');

  const chips = [
    { key: 'all', label: 'الكل' },
    ...destinations.map((d) => ({ key: `d:${d.slug}`, label: d.name })),
    ...(['VIP', 'UMRAH', 'DESERT'] as const).map((c) => ({ key: `c:${c}`, label: CATEGORY_LABEL[c] })),
  ];

  const list = useMemo(() => {
    const l = packages
      .filter((p) => (active.startsWith('d:') ? p.destination.slug === active.slice(2) : active.startsWith('c:') ? p.category === active.slice(2) : true))
      .filter((p) => p.priceSar <= maxPrice);
    if (sort === 'price_asc') l.sort((a, b) => a.priceSar - b.priceSar);
    if (sort === 'price_desc') l.sort((a, b) => b.priceSar - a.priceSar);
    if (sort === 'rating') l.sort((a, b) => b.rating - a.rating);
    return l;
  }, [packages, active, sort, maxPrice]);

  const query = `?guests=${guests}${date ? `&date=${date}` : ''}`;

  return (
    <div className="container-x py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button key={c.key} onClick={() => setActive(c.key)} className={clsx('relative rounded-full border px-5 py-2 text-sm font-bold transition', active === c.key ? 'border-transparent text-navy-950' : 'border-gold-500/60 text-navy-900 hover:bg-gold-50')}>
              {active === c.key && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-gold-gradient shadow-gold" />}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </div>
        <div className="w-56">
          <CustomSelect
            value={sort}
            onChange={(val) => setSort(String(val))}
            options={[
              { value: 'featured', label: 'الترتيب الفاخر' },
              { value: 'price_asc', label: 'السعر: من الأقل' },
              { value: 'price_desc', label: 'السعر: من الأعلى' },
              { value: 'rating', label: 'الأعلى تقييماً' },
            ]}
            theme="light"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit space-y-6 rounded-2xl border border-gold-500/40 bg-white p-6 shadow-lg lg:sticky lg:top-28">
          <h3 className="text-center font-display text-lg font-extrabold">فلتر الحجز الفاخر</h3>
          <div>
            <label className="label">السعر الأقصى</label>
            <input type="range" min={0} max={maxAll} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#c9a24b]" />
            <div className="mt-1 text-sm text-navy-900/70">حتى {formatPrice(maxPrice)}</div>
          </div>
          <div>
            <label className="label">تاريخ الرحلة</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field" />
          </div>
          <div>
            <label className="label">الضيوف</label>
            <div className="flex items-center overflow-hidden rounded-xl border border-navy-900/15">
              <button onClick={() => setGuests(Math.max(1, guests - 1))} className="grid h-12 w-12 place-items-center bg-slate-50 hover:bg-gold-100"><Minus size={16} /></button>
              <div className="flex-1 text-center font-bold">{guests}</div>
              <button onClick={() => setGuests(Math.min(20, guests + 1))} className="grid h-12 w-12 place-items-center bg-slate-50 hover:bg-gold-100"><Plus size={16} /></button>
            </div>
          </div>
          <Link href="/contact" className="btn-gold w-full flex-col !gap-0 text-center leading-tight">
            <span>طلب استشارة خاصة</span>
            <span className="text-xs font-medium opacity-80">Tailor Your Journey</span>
          </Link>
        </aside>

        <div>
          <p className="mb-5 text-navy-900/60">{list.length} باقة متاحة</p>
          <motion.div layout className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
                  <PackageCard pkg={p} query={query} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {!list.length && <div className="rounded-2xl bg-slate-50 py-20 text-center text-navy-900/60">لا توجد باقات مطابقة، جرّب تعديل الفلاتر.</div>}
        </div>
      </div>
    </div>
  );
}
