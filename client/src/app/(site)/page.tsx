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
import MedicalTourismSection from '@/components/home/MedicalTourismSection';
import TravelRoutes from '@/components/home/TravelRoutes';
import { serverFetch } from '@/lib/api';
import { getBranches, getHomeSectionsData, getPackages, getSiteSettings } from '@/lib/db';
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
  const [slides, destinations, featuredPackages, allPackages, services, reviews, stats, branches, settings, sectionsData] = await Promise.all([
    serverFetch<HeroSlide[]>('/hero', []),
    serverFetch<Destination[]>('/destinations', []),
    serverFetch<PackageSummary[]>('/packages?featured=1&limit=6', []),
    getPackages(),
    serverFetch<VipService[]>('/services', []),
    serverFetch<Review[]>('/reviews', []),
    serverFetch<PublicStats | undefined>('/stats', undefined),
    getBranches(),
    getSiteSettings(),
    getHomeSectionsData(),
  ]);

  const vis = sectionsData.visibility;

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
      {vis.hero !== false && <HeroSlider slides={slides} destinations={destinations} />}
      {vis.valueProps !== false && <BookingValueProps items={sectionsData.valueProps} />}
      {vis.stayTypes !== false && <StayTypes items={sectionsData.stayTypes} />}
      {vis.trendingDestinations !== false && <TrendingDestinations />}
      {vis.exploreCities !== false && <ExploreCities items={sectionsData.exploreCities} packages={allPackages} />}
      {vis.marquee !== false && <Marquee items={marqueeItems} />}
      {vis.quickTripPlanner !== false && <QuickTripPlanner categories={sectionsData.tripPlanner} />}
      {vis.weekendDeals !== false && <WeekendDeals deals={sectionsData.weekendDeals} />}
      {vis.featuredPackages !== false && (
        <FeaturedPackages packages={featuredPackages.length > 0 ? featuredPackages : allPackages.slice(0, 6)} />
      )}
      {vis.popularStays !== false && <PopularStays stays={sectionsData.popularStays} />}
      {vis.vipClubBanner !== false && <VipClubBanner config={sectionsData.vipBanner} />}
      {vis.medicalTourism !== false && (
        <MedicalTourismSection destinations={sectionsData.medicalDestinations} />
      )}
      {vis.stats !== false && <Stats data={stats} />}
      {vis.vipServices !== false && <VipServices services={services} />}
      {vis.ownerMessage !== false && <OwnerMessage settings={settings} />}
      {vis.branches !== false && <BranchesHomeSection branches={branches} packages={allPackages} />}
      {vis.travelRoutes !== false && <TravelRoutes departures={sectionsData.travelRoutes} />}
      {vis.whyUs !== false && <WhyUs />}
      {vis.howItWorks !== false && <HowItWorks />}
      {vis.testimonials !== false && <Testimonials reviews={reviews} />}
      {vis.ctaBanner !== false && <CtaBanner />}
    </>
  );
}
