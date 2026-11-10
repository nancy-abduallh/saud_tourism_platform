export type Category = 'LUXURY' | 'VIP' | 'UMRAH' | 'DESERT';

export const CATEGORY_LABEL: Record<Category, string> = {
  LUXURY: 'فاخر',
  VIP: 'كبار الشخصيات',
  UMRAH: 'عمرة ملكية',
  DESERT: 'تخييم فاخر',
};

export interface Destination { id: number; slug: string; name: string; nameEn?: string | null; tagline: string; description: string; image: string }
export interface HeroSlide { id: number; title: string; titleEn?: string | null; subtitle?: string | null; image: string; ctaText: string; ctaLink: string }
export interface PackageSummary {
  id: number; slug: string; title: string; titleEn?: string | null; summary: string; priceSar: number;
  days: number; nights: number; rating: number; coverImage: string; badges?: string | null;
  category: Category; isFeatured: boolean; destination: { name: string; slug: string };
}
export interface PackageDetail extends PackageSummary {
  description: string; maxGuests: number;
  images: { id: number; url: string }[];
  inclusions: { id: number; text: string }[];
  itinerary: { id: number; dayNumber: number; title: string; description: string }[];
}
export interface VipService { id: number; title: string; description: string; icon: string }
export interface Review { id: number; name: string; location?: string | null; rating: number; comment: string }
export interface PublicStats {
  happyGuests: number;
  exclusiveExperiences: number;
  averageRating: number;
  vipConcierge: string;
}

export interface SiteSettings {
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  snapchatUrl: string;
  linkedinUrl: string;
  whatsappNumber: string;
  whatsappMessage?: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  footerDescription: string;
  copyrightText: string;
}
