'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Minus, Plus, RotateCcw, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import PackageCard from './PackageCard';
import { formatPrice } from '@/lib/format';
import { CATEGORY_LABEL, type Destination, type PackageSummary } from '@/lib/types';
import CustomSelect from './CustomSelect';

interface Props {
  packages: PackageSummary[];
  destinations: Destination[];
  initial: {
    destination?: string;
    category?: string;
    guests?: number;
    date?: string;
    type?: string;
  };
}

export default function PackagesBrowser({ packages, destinations, initial }: Props) {
  const prices = packages.map((p) => p.priceSar);
  const maxAll = Math.max(10000, Math.ceil(Math.max(0, ...prices) / 1000) * 1000);

  const initialActive = useMemo(() => {
    if (initial.destination) return `d:${initial.destination}`;
    if (initial.category) return `c:${initial.category}`;
    if (initial.type) return `t:${initial.type}`;
    return 'all';
  }, [initial]);

  const [active, setActive] = useState(initialActive);
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(maxAll);
  const [guests, setGuests] = useState(initial.guests || 1);
  const [date, setDate] = useState(initial.date ?? '');

  const chips = [
    { key: 'all', label: 'الكل' },
    ...destinations.map((d) => ({ key: `d:${d.slug}`, label: d.name })),
    ...(['VIP', 'LUXURY', 'UMRAH', 'DESERT'] as const).map((c) => ({
      key: `c:${c}`,
      label: CATEGORY_LABEL[c] || c,
    })),
    { key: 't:villas', label: 'فلل وشاليهات' },
    { key: 't:glamping', label: 'مخيمات ملكية' },
    { key: 't:heritage', label: 'نزل تراثية' },
  ];

  const list = useMemo(() => {
    const l = packages
      .filter((p) => {
        // Destination filter
        if (active.startsWith('d:')) {
          const destSlug = active.slice(2);
          if (destSlug === 'riyadh') {
            return (
              p.destination.slug === 'tuwaiq' ||
              p.destination.slug === 'diriyah' ||
              p.destination.slug === 'riyadh' ||
              p.title.includes('الرياض')
            );
          }
          return p.destination.slug === destSlug;
        }

        // Category filter
        if (active.startsWith('c:')) {
          return p.category === active.slice(2);
        }

        // Stay Type filter
        if (active.startsWith('t:')) {
          const type = active.slice(2);
          const b = (p.badges || '').toLowerCase();
          const t = p.title.toLowerCase();
          const s = p.slug.toLowerCase();

          if (type === 'villas') {
            return (
              b.includes('فيلا') ||
              b.includes('يخت') ||
              t.includes('فلل') ||
              t.includes('شاليه') ||
              s.includes('villas') ||
              s.includes('yacht')
            );
          }
          if (type === 'glamping') {
            return (
              p.category === 'DESERT' ||
              b.includes('تخييم') ||
              b.includes('سفاري') ||
              s.includes('safari') ||
              s.includes('edge')
            );
          }
          if (type === 'hotels') {
            return (
              p.category === 'VIP' ||
              p.category === 'LUXURY' ||
              p.category === 'UMRAH' ||
              b.includes('أجنحة') ||
              b.includes('فندق') ||
              b.includes('الحرم')
            );
          }
          if (type === 'heritage') {
            return (
              b.includes('تراث') ||
              b.includes('قصر') ||
              b.includes('تاريخ') ||
              s.includes('heritage') ||
              s.includes('kings') ||
              s.includes('almaa') ||
              s.includes('palms')
            );
          }
        }

        return true;
      })
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
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={clsx(
                'relative rounded-full border px-5 py-2 text-sm font-bold transition cursor-pointer',
                active === c.key
                  ? 'border-transparent text-navy-950 font-black'
                  : 'border-gold-500/50 text-navy-900 bg-white hover:bg-gold-50/70 hover:border-gold-500'
              )}
            >
              {active === c.key && (
                <motion.span
                  layoutId="chip"
                  className="absolute inset-0 rounded-full bg-gold-gradient shadow-gold"
                />
              )}
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
          <h3 className="text-center font-display text-lg font-extrabold text-navy-950">
            فلتر الحجز الفاخر
          </h3>
          <div>
            <label className="label">السعر الأقصى</label>
            <input
              type="range"
              min={0}
              max={maxAll}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#c9a24b]"
            />
            <div className="mt-1 text-sm font-bold text-navy-900/80">
              حتى {formatPrice(maxPrice)}
            </div>
          </div>
          <div>
            <label className="label">تاريخ الرحلة</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="field"
            />
          </div>
          <div>
            <label className="label">عدد الضيوف</label>
            <div className="flex items-center overflow-hidden rounded-xl border border-navy-900/15">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="grid h-12 w-12 place-items-center bg-slate-50 hover:bg-gold-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center font-bold text-navy-950">{guests}</div>
              <button
                type="button"
                onClick={() => setGuests(Math.min(20, guests + 1))}
                className="grid h-12 w-12 place-items-center bg-slate-50 hover:bg-gold-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {active !== 'all' && (
            <button
              type="button"
              onClick={() => {
                setActive('all');
                setMaxPrice(maxAll);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw size={13} />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          )}

          <Link
            href="/contact"
            className="btn-gold w-full flex-col !gap-0 text-center leading-tight shadow-md"
          >
            <span>طلب استشارة خاصة</span>
            <span className="text-xs font-medium opacity-80">Tailor Your Journey</span>
          </Link>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-bold text-navy-950">
              {list.length} باقة وتجربة متاحة
            </p>
            {active !== 'all' && (
              <span className="rounded-full bg-gold-100/70 px-3 py-1 text-xs font-bold text-gold-900 border border-gold-300/60">
                مفلترة حسب الاختيار
              </span>
            )}
          </div>

          <motion.div layout className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <PackageCard pkg={p} query={query} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {!list.length && (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-10 text-center text-navy-950">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 mb-4 shadow-sm">
                <Compass size={28} />
              </div>
              <h3 className="font-display text-xl font-bold text-navy-950">
                لا توجد باقات مطابقة لهذا الفلتر حالياً
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                جرّب تعديل خيارات الفلتر أو رفع السعر الأقصى، أو استعرض كافة باقات المملكة الاستثنائية.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActive('all');
                    setMaxPrice(maxAll);
                  }}
                  className="btn-gold !py-2.5 !px-6"
                >
                  عرض جميع باقات المملكة
                </button>
                <Link href="/contact" className="btn-outline !py-2.5 !px-6">
                  طلب باقة مخصصة
                </Link>
              </div>

              {/* Recommended packages */}
              <div className="mt-12 text-right">
                <h4 className="font-display text-base font-bold text-navy-950 mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-gold-600" />
                  <span>باقات مقترحة قد تعجبك</span>
                </h4>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {packages.slice(0, 3).map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
