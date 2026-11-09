'use client';
import { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '@/lib/client-api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      await api('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      setState('ok');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="relative">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="بريدك الإلكتروني" className="field-dark !pe-14" />
        <button className="absolute inset-y-1.5 end-1.5 grid w-11 place-items-center rounded-lg bg-gold-gradient text-navy-950" aria-label="اشتراك">
          {state === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <ArrowLeft size={18} />}
        </button>
      </div>
      {state === 'ok' && <p className="mt-2 text-sm text-gold-300">شكراً لاشتراكك في نشرتنا الفاخرة ✦</p>}
      {state === 'error' && <p className="mt-2 text-sm text-red-300">تعذر الاشتراك، حاول مجدداً.</p>}
    </form>
  );
}
