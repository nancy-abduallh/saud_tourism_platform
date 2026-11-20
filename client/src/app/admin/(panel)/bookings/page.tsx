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
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy-950">إدارة الحجوزات والطلبات</h1>
          <p className="mt-1 text-xs text-slate-500">
            متابعة حجوزات الباقات السياحية، طلبات السياحة العلاجية والاستشفاء، واستفسارات كبار الشخصيات.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-gold-100 px-3 py-1.5 text-xs font-bold text-gold-800">
            إجمالي الحجوزات: {rows.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow ring-1 ring-navy-900/5">
        <table className="w-full text-sm">
          <thead className="bg-navy-900 text-gold-300">
            <tr>
              {['المرجع', 'العميل', 'التواصل', 'الباقة / الخدمة', 'التاريخ', 'ضيوف', 'ملاحظات وتفاصيل', 'الإجمالي', 'الحالة'].map((h) => (
                <th key={h} className="px-4 py-3 text-start whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t border-navy-900/5 align-top hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 font-bold" dir="ltr">{b.reference}</td>
                <td className="px-4 py-3">
                  <div className="font-bold text-navy-950">{b.fullName}</div>
                  {b.vipAddon && (
                    <span className="mt-0.5 inline-block rounded bg-gold-100 px-1.5 py-0.5 text-[10px] font-bold text-gold-700">
                      VIP+
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs" dir="ltr">
                  <a href={`tel:${b.phone}`} className="text-navy-950 hover:text-gold-600 font-bold block">
                    {b.phone}
                  </a>
                  {b.email && <div className="text-slate-400 text-[11px] truncate max-w-[150px]">{b.email}</div>}
                </td>
                <td className="px-4 py-3 font-medium">
                  {b.package?.title || (b.notes?.includes('سياحة علاجية') ? '🌿 سياحة علاجية واستشفاء' : 'طلب مخصص')}
                </td>
                <td className="px-4 py-3 text-xs whitespace-nowrap">
                  {new Date(b.startDate).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3 font-semibold">{b.guests}</td>
                <td className="px-4 py-3 text-xs max-w-xs text-slate-700">
                  {b.notes ? (
                    <div
                      className="line-clamp-2 hover:line-clamp-none transition-all cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-200/80 leading-relaxed"
                      title={b.notes}
                    >
                      {b.notes}
                    </div>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 font-bold whitespace-nowrap">
                  {b.totalSar ? formatPrice(b.totalSar) : <span className="text-xs text-slate-500 font-normal">استفسار / مخصص</span>}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => setStatus(b.id, e.target.value)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-bold cursor-pointer ${COLOR[b.status] || 'bg-slate-100'}`}
                  >
                    {Object.entries(STATUS_LABEL).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-navy-900/50">
                  لا توجد حجوزات مسجلة حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
