'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, MapPin, MessageCircle, Phone, Sparkles, Star } from 'lucide-react';
import type { Branch } from '@/lib/types';

interface Props {
  branches: Branch[];
}

export default function BranchesHomeSection({ branches }: Props) {
  // Highlight top 8 branches on homepage or all 13 as sleek cards
  const displayBranches = branches.slice(0, 8);

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-x relative">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-bold text-gold-300">
              <Building2 size={14} /> شبكة فروع الجمعية الميدانية (مختلفة عن الوجهات)
            </div>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              حاضرون في <span className="text-gold-gradient">13 مدينة ومنطقة</span> عبر المملكة
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              بالإضافة إلى باقاتنا ووجهاتنا السياحية، تنتشر مكاتب وفروع جمعية نجوم السياحة في كافة أرجاء
              المملكة لتقديم أرقى خدمات الاستقبال، الدعم اللوجستي، ورعاية الأعضاء والضيوف على مدار الساعة.
            </p>
          </div>

          <Link
            href="/branches"
            className="btn-outline group flex shrink-0 items-center gap-2 !py-3 !text-sm"
          >
            <span>استكشف كافة الفروع (13 فرعاً)</span>
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* 13 Cities Badges Bar */}
        <div className="mt-10 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-navy-900/40 p-3.5 backdrop-blur-md">
          <span className="me-2 text-xs font-bold text-gold-400">مدن الفروع:</span>
          {branches.map((b) => (
            <Link
              key={b.id}
              href={`/branches#branch-${b.id}`}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                b.isMain
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500 hover:text-navy-950'
                  : 'bg-white/5 text-white/80 border border-white/10 hover:border-gold-500/30 hover:bg-white/10 hover:text-white'
              }`}
            >
              {b.city} {b.isMain ? '★' : ''}
            </Link>
          ))}
        </div>

        {/* Featured Branch Cards Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayBranches.map((branch) => {
            const cleanWa = branch.whatsapp ? branch.whatsapp.replace(/\D/g, '') : '';
            const waUrl = cleanWa
              ? `https://wa.me/${cleanWa}?text=${encodeURIComponent(
                  `مرحباً جمعية نجوم السياحة - ${branch.name}، أود الاستفسار عن خدمات الفرع.`
                )}`
              : '#';

            return (
              <div
                key={branch.id}
                className={`group flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  branch.isMain
                    ? 'border-gold-500/50 bg-gradient-to-b from-navy-900 to-navy-950 shadow-gold/10'
                    : 'border-white/10 bg-navy-900/50 backdrop-blur-md hover:border-gold-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-semibold text-gold-400">
                      <MapPin size={12} /> {branch.region}
                    </span>
                    {branch.isMain && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                        <Star size={10} className="fill-gold-400 text-gold-400" /> المقر الرئيسي
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-lg font-bold text-white transition group-hover:text-gold-300">
                    {branch.name}
                  </h3>
                  <p className="font-sans text-[11px] text-white/50">{branch.city}</p>

                  {branch.description && (
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/70">
                      {branch.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    {cleanWa && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600/90 py-2 text-xs font-bold text-white shadow transition hover:bg-emerald-500"
                      >
                        <MessageCircle size={14} /> واتساب الفرع
                      </a>
                    )}
                    <Link
                      href="/branches"
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/80 transition hover:bg-white/10 hover:text-gold-300"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Bar */}
        <div className="mt-10 text-center">
          <Link
            href="/branches"
            className="btn-gold inline-flex items-center gap-2 !px-8 !py-3 text-sm"
          >
            <Building2 size={16} />
            <span>عرض دليل شبكة الفروع الـ 13 ومواقعها بالتفصيل</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
