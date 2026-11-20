'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Plane, Sparkles, Tag, Timer } from 'lucide-react';
import type { TripPlannerCategory } from '@/lib/types';

interface PlannerItem {
  id: string;
  name: string;
  region: string;
  travelTime: string;
  priceFrom: string;
  image: string;
  rating: string;
  badge: string;
}

const CATEGORIES: { id: string; label: string; icon: string; items: PlannerItem[] }[] = [
  {
    id: 'beach',
    label: 'شواطئ وجزر ساحلية',
    icon: '🏖️',
    items: [
      {
        id: 'red-sea-1',
        name: 'منتجع جزر أمهات الشيخ',
        region: 'البحر الأحمر',
        travelTime: 'طيران مباشر 1 س و 40 د من الرياض',
        priceFrom: '3,800 ر.س',
        image: '/images/red-sea.jpg',
        rating: '4.9 ★',
        badge: 'جزر عذراء ويخوت',
      },
      {
        id: 'farasan-1',
        name: 'أرخبيل جزر فرسان البكر',
        region: 'جازان',
        travelTime: 'طيران + عبارة فاخرة ساعتان',
        priceFrom: '2,200 ر.س',
        image: '/images/jazan-farasan.jpg',
        rating: '4.8 ★',
        badge: 'محمية بحرية',
      },
      {
        id: 'haql-1',
        name: 'شواطئ حقل ومقنا الفيروزية',
        region: 'تبوك',
        travelTime: 'طيران إلى تبوك ساعتان',
        priceFrom: '1,950 ر.س',
        image: '/images/haql-shipwreck.jpg',
        rating: '4.9 ★',
        badge: 'سفينة جورجيوس الغارقة',
      },
      {
        id: 'jeddah-1',
        name: 'شاليهات درة العروس وإبحار اليخوت',
        region: 'جدة',
        travelTime: 'طيران 1 س و 30 د من الرياض',
        priceFrom: '2,400 ر.س',
        image: '/images/jeddah-chalets.jpg',
        rating: '4.8 ★',
        badge: 'إبحار وغروب VIP',
      },
    ],
  },
  {
    id: 'nature',
    label: 'طبيعة واسترخاء جبلي',
    icon: '⛰️',
    items: [
      {
        id: 'asir-1',
        name: 'مرتفعات السودة والغيوم',
        region: 'عسير - أبها',
        travelTime: 'طيران مباشر 1 س و 35 د',
        priceFrom: '2,100 ر.س',
        image: '/images/asir.jpg',
        rating: '4.9 ★',
        badge: 'أعلى قمة بالمملكة',
      },
      {
        id: 'disah-1',
        name: 'واحة وادي الديسة الطبيعية',
        region: 'تبوك',
        travelTime: 'طيران إلى تبوك ساعتان',
        priceFrom: '1,800 ر.س',
        image: '/images/tabuk-disah.jpg',
        rating: '4.9 ★',
        badge: 'عيون نخيل ومياه عذبة',
      },
      {
        id: 'taif-1',
        name: 'منتجعات الهدا وجبال الشفا',
        region: 'الطائف',
        travelTime: 'طيران أو سيارة 1 س من جدة',
        priceFrom: '1,500 ر.س',
        image: '/images/taif.jpg',
        rating: '4.7 ★',
        badge: 'عروس المصائف',
      },
      {
        id: 'qassim-1',
        name: 'مزارع النخيل والنزل الريفية',
        region: 'القصيم - عنيزة',
        travelTime: 'ساعتان ونصف بالسيارة من الرياض',
        priceFrom: '1,200 ر.س',
        image: '/images/qassim.jpg',
        rating: '4.8 ★',
        badge: 'هدوء ريفي أصيل',
      },
    ],
  },
  {
    id: 'heritage',
    label: 'تراث وثقافة أصيلة',
    icon: '🏛️',
    items: [
      {
        id: 'diriyah-1',
        name: 'حي الطريف ومطل البجيري',
        region: 'الدرعية - الرياض',
        travelTime: '25 دقيقة من مركز الرياض',
        priceFrom: '1,100 ر.س',
        image: '/images/diriyah.jpg',
        rating: '5.0 ★',
        badge: 'تراث عالمي (يونسكو)',
      },
      {
        id: 'hegra-1',
        name: 'مدينة الحجر الأثرية (مدائن صالح)',
        region: 'العلا',
        travelTime: 'طيران مباشر 1 س و 45 د',
        priceFrom: '3,200 ر.س',
        image: '/images/alula.jpg',
        rating: '5.0 ★',
        badge: 'آثار الأنباط الخالدة',
      },
      {
        id: 'rijal-alma-1',
        name: 'قرية رجال ألمع الحجرية',
        region: 'عسير',
        travelTime: '45 دقيقة من مطار أبها',
        priceFrom: '1,650 ر.س',
        image: '/images/rijal-almaa.jpg',
        rating: '4.9 ★',
        badge: 'عمارة عسيرية فريدة',
      },
      {
        id: 'hail-1',
        name: 'قصر القشلة ونقوش جبة الأثرية',
        region: 'حائل',
        travelTime: 'قطار سار ساعتان و 50 د',
        priceFrom: '1,400 ر.س',
        image: '/images/hail.jpg',
        rating: '4.8 ★',
        badge: 'كرم حاتمي أصيل',
      },
    ],
  },
  {
    id: 'safari',
    label: 'سفاري ومغامرات حافة العالم',
    icon: '🚙',
    items: [
      {
        id: 'tuwaiq-1',
        name: 'حافة العالم وجبال طويق',
        region: 'الرياض',
        travelTime: 'ساعة ونصف بسيارات الدفع الرباعي',
        priceFrom: '950 ر.س',
        image: '/images/tuwaiq-edge.jpg',
        rating: '4.9 ★',
        badge: 'سفاري وهايكنج VIP',
      },
      {
        id: 'desert-1',
        name: 'مخيم نفود قنا ومغامرة الكثبان',
        region: 'حائل',
        travelTime: 'طيران أو قطار إلى حائل',
        priceFrom: '1,750 ر.س',
        image: '/images/tuwaiq-safari.jpg',
        rating: '4.8 ★',
        badge: 'تخييم وشواء نجدي',
      },
      {
        id: 'empty-quarter-1',
        name: 'رحلة استكشاف الربع الخالي الملكية',
        region: 'المنطقة الشرقية',
        travelTime: 'قافلة دفع رباعي وطيران خاص',
        priceFrom: '4,500 ر.س',
        image: '/images/pkg-1.jpg',
        rating: '5.0 ★',
        badge: 'أكبر بحر رمال بالعالم',
      },
      {
        id: 'kharj-1',
        name: 'سفاري عيون الخرج وقصر الملك عبدالعزيز',
        region: 'الخرج',
        travelTime: 'ساعة واحدة من جنوب الرياض',
        priceFrom: '750 ر.س',
        image: '/images/kharj-springs.jpg',
        rating: '4.7 ★',
        badge: 'رحلة اليوم الواحد',
      },
    ],
  },
  {
    id: 'spiritual',
    label: 'عمرة وزيارة بمعايير ملكية',
    icon: '✨',
    items: [
      {
        id: 'makkah-1',
        name: 'باقة العمرة الملكية - إطلالة الحرم',
        region: 'مكة المكرمة',
        travelTime: 'قطار الحرمين من مطار جدة 35 د',
        priceFrom: '3,500 ر.س',
        image: '/images/makkah.jpg',
        rating: '5.0 ★',
        badge: 'أبراج الساعة وأجنحة VIP',
      },
      {
        id: 'madinah-1',
        name: 'زيارة الروضة الشريفة ومزارات المدينة',
        region: 'المدينة المنورة',
        travelTime: 'طيران مباشر إلى مطار الأمير محمد',
        priceFrom: '2,800 ر.س',
        image: '/images/madinah.jpg',
        rating: '5.0 ★',
        badge: 'روحانية وضيافة متكاملة',
      },
    ],
  },
];

