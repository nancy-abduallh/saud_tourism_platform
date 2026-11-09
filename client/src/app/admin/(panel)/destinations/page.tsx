'use client';
import ResourceManager from '@/components/admin/ResourceManager';

export default function Page() {
  return (
    <ResourceManager
      title="الوجهات" endpoint="/admin/destinations"
      defaults={{ slug: '', name: '', nameEn: '', tagline: '', description: '', image: '', sortOrder: 0, isActive: true }}
      fields={[
        { name: 'name', label: 'الاسم', type: 'text' }, { name: 'nameEn', label: 'الاسم بالإنجليزية', type: 'text' },
        { name: 'slug', label: 'Slug (إنجليزي)', type: 'text' }, { name: 'sortOrder', label: 'الترتيب', type: 'number' },
        { name: 'tagline', label: 'عبارة قصيرة', type: 'text', wide: true }, { name: 'description', label: 'الوصف', type: 'textarea' },
        { name: 'image', label: 'الصورة', type: 'image' }, { name: 'isActive', label: 'فعّالة', type: 'checkbox' },
      ]}
      columns={[
        { key: 'image', label: '', render: (r) => <img src={r.image} alt="" className="h-12 w-16 rounded bg-slate-200 object-cover" /> },
        { key: 'name', label: 'الاسم' }, { key: 'slug', label: 'Slug' }, { key: 'sortOrder', label: 'الترتيب' },
        { key: 'isActive', label: 'الحالة', render: (r) => (r.isActive ? 'فعّالة' : 'مخفية') },
      ]}
    />
  );
}
