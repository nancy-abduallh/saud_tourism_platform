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
import BranchesHomeSection from '@/components/BranchesHomeSection';
import OwnerMessage from '@/components/OwnerMessage';
import BookingValueProps from '@/components/home/BookingValueProps';
import StayTypes from '@/components/home/StayTypes';
import TrendingDestinations from '@/components/home/TrendingDestinations';
import ExploreCities from '@/components/home/ExploreCities';
import QuickTripPlanner from '@/components/home/QuickTripPlanner';
import WeekendDeals from '@/components/home/WeekendDeals';
import PopularStays from '@/components/home/PopularStays';
import VipClubBanner from '@/components/home/VipClubBanner';
import TravelRoutes from '@/components/home/TravelRoutes';
import { serverFetch } from '@/lib/api';
import { getBranches, getSiteSettings } from '@/lib/db';
import type { Destination, HeroSlide, PackageSummary, PublicStats, Review, VipService } from '@/lib/types';

export const dynamic = 'force-dynamic';

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
  const [slides, destinations, packages, services, reviews, stats, branches, settings] = await Promise.all([
    serverFetch<HeroSlide[]>('/hero', []),
    serverFetch<Destination[]>('/destinations', []),
    serverFetch<PackageSummary[]>('/packages?featured=1&limit=6', []),
    serverFetch<VipService[]>('/services', []),
    serverFetch<Review[]>('/reviews', []),
    serverFetch<PublicStats | undefined>('/stats', undefined),
    getBranches(),
    getSiteSettings(),
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
      <BookingValueProps />
      <StayTypes />
      <TrendingDestinations />
      <ExploreCities />
      <Marquee items={marqueeItems} />
      <QuickTripPlanner />
      <WeekendDeals />
      <FeaturedPackages packages={packages} />
      <PopularStays />
      <VipClubBanner />
      <Stats data={stats} />
      <VipServices services={services} />
      <OwnerMessage settings={settings} />
      <BranchesHomeSection branches={branches} />
      <TravelRoutes />
      <WhyUs />
      <HowItWorks />
      <Testimonials reviews={reviews} />
      <CtaBanner />
    </>
  );
}
