'use client';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/client-api';
import { formatPrice } from '@/lib/format';

const STATUS_LABEL: Record<string, string> = { PENDING: 'قيد المراجعة', CONFIRMED: 'مؤكد', CANCELLED: 'ملغي', COMPLETED: 'مكتمل' };
const COLOR: Record<string, string> = { PENDING: 'bg-amber-100 text-amber-800', CONFIRMED: 'bg-green-100 text-green-800', CANCELLED: 'bg-red-100 text-red-800', COMPLETED: 'bg-blue-100 text-blue-800' };

export default function AdminBookings() {
  const [rows, setRows] = useState<any[]>([]);
  const load = useCallback(() => api<any[]>('/admin/bookings', { auth: true }).then(setRows).catch(() => {}), []);
  useEffect(() => { load(); }, [load]);

  async function setStatus(id: number, status: string) {
    await api(`/admin/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), auth: true });
    load();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold">الحجوزات</h1>
      <div className="overflow-x-auto rounded-2xl bg-white shadow ring-1 ring-navy-900/5">
        <table className="w-full text-sm">
          <thead className="bg-navy-900 text-gold-300"><tr>{['المرجع', 'العميل', 'التواصل', 'الباقة', 'التاريخ', 'ضيوف', 'الإجمالي', 'الحالة'].map((h) => <th key={h} className="px-4 py-3 text-start">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t border-navy-900/5 align-top">
                <td className="px-4 py-3 font-bold" dir="ltr">{b.reference}</td>
                <td className="px-4 py-3">{b.fullName}{b.vipAddon && <span className="ms-2 rounded bg-gold-100 px-1.5 text-xs text-gold-700">VIP+</span>}</td>
                <td className="px-4 py-3" dir="ltr">{b.phone}<br />{b.email}</td>
                <td className="px-4 py-3">{b.package.title}</td>
                <td className="px-4 py-3">{new Date(b.startDate).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-3">{b.guests}</td>
                <td className="px-4 py-3">{formatPrice(b.totalSar)}</td>
                <td className="px-4 py-3">
                  <select value={b.status} onChange={(e) => setStatus(b.id, e.target.value)} className={`rounded-lg px-2 py-1.5 text-xs font-bold ${COLOR[b.status]}`}>
                    {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={8} className="p-8 text-center text-navy-900/50">لا توجد حجوزات</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
