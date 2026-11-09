import PackageForm from '@/components/admin/PackageForm';

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PackageForm id={id} />;
}
