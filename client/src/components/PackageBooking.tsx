'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Crown, Loader2 } from 'lucide-react';
import { api } from '@/lib/client-api';
import { VIP_ADDON_PRICE, formatPrice } from '@/lib/format';
import type { PackageDetail } from '@/lib/types';
import CustomSelect from './CustomSelect';

export default function PackageBooking({ pkg, initialGuests = 2, initialDate = '' }: { pkg: PackageDetail; initialGuests?: number; initialDate?: string }) {
  const [f, setF] = useState({ fullName: '', email: '', phone: '', startDate: initialDate, guests: Math.min(initialGuests, pkg.maxGuests), vipAddon: false, notes: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ reference: string; total: number } | null>(null);

  const total = pkg.priceSar * f.guests + (f.vipAddon ? VIP_ADDON_PRICE * f.guests : 0);
  const today = new Date().toISOString().split('T')[0];
  const set = (k: string, v: any) => setF((s) => ({ ...s, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setState('loading');
    try {
      const r = await api<{ reference: string; total: number }>('/bookings', { method: 'POST', body: JSON.stringify({ ...f, packageId: pkg.id }) });
      setResult(r);
      setState('done');
    } catch (err) {
      setError((err as Error).message);
      setState('idle');
    }
  }

  return (
    <div className="relative rounded-3xl border-2 border-gold-500 bg-navy-900 p-6 pt-9 text-white shadow-2xl shadow-navy-950/30">
      <div className="absolute -top-4 start-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gold-gradient px-7 py-1.5 font-display font-black text-navy-950 shadow-gold"><Crown size={16} /> VIP</div>

      <AnimatePresence mode="wait">
        {state === 'done' && result ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-gold-gradient text-navy-950"><Check size={40} strokeWidth={3} /></motion.div>
            <h3 className="font-display text-2xl font-extrabold">تم استلام طلب حجزك</h3>
            <p className="mt-3 text-white/70">رقم المرجع</p>
            <div className="mt-1 font-display text-3xl font-black tracking-widest text-gold-300" dir="ltr">{result.reference}</div>
            <p className="mt-4 text-white/70">الإجمالي: <b className="text-gold-300">{formatPrice(result.total)}</b></p>
            <p className="mt-4 text-sm leading-7 text-white/60">سيتواصل معك فريق الكونسيرج خلال ساعات لتأكيد التفاصيل.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-white/60">السعر للشخص</div>
              <div className="font-display text-4xl font-black text-gold-300">{formatPrice(pkg.priceSar)}</div>
            </div>
            <input required placeholder="الاسم الكامل" value={f.fullName} onChange={(e) => set('fullName', e.target.value)} className="field-dark" />
            <div className="grid grid-cols-2 gap-3">
              <input required type="email" placeholder="البريد الإلكتروني" value={f.email} onChange={(e) => set('email', e.target.value)} className="field-dark" dir="ltr" />
              <input required placeholder="رقم الجوال" value={f.phone} onChange={(e) => set('phone', e.target.value)} className="field-dark" dir="ltr" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label text-white/70">تاريخ الرحلة</label>
                <input required type="date" min={today} value={f.startDate} onChange={(e) => set('startDate', e.target.value)} className="field-dark [color-scheme:dark]" />
              </div>
              <div>
                <label className="label mb-1.5 block text-white/70">الضيوف</label>
                <CustomSelect
                  value={f.guests}
                  onChange={(val) => set('guests', Number(val))}
                  options={Array.from({ length: pkg.maxGuests }, (_, i) => i + 1).map((n) => ({
                    value: n,
                    label: `${n} ${n === 1 ? 'ضيف' : n === 2 ? 'ضيفان' : n <= 10 ? 'ضيوف' : 'ضيف'}`,
                  }))}
                  theme="dark"
                />
              </div>
            </div>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/15 px-4 py-3 text-sm">
              <span>خدمة VIP إضافية <span className="text-gold-300">(+{formatPrice(VIP_ADDON_PRICE)} للشخص)</span></span>
              <input type="checkbox" checked={f.vipAddon} onChange={(e) => set('vipAddon', e.target.checked)} className="h-5 w-5 accent-[#c9a24b]" />
            </label>
            <textarea rows={2} placeholder="ملاحظات خاصة (اختياري)" value={f.notes} onChange={(e) => set('notes', e.target.value)} className="field-dark" />
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-white/70">السعر الإجمالي</span>
              <span className="font-display text-2xl font-black text-gold-300">{formatPrice(total)}</span>
            </div>
            {error && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{error}</p>}
            <button disabled={state === 'loading'} className="btn-gold w-full flex-col !gap-0 py-3.5 leading-tight">
              {state === 'loading' ? <Loader2 className="animate-spin" /> : (<><span className="text-lg">احجز رحلتك الفاخرة الآن</span><span className="text-xs font-medium opacity-80">Confirm Reservation</span></>)}
            </button>
            <div className="flex justify-between gap-2 text-center text-[11px] text-white/60">
              <span>إلغاء مرن</span><span>|</span><span>ضمان أفضل الأسعار</span><span>|</span><span>كونسيرج 24/7</span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
