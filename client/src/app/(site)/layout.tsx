import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { getSiteSettings } from '@/lib/db';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </>
  );
}
