import type { Metadata } from 'next';
import PackagesBrowser from '@/components/PackagesBrowser';
import { serverFetch } from '@/lib/api';
import type { Destination, PackageSummary } from '@/lib/types';

const BASE_URL = 'https://saudtourism.ksaplatforms.com';

export const metadata: Metadata = {
  title: 'الباقات والتجارب السياحية الفاخرة',
  description:
    'استكشف باقاتنا الحصرية المصممة لنخبة المسافرين: سفاري حافة العالم، مخيمات العلا الفلكية، رحلات يخوت البحر الأحمر، وإجازات جبال عسير الساحرة بخدمات كونسيرج متكاملة.',
  keywords: [
    'باقات سياحية السعودية',
    'رحلات العلا',
    'سفاري حافة العالم',
    'سياحة البحر الأحمر',
    'عسير السياحية',
    'رحلات VIP السعودية',
    'باقات سياحة فاخرة',
  ],
  alternates: {
    canonical: `${BASE_URL}/packages`,
  },
  openGraph: {
    title: 'الباقات والتجارب السياحية الفاخرة | SA للسياحة',
    description:
      'استكشف باقاتنا الحصرية المصممة لنخبة المسافرين: سفاري حافة العالم، مخيمات العلا الفلكية، رحلات يخوت البحر الأحمر، وإجازات جبال عسير الساحرة.',
    url: `${BASE_URL}/packages`,
    type: 'website',
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'باقات SA للسياحة الفاخرة في السعودية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الباقات والتجارب السياحية الفاخرة | SA للسياحة',
    description:
      'استكشف باقاتنا الحصرية المصممة لنخبة المسافرين: سفاري حافة العالم، مخيمات العلا، ويخوت البحر الأحمر.',
    images: ['/images/hero-1.jpg'],
  },
};

export const revalidate = 30;

const packagesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/packages#collection`,
      url: `${BASE_URL}/packages`,
      name: 'الباقات والتجارب السياحية الفاخرة | SA للسياحة',
      description:
        'استكشف باقاتنا الحصرية المصممة لنخبة المسافرين: سفاري حافة العالم، مخيمات العلا الفلكية، رحلات يخوت البحر الأحمر، وإجازات جبال عسير الساحرة.',
      inLanguage: 'ar-SA',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/packages#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'الرئيسية',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'الباقات الفاخرة',
          item: `${BASE_URL}/packages`,
        },
      ],
    },
  ],
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; category?: string; guests?: string; date?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const [packages, destinations] = await Promise.all([
    serverFetch<PackageSummary[]>('/packages', []),
    serverFetch<Destination[]>('/destinations', []),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesJsonLd) }}
      />
      <section className="relative overflow-hidden bg-navy-gradient pb-16 pt-40 text-center">
        <div className="absolute inset-0 bg-pattern opacity-35" />
        <div className="container-x relative">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.4em] text-gold-300">
            Curated Saudi Journeys
          </div>
          <h1 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl drop-shadow-xl">
            باقات وتجارب{' '}
            <span className="text-gold-gradient inline-block pt-8 pb-3 -mt-8 -mb-3 overflow-visible drop-shadow-[0_2px_18px_rgba(243,211,122,0.45)]">
              سياحية حصرية
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            رحلات مصممة بعناية لتلبي تطلعات النخبة في أرجاء المملكة
          </p>
        </div>
      </section>
      <PackagesBrowser
        packages={packages}
        destinations={destinations}
        initial={{
          destination: resolvedSearchParams.destination,
          category: resolvedSearchParams.category,
          guests: Number(resolvedSearchParams.guests) || undefined,
          date: resolvedSearchParams.date,
        }}
      />
    </>
  );
}
