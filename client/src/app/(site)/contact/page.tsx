import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';

export const metadata = { title: 'تواصل معنا | SA للسياحة' };

const info = [
  { icon: Phone, title: 'الهاتف', text: '+966 11 000 0000', dir: 'ltr' as const },
  { icon: Mail, title: 'البريد', text: 'info@saudtourism.sa', dir: 'ltr' as const },
  { icon: MapPin, title: 'العنوان', text: 'الرياض، المملكة العربية السعودية', dir: 'rtl' as const },
  { icon: Clock, title: 'ساعات العمل', text: 'كونسيرج VIP متاح 24/7', dir: 'rtl' as const },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-gradient pb-16 pt-40 text-center">
        <div className="absolute inset-0 bg-pattern opacity-35" />
        <div className="container-x relative">
          <h1 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl drop-shadow-xl">
            اطلب{' '}
            <span className="text-gold-gradient inline-block pt-8 pb-3 -mt-8 -mb-3 overflow-visible drop-shadow-[0_2px_18px_rgba(243,211,122,0.45)]">
              استشارة خاصة
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">أخبرنا عن رحلة أحلامك ودعنا نصممها لك بالكامل.</p>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_380px]">
          <Reveal><ContactForm /></Reveal>
          <Reveal delay={0.15} className="space-y-4">
            {info.map((c) => (
              <div key={c.title} className="flex items-center gap-4 rounded-2xl bg-navy-900 p-5 text-white shadow-xl">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-gradient text-navy-950"><c.icon size={22} /></span>
                <div><div className="text-sm text-white/60">{c.title}</div><div className="font-bold" dir={c.dir}>{c.text}</div></div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
