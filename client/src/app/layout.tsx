import type { Metadata } from 'next';
import { Cairo, Tajawal, Dancing_Script, Allura } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({ subsets: ['arabic', 'latin'], weight: ['300', '400', '500', '700', '800'], variable: '--font-tajawal', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['600', '700', '800', '900'], variable: '--font-cairo', display: 'swap' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dancing', display: 'swap' });
const allura = Allura({ subsets: ['latin'], weight: '400', variable: '--font-allura', display: 'swap' });

export const metadata: Metadata = {
  title: 'SA للسياحة | تجارب سعودية فاخرة',
  description: 'باقات وتجارب سياحية استثنائية في حافة العالم والعلا والبحر الأحمر والدرعية وعسير بخدمات VIP متكاملة.',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${cairo.variable} ${dancingScript.variable} ${allura.variable}`}>
      <body>{children}</body>
    </html>
  );
}
