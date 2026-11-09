import PackagesBrowser from '@/components/PackagesBrowser';
import { serverFetch } from '@/lib/api';
import type { Destination, PackageSummary } from '@/lib/types';

export const metadata = { title: 'الباقات الفاخرة | SA للسياحة' };
export const revalidate = 30;

export default async function PackagesPage({ searchParams }: { searchParams: { destination?: string; category?: string; guests?: string; date?: string } }) {
  const [packages, destinations] = await Promise.all([
    serverFetch<PackageSummary[]>('/packages', []),
    serverFetch<Destination[]>('/destinations', []),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-gradient pb-16 pt-40 text-center">
        <div className="absolute inset-0 bg-pattern opacity-35" />
        <div className="container-x relative">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.4em] text-gold-300">Curated Saudi Journeys</div>
          <h1 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl drop-shadow-xl">
            باقات وتجارب{' '}
            <span className="text-gold-gradient inline-block pt-8 pb-3 -mt-8 -mb-3 overflow-visible drop-shadow-[0_2px_18px_rgba(243,211,122,0.45)]">
              سياحية حصرية
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">رحلات مصممة بعناية لتلبي تطلعات النخبة في أرجاء المملكة</p>
        </div>
      </section>
      <PackagesBrowser
        packages={packages}
        destinations={destinations}
        initial={{ destination: searchParams.destination, category: searchParams.category, guests: Number(searchParams.guests) || undefined, date: searchParams.date }}
      />
    </>
  );
}
