'use client';
import { useCallback, useEffect, useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { api } from '@/lib/client-api';

export default function AdminMessages() {
  const [msgs, setMsgs] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const load = useCallback(() => {
    api<any[]>('/admin/messages', { auth: true }).then(setMsgs).catch(() => {});
    api<any[]>('/admin/subscribers', { auth: true }).then(setSubs).catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-6 font-display text-2xl font-extrabold">رسائل التواصل</h1>
        <div className="space-y-4">
          {msgs.map((m) => (
            <div key={m.id} className={`rounded-2xl bg-white p-5 shadow ring-1 ${m.isRead ? 'ring-navy-900/5' : 'ring-gold-500'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><b>{m.name}</b> <span className="text-sm text-navy-900/50" dir="ltr">{m.email} {m.phone}</span></div>
                <div className="flex items-center gap-2 text-xs text-navy-900/50">
                  {new Date(m.createdAt).toLocaleString('en-GB')}
                  {!m.isRead && <button onClick={async () => { await api(`/admin/messages/${m.id}/read`, { method: 'PATCH', auth: true }); load(); }} className="rounded-lg p-2 hover:bg-gold-100" title="تمت القراءة"><Check size={16} /></button>}
                  <button onClick={async () => { if (confirm('حذف الرسالة؟')) { await api(`/admin/messages/${m.id}`, { method: 'DELETE', auth: true }); load(); } }} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap leading-7">{m.message}</p>
            </div>
          ))}
          {!msgs.length && <p className="rounded-2xl bg-white p-8 text-center text-navy-900/50">لا توجد رسائل</p>}
        </div>
      </section>
      <section>
        <h2 className="mb-4 font-display text-xl font-extrabold">مشتركو النشرة ({subs.length})</h2>
        <div className="flex flex-wrap gap-2">
          {subs.map((s) => <span key={s.id} className="rounded-full bg-white px-4 py-2 text-sm shadow ring-1 ring-navy-900/5" dir="ltr">{s.email}</span>)}
        </div>
      </section>
    </div>
  );
}
