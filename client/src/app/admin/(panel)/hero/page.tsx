'use client';
import ResourceManager from '@/components/admin/ResourceManager';

export default function Page() {
  return (
    <ResourceManager
      title="شرائح الهيرو" endpoint="/admin/hero-slides"
      defaults={{ title: '', titleEn: '', subtitle: '', image: '', ctaText: 'اكتشف الآن', ctaLink: '/packages', sortOrder: 0, isActive: true }}
      fields={[
        { name: 'title', label: 'العنوان', type: 'text' }, { name: 'titleEn', label: 'العنوان الإنجليزي', type: 'text' },
        { name: 'subtitle', label: 'النص الفرعي', type: 'textarea' }, { name: 'image', label: 'صورة الخلفية', type: 'image' },
        { name: 'ctaText', label: 'نص الزر', type: 'text' }, { name: 'ctaLink', label: 'رابط الزر', type: 'text' },
        { name: 'sortOrder', label: 'الترتيب', type: 'number' }, { name: 'isActive', label: 'فعّالة', type: 'checkbox' },
      ]}
      columns={[
        { key: 'image', label: '', render: (r) => <img src={r.image} alt="" className="h-12 w-20 rounded bg-slate-200 object-cover" /> },
        { key: 'title', label: 'العنوان' }, { key: 'sortOrder', label: 'الترتيب' },
        { key: 'isActive', label: 'الحالة', render: (r) => (r.isActive ? 'فعّالة' : 'مخفية') },
      ]}
    />
  );
}
