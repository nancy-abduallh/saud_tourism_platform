import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Globe2, Radio, ShieldCheck, Sparkles, Tv, Users } from 'lucide-react';
import LivePlayer from '@/components/LivePlayer';
import LiveCountdown from '@/components/LiveCountdown';
import LiveFeed from '@/components/LiveFeed';
import LiveCeremonyProgram from '@/components/LiveCeremonyProgram';
import { getBranches, getLiveAgenda, getLiveCongratulations, getLiveSettings } from '@/lib/db';

const BASE_URL = 'https://saudtourism.ksaplatforms.com';

export const metadata: Metadata = {
  title: 'البث المباشر لحفل التدشين الرسمي | SA للسياحة',
  description:
    'شاهد البث المباشر لوقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع ومكاتب المملكة في 13 مدينة ومحافظة.',
  keywords: [
    'بث مباشر حفل التدشين',
    'تدشين منصة SA للسياحة',
    'بث مباشر سياحة السعودية',
    'حفل تدشين فروع الجمعية',
    'SA Tourism Launch Live Stream',
  ],
  alternates: {
    canonical: `${BASE_URL}/live`,
  },
  openGraph: {
    title: 'البث المباشر لحفل التدشين الرسمي | SA للسياحة',
    description:
      'شاهد البث المباشر لوقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع ومكاتب المملكة الـ 13.',
    url: `${BASE_URL}/live`,
    type: 'website',
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'بث حفل تدشين منصة SA للسياحة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'البث المباشر لحفل التدشين الرسمي | SA للسياحة',
    description:
      'شاهد البث المباشر لوقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع ومكاتب المملكة.',
    images: ['/images/hero-1.jpg'],
  },
};

export const dynamic = 'force-dynamic';

export default async function LivePage() {
  const [liveSettings, congratulations, branches, agenda] = await Promise.all([
    getLiveSettings(),
    getLiveCongratulations(50),
    getBranches(),
    getLiveAgenda(),
  ]);

  const activeStreamUrl =
    liveSettings.status === 'ENDED' && liveSettings.recordingUrl
      ? liveSettings.recordingUrl
      : liveSettings.streamUrl;

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BroadcastEvent',
    name: liveSettings.title,
    description: liveSettings.subtitle,
    startDate: liveSettings.scheduledAt,
    isLiveBroadcast: liveSettings.status === 'LIVE',
    videoFormat: 'HD',
    broadcastOfEvent: {
      '@type': 'Event',
      name: liveSettings.title,
      startDate: liveSettings.scheduledAt,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: `${BASE_URL}/live`,
      },
      organizer: {
        '@type': 'Organization',
        name: 'SA للسياحة',
        url: BASE_URL,
      },
    },
  };

  return (
    <main className="min-h-screen bg-navy-950 pt-20 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-pattern opacity-30" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* Top Live Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-bold text-gold-300">
              {liveSettings.status === 'LIVE' ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span>{liveSettings.heroBadge || 'بث مباشر حي عبر المملكة'}</span>
                </>
              ) : liveSettings.status === 'ENDED' ? (
                <>
                  <Tv size={14} className="text-blue-400" />
                  <span>{liveSettings.heroBadge || 'تسجيل وقائع حفل التدشين'}</span>
                </>
              ) : (
                <>
                  <Radio size={14} className="text-gold-400" />
                  <span>{liveSettings.heroBadge || 'الحدث الرسمي للتدشين (بث مجدول)'}</span>
                </>
              )}
            </div>

            <h1 className="mt-5 font-display text-3xl font-black leading-tight sm:text-5xl md:text-6xl">
              {liveSettings.title}
            </h1>

            {liveSettings.subtitle && (
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-lg">
                {liveSettings.subtitle}
              </p>
            )}

            {/* Quick Badges Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/80">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-navy-900/60 px-3.5 py-1.5 backdrop-blur-md">
                <Building2 size={14} className="text-gold-400" />
                <span>ربط مباشر مع 13 فرعاً بالمملكة</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-navy-900/60 px-3.5 py-1.5 backdrop-blur-md">
                <Globe2 size={14} className="text-gold-400" />
                <span>مفتوح للجمهور والمهتمين</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-navy-900/60 px-3.5 py-1.5 backdrop-blur-md">
                <ShieldCheck size={14} className="text-gold-400" />
                <span>جودة عالية Full HD</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown (If status is UPCOMING) */}
      {liveSettings.status === 'UPCOMING' && (
        <section className="container-x mb-12">
          <LiveCountdown
            targetDate={liveSettings.scheduledAt}
            title={liveSettings.title}
          />
        </section>
      )}

      {/* Main Video Player Section */}
      <section className="container-x mb-16">
        <LivePlayer
          streamUrl={activeStreamUrl}
          title={liveSettings.title}
          isLive={liveSettings.isLive}
          status={liveSettings.status}
          viewerCount={liveSettings.viewerCount}
        />
      </section>

      {/* Program Agenda & Live Congratulations Feed */}
      <section className="container-x pb-24">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Congratulations Feed */}
          <div className="lg:col-span-7">
            <LiveFeed
              initialCongratulations={congratulations}
              allowComments={liveSettings.allowComments}
            />
          </div>

          {/* Right Column: Ceremony Program & Kingdom Network */}
          <div className="space-y-8 lg:col-span-5">
            <LiveCeremonyProgram agenda={agenda} />

            {/* Participating Branches Card */}
            <div className="rounded-3xl border border-white/10 bg-navy-900/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-400">
                  <Building2 size={15} /> فروع ومكاتب المملكة المشاركة (13)
                </div>
                <Link
                  href="/branches"
                  className="text-xs text-gold-300 hover:underline"
                >
                  استعراض الفروع ←
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {branches.map((b) => (
                  <span
                    key={b.id}
                    className="rounded-xl border border-white/10 bg-navy-950/70 px-3 py-1.5 text-xs text-white/90"
                  >
                    📍 {b.city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
