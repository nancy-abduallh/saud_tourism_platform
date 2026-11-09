'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Search, Sparkles, Users } from 'lucide-react';
import { CATEGORY_LABEL, type Destination } from '@/lib/types';
import { EASE } from '@/lib/motion';

export default function HeroSearch({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const [dest, setDest] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);

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
      className="glass w-full max-w-md rounded-3xl border-2 border-gold-400/70 p-6 text-white shadow-2xl shadow-navy-950/80 backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center gap-2 text-gold-300">
        <Sparkles size={18} />
        <h2 className="font-display text-lg font-bold text-white">خطّط لرحلتك الفاخرة</h2>
      </div>

      <label className="label flex items-center gap-2 text-white/80"><MapPin size={15} /> الوجهة</label>
      <select value={dest} onChange={(e) => setDest(e.target.value)} className="field-dark mb-4">
        <option value="">جميع الوجهات</option>
        {destinations.map((d) => <option key={d.id} value={d.slug}>{d.name}</option>)}
      </select>

      <label className="label flex items-center gap-2 text-white/80"><CalendarDays size={15} /> تاريخ الوصول</label>
      <input type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} className="field-dark mb-4 [color-scheme:dark]" />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div>
          <label className="label text-white/80">التجربة</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-dark">
            <option value="">الكل</option>
            {Object.entries(CATEGORY_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="label flex items-center gap-1 text-white/80"><Users size={15} /> الضيوف</label>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="field-dark">
            {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <button className="btn-gold w-full"><Search size={18} /> ابحث</button>
    </motion.form>
  );
}
