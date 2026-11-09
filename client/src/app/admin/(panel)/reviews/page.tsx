'use client';
import ResourceManager from '@/components/admin/ResourceManager';

export default function Page() {
  return (
    <ResourceManager
      title="التقييمات" endpoint="/admin/reviews"
      defaults={{ name: '', location: '', rating: 5, comment: '', isApproved: true }}
      fields={[
        { name: 'name', label: 'الاسم', type: 'text' }, { name: 'location', label: 'المدينة', type: 'text' },
        { name: 'rating', label: 'التقييم (1-5)', type: 'number' }, { name: 'isApproved', label: 'معتمد (يظهر في الموقع)', type: 'checkbox' },
        { name: 'comment', label: 'التعليق', type: 'textarea' },
      ]}
      columns={[
        { key: 'name', label: 'الاسم' }, { key: 'rating', label: 'التقييم' },
        { key: 'comment', label: 'التعليق', render: (r) => <span className="line-clamp-1 max-w-xs">{r.comment}</span> },
        { key: 'isApproved', label: 'الحالة', render: (r) => (r.isApproved ? 'معتمد' : 'بانتظار الاعتماد') },
      ]}
    />
  );
}
