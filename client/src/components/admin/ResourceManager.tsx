'use client';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { api } from '@/lib/client-api';
import ImageUpload from './ImageUpload';

type Row = Record<string, any>;
export type Field = { name: string; label: string; type: 'text' | 'textarea' | 'number' | 'image' | 'checkbox' | 'select'; options?: { value: string; label: string }[]; wide?: boolean };
export type Column = { key: string; label: string; render?: (row: Row) => React.ReactNode };

interface Props { title: string; endpoint: string; fields: Field[]; columns: Column[]; defaults: Row }

export default function ResourceManager({ title, endpoint, fields, columns, defaults }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);

  const load = useCallback(() => api<Row[]>(endpoint, { auth: true }).then(setRows).catch(() => {}).finally(() => setLoading(false)), [endpoint]);
  useEffect(() => { load(); }, [load]);

  async function remove(id: number) {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try { await api(`${endpoint}/${id}`, { method: 'DELETE', auth: true }); load(); } catch (e) { alert((e as Error).message); }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">{title}</h1>
        <button className="btn-gold !py-2.5" onClick={() => setEditing({ ...defaults })}><Plus size={18} /> إضافة جديد</button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow ring-1 ring-navy-900/5">
        <table className="w-full text-sm">
          <thead className="bg-navy-900 text-gold-300">
            <tr>{columns.map((c) => <th key={c.key} className="px-4 py-3 text-start font-bold">{c.label}</th>)}<th className="px-4 py-3" /></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={columns.length + 1} className="p-8 text-center"><Loader2 className="mx-auto animate-spin" /></td></tr>}
            {!loading && !rows.length && <tr><td colSpan={columns.length + 1} className="p-8 text-center text-navy-900/50">لا توجد عناصر بعد</td></tr>}
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-navy-900/5 hover:bg-gold-50/40">
                {columns.map((c) => <td key={c.key} className="px-4 py-3">{c.render ? c.render(r) : String(r[c.key] ?? '')}</td>)}
                <td className="whitespace-nowrap px-4 py-3 text-end">
                  <button onClick={() => setEditing(r)} className="me-2 rounded-lg p-2 text-navy-900 hover:bg-gold-100" aria-label="تعديل"><Pencil size={16} /></button>
                  <button onClick={() => remove(r.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="حذف"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && <FormModal key="modal" endpoint={endpoint} fields={fields} initial={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
      </AnimatePresence>
    </div>
  );
}

function FormModal({ endpoint, fields, initial, onClose, onSaved }: { endpoint: string; fields: Field[]; initial: Row; onClose: () => void; onSaved: () => void }) {
  const [v, setV] = useState<Row>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const payload: Row = {};
    for (const f of fields) payload[f.name] = f.type === 'number' ? Number(v[f.name] ?? 0) : f.type === 'checkbox' ? !!v[f.name] : v[f.name] ?? '';
    try {
      if (initial.id) await api(`${endpoint}/${initial.id}`, { method: 'PUT', body: JSON.stringify(payload), auth: true });
      else await api(endpoint, { method: 'POST', body: JSON.stringify(payload), auth: true });
      onSaved();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-navy-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.form
        onSubmit={submit} onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.96 }}
        className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold">{initial.id ? 'تعديل' : 'إضافة'}</h2>
          <button type="button" onClick={onClose}><X /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className={f.wide || f.type === 'textarea' || f.type === 'image' ? 'sm:col-span-2' : ''}>
              {f.type === 'image' ? (
                <ImageUpload label={f.label} value={v[f.name]} onChange={(url) => setV({ ...v, [f.name]: url })} />
              ) : f.type === 'checkbox' ? (
                <label className="flex items-center gap-2 pt-7"><input type="checkbox" className="h-5 w-5 accent-[#c9a24b]" checked={!!v[f.name]} onChange={(e) => setV({ ...v, [f.name]: e.target.checked })} /> {f.label}</label>
              ) : (
                <>
                  <label className="label">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea rows={3} className="field" value={v[f.name] ?? ''} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
                  ) : f.type === 'select' ? (
                    <select className="field" value={v[f.name] ?? ''} onChange={(e) => setV({ ...v, [f.name]: e.target.value })}>
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : (
                    <input type={f.type === 'number' ? 'number' : 'text'} className="field" value={v[f.name] ?? ''} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl px-5 py-3 font-bold hover:bg-slate-100">إلغاء</button>
          <button disabled={busy} className="btn-gold">{busy ? <Loader2 className="animate-spin" size={18} /> : 'حفظ'}</button>
        </div>
      </motion.form>
    </motion.div>
  );
}
