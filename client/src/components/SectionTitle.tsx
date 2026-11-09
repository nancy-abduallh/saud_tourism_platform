import clsx from 'clsx';
import { Reveal } from './Reveal';

export default function SectionTitle({ eyebrow, title, subtitle, light = false }: { eyebrow?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && <div className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-gold-500">{eyebrow}</div>}
      <h2 className={clsx('font-display text-3xl font-black leading-snug sm:text-4xl lg:text-5xl', light ? 'text-white' : 'text-navy-900')}>{title}</h2>
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gold-gradient" />
        <span className="h-2 w-2 rotate-45 bg-gold-400" />
        <span className="h-px w-16 bg-gold-gradient" />
      </div>
      {subtitle && <p className={clsx('mt-5 text-lg leading-8', light ? 'text-white/70' : 'text-navy-900/60')}>{subtitle}</p>}
    </Reveal>
  );
}
