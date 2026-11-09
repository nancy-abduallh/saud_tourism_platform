import Link from 'next/link';
import SectionTitle from './SectionTitle';
import PackageCard from './PackageCard';
import { Reveal, Stagger, StaggerItem } from './Reveal';
import type { PackageSummary } from '@/lib/types';

export default function FeaturedPackages({ packages }: { packages: PackageSummary[] }) {
  if (!packages.length) return null;
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="container-x">
        <SectionTitle eyebrow="CURATED LUXURY PACKAGES" title="باقات وتجارب سياحية استثنائية" subtitle="رحلات مصممة بعناية لتلبي تطلعات النخبة في أرجاء المملكة" />
        <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => <StaggerItem key={p.id}><PackageCard pkg={p} /></StaggerItem>)}
        </Stagger>
        <Reveal className="mt-14 text-center"><Link href="/packages" className="btn-outline !border-navy-900 !text-navy-900 hover:!bg-navy-900 hover:!text-gold-300">عرض جميع الباقات</Link></Reveal>
      </div>
    </section>
  );
}
