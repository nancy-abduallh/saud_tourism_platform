import Link from 'next/link';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/80">
      <div className="absolute inset-0 bg-pattern opacity-40" />
      <div className="h-1 bg-gold-gradient" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="SA للسياحة" className="h-16 w-16 rounded-full ring-2 ring-gold-500/60" />
            <div className="flex flex-col text-start leading-none">
              <span
                className="allura-regular font-allura text-5xl leading-none text-gold-gradient drop-shadow-[0_2px_12px_rgba(243,211,122,0.45)]"
                style={{ fontFamily: '"Allura", cursive' }}
                dir="ltr"
              >
                SA
              </span>
              <span className="font-display text-xs font-bold tracking-[0.25em] text-white leading-tight mt-0.5">
                للسياحة
              </span>
            </div>
          </div>
          <p className="mt-5 leading-7 text-white/60">نصنع رحلات سعودية فاخرة تجمع بين عراقة التاريخ وروعة الطبيعة وأرقى مستويات الضيافة.</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 text-gold-300 transition hover:bg-gold-400 hover:text-navy-950"><Icon size={18} /></a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold text-gold-300">روابط سريعة</h4>
          <ul className="space-y-3">
            {[['/packages', 'الباقات الفاخرة'], ['/#vip', 'خدمات VIP'], ['/#testimonials', 'آراء الضيوف'], ['/contact', 'تواصل معنا']].map(([h, l]) => (
              <li key={h}><Link href={h} className="transition hover:text-gold-300">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold text-gold-300">الوجهات</h4>
          <ul className="space-y-3">
            {[['alula', 'العلا'], ['red-sea', 'البحر الأحمر'], ['diriyah', 'الدرعية'], ['asir', 'عسير']].map(([s, l]) => (
              <li key={s}><Link href={`/packages?destination=${s}`} className="transition hover:text-gold-300">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold text-gold-300">النشرة البريدية</h4>
          <NewsletterForm />
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
            {['mada', 'VISA', 'Mastercard', 'Apple Pay'].map((p) => (
              <span key={p} className="rounded-md bg-white px-3 py-1.5 text-navy-900">{p}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-sm text-white/50">
        © {new Date().getFullYear()} سعود للسياحة. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
