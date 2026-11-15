import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';
import { getSiteSettings, getBranches } from '@/lib/db';
import { DEFAULT_SETTINGS } from '@/lib/default-data';

const BASE_URL = 'https://saudtourism.ksaplatforms.com';

export const metadata: Metadata = {
  title: 'طلب استشارة خاصة وتواصل',
  description:
    'تواصل مع فريق كونسيرج SA للسياحة لتصميم رحلتك الفاخرة الخاصة في المملكة العربية السعودية. خدمة مخصصة على مدار الساعة 24/7.',
  keywords: [
    'تواصل معنا',
    'طلب استشارة سياحية',
    'حجز رحلات خاصة السعودية',
    'SA للسياحة',
    'SA Tourism',
    'كونسيرج سياحي VIP',
  ],
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: 'طلب استشارة خاصة وتواصل | SA للسياحة',
    description:
      'تواصل مع فريق كونسيرج SA للسياحة لتصميم رحلتك الفاخرة الخاصة في المملكة العربية السعودية. خدمة مخصصة 24/7.',
    url: `${BASE_URL}/contact`,
    type: 'website',
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'تواصل مع كونسيرج SA للسياحة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'طلب استشارة خاصة وتواصل | SA للسياحة',
    description:
      'تواصل مع فريق كونسيرج SA للسياحة لتصميم رحلتك الفاخرة الخاصة في المملكة العربية السعودية.',
    images: ['/images/hero-1.jpg'],
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/contact#contactpage`,
      url: `${BASE_URL}/contact`,
      name: 'طلب استشارة خاصة وتواصل | SA للسياحة',
      description:
        'تواصل مع فريق كونسيرج SA للسياحة لتصميم رحلتك الفاخرة الخاصة في المملكة العربية السعودية.',
      inLanguage: 'ar-SA',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
      },
      mainEntity: {
        '@type': 'TravelAgency',
        '@id': `${BASE_URL}/#organization`,
        name: 'SA للسياحة',
        telephone: '+966 11 000 0000',
        email: 'info@saudtourism.sa',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'الرياض',
          addressCountry: 'SA',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/contact#breadcrumb`,
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
          name: 'تواصل معنا',
          item: `${BASE_URL}/contact`,
        },
      ],
    },
  ],
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const [settings, branches] = await Promise.all([
    getSiteSettings(),
    getBranches(),
  ]);

  const info = [
    { icon: Phone, title: 'الهاتف', text: settings.phone || DEFAULT_SETTINGS.phone, dir: 'ltr' as const },
    { icon: Mail, title: 'البريد', text: settings.email || DEFAULT_SETTINGS.email, dir: 'ltr' as const },
    { icon: MapPin, title: 'العنوان', text: settings.address || DEFAULT_SETTINGS.address, dir: 'rtl' as const },
    { icon: Clock, title: 'ساعات العمل', text: settings.workingHours || DEFAULT_SETTINGS.workingHours, dir: 'rtl' as const },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <section className="relative overflow-hidden bg-navy-gradient pb-16 pt-40 text-center">
        <div className="absolute inset-0 bg-pattern opacity-35" />
        <div className="container-x relative">
          <h1 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl drop-shadow-xl">
            اطلب{' '}
            <span className="text-gold-gradient inline-block pt-8 pb-3 -mt-8 -mb-3 overflow-visible drop-shadow-[0_2px_18px_rgba(243,211,122,0.45)]">
              استشارة خاصة
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
            أخبرنا عن رحلة أحلامك ودعنا نصممها لك بالكامل.
          </p>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <Suspense fallback={<div className="h-96 rounded-3xl bg-white shadow-xl animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <Reveal delay={0.15} className="space-y-4">
            {info.map((c) => (
              <div
                key={c.title}
                className="flex items-center gap-4 rounded-2xl bg-navy-900 p-5 text-white shadow-xl"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-gradient text-navy-950">
                  <c.icon size={22} />
                </span>
                <div>
                  <div className="text-sm text-white/60">{c.title}</div>
                  <div className="font-bold" dir={c.dir}>
                    {c.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Branches Quick Card in Sidebar */}
            <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-b from-navy-900 to-navy-950 p-5 text-white shadow-xl">
              <div className="flex items-center gap-2 text-gold-400">
                <Building2 size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">فروع الجمعية (13 فرعاً)</span>
              </div>
              <h4 className="mt-2 font-display text-base font-bold">شبكة التمثيل الميداني بالمملكة</h4>
              <p className="mt-1 text-xs leading-relaxed text-white/70">
                يمكنك أيضاً زيارة أو مراسلة فروعنا المنتشرة في 13 مدينة ومحافظة لتنسيق الخدمات محلياً.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {branches.slice(0, 7).map((b) => (
                  <span key={b.id} className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
                    {b.city}
                  </span>
                ))}
                <span className="rounded-md bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                  +6 فروع أخرى
                </span>
              </div>
              <Link
                href="/branches"
                className="mt-4 flex items-center justify-between rounded-xl bg-gold-gradient px-4 py-2.5 text-xs font-bold text-navy-950 transition hover:shadow-gold"
              >
                <span>دليل الفروع وأرقام التواصل</span>
                <ArrowLeft size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
