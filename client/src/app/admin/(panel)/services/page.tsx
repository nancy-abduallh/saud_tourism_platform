'use client';
import ResourceManager from '@/components/admin/ResourceManager';

export default function Page() {
  return (
    <ResourceManager
      title="خدمات VIP" endpoint="/admin/services"
      defaults={{ title: '', description: '', icon: 'concierge', sortOrder: 0, isActive: true }}
      fields={[
        { name: 'title', label: 'العنوان', type: 'text' },
        { name: 'icon', label: 'الأيقونة', type: 'select', options: [
          { value: 'plane', label: 'طائرة' }, { value: 'ship', label: 'يخت' }, { value: 'concierge', label: 'كونسيرج' },
          { value: 'guide', label: 'مرشد' }, { value: 'car', label: 'سيارة' }, { value: 'spa', label: 'سبا' } ] },
        { name: 'description', label: 'الوصف', type: 'textarea' }, { name: 'sortOrder', label: 'الترتيب', type: 'number' }, { name: 'isActive', label: 'فعّالة', type: 'checkbox' },
      ]}
      columns={[{ key: 'title', label: 'العنوان' }, { key: 'icon', label: 'الأيقونة' }, { key: 'sortOrder', label: 'الترتيب' }]}
    />
  );
}
