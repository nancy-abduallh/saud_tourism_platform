'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
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

  const socialLinks = [
    { name: 'Instagram', href: currentSettings.instagramUrl, icon: Instagram },
    { name: 'Twitter', href: currentSettings.twitterUrl, icon: Twitter },
    { name: 'YouTube', href: currentSettings.youtubeUrl, icon: Youtube },
    { name: 'TikTok', href: currentSettings.tiktokUrl, icon: TikTokIcon },
    { name: 'Snapchat', href: currentSettings.snapchatUrl, icon: SnapchatIcon },
    { name: 'LinkedIn', href: currentSettings.linkedinUrl, icon: Linkedin },
  ].filter((s) => Boolean(s.href && s.href.trim() !== '' && s.href !== '#'));

  const renderCopyright = () => {
    const raw =
      currentSettings.copyrightText ||
      `© ${new Date().getFullYear()} جمعية نجوم السياحة. جميع الحقوق محفوظة.`;
    const targetWords = ['جمعية نجوم السياحة', 'جمعية النجوم للسياحة'];
    for (const word of targetWords) {
      if (raw.includes(word)) {
        const parts = raw.split(word);
        return (
          <span>
            {parts[0]}
            <a
              href={TOURISM_STARS_LINKTREE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gold-400 transition hover:text-gold-300 hover:underline"
            >
              {word}
            </a>
            {parts.slice(1).join(word)}
          </span>
        );
      }
    }
    return <span>{raw}</span>;
  };

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/80">
      <div className="absolute inset-0 bg-pattern opacity-40" />
      <div className="h-1 bg-gold-gradient" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <a
            href={TOURISM_STARS_LINKTREE}
            target="_blank"
            rel="noopener noreferrer"
            title="رابط جمعية نجوم السياحة (Linktree)"
            className="group inline-flex items-center gap-3.5 transition-transform hover:opacity-95"
          >
            <img
              src="/footer-logo.png"
              alt="جمعية نجوم السياحة"
              className="h-16 w-16 rounded-full object-contain ring-2 ring-gold-400/50 shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-start leading-tight">
              <span className="font-display text-xl font-black text-white transition-colors group-hover:text-gold-300 sm:text-2xl">
                جمعية نجوم السياحة
              </span>
              <span className="font-display text-[11px] font-semibold tracking-wider text-gold-400">
                TOURISM STARS ASSOCIATION
              </span>
            </div>
          </a>
          <p className="mt-5 leading-7 text-white/60">
            {currentSettings.footerDescription || DEFAULT_SETTINGS.footerDescription}
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 text-gold-300 transition hover:bg-gold-400 hover:text-navy-950 hover:shadow-gold"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* روابط سريعة (Collapsible on Mobile) */}
        <div>
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => setQuickOpen((prev) => !prev)}
            className="flex w-full items-center justify-between border-b border-white/10 pb-3 font-display text-lg font-bold text-gold-300 transition-colors md:cursor-default md:border-b-0 md:pb-0 md:mb-5 hover:text-gold-200 md:hover:text-gold-300"
            aria-expanded={quickOpen}
          >
            <span>روابط سريعة</span>
            <ChevronDown
              size={18}
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
                ? 'mt-3 max-h-96 opacity-100 md:mt-0'
                : 'max-h-0 overflow-hidden opacity-0 md:max-h-none md:overflow-visible md:opacity-100'
            )}
          >
            <ul className="space-y-3 pt-1 md:pt-0">
              {[
                ['/packages', 'الباقات الفاخرة'],
                ['/medical-tourism', 'السياحة العلاجية والاستشفاء ✦'],
                ['/branches', 'فروع الجمعية (13 فرعاً)'],
                ['/#vip', 'خدمات VIP'],
                ['/#testimonials', 'آراء الضيوف'],
                ['/contact', 'تواصل معنا'],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h} className="transition hover:text-gold-300">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* الوجهات (Collapsible on Mobile) */}
        <div>
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => setDestinationsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between border-b border-white/10 pb-3 font-display text-lg font-bold text-gold-300 transition-colors md:cursor-default md:border-b-0 md:pb-0 md:mb-5 hover:text-gold-200 md:hover:text-gold-300"
            aria-expanded={destinationsOpen}
          >
            <span>الوجهات</span>
            <ChevronDown
              size={18}
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
                ? 'mt-3 max-h-96 opacity-100 md:mt-0'
                : 'max-h-0 overflow-hidden opacity-0 md:max-h-none md:overflow-visible md:opacity-100'
            )}
          >
            <ul className="space-y-3 pt-1 md:pt-0">
              {[
                ['alula', 'العلا'],
                ['red-sea', 'البحر الأحمر'],
                ['diriyah', 'الدرعية'],
                ['asir', 'عسير'],
              ].map(([s, l]) => (
                <li key={s}>
                  <Link href={`/packages?destination=${s}`} className="transition hover:text-gold-300">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold text-gold-300">النشرة البريدية</h4>
          <NewsletterForm />
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
            {['mada', 'VISA', 'Mastercard', 'Apple Pay'].map((p) => (
              <span key={p} className="rounded-md bg-white px-3 py-1.5 text-navy-900">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-sm text-white/50">
        {renderCopyright()}
      </div>
    </footer>
  );
}
