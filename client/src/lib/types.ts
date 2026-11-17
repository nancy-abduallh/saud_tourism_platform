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
  ownerName?: string;
  ownerTitle?: string;
  ownerMessage?: string;
  ownerImage?: string;
}

export interface Branch {
  id: number;
  name: string;
  nameEn?: string | null;
  city: string;
  region: string;
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  managerName?: string | null;
  workingHours?: string | null;
  description?: string | null;
  mapUrl?: string | null;
  isMain?: boolean;
  isActive: boolean;
  sortOrder?: number;
}

export const BRANCH_REGIONS = [
  'الكل',
  'المنطقة الوسطى',
  'المنطقة الغربية',
  'المنطقة الشمالية',
  'المنطقة الجنوبية',
  'المنطقة الشرقية',
] as const;

export type LiveStreamStatus = 'UPCOMING' | 'LIVE' | 'ENDED';

export interface LiveStreamSettings {
  id?: number;
  isLive: boolean;
  status: LiveStreamStatus;
  title: string;
  subtitle?: string | null;
  scheduledAt: string;
  streamUrl: string;
  streamPlatform: 'youtube' | 'vimeo' | 'custom';
  recordingUrl?: string | null;
  bannerEnabled: boolean;
  bannerText: string;
  allowComments: boolean;
  viewerCount?: number;
  autoDetectViewers?: boolean;
  heroBadge?: string | null;
}

export interface LiveCongratulation {
  id: number;
  senderName: string;
  branchOrCity: string;
  message: string;
  createdAt: string;
  isApproved: boolean;
}

export interface LiveAgendaItem {
  id: number;
  time: string;
  title: string;
  description: string;
  sortOrder: number;
}
