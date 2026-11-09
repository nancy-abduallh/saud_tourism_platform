import {
  getDestinations,
  getHeroSlides,
  getPackages,
  getPackageBySlug,
  getPublicStats,
  getReviews,
  getVipServices,
} from './db';

const ORIGIN = process.env.API_ORIGIN;

export async function serverFetch<T>(path: string, fallback: T): Promise<T> {
  // If an external API_ORIGIN is explicitly provided and different from default localhost, try fetch
  if (ORIGIN && ORIGIN !== 'http://localhost:4001') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${ORIGIN}/api${path}`, {
        next: { revalidate: 30 },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) return (await res.json()) as T;
    } catch {
      // Fall through to local database / default data provider
    }
  }

  // Internal direct DB query / rich default data provider
  try {
    if (path.startsWith('/hero')) {
      return (await getHeroSlides()) as unknown as T;
    }
    if (path.startsWith('/destinations')) {
      return (await getDestinations()) as unknown as T;
    }
    if (path.startsWith('/services')) {
      return (await getVipServices()) as unknown as T;
    }
    if (path.startsWith('/reviews')) {
      return (await getReviews()) as unknown as T;
    }
    if (path.startsWith('/stats')) {
      return (await getPublicStats()) as unknown as T;
    }
    if (path.startsWith('/packages/')) {
      const slug = path.replace('/packages/', '').split('?')[0];
      return (await getPackageBySlug(slug)) as unknown as T;
    }
    if (path.startsWith('/packages')) {
      const url = new URL(`http://localhost${path}`);
      const destination = url.searchParams.get('destination') || undefined;
      const featured = url.searchParams.get('featured') === '1';
      const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;
      return (await getPackages({ destination, featuredOnly: featured, limit })) as unknown as T;
    }
  } catch (err) {
    console.warn(`Error resolving ${path} internally:`, err);
  }

  return fallback;
}
