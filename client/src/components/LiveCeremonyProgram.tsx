import React from 'react';
import { Award, Building2, CheckCircle2, Clock, FileText, Flag, Sparkles } from 'lucide-react';
import type { LiveAgendaItem } from '@/lib/types';
import { DEFAULT_AGENDA_ITEMS } from '@/lib/default-data';

const ICONS = [Flag, FileText, Sparkles, Building2, Award, CheckCircle2];

interface LiveCeremonyProgramProps {
  agenda?: LiveAgendaItem[];
}

export default function LiveCeremonyProgram({ agenda }: LiveCeremonyProgramProps) {
  const items = agenda && agenda.length > 0 ? agenda : DEFAULT_AGENDA_ITEMS;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-navy-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs font-bold text-gold-400">
        <Clock size={15} /> جدول فقرات حفل التدشين
      </div>
      <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
        برنامج فعاليات الحفل الموحد عبر المملكة
      </h3>
      <p className="mt-2 text-xs text-white/70 max-w-xl">
        جدول زمني منظم لفقرات حفل التدشين الرسمي المنقول مباشرة لكافة الحضور والمهتمين.
      </p>

      <div className="mt-8 space-y-6">
        {items.map((item, idx) => {
          const IconComponent = ICONS[idx % ICONS.length];
          return (
            <div key={item.id || idx} className="relative flex gap-4 sm:gap-6">
              {/* Timeline line */}
              {idx < items.length - 1 && (
                <div className="absolute start-5 sm:start-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-gold-500/50 to-white/10" />
              )}

              {/* Icon Bubble */}
              <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-500/40 bg-navy-950 text-gold-400 shadow-gold">
                <IconComponent size={20} />
              </div>

              {/* Content Card */}
              <div className="flex-1 rounded-2xl border border-white/10 bg-navy-950/60 p-4 sm:p-5 transition hover:border-gold-500/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display text-sm font-bold text-white sm:text-base">
                    {item.title}
                  </h4>
                  <span className="rounded-lg border border-gold-500/30 bg-gold-500/10 px-2.5 py-0.5 text-xs font-bold text-gold-300">
                    {item.time}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
