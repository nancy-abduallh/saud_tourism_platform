'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Compass,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Twitter,
  Youtube,
} from 'lucide-react';
import clsx from 'clsx';
import NewsletterForm from './NewsletterForm';
import { DEFAULT_SETTINGS } from '@/lib/default-data';
import type { SiteSettings } from '@/lib/types';

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V11.4a6.37 6.37 0 0 0-.85-.06A6.34 6.34 0 0 0 3.1 17.68a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.5V9.41a8.16 8.16 0 0 0 4.81 1.56V7.52a4.84 4.84 0 0 1-1-.83z" />
  </svg>
);

const SnapchatIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.003 2c-3.535 0-6.19 2.45-6.19 5.707 0 .58.128 1.488.358 2.01.077.174.05.285-.084.382-.236.17-.698.423-1.075.645-.377.221-.497.452-.36.758.136.305.58.468.964.55.195.042.277.16.223.364-.268 1.015-.812 1.826-1.745 2.228-.31.134-.35.344-.135.534.333.294.887.49 1.458.558.172.02.268.093.284.267.06.634.37 1.157 1.026 1.347.534.155 1.15-.028 1.76-.237.247-.085.45-.045.626.155.77.876 1.758 1.258 2.89 1.258 1.13 0 2.12-.382 2.89-1.258.175-.2.378-.24.625-.155.61.21 1.226.392 1.76.237.656-.19.966-.713 1.026-1.347.016-.174.112-.247.284-.267.57-.068 1.125-.264 1.458-.558.215-.19.175-.4-.135-.534-.933-.402-1.477-1.213-1.745-2.228-.054-.204.028-.322.223-.364.384-.082.828-.245.964-.55.137-.306.017-.537-.36-.758-.377-.222-.84-.475-1.075-.645-.134-.097-.16-.208-.084-.382.23-.522.358-1.43.358-2.01 0-3.257-2.655-5.707-6.19-5.707z" />
  </svg>
);

const TOURISM_STARS_LINKTREE =
  'https://linktr.ee/tourism.stars?utm_source=linktree_profile_share&ltsid=d2f8aaeb-a5c1-4f3a-8904-743f411c23b0';

