'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Search, Sparkles, Users } from 'lucide-react';
import { CATEGORY_LABEL, type Destination } from '@/lib/types';
import { EASE } from '@/lib/motion';
import { DEFAULT_DESTINATIONS } from '@/lib/default-data';
import CustomSelect, { type SelectOption } from './CustomSelect';

export default function HeroSearch({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const [dest, setDest] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);

  const destList = destinations && destinations.length > 0 ? destinations : DEFAULT_DESTINATIONS;
  const destinationOptions: SelectOption[] = [
    { value: '', label: 'جميع الوجهات' },
    ...destList.map((d) => ({
      value: d.slug,
      label: d.name,
      badge: d.nameEn || undefined,
    })),
  ];

  const categoryOptions: SelectOption[] = [
    { value: '', label: 'الكل' },
    ...Object.entries(CATEGORY_LABEL).map(([k, v]) => ({
      value: k,
      label: v,
    })),
  ];

  const guestOptions: SelectOption[] = [1, 2, 3, 4, 5, 6, 8, 10].map((n) => ({
    value: n,
    label: `${n} ${n === 1 ? 'ضيف' : n === 2 ? 'ضيفان' : n <= 10 ? 'ضيوف' : 'ضيف'}`,
  }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (dest) p.set('destination', dest);
    if (category) p.set('category', category);
    if (date) p.set('date', date);
    p.set('guests', String(guests));
    router.push(`/packages?${p}`);
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1, ease: EASE }}
      className="glass w-full max-w-[480px] xl:max-w-[510px] rounded-3xl border-2 border-gold-400/70 p-7 text-white shadow-2xl shadow-navy-950/80 backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center gap-2 text-gold-300">
        <Sparkles size={18} />
        <h2 className="font-display text-xl font-bold text-white">خطّط لرحلتك الفاخرة</h2>
      </div>

      <label className="label mb-1.5 flex items-center gap-2 text-white/80"><MapPin size={15} /> الوجهة</label>
      <div className="mb-4">
        <CustomSelect
          value={dest}
          onChange={(val) => setDest(String(val))}
          options={destinationOptions}
          placeholder="جميع الوجهات"
          theme="dark"
          menuWidth="w-full"
          maxHeight="max-h-56"
        />
      </div>

      <label className="label mb-1.5 flex items-center gap-2 text-white/80"><CalendarDays size={15} /> تاريخ الوصول</label>
      <input type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} className="field-dark mb-4 [color-scheme:dark]" />

      <div className="mb-5 grid grid-cols-2 gap-3.5">
        <div>
          <label className="label mb-1.5 block text-white/80">التجربة</label>
          <CustomSelect
            value={category}
            onChange={(val) => setCategory(String(val))}
            options={categoryOptions}
            placeholder="الكل"
            theme="dark"
            align="right"
            menuWidth="min-w-full sm:min-w-[280px]"
            maxHeight="max-h-52"
          />
        </div>
        <div>
          <label className="label mb-1.5 flex items-center gap-1 text-white/80"><Users size={15} /> الضيوف</label>
          <CustomSelect
            value={guests}
            onChange={(val) => setGuests(Number(val))}
            options={guestOptions}
            theme="dark"
            align="left"
            menuWidth="min-w-full sm:min-w-[220px]"
            maxHeight="max-h-52"
          />
        </div>
      </div>

      <button className="btn-gold w-full text-base"><Search size={18} /> ابحث</button>
    </motion.form>
  );
}
