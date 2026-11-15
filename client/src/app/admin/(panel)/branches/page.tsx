'use client';
import ResourceManager from '@/components/admin/ResourceManager';
import { Building2, CheckCircle2, MessageCircle, Phone, Star } from 'lucide-react';

const REGION_OPTIONS = [
  { value: 'المنطقة الوسطى', label: 'المنطقة الوسطى' },
  { value: 'المنطقة الغربية', label: 'المنطقة الغربية' },
  { value: 'المنطقة الشمالية', label: 'المنطقة الشمالية' },
  { value: 'المنطقة الجنوبية', label: 'المنطقة الجنوبية' },
  { value: 'المنطقة الشرقية', label: 'المنطقة الشرقية' },
];

export default function BranchesAdminPage() {
  return (
    <div>
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-6 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
              <Building2 size={16} /> شبكة التمثيل الميداني بالمملكة
            </div>
            <h1 className="mt-1 font-display text-2xl font-black sm:text-3xl">
              إدارة فروع SA للسياحة
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              إدارة وتحديث بيانات الـ 13 فرعاً ومكتباً ميدانياً التابعة لـ SA للسياحة عبر مناطق المملكة،
              تعديل أرقام الهواتف والتواصل المباشر، وتحديث أوقات العمل الرسمية لكل فرع.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-2.5 text-center">
              <div className="font-display text-2xl font-bold text-gold-300">13</div>
              <div className="text-[11px] text-white/70">فرعاً بالمملكة</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center">
              <div className="font-display text-2xl font-bold text-white">5</div>
              <div className="text-[11px] text-white/70">مناطق إدارية</div>
            </div>
          </div>
        </div>
      </div>

      <ResourceManager
        title="فروع الجمعية"
        endpoint="/admin/branches"
        defaults={{
          name: '',
          nameEn: '',
          city: '',
          region: 'المنطقة الوسطى',
          phone: '',
          whatsapp: '',
          email: '',
          address: '',
          workingHours: 'الأحد - الخميس: 9:00 ص - 9:00 م',
          description: '',
          isMain: false,
          isActive: true,
          sortOrder: 0,
        }}
        fields={[
          { name: 'name', label: 'اسم الفرع (بالعربية)', type: 'text' },
          { name: 'nameEn', label: 'اسم الفرع (بالإنجليزية)', type: 'text' },
          { name: 'city', label: 'المدينة / المحافظة', type: 'text' },
          { name: 'region', label: 'المنطقة الإدارية', type: 'select', options: REGION_OPTIONS },
          { name: 'phone', label: 'رقم الهاتف المباشر', type: 'text' },
          { name: 'whatsapp', label: 'رقم الواتساب (مثال: 9665xxxxxxxx)', type: 'text' },
          { name: 'email', label: 'البريد الإلكتروني للفرع', type: 'text' },
          { name: 'workingHours', label: 'أوقات العمل الرسمية', type: 'text' },
          { name: 'address', label: 'العنوان بالتفصيل', type: 'text', wide: true },
          { name: 'description', label: 'نبذة عن دور الفرع ونطاق خدماته', type: 'textarea', wide: true },
          { name: 'sortOrder', label: 'ترتيب الظهور', type: 'number' },
          { name: 'isMain', label: 'المقر الرئيسي للجمعية', type: 'checkbox' },
          { name: 'isActive', label: 'فرع نشط ومفعل', type: 'checkbox' },
        ]}
        columns={[
          {
            key: 'name',
            label: 'الفرع والمدينة',
            render: (r) => (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-bold text-navy-950">
                  {r.name}
                  {r.isMain && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-gold-100 px-1.5 py-0.5 text-[10px] font-bold text-gold-800">
                      <Star size={11} className="fill-gold-500 text-gold-500" /> المقر الرئيسي
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500">{r.city} {r.nameEn ? `• ${r.nameEn}` : ''}</div>
              </div>
            ),
          },
          {
            key: 'region',
            label: 'المنطقة',
            render: (r) => {
              const colors: Record<string, string> = {
                'المنطقة الوسطى': 'bg-amber-50 text-amber-800 border-amber-200',
                'المنطقة الغربية': 'bg-blue-50 text-blue-800 border-blue-200',
                'المنطقة الشمالية': 'bg-purple-50 text-purple-800 border-purple-200',
                'المنطقة الجنوبية': 'bg-emerald-50 text-emerald-800 border-emerald-200',
                'المنطقة الشرقية': 'bg-teal-50 text-teal-800 border-teal-200',
              };
              const cls = colors[r.region] || 'bg-slate-100 text-slate-700';
              return (
                <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
                  {r.region}
                </span>
              );
            },
          },
          {
            key: 'contact',
            label: 'التواصل المباشر',
            render: (r) => (
              <div className="flex flex-col gap-1 text-xs">
                {r.phone && (
                  <span className="flex items-center gap-1 text-slate-600" dir="ltr">
                    <Phone size={12} className="text-slate-400" /> {r.phone}
                  </span>
                )}
                {r.whatsapp && (
                  <span className="flex items-center gap-1 text-emerald-700" dir="ltr">
                    <MessageCircle size={12} className="text-emerald-500" /> {r.whatsapp}
                  </span>
                )}
              </div>
            ),
          },
          {
            key: 'isActive',
            label: 'الحالة',
            render: (r) => (
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${r.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                <CheckCircle2 size={12} /> {r.isActive ? 'نشط' : 'معطل'}
              </span>
            ),
          },
          { key: 'sortOrder', label: 'الترتيب' },
        ]}
      />
    </div>
  );
}
