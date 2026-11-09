import Link from 'next/link';
import { Img } from './Img';
import { Stagger, StaggerItem } from './Reveal';
import type { Destination } from '@/lib/types';

export default function DestinationCards({ destinations }: { destinations: Destination[] }) {
  if (!destinations.length) return null;
  return (
    <section id="destinations" className="relative z-10 -mt-24 pb-16">
      <div className="container-x">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 4).map((d) => (
            <StaggerItem key={d.id}>
              <Link
                href={`/packages?destination=${d.slug}`}
                className="group relative block h-72 overflow-hidden rounded-2xl border-2 border-gold-400 bg-navy-900 shadow-2xl shadow-navy-950/50 transition-all duration-500 hover:-translate-y-2 hover:border-gold-300 hover:shadow-gold"
              >
                <Img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-2xl font-extrabold text-gold-300">{d.name}</div>
                  <div className="mt-1 text-white/90">{d.tagline}</div>
                  <div className="mt-4 inline-block border-b border-gold-400/70 pb-0.5 text-sm text-gold-200 transition-all group-hover:border-gold-300 group-hover:pe-3">استكشف الآن ←</div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