function CategoryRealisticIcon({ id, label }: { id?: string; label?: string }) {
  const normId = (id || '').toLowerCase();
  const normLabel = (label || '').toLowerCase();

  // 1. Coastal / Beach
  if (normId.includes('beach') || normLabel.includes('شواطئ') || normLabel.includes('بحر') || normLabel.includes('ساحل') || normLabel.includes('جزر')) {
    return (
      <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5 drop-shadow-sm" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="yachtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>
        {/* Golden Sun */}
        <circle cx="23" cy="8" r="4.5" fill="url(#sunGrad)" opacity="0.95" />
        <path d="M23 2v2M23 12v2M17 8h2M27 8h2" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" />
        {/* Palm Silhouette on Shore */}
        <path d="M5 21c1.5-3 3-5 5.5-6" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10.5 15c-1-2.5-3-3-4.5-2M10.5 15c2-2 3.5-1.5 4.5 0M10.5 15c-0.5-2.5 1-3.5 2-4" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
        {/* Luxury Yacht Hull & Cabin */}
        <path d="M14 18l5.5-5 1.5 5H14z" fill="url(#yachtGrad)" stroke="#0f172a" strokeWidth="0.8" />
        <path d="M21 16l3 2h-3v-2z" fill="#d4af37" />
        <path d="M11 18h16l-3 4H14l-3-4z" fill="url(#yachtGrad)" stroke="#0f172a" strokeWidth="0.8" />
        <line x1="12" y1="20" x2="25" y2="20" stroke="#d4af37" strokeWidth="1" />
        {/* Azure Ocean Waves */}
        <path d="M3 24c3-1.5 6-1.5 9 0s6 1.5 9 0 6-1.5 9 0" stroke="url(#seaGrad)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M1 28c3.5-1.2 7-1.2 10.5 0s7 1.2 10.5 0 7-1.2 10 0" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      </svg>
    );
  }

  // 2. Nature & Mountain Relaxation
  if (normId.includes('nature') || normLabel.includes('طبيعة') || normLabel.includes('جبل') || normLabel.includes('استرخاء')) {
    return (
      <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5 drop-shadow-sm" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mtnGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="mtnGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <linearGradient id="skySun" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* Sunrise behind peaks */}
        <circle cx="16" cy="11" r="5" fill="url(#skySun)" opacity="0.9" />
        {/* Back High Mountain Peak */}
        <polygon points="16,6 25,23 7,23" fill="url(#mtnGrad2)" />
        {/* Snow/Mist Cap on Peak */}
        <polygon points="16,6 19.5,12 17,11 16,12.5 14.5,11 13,12" fill="#ffffff" opacity="0.95" />
        {/* Shaded Mountain Facet */}
        <polygon points="16,6 25,23 16,23" fill="#044e3f" opacity="0.4" />
        {/* Foreground Mountain Peak */}
        <polygon points="8,13 18,27 2,27" fill="url(#mtnGrad1)" />
        <polygon points="8,13 18,27 9,27" fill="#065f46" opacity="0.3" />
        {/* Evergreen Juniper / Pine Trees */}
        <path d="M24 23l2.5 4h-5z M27 24l2 4h-4z" fill="#064e3b" />
        {/* Soft base meadow */}
        <path d="M1 28c5-1.5 10-1 15 0s10 1.5 15 0" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. Heritage & Authentic Culture
  if (normId.includes('heritage') || normLabel.includes('تراث') || normLabel.includes('ثقافة') || normLabel.includes('أصالة') || normLabel.includes('أصيلة')) {
    return (
      <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5 drop-shadow-sm" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="goldArch" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#c9a24b" />
          </linearGradient>
        </defs>
        {/* Historic Fortress Walls */}
        <path d="M4 11h3v2h2v-2h4v2h2v-2h4v2h2v-2h4v2h2v-2h1v16H4V11z" fill="url(#mudGrad)" />
        {/* Najdi Triangular Decorative Openings (Tarmash) */}
        <polygon points="9,15 11,18 7,18" fill="#fef3c7" opacity="0.9" />
        <polygon points="16,15 18,18 14,18" fill="#fef3c7" opacity="0.9" />
        <polygon points="23,15 25,18 21,18" fill="#fef3c7" opacity="0.9" />
        {/* Heritage Arched Grand Portal */}
        <path d="M12 27v-6c0-2.2 1.8-4 4-4s4 1.8 4 4v6h-8z" fill="#311907" />
        <path d="M12 21c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="url(#goldArch)" strokeWidth="1.4" />
        {/* Wooden Door Studs & Pattern */}
        <line x1="16" y1="18" x2="16" y2="27" stroke="#78350f" strokeWidth="1" />
        <circle cx="14" cy="22" r="0.75" fill="#f59e0b" />
        <circle cx="18" cy="22" r="0.75" fill="#f59e0b" />
        {/* Hanging Lantern (Fanoos) */}
        <line x1="16" y1="12" x2="16" y2="14" stroke="#f59e0b" strokeWidth="0.8" />
        <polygon points="16,14 17.5,16 14.5,16" fill="#fef08a" />
      </svg>
    );
  }

  // 4. Safari & Edge of the World Adventures
  if (normId.includes('safari') || normLabel.includes('سفاري') || normLabel.includes('مغامر') || normLabel.includes('حافة العالم') || normLabel.includes('طويق')) {
    return (
      <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5 drop-shadow-sm" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="duneGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="duneGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="cliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
        {/* Desert Horizon / Cliffs of Tuwaiq */}
        <polygon points="2,14 12,10 14,15 19,11 26,16 30,16 30,22 2,22" fill="url(#cliffGrad)" opacity="0.6" />
        {/* Golden Sand Dunes */}
        <path d="M1 21c6-3 12-1 18-3s8 1 12 3v7H1v-7z" fill="url(#duneGrad1)" />
        <path d="M1 24c8-2 14 0 20-2s7 1 10 2v4H1v-4z" fill="url(#duneGrad2)" opacity="0.9" />
        {/* 4x4 Overland Expedition Vehicle */}
        <rect x="7" y="10" width="8" height="1.5" rx="0.5" fill="#d4af37" />
        <path d="M6 13.5l2-3h7l2 3v3H6v-3z" fill="#0f172a" />
        <rect x="9" y="11.5" width="2.5" height="2" fill="#94a3b8" />
        <rect x="12.5" y="11.5" width="2.5" height="2" fill="#94a3b8" />
        <path d="M4 14.5h16l1.5 2v2.5H4v-4.5z" fill="#b45309" stroke="#0f172a" strokeWidth="0.8" />
        <rect x="19" y="15" width="2" height="1.5" rx="0.5" fill="#fef08a" />
        {/* Off-Road Wheels */}
        <circle cx="7.5" cy="19.5" r="2.2" fill="#1e293b" />
        <circle cx="7.5" cy="19.5" r="1" fill="#cbd5e1" />
        <circle cx="16.5" cy="19.5" r="2.2" fill="#1e293b" />
        <circle cx="16.5" cy="19.5" r="1" fill="#cbd5e1" />
      </svg>
    );
  }

  // 5. Spiritual & Royal Umrah
  if (normId.includes('spiritual') || normLabel.includes('عمرة') || normLabel.includes('زيارة') || normLabel.includes('مكة') || normLabel.includes('مدينة') || normLabel.includes('ملك')) {
    return (
      <svg className="h-5 w-5 sm:h-5.5 sm:w-5.5 drop-shadow-sm" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Royal Gold Crescent Moon */}
        <path
          d="M17 3c4.97 0 9 4.03 9 9 0 3.2-1.68 6.02-4.22 7.6 1.34-1.6 2.14-3.66 2.14-5.91 0-4.97-4.03-9-9-9-1.28 0-2.48.27-3.57.75C12.75 3.96 14.77 3 17 3z"
          fill="url(#moonGrad)"
        />
        {/* Islamic Star */}
        <path d="M22 6l.8 1.5 1.7.2-1.3 1.2.3 1.7-1.5-.8-1.5.8.3-1.7-1.3-1.2 1.7-.2L22 6z" fill="#fef08a" />
        {/* Grand Mosque Dome */}
        <path d="M8 26v-5c0-4.4 3.6-8 8-8s8 3.6 8 8v5H8z" fill="url(#domeGrad)" />
        {/* Dome Finial & Crescent */}
        <line x1="16" y1="13" x2="16" y2="10" stroke="#f59e0b" strokeWidth="1.2" />
        <circle cx="16" cy="9.5" r="1" fill="#fef08a" />
        {/* Mosque Arched Base & Details */}
        <rect x="6" y="25" width="20" height="3" rx="1" fill="#064e3b" />
        <path d="M13 25v-3c0-1.7 1.3-3 3-3s3 1.3 3 3v3h-6z" fill="#fef08a" opacity="0.9" />
        {/* Minaret Column on Left */}
        <rect x="4" y="16" width="2.5" height="10" fill="#047857" />
        <polygon points="5.25,12 7,16 3.5,16" fill="#ca8a04" />
      </svg>
    );
  }

  // Fallback icon for any custom category
  return <Compass className="h-5 w-5 text-gold-600" />;
}

function getItemHref(item: PlannerItem): string {
  if (item.id.startsWith('red-sea')) return '/packages?destination=red-sea';
  if (item.id.startsWith('farasan')) return '/packages?destination=jazan';
  if (item.id.startsWith('haql') || item.id.startsWith('disah')) return '/packages?destination=tabuk';
  if (item.id.startsWith('jeddah')) return '/packages?destination=jeddah';
  if (item.id.startsWith('asir') || item.id.startsWith('rijal-alma')) return '/packages?destination=asir';
  if (item.id.startsWith('taif')) return '/packages?destination=taif';
  if (item.id.startsWith('qassim')) return '/packages?destination=qassim';
  if (item.id.startsWith('diriyah')) return '/packages?destination=diriyah';
  if (item.id.startsWith('tuwaiq')) return '/packages?destination=tuwaiq';
  if (item.id.startsWith('hegra')) return '/packages?destination=alula';
  if (item.id.startsWith('hail') || item.id.startsWith('desert')) return '/packages?destination=hail';
  if (item.id.startsWith('kharj')) return '/packages?destination=kharj';
  if (item.id.startsWith('makkah') || item.id.startsWith('madinah')) return '/packages?destination=makkah';
  return '/packages';
}

export default function QuickTripPlanner({ categories }: { categories?: TripPlannerCategory[] }) {
  const displayCategories = categories && categories.length > 0 ? categories : CATEGORIES;
  const [activeTab, setActiveTab] = useState(displayCategories[0]?.id || 'beach');

  const activeCategory =
    displayCategories.find((c) => c.id === activeTab) || displayCategories[0];

  const categoryHeaderHref =
    activeCategory?.id === 'beach'
      ? '/packages?destination=red-sea'
      : activeCategory?.id === 'nature'
      ? '/packages?destination=asir'
      : activeCategory?.id === 'heritage'
      ? '/packages?destination=diriyah'
      : activeCategory?.id === 'safari'
      ? '/packages?destination=tuwaiq'
      : activeCategory?.id === 'spiritual'
      ? '/packages?category=UMRAH'
      : '/packages';

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 text-navy-950 border-t border-slate-200">
      <div className="container-x relative">
        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <Compass size={14} className="text-gold-600" />
              <span>مخطط الرحلات الذكي</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950">
              مخطط رحلة سريع وسهل
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
              اختر الأجواء التي تفضلها لاستكشاف أفضل الوجهات المقترحة لك مع مدة السفر ومتوسط الأسعار.
            </p>
          </div>

          <Link
            href={categoryHeaderHref}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-gold-700 hover:text-gold-800 transition-colors group"
          >
            <span>استكشف باقات {activeCategory?.label || ''}</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </Link>
        </div>

        {/* Scrollable Horizontal Tabs */}
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {displayCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`group relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-navy-950 shadow-lg shadow-gold-500/25 font-black scale-[1.03] border border-gold-300/80 ring-2 ring-gold-400/20'
                    : 'border border-slate-200/90 bg-white/95 text-slate-700 hover:border-gold-400/60 hover:bg-white hover:text-navy-950 hover:shadow-md'
                }`}
              >
                <span
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isActive
                      ? 'bg-navy-950/15 shadow-inner'
                      : 'bg-gold-50/90 border border-gold-200/60 shadow-sm'
                  }`}
                >
                  <CategoryRealisticIcon id={cat.id} label={cat.label} />
                </span>
                <span className="whitespace-nowrap font-black">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {activeCategory.items.map((item) => (
              <Link
                key={item.id}
                href={getItemHref(item)}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Right Region */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/80 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-md">
                    <MapPin size={11} className="text-gold-400" />
                    <span>{item.region}</span>
                  </div>

                  {/* Top Left Rating */}
                  <div className="absolute top-3 left-3 rounded-lg border border-gold-500/40 bg-navy-950/85 px-2 py-0.5 text-[10px] font-bold text-gold-300 backdrop-blur-md">
                    {item.rating}
                  </div>

                  {/* Badge Bottom Right */}
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-lg bg-navy-950/90 border border-gold-500/30 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-base font-black text-navy-950 group-hover:text-gold-700 transition-colors">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Plane size={12} className="text-gold-600 shrink-0" />
                      <span className="truncate">{item.travelTime}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <span className="block text-[10px] text-slate-500">يبدأ من</span>
                      <span className="font-display text-sm font-black text-navy-950">
                        {item.priceFrom}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-xl bg-gold-50 border border-gold-300/50 px-3 py-1 text-xs font-bold text-gold-800 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                      <span>عرض الباقة</span>
                      <span>←</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
