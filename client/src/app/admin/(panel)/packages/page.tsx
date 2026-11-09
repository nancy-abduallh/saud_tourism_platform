'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { api } from '@/lib/client-api';
import { formatPrice } from '@/lib/format';

export default function AdminPackages() {
  const [rows, setRows] = useState<any[]>([]);
  const load = useCallback(() => api<any[]>('/admin/packages', { auth: true }).then(setRows).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  async function remove(id: number) {
    if (!confirm('حذف الباقة نهائياً؟')) return;
    try { await api(`/admin/packages/${id}`, { method: 'DELETE', auth: true }); load(); } catch (e) { alert((e as Error).message); }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">الباقات</h1>
        <Link href="/admin/packages/new" className="btn-gold !py-2.5"><Plus size={18} /> باقة جديدة</Link>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white shadow ring-1 ring-navy-900/5">
        <table className="w-full text-sm">
          <thead className="bg-navy-900 text-gold-300"><tr>{['', 'الباقة', 'الوجهة', 'السعر', 'مميزة', 'الحالة', ''].map((h, i) => <th key={i} className="px-4 py-3 text-start">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-navy-900/5 hover:bg-gold-50/40">
                <td className="px-4 py-3"><img src={p.coverImage} alt="" className="h-12 w-16 rounded bg-slate-200 object-cover" /></td>
                <td className="px-4 py-3 font-bold">{p.title}</td><td className="px-4 py-3">{p.destination.name}</td>
                <td className="px-4 py-3">{formatPrice(p.priceSar)}</td><td className="px-4 py-3">{p.isFeatured ? '★' : '—'}</td>
                <td className="px-4 py-3">{p.isActive ? 'فعّالة' : 'مخفية'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-end">
                  <Link href={`/admin/packages/${p.id}`} className="me-2 inline-block rounded-lg p-2 hover:bg-gold-100"><Pencil size={16} /></Link>
                  <button onClick={() => remove(p.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} className="p-8 text-center text-navy-900/50">لا توجد باقات</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
