'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Clock,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import type { Branch } from '@/lib/types';
import { BRANCH_REGIONS } from '@/lib/types';

interface Props {
  initialBranches: Branch[];
}

const REGION_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  'المنطقة الوسطى': { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30' },
  'المنطقة الغربية': { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30' },
  'المنطقة الشمالية': { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30' },
  'المنطقة الجنوبية': { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  'المنطقة الشرقية': { bg: 'bg-teal-500/10', text: 'text-teal-300', border: 'border-teal-500/30' },
};

export default function BranchesBrowser({ initialBranches }: Props) {
  const [selectedRegion, setSelectedRegion] = useState<string>('الكل');
  const [search, setSearch] = useState<string>('');

  const filteredBranches = useMemo(() => {
    return initialBranches.filter((b) => {
      const matchRegion = selectedRegion === 'الكل' || b.region === selectedRegion;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        (b.nameEn && b.nameEn.toLowerCase().includes(q)) ||
        b.city.toLowerCase().includes(q) ||
        b.region.toLowerCase().includes(q) ||
        (b.address && b.address.toLowerCase().includes(q)) ||
        (b.description && b.description.toLowerCase().includes(q));
      return matchRegion && matchSearch;
    });
  }, [initialBranches, selectedRegion, search]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { 'الكل': initialBranches.length };
    for (const b of initialBranches) {
      counts[b.region] = (counts[b.region] || 0) + 1;
    }
    return counts;
  }, [initialBranches]);

  return (
    <div className="space-y-12">
      {/* Top Controls: Region Tabs + Search */}
      <div className="rounded-3xl border border-white/10 bg-navy-900/60 p-4 backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {BRANCH_REGIONS.map((r) => {
              const active = selectedRegion === r;
              const count = regionCounts[r] || 0;
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`group relative flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    active
                      ? 'bg-gold-gradient text-navy-950 shadow-gold shadow-lg'
                      : 'border border-white/10 bg-white/5 text-white/80 hover:border-gold-500/40 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{r}</span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-extrabold transition-colors ${
                      active ? 'bg-navy-950/20 text-navy-950' : 'bg-white/10 text-gold-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم المدينة أو الفرع..."
              className="w-full rounded-2xl border border-white/15 bg-navy-950/80 py-2.5 pe-4 ps-10 text-sm text-white placeholder-white/40 shadow-inner transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                مسح
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between text-sm text-white/60">
        <div>
          عرض <span className="font-bold text-gold-300">{filteredBranches.length}</span> فرعاً من إجمالي{' '}
          <span className="font-bold text-white">{initialBranches.length}</span> فرعاً بالمملكة
        </div>
        {selectedRegion !== 'الكل' && (
          <button
            onClick={() => setSelectedRegion('الكل')}
            className="text-xs text-gold-400 underline transition hover:text-gold-300"
          >
            عرض كافة الفروع
          </button>
        )}
      </div>

      {/* Branches Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredBranches.map((branch) => {
            const badgeStyle = REGION_BADGES[branch.region] || {
              bg: 'bg-white/10',
              text: 'text-white',
              border: 'border-white/20',
            };
            const cleanWa = branch.whatsapp ? branch.whatsapp.replace(/\D/g, '') : '';
            const waUrl = cleanWa
              ? `https://wa.me/${cleanWa}?text=${encodeURIComponent(
                  `مرحباً SA للسياحة - ${branch.name}، أود الاستفسار عن خدمات وتجارب الفرع.`
                )}`
              : '#';

            return (
              <motion.div
                key={branch.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  branch.isMain
                    ? 'border-gold-500/50 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950 shadow-gold/10'
                    : 'border-white/10 bg-navy-900/60 backdrop-blur-xl hover:border-gold-500/30'
                }`}
              >
                {/* Header ribbon if main */}
                {branch.isMain && (
                  <div className="absolute -left-12 top-6 -rotate-45 bg-gold-gradient px-12 py-1 text-center text-[10px] font-black uppercase tracking-wider text-navy-950 shadow-md">
                    المقر الرئيسي
                  </div>
                )}

                <div className="p-6">
                  {/* Top Badges */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                    >
                      <MapPin size={12} /> {branch.region}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80">
                      {branch.city}
                    </span>
                  </div>

                  {/* Branch Title */}
                  <div className="mb-3">
                    <h3 className="font-display text-xl font-bold text-white transition-colors duration-200 group-hover:text-gold-300">
                      {branch.name}
                    </h3>
                    {branch.nameEn && (
                      <p className="font-sans text-xs font-medium text-gold-400/90">{branch.nameEn}</p>
                    )}
                  </div>

                  {/* Description */}
                  {branch.description && (
                    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/70">
                      {branch.description}
                    </p>
                  )}

                  {/* Info list */}
                  <div className="space-y-2.5 border-t border-white/10 pt-4 text-xs text-white/75">
                    {branch.address && (
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-gold-400" />
                        <span className="leading-snug">{branch.address}</span>
                      </div>
                    )}
                    {branch.workingHours && (
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="shrink-0 text-gold-400" />
                        <span>{branch.workingHours}</span>
                      </div>
                    )}
                    {branch.phone && (
                      <div className="flex items-center gap-2" dir="ltr">
                        <Phone size={14} className="shrink-0 text-gold-400" />
                        <a
                          href={`tel:${branch.phone}`}
                          className="font-mono text-white/90 hover:text-gold-300 hover:underline"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    )}
                    {branch.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="shrink-0 text-gold-400" />
                        <a
                          href={`mailto:${branch.email}`}
                          className="text-white/80 hover:text-gold-300 hover:underline"
                        >
                          {branch.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="border-t border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2">
                    {cleanWa ? (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600/90 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500 hover:shadow-emerald-500/20"
                      >
                        <MessageCircle size={15} /> واتساب الفرع
                      </a>
                    ) : null}

                    {branch.phone ? (
                      <a
                        href={`tel:${branch.phone}`}
                        className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 hover:text-gold-300"
                        aria-label={`اتصال بـ ${branch.name}`}
                      >
                        <Phone size={15} />
                      </a>
                    ) : null}

                    <Link
                      href={`/contact?branch=${encodeURIComponent(branch.name)}`}
                      className="flex items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 px-3.5 py-2.5 text-xs font-bold text-gold-300 transition hover:bg-gold-500 hover:text-navy-950"
                    >
                      طلب خدمة
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredBranches.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-navy-900/40 p-12 text-center text-white">
          <Building2 size={48} className="mx-auto text-gold-400/50" />
          <h3 className="mt-4 font-display text-xl font-bold">لا توجد نتائج مطابقة لبحثك</h3>
          <p className="mt-2 text-sm text-white/60">
            جرب البحث باسم مدينة أخرى أو اختر "الكل" لعرض كافة الفروع الـ 13 بالمملكة.
          </p>
          <button
            onClick={() => {
              setSelectedRegion('الكل');
              setSearch('');
            }}
            className="btn-gold mt-6 !py-2.5 text-sm"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}

      {/* Difference Between Destinations and Branches Highlight */}
      <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 p-8 shadow-2xl md:p-10">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-xs font-bold text-gold-300">
              <Sparkles size={14} /> الهوية المؤسسية لـ SA للسياحة
            </div>
            <h2 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">
              تكامل فريد بين <span className="text-gold-gradient">الفروع الميدانية</span> و
              <span className="text-white">الوجهات السياحية</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              تختلف فروعنا الميدانية عن وجهاتنا السياحية؛ فوجهاتنا هي المسارات والبرامج الفاخرة التي نصممها
              لضيوفنا (كالعلا، حافة العالم، جزر البحر الأحمر، وقصور الدرعية)، بينما فروع SA للسياحة هي مكاتب
              التمثيل الرسمية المنتشرة في 13 مدينة ومحافظة لتقديم الدعم اللوجستي، خدمة الضيوف، وإصدار التصاريح،
              والإشراف الميداني المباشر بأعلى معايير الحوكمة والضيافة السعودية.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 text-gold-300">
                <Compass size={20} />
                <h4 className="font-display font-bold">الوجهات السياحية</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                باقات وتجارب استكشافية مصممة للزوار وكبار الشخصيات تشمل الطيران الخاص، اليخوت، ومخيمات الرفاهية.
              </p>
              <Link
                href="/packages"
                className="mt-4 inline-flex items-center text-xs font-bold text-gold-400 hover:text-gold-300"
              >
                تصفح الباقات ←
              </Link>
            </div>

            <div className="rounded-2xl border border-gold-500/30 bg-gold-500/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 text-gold-300">
                <Building2 size={20} />
                <h4 className="font-display font-bold">فروع الجمعية (13 فرعاً)</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                مكاتب تمثيل وتنسيق ميداني في 13 مدينة تغطي كافة مناطق المملكة لخدمة مجتمع السياحة والشركاء المحليين.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center text-xs font-bold text-gold-400 hover:text-gold-300"
              >
                تواصل مع الإدارة العامة ←
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