export default function Footer({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) {
  const currentSettings = settings || DEFAULT_SETTINGS;
  const [quickOpen, setQuickOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);

  const socialLinks = [
    { name: 'Instagram', href: currentSettings.instagramUrl, icon: Instagram },
    { name: 'Twitter', href: currentSettings.twitterUrl, icon: Twitter },
    { name: 'YouTube', href: currentSettings.youtubeUrl, icon: Youtube },
    { name: 'TikTok', href: currentSettings.tiktokUrl, icon: TikTokIcon },
    { name: 'Snapchat', href: currentSettings.snapchatUrl, icon: SnapchatIcon },
    { name: 'LinkedIn', href: currentSettings.linkedinUrl, icon: Linkedin },
  ].filter((s) => Boolean(s.href && s.href.trim() !== '' && s.href !== '#'));

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/80 border-t border-gold-500/30">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-pattern opacity-30 pointer-events-none" />
      <div className="h-1 bg-gold-gradient" />

      <div className="container-x relative py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 items-start">
          {/* Column 1: Brand, Association, and Direct Contacts (Col 4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-col gap-3">
              {/* SA Tourism & Tourism Stars Association Branding */}
              <div className="flex items-center gap-3">
                <a
                  href={TOURISM_STARS_LINKTREE}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="جمعية نجوم السياحة (Linktree)"
                  className="group inline-flex items-center gap-3 transition-transform hover:opacity-95"
                >
                  <img
                    src="/footer-logo.png"
                    alt="جمعية نجوم السياحة"
                    className="h-14 w-14 rounded-full object-contain ring-2 ring-gold-400/60 shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-105 bg-navy-900"
                  />
                  <div className="flex flex-col text-start leading-tight">
                    <span className="font-display text-xl font-black text-white transition-colors group-hover:text-gold-300">
                      SA للسياحة الفاخرة
                    </span>
                    <span className="font-display text-[11px] font-semibold tracking-wider text-gold-400">
                      جمعية نجوم السياحة • TOURISM STARS
                    </span>
                  </div>
                </a>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-white/70 pt-1">
                {currentSettings.footerDescription || DEFAULT_SETTINGS.footerDescription}
              </p>
            </div>

            {/* Quick Contacts */}
            <div className="space-y-2 pt-1 text-xs text-white/75">
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-gold-400 shrink-0" />
                <span>{currentSettings.address || 'الرياض، المملكة العربية السعودية'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold-400 shrink-0" />
                <span dir="ltr" className="font-mono">{currentSettings.phone || '+966 57 171 3078'}</span>
                <span className="rounded bg-gold-500/20 px-1.5 py-0.5 text-[10px] font-bold text-gold-300">24/7 VIP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold-400 shrink-0" />
                <span className="font-mono">{currentSettings.email || 'info@saudtourism.sa'}</span>
              </div>
            </div>

            {/* Social Icons */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-gold-500/30 bg-navy-900/80 text-gold-300 transition hover:bg-gold-400 hover:text-navy-950 hover:shadow-gold hover:scale-105"
                  >
                    <item.icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links (Col 2) */}
          <div className="lg:col-span-2">
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => setQuickOpen((prev) => !prev)}
              className="flex w-full items-center justify-between border-b border-white/10 pb-3 font-display text-base font-bold text-gold-300 transition-colors md:cursor-default md:border-b-0 md:pb-0 md:mb-5"
              aria-expanded={quickOpen}
            >
              <span>روابط سريعة</span>
              <ChevronDown
                size={16}
                className={clsx(
                  'text-gold-400 transition-transform duration-300 md:hidden',
                  quickOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={clsx(
                'transition-all duration-300 ease-in-out md:block',
                quickOpen
                  ? 'mt-3 max-h-[500px] opacity-100 md:mt-0'
                  : 'max-h-0 overflow-hidden opacity-0 md:max-h-none md:overflow-visible md:opacity-100'
              )}
            >
              <ul className="space-y-2.5 text-xs">
                {[
                  ['/', 'الرئيسية'],
                  ['/packages', 'الباقات والتجارب الفاخرة'],
                  ['/medical-tourism', 'السياحة العلاجية والاستشفاء ✦'],
                  ['/branches', 'فروعنا بالمملكة (13 فرعاً)'],
                  ['/live', 'البث المباشر لحفل التدشين'],
                  ['/#vip', 'خدمات الطيران واليخوت VIP'],
                  ['/#testimonials', 'آراء وتجارب الضيوف'],
                  ['/#owner', 'رسالة المالك والريادة'],
                  ['/contact', 'طلب استشارة خاصة وتواصل'],
                ].map(([h, l]) => (
                  <li key={h}>
                    <Link
                      href={h}
                      className="text-white/70 hover:text-gold-300 transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-gold-500/60 text-[10px]">›</span>
                      <span>{l}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: 13 Saudi Destinations (Col 3) */}
          <div className="lg:col-span-3">
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => setDestinationsOpen((prev) => !prev)}
              className="flex w-full items-center justify-between border-b border-white/10 pb-3 font-display text-base font-bold text-gold-300 transition-colors md:cursor-default md:border-b-0 md:pb-0 md:mb-5"
              aria-expanded={destinationsOpen}
            >
              <span>وجهات المملكة (13 وجهة)</span>
              <ChevronDown
                size={16}
                className={clsx(
                  'text-gold-400 transition-transform duration-300 md:hidden',
                  destinationsOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={clsx(
                'transition-all duration-300 ease-in-out md:block',
                destinationsOpen
                  ? 'mt-3 max-h-[600px] opacity-100 md:mt-0'
                  : 'max-h-0 overflow-hidden opacity-0 md:max-h-none md:overflow-visible md:opacity-100'
              )}
            >
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                {[
                  ['tuwaiq', 'حافة العالم (طويق)'],
                  ['alula', 'العلا ومدائن صالح'],
                  ['red-sea', 'البحر الأحمر وأمالا'],
                  ['diriyah', 'الدرعية التاريخية'],
                  ['asir', 'عسير وجبال السودة'],
                  ['makkah', 'مكة والمدينة المنورة'],
                  ['hail', 'حائل وقصر القشلة'],
                  ['tabuk', 'تبوك ووادي الديسة'],
                  ['taif', 'عروس المصائف الطائف'],
                  ['qassim', 'واحات ونخيل القصيم'],
                  ['jazan', 'جزر فرسان وجازان'],
                  ['jeddah', 'جدة واليخوت الفاخرة'],
                  ['kharj', 'عيون الخرج الأثرية'],
                ].map(([s, l]) => (
                  <Link
                    key={s}
                    href={`/packages?destination=${s}`}
                    className="text-white/70 hover:text-gold-300 transition-colors truncate flex items-center gap-1"
                  >
                    <span className="text-gold-500/50 text-[10px]">›</span>
                    <span className="truncate">{l}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter, Stays & Payment Badges (Col 3) */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="mb-3 font-display text-base font-bold text-gold-300 flex items-center gap-2">
                <Sparkles size={14} className="text-gold-400" />
                <span>النشرة البريدية والعروض الحصرية</span>
              </h4>
              <p className="text-xs text-white/60 mb-3 leading-relaxed">
                انضم لنخبة المسافرين وتلقَّ أحدث الباقات الترويجية وبرامج الاستشفاء الخاصة.
              </p>
              <NewsletterForm />
            </div>

            {/* Payment Methods */}
            <div>
              <div className="text-[11px] font-bold text-white/50 mb-2">طرق الدفع الإلكتروني المعتمدة:</div>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                {['mada', 'VISA', 'Mastercard', 'Apple Pay'].map((p) => (
                  <span
                    key={p}
                    className="rounded-lg bg-white/95 px-2.5 py-1 text-navy-950 font-black shadow-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Accreditation Badge */}
            <div className="rounded-2xl border border-gold-500/20 bg-navy-900/60 p-3 text-[11px] text-white/75 flex items-center gap-2.5">
              <ShieldCheck size={20} className="text-gold-400 shrink-0" />
              <span>مرخصة ومعتمدة رسمياً للأنشطة والرحلات السياحية في المملكة العربية السعودية.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center sm:text-right">
          <div>
            © {currentYear}{' '}
            <span className="font-bold text-gold-400">SA للسياحة</span> |{' '}
            <span className="font-bold text-white">SA Tourism</span>. جميع الحقوق محفوظة.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-white/50">
            <Link href="/packages" className="hover:text-gold-300 transition-colors">
              شروط الحجز
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gold-300 transition-colors">
              سياسة الخصوصية
            </Link>
            <span>•</span>
            <Link href="/branches" className="hover:text-gold-300 transition-colors">
              فروع المملكة
            </Link>
            <span>•</span>
            <a
              href={TOURISM_STARS_LINKTREE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400/80 hover:text-gold-300 transition-colors"
            >
              جمعية نجوم السياحة
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
