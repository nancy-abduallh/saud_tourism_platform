'use client';
import { motion } from 'framer-motion';
import { Car, Compass, ConciergeBell, Flower2, Plane, Ship, type LucideIcon } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { Stagger, StaggerItem } from './Reveal';
import type { VipService } from '@/lib/types';

const ICONS: Record<string, LucideIcon> = { plane: Plane, ship: Ship, concierge: ConciergeBell, guide: Compass, car: Car, spa: Flower2 };

export default function VipServices({ services }: { services: VipService[] }) {
  if (!services.length) return null;
  return (
    <section id="vip" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionTitle eyebrow="BESPOKE VIP TRAVEL SERVICES" title="خدمات سفر VIP حسب الطلب" subtitle="كل ما تحتاجه لرحلة بلا حدود، بخصوصية تامة وخدمة على مدار الساعة" />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? ConciergeBell;
            return (
              <StaggerItem key={s.id}>
                <motion.div whileHover={{ y: -8 }} className="group relative h-full overflow-hidden rounded-2xl border-2 border-gold-400/60 bg-white p-8 text-center shadow-lg transition-all hover:border-gold-400 hover:shadow-2xl hover:shadow-gold-500/30">
                  <div className="absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-navy-900 text-gold-300 ring-4 ring-gold-400/20">
                    <Icon size={34} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-display text-xl font-extrabold text-navy-900">{s.title}</h3>
                  <p className="mt-3 leading-7 text-navy-900/60">{s.description}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
