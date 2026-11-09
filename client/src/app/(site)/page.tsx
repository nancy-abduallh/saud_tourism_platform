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
    'جبل طويق', 'عمرة ملكية', 'سفاري فاخر', 'أنشطة هايكنج', 'يخوت خاصة', 'طيران خاص', 'تخييم ملكي'
  ];

  return (
    <>
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
