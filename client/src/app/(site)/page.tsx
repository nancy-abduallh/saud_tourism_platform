import type { Metadata } from 'next';
import HeroSlider from '@/components/HeroSlider';
import DestinationCards from '@/components/DestinationCards';
import Marquee from '@/components/Marquee';
import FeaturedPackages from '@/components/FeaturedPackages';
import Stats from '@/components/Stats';
import VipServices from '@/components/VipServices';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CtaBanner from '@/components/CtaBanner';
import { serverFetch } from '@/lib/api';
import type { Destination, HeroSlide, PackageSummary, PublicStats, Review, VipService } from '@/lib/types';

export const revalidate = 30;

const BASE_URL = 'https://saudtourism.ksaplatforms.com';

export const metadata: Metadata = {
  title: 'SA للسياحة | تجارب وباقات سياحية فاخرة في المملكة العربية السعودية',
  description:
    'احجز أرقى الرحلات والتجارب السياحية في السعودية: رحلات استكشاف حافة العالم، منتجعات العلا الأثرية، جزر البحر الأحمر، وقصور الدرعية التاريخية بخدمات VIP متكاملة.',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'SA للسياحة | تجارب وباقات سياحية فاخرة في المملكة العربية السعودية',
    description:
      'احجز أرقى الرحلات والتجارب السياحية في السعودية: رحلات استكشاف حافة العالم، منتجعات العلا الأثرية، جزر البحر الأحمر، وقصور الدرعية التاريخية بخدمات VIP متكاملة.',
    url: BASE_URL,
    type: 'website',
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'SA للسياحة - تجارب سياحية فاخرة في السعودية',
      },
    ],
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: 'SA للسياحة | تجارب وباقات سياحية فاخرة في المملكة العربية السعودية',
  description:
    'احجز أرقى الرحلات والتجارب السياحية في السعودية: رحلات استكشاف حافة العالم، منتجعات العلا الأثرية، جزر البحر الأحمر، وقصور الدرعية التاريخية بخدمات VIP متكاملة.',
  inLanguage: 'ar-SA',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
  },
  about: {
    '@type': 'TravelAgency',
    '@id': `${BASE_URL}/#organization`,
  },
};

export default async function HomePage() {
  const [slides, destinations, packages, services, reviews, stats] = await Promise.all([
    serverFetch<HeroSlide[]>('/hero', []),
    serverFetch<Destination[]>('/destinations', []),
    serverFetch<PackageSummary[]>('/packages?featured=1&limit=6', []),
    serverFetch<VipService[]>('/services', []),
    serverFetch<Review[]>('/reviews', []),
    serverFetch<PublicStats | undefined>('/stats', undefined),
  ]);

  const marqueeItems = [
    ...destinations.map((d) => d.name),
    'جبل طويق',
    'عمرة ملكية',
    'سفاري فاخر',
    'أنشطة هايكنج',
    'يخوت خاصة',
    'طيران خاص',
    'تخييم ملكي',
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HeroSlider slides={slides} destinations={destinations} />
      <DestinationCards destinations={destinations} />
      <Marquee items={marqueeItems} />
      <FeaturedPackages packages={packages} />
      <Stats data={stats} />
      <VipServices services={services} />
      <WhyUs />
      <HowItWorks />
      <Testimonials reviews={reviews} />
      <CtaBanner />
    </>
  );
}
