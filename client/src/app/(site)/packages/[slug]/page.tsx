import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import Gallery from '@/components/Gallery';
import Itinerary from '@/components/Itinerary';
import PackageBooking from '@/components/PackageBooking';
import PackageCard from '@/components/PackageCard';
import { Stars } from '@/components/Stars';
import { serverFetch } from '@/lib/api';
import { splitBadges } from '@/lib/format';
import type { PackageDetail, PackageSummary } from '@/lib/types';

export const revalidate = 30;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await serverFetch<PackageDetail | null>(`/packages/${slug}`, null);
  return { title: pkg ? `${pkg.title} | SA للسياحة` : 'الباقة غير موجودة' };
}

export default async function PackagePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ guests?: string; date?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const pkg = await serverFetch<PackageDetail | null>(`/packages/${slug}`, null);
  if (!pkg) notFound();

  const related = await serverFetch<PackageSummary[]>(`/packages?destination=${pkg.destination.slug}&limit=3&exclude=${pkg.id}`, []);
  const gallery = [pkg.coverImage, ...pkg.images.map((i) => i.url)];
  const badges = [`${pkg.days} أيام / ${pkg.nights} ليالٍ`, ...splitBadges(pkg.badges)];

  return (
    <main className="bg-slate-50 pb-24 pt-28">
      <div className="container-x">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-navy-900/60">
          <Link href="/" className="hover:text-gold-600">الرئيسية</Link> ›
          <Link href="/packages" className="hover:text-gold-600">الباقات</Link> ›
          <Link href={`/packages?destination=${pkg.destination.slug}`} className="hover:text-gold-600">{pkg.destination.name}</Link> ›
          <span className="font-bold text-navy-900">{pkg.title}</span>
        </nav>

        <Gallery images={gallery} title={pkg.title} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr]">
          <aside className="order-2 lg:sticky lg:top-28 lg:order-1 lg:self-start">
            <PackageBooking pkg={pkg} initialGuests={Number(resolvedSearchParams.guests) || 2} initialDate={resolvedSearchParams.date} />
          </aside>

          <div className="order-1 lg:order-2">
            <div className="flex flex-wrap gap-3">
              {badges.map((b) => <span key={b} className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-extrabold text-navy-950 shadow-gold">{b}</span>)}
            </div>
            <h1 className="mt-5 font-display text-3xl font-black leading-snug text-navy-900 sm:text-4xl">{pkg.title}</h1>
            <div className="mt-3 flex items-center gap-3"><Stars rating={pkg.rating} size={18} /><span className="text-navy-900/60">{pkg.rating.toFixed(1)}</span></div>
            <p className="mt-5 text-lg leading-9 text-navy-900/70">{pkg.description}</p>

            <div className="mt-10 grid gap-8 md:grid-cols-[270px_1fr]">
              <div className="h-fit rounded-2xl bg-white p-6 shadow ring-1 ring-gold-400/40">
                <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full bg-gold-gradient p-1 shadow-gold">
                  <div className="grid h-full w-full place-items-center rounded-full border-2 border-navy-900/40 text-center font-display font-black leading-tight text-navy-950">
                    <span>{pkg.days} أيام<br />{pkg.nights} ليالٍ</span>
                  </div>
                </div>
                <h3 className="mb-4 font-display text-lg font-extrabold">مشتملات VIP</h3>
                <ul className="space-y-3">
                  {pkg.inclusions.map((i) => (
                    <li key={i.id} className="flex items-start gap-2 text-navy-900/80"><Check size={18} className="mt-0.5 shrink-0 text-gold-600" /> {i.text}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-5 font-display text-xl font-extrabold">برنامج الرحلة</h3>
                <Itinerary days={pkg.itinerary} />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-8 font-display text-2xl font-black">باقات قد تعجبك</h2>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{related.map((p) => <PackageCard key={p.id} pkg={p} />)}</div>
          </section>
        )}
      </div>
    </main>
  );
}
