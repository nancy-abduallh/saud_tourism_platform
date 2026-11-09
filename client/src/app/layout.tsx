import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = 'https://saudtourism.ksaplatforms.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SA للسياحة | تجارب وباقات سياحية فاخرة في المملكة',
    template: '%s | SA للسياحة',
  },
  description:
    'اكتشف أرقى باقات السياحة الفاخرة في السعودية: العلا، حافة العالم، جبل طويق، الدرعية، البحر الأحمر، وعسير مع خدمات طيران خاص، يخوت، وكونسيرج VIP مخصص.',
  keywords: [
    'سياحة فاخرة السعودية',
    'رحلات العلا VIP',
    'سفاري حافة العالم',
    'باقات سياحية السعودية',
    'طيران خاص الرياض',
    'يخوت البحر الأحمر',
    'SA للسياحة',
    'سياحة السعودية',
    'تجارب سياحية راقية',
  ],
  authors: [{ name: 'SA للسياحة', url: BASE_URL }],
  creator: 'SA للسياحة',
  publisher: 'SA للسياحة',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: BASE_URL,
    siteName: 'SA للسياحة',
    title: 'SA للسياحة | تجارب وباقات سياحية فاخرة في المملكة',
    description:
      'باقات وتجارب استثنائية في العلا وحافة العالم والبحر الأحمر والدرعية وعسير بخدمات VIP متكاملة.',
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'SA للسياحة - تجارب سياحية فاخرة في السعودية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SA للسياحة | تجارب وباقات سياحية فاخرة في المملكة',
    description:
      'باقات وتجارب استثنائية في العلا وحافة العالم والبحر الأحمر والدرعية وعسير بخدمات VIP متكاملة.',
    images: ['/images/hero-1.jpg'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const rootStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'SA للسياحة',
      alternateName: ['SA Tourism', 'Saudi Luxury Tourism'],
      description: 'منصة رائدة لتصميم وتنظيم الرحلات السياحية الفاخرة وتجارب كبار الشخصيات في المملكة العربية السعودية.',
      inLanguage: 'ar-SA',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/packages?destination={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'TravelAgency',
      '@id': `${BASE_URL}/#organization`,
      name: 'SA للسياحة',
      alternateName: 'SA Tourism',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      image: `${BASE_URL}/images/hero-1.jpg`,
      description:
        'باقات وتجارب سياحية استثنائية في حافة العالم والعلا والبحر الأحمر والدرعية وعسير بخدمات VIP متكاملة.',
      telephone: '+966 11 000 0000',
      email: 'info@saudtourism.sa',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'الرياض',
        addressCountry: 'SA',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      currenciesAccepted: 'SAR',
      paymentAccepted: 'Mada, Visa, Mastercard, Apple Pay',
      priceRange: '$$$$',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Cairo:wght@400;600;700;800;900&family=Dancing+Script:wght@400..700&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
