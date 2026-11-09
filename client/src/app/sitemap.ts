import type { MetadataRoute } from 'next';
import { getPackages } from '@/lib/db';

const BASE_URL = 'https://saudtourism.ksaplatforms.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Core public static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic package detail routes
  let packageRoutes: MetadataRoute.Sitemap = [];
  try {
    const packages = await getPackages();
    packageRoutes = packages.map((pkg) => ({
      url: `${BASE_URL}/packages/${pkg.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating sitemap entries for packages:', error);
  }

  return [...staticRoutes, ...packageRoutes];
}
