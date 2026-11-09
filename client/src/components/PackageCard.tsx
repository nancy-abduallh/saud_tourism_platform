'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Clock, MapPin } from 'lucide-react';
import { Img } from './Img';
import { Stars } from './Stars';
import { formatPrice } from '@/lib/format';
import { CATEGORY_LABEL, type PackageSummary } from '@/lib/types';

export default function PackageCard({ pkg, query = '' }: { pkg: PackageSummary; query?: string }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group h-full overflow-hidden rounded-2xl border-2 border-gold-400/80 bg-white shadow-lg transition-all hover:border-gold-400 hover:shadow-2xl hover:shadow-gold-500/30"
    >
      <Link href={`/packages/${pkg.slug}${query}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
          <Img src={pkg.coverImage} alt={pkg.title} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/20" />
          <span className="absolute end-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-gold-gradient text-navy-950 shadow-gold"><Award size={22} /></span>
          <span className="absolute start-3 top-3 rounded-full bg-navy-950/70 px-3 py-1 text-xs font-bold text-gold-300 backdrop-blur">{CATEGORY_LABEL[pkg.category]}</span>
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs text-white">
            <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur"><Clock size={13} /> {pkg.days} أيام / {pkg.nights} ليالٍ</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {pkg.destination.name}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-extrabold leading-snug text-navy-900">{pkg.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-navy-900/60">{pkg.summary}</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-navy-900/50">ابتداءً من</div>
              <div className="font-display text-xl font-black text-navy-900">{formatPrice(pkg.priceSar)}</div>
            </div>
            <Stars rating={pkg.rating} />
          </div>
          <span className="btn-gold mt-5 w-full">احجز الآن</span>
        </div>
      </Link>
    </motion.article>
  );
}
