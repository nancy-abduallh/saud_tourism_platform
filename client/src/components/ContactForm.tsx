'use client';
import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { api } from '@/lib/client-api';

export default function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', phone: '', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'ok'>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setState('loading');
    try {
      await api('/contact', { method: 'POST', body: JSON.stringify(f) });
      setState('ok');
    } catch (err) {
      setError((err as Error).message);
      setState('idle');
    }
  }

  if (state === 'ok') {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-navy-950"><Check size={32} /></div>
        <h3 className="font-display text-2xl font-extrabold">شكراً لتواصلك</h3>
        <p className="mt-2 text-navy-900/60">سيرد عليك أحد مستشارينا قريباً.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-navy-900/5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label">الاسم</label><input required className="field" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
        <div><label className="label">رقم الجوال</label><input className="field" dir="ltr" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
      </div>
      <div><label className="label">البريد الإلكتروني</label><input required type="email" className="field" dir="ltr" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
      <div><label className="label">كيف نستطيع مساعدتك؟</label><textarea required rows={5} className="field" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={state === 'loading'} className="btn-gold w-full">{state === 'loading' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> إرسال الرسالة</>}</button>
    </form>
  );
}
