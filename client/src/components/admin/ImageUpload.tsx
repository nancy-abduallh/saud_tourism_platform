'use client';
import { useRef, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { api } from '@/lib/client-api';

export default function ImageUpload({ value, onChange, label = 'الصورة' }: { value?: string; onChange: (url: string) => void; label?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { url } = await api<{ url: string }>('/admin/upload', { method: 'POST', body: fd, auth: true });
      onChange(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="h-16 w-24 rounded-lg bg-slate-200 object-cover" />}
        <button type="button" onClick={() => input.current?.click()} className="flex items-center gap-2 rounded-xl border border-dashed border-gold-500 px-4 py-3 text-sm font-bold text-navy-900 hover:bg-gold-50">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} رفع صورة
        </button>
        <input ref={input} type="file" accept="image/*" hidden onChange={pick} />
        <input className="field !py-2 text-xs" dir="ltr" placeholder="/images/example.jpg أو رابط" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
