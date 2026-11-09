'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';
import { api } from '@/lib/client-api';
import ImageUpload from './ImageUpload';
import { CATEGORY_LABEL } from '@/lib/types';

type Row = Record<string, any>;

export default function PackageForm({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === 'new';
  const [dests, setDests] = useState<Row[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [f, setF] = useState<Row>({ title: '', titleEn: '', slug: '', summary: '', description: '', destinationId: '', category: 'LUXURY', priceSar: 10000, days: 5, nights: 4, rating: 5, maxGuests: 6, coverImage: '', badges: '', isFeatured: false, isActive: true });
  const [gallery, setGallery] = useState<string[]>([]);
  const [inc, setInc] = useState('');
  const [itin, setItin] = useState('');

  useEffect(() => {
    api<Row[]>('/admin/destinations', { auth: true }).then((d) => { setDests(d); if (isNew && d[0]) setF((s) => ({ ...s, destinationId: d[0].id })); });
    if (!isNew) {
      api<Row>(`/admin/packages/${id}`, { auth: true }).then((p) => {
        setF(p);
        setGallery(p.images.map((i: Row) => i.url));
        setInc(p.inclusions.map((i: Row) => i.text).join('\n'));
        setItin(p.itinerary.map((d: Row) => `${d.title} | ${d.description}`).join('\n'));
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const set = (k: string, v: any) => setF((s) => ({ ...s, [k]: v }));
  const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const payload = {
      slug: f.slug || undefined, title: f.title, titleEn: f.titleEn || '', summary: f.summary, description: f.description,
      destinationId: Number(f.destinationId), category: f.category, priceSar: Number(f.priceSar), days: Number(f.days), nights: Number(f.nights),
      rating: Number(f.rating), maxGuests: Number(f.maxGuests), coverImage: f.coverImage, badges: f.badges || '', isFeatured: !!f.isFeatured, isActive: !!f.isActive,
      gallery, inclusions: lines(inc),
      itinerary: lines(itin).map((l) => { const [t, ...d] = l.split('|'); return { title: t.trim(), description: d.join('|').trim() }; }),
    };
    try {
      if (isNew) await api('/admin/packages', { method: 'POST', body: JSON.stringify(payload), auth: true });
      else await api(`/admin/packages/${id}`, { method: 'PUT', body: JSON.stringify(payload), auth: true });
      router.push('/admin/packages');
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  if (loading) return <Loader2 className="mx-auto mt-20 animate-spin" />;

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl space-y-6 rounded-2xl bg-white p-6 shadow ring-1 ring-navy-900/5 sm:p-8">
      <h1 className="font-display text-2xl font-extrabold">{isNew ? 'إضافة باقة جديدة' : 'تعديل الباقة'}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label">العنوان</label><input required className="field" value={f.title} onChange={(e) => set('title', e.target.value)} /></div>
        <div><label className="label">العنوان بالإنجليزية</label><input className="field" dir="ltr" value={f.titleEn ?? ''} onChange={(e) => set('titleEn', e.target.value)} /></div>
        <div><label className="label">Slug (اختياري)</label><input className="field" dir="ltr" value={f.slug ?? ''} onChange={(e) => set('slug', e.target.value)} /></div>
        <div>
          <label className="label">الوجهة</label>
          <select className="field" value={f.destinationId} onChange={(e) => set('destinationId', e.target.value)}>{dests.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
        </div>
        <div>
          <label className="label">التصنيف</label>
          <select className="field" value={f.category} onChange={(e) => set('category', e.target.value)}>{Object.entries(CATEGORY_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        </div>
        <div><label className="label">السعر للشخص (ر.س)</label><input type="number" required className="field" value={f.priceSar} onChange={(e) => set('priceSar', e.target.value)} /></div>
        <div><label className="label">الأيام</label><input type="number" className="field" value={f.days} onChange={(e) => set('days', e.target.value)} /></div>
        <div><label className="label">الليالي</label><input type="number" className="field" value={f.nights} onChange={(e) => set('nights', e.target.value)} /></div>
        <div><label className="label">التقييم (1-5)</label><input type="number" step="0.1" min={1} max={5} className="field" value={f.rating} onChange={(e) => set('rating', e.target.value)} /></div>
        <div><label className="label">أقصى عدد ضيوف</label><input type="number" className="field" value={f.maxGuests} onChange={(e) => set('maxGuests', e.target.value)} /></div>
      </div>

      <ImageUpload label="صورة الغلاف" value={f.coverImage} onChange={(u) => set('coverImage', u)} />

      <div>
        <label className="label">معرض الصور</label>
        <div className="mb-3 flex flex-wrap gap-3">
          {gallery.map((u, i) => (
            <div key={i} className="relative">
              <img src={u} alt="" className="h-20 w-28 rounded-lg bg-slate-200 object-cover" />
              <button type="button" onClick={() => setGallery(gallery.filter((_, k) => k !== i))} className="absolute -end-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-red-600 text-white"><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
        <ImageUpload label="إضافة صورة للمعرض" value="" onChange={(u) => u && setGallery([...gallery, u])} />
      </div>

      <div><label className="label">شارات (مفصولة بفاصلة)</label><input className="field" value={f.badges ?? ''} onChange={(e) => set('badges', e.target.value)} placeholder="فيلا 5 نجوم,طيران خاص مشمول" /></div>
      <div><label className="label">ملخص قصير</label><textarea required rows={2} className="field" value={f.summary} onChange={(e) => set('summary', e.target.value)} /></div>
      <div><label className="label">الوصف الكامل</label><textarea required rows={5} className="field" value={f.description} onChange={(e) => set('description', e.target.value)} /></div>
      <div><label className="label">المشتملات (سطر لكل عنصر)</label><textarea rows={6} className="field" value={inc} onChange={(e) => setInc(e.target.value)} /></div>
      <div><label className="label">برنامج الرحلة (سطر لكل يوم: العنوان | الوصف)</label><textarea rows={6} className="field" value={itin} onChange={(e) => setItin(e.target.value)} /></div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2"><input type="checkbox" className="h-5 w-5 accent-[#c9a24b]" checked={!!f.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} /> باقة مميزة (تظهر في الرئيسية)</label>
        <label className="flex items-center gap-2"><input type="checkbox" className="h-5 w-5 accent-[#c9a24b]" checked={!!f.isActive} onChange={(e) => set('isActive', e.target.checked)} /> فعّالة</label>
      </div>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => router.push('/admin/packages')} className="rounded-xl px-5 py-3 font-bold hover:bg-slate-100">إلغاء</button>
        <button disabled={busy} className="btn-gold">{busy ? <Loader2 className="animate-spin" size={18} /> : 'حفظ الباقة'}</button>
      </div>
    </form>
  );
}
