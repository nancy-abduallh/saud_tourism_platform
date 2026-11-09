import PackageForm from '@/components/admin/PackageForm';

export default function EditPackagePage({ params }: { params: { id: string } }) {
  return <PackageForm id={params.id} />;
}
