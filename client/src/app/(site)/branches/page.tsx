import type { Metadata } from 'next';
import BranchesBrowser from '@/components/BranchesBrowser';
import { getBranches, getPackages } from '@/lib/db';
import { Building2, Globe2, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react';

const BASE_URL = 'https://saudtourism.ksaplatforms.com';

export const metadata: Metadata = {
  title: 'فروع ومكاتب SA للسياحة بالمملكة (13 فرعاً)',
  description:
    'شبكة فروع ومكاتب تمثيل SA للسياحة في 13 مدينة ومحافظة في السعودية: الرياض، القصيم، حايل، الخرج، الزلفي، تبوك، العلا، المنطقة الغربية، عسير، جيزان، نجران، الدمام، والمدينة المنورة.',
  keywords: [
    'فروع SA للسياحة',
    'فروع سياحة السعودية',
    'فرع الرياض',
    'فرع القصيم',
    'فرع حايل',
    'فرع العلا',
    'فرع تبوك',
    'فرع عسير',
    'فرع الدمام',
    'مكاتب SA للسياحة',
    'SA Tourism Branches',
  ],
  alternates: {
    canonical: `${BASE_URL}/branches`,
  },
  openGraph: {
    title: 'فروع ومكاتب SA للسياحة بالمملكة (13 فرعاً)',
    description:
      'شبكة فروع ومكاتب تمثيل SA للسياحة في 13 مدينة ومحافظة في السعودية: الرياض، القصيم، حايل، الخرج، الزلفي، تبوك، العلا، المنطقة الغربية، عسير، جيزان، نجران، الدمام، والمدينة المنورة.',
    url: `${BASE_URL}/branches`,
    type: 'website',
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'شبكة فروع SA للسياحة في السعودية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'فروع ومكاتب SA للسياحة بالمملكة (13 فرعاً)',
    description:
      'شبكة فروع ومكاتب تمثيل SA للسياحة في 13 مدينة ومحافظة في السعودية.',
    images: ['/images/hero-1.jpg'],
  },
};

export const dynamic = 'force-dynamic';

export default async function BranchesPage() {
  const [branches, packages] = await Promise.all([
    getBranches(),
    getPackages(),
  ]);

  const branchesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'SA للسياحة',
    url: BASE_URL,
    description:
      'شبكة فروع ومكاتب تمثيل SA للسياحة في 13 مدينة ومحافظة بالمملكة العربية السعودية.',
    subOrganization: branches.map((b) => ({
      '@type': 'LocalBusiness',
      name: b.name,
      alternateName: b.nameEn,
      address: {
        '@type': 'PostalAddress',
        addressLocality: b.city,
        addressRegion: b.region,
        streetAddress: b.address,
        addressCountry: 'SA',
      },
      telephone: b.phone,
      email: b.email,
    })),
  };

  return (
    <main className="min-h-screen bg-navy-950 pt-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(branchesJsonLd) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-pattern opacity-40" />
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-bold text-gold-300">
              <Building2 size={15} /> فروع SA المعتمدة بالمملكة
            </div>

            <h1 className="mt-5 font-display text-3xl font-black leading-tight sm:text-5xl md:text-6xl">
              شبكة فروع <span className="text-gold-gradient">SA للسياحة</span> عبر المملكة
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              حاضرون في 13 مدينة ومحافظة لتغطية كافة مناطق المملكة، نقدّم من خلالها الدعم الميداني
              المباشر، رعاية الأعضاء والضيوف، وتنسيق التجارب السياحية الأكثر تميزاً في كل منطقة.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4 backdrop-blur-md">
                <div className="font-display text-2xl font-black text-gold-300 sm:text-3xl">13</div>
                <div className="mt-1 text-xs text-white/70">فرعاً ومكتب تمثيل</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4 backdrop-blur-md">
                <div className="font-display text-2xl font-black text-white sm:text-3xl">5</div>
                <div className="mt-1 text-xs text-white/70">مناطق جغرافية كبرى</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4 backdrop-blur-md">
                <div className="font-display text-2xl font-black text-gold-300 sm:text-3xl">24/7</div>
                <div className="mt-1 text-xs text-white/70">دعم وكونسيرج محلي</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4 backdrop-blur-md">
                <div className="font-display text-2xl font-black text-white sm:text-3xl">100%</div>
                <div className="mt-1 text-xs text-white/70">تغطية لكافة الاتجاهات</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Browser Section */}
      <section className="container-x pb-24">
        <BranchesBrowser initialBranches={branches} packages={packages} />
      </section>
    </main>
  );
}
