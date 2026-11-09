import mysql from 'mysql2/promise';
import {
  DEFAULT_DESTINATIONS,
  DEFAULT_PACKAGES,
  DEFAULT_REVIEWS,
  DEFAULT_SERVICES,
  DEFAULT_SLIDES,
  DEFAULT_STATS,
} from './default-data';
import type { Destination, HeroSlide, PackageDetail, PackageSummary, PublicStats, Review, VipService } from './types';

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool | null {
  if (pool) return pool;
  const dbUrl = process.env.DATABASE_URL;
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const port = Number(process.env.DB_PORT) || 3306;

  try {
    if (dbUrl) {
      pool = mysql.createPool({ uri: dbUrl, waitForConnections: true, connectionLimit: 5, queueLimit: 0, connectTimeout: 3000 });
      return pool;
    }
    if (host && user && database) {
      pool = mysql.createPool({ host, user, password, database, port, waitForConnections: true, connectionLimit: 5, queueLimit: 0, connectTimeout: 3000 });
      return pool;
    }
  } catch (err) {
    console.warn('MySQL pool initialization error:', err);
  }
  return null;
}

export async function getDestinations(): Promise<Destination[]> {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT id, slug, name, name_en, tagline, description, image FROM destinations WHERE is_active = 1 ORDER BY sort_order ASC');
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          name: r.name,
          nameEn: r.name_en,
          tagline: r.tagline,
          description: r.description,
          image: r.image,
        }));
      }
    } catch (e) {
      console.warn('MySQL getDestinations error, using fallback:', e);
    }
  }
  return DEFAULT_DESTINATIONS;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT id, title, title_en, subtitle, image, cta_text, cta_link FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC');
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          title: r.title,
          titleEn: r.title_en,
          subtitle: r.subtitle,
          image: r.image,
          ctaText: r.cta_text,
          ctaLink: r.cta_link,
        }));
      }
    } catch (e) {
      console.warn('MySQL getHeroSlides error, using fallback:', e);
    }
  }
  return DEFAULT_SLIDES;
}

export async function getVipServices(): Promise<VipService[]> {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT id, title, description, icon FROM vip_services WHERE is_active = 1 ORDER BY sort_order ASC');
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          icon: r.icon,
        }));
      }
    } catch (e) {
      console.warn('MySQL getVipServices error, using fallback:', e);
    }
  }
  return DEFAULT_SERVICES;
}

export async function getReviews(): Promise<Review[]> {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT id, name, location, rating, comment FROM reviews WHERE is_approved = 1 ORDER BY created_at DESC LIMIT 10');
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          name: r.name,
          location: r.location,
          rating: r.rating,
          comment: r.comment,
        }));
      }
    } catch (e) {
      console.warn('MySQL getReviews error, using fallback:', e);
    }
  }
  return DEFAULT_REVIEWS;
}

export async function getPackages(filter?: { destination?: string; featuredOnly?: boolean; limit?: number }): Promise<PackageSummary[]> {
  const p = getPool();
  if (p) {
    try {
      let query = `
        SELECT p.id, p.slug, p.title, p.title_en, p.summary, p.price_sar, p.days, p.nights, p.rating, p.cover_image, p.badges, p.category, p.is_featured,
               d.name as dest_name, d.slug as dest_slug
        FROM packages p
        JOIN destinations d ON p.destination_id = d.id
        WHERE p.is_active = 1
      `;
      const params: any[] = [];
      if (filter?.destination) {
        query += ' AND d.slug = ?';
        params.push(filter.destination);
      }
      if (filter?.featuredOnly) {
        query += ' AND p.is_featured = 1';
      }
      query += ' ORDER BY p.id ASC';
      if (filter?.limit) {
        query += ` LIMIT ${Number(filter.limit)}`;
      }

      const [rows] = await p.query<any[]>(query, params);
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          titleEn: r.title_en,
          summary: r.summary,
          priceSar: r.price_sar,
          days: r.days,
          nights: r.nights,
          rating: Number(r.rating) || 5,
          coverImage: r.cover_image,
          badges: r.badges,
          category: r.category,
          isFeatured: Boolean(r.is_featured),
          destination: { name: r.dest_name, slug: r.dest_slug },
        }));
      }
    } catch (e) {
      console.warn('MySQL getPackages error, using fallback:', e);
    }
  }

  let list = DEFAULT_PACKAGES;
  if (filter?.destination) {
    list = list.filter((pkg) => pkg.destination.slug === filter.destination);
  }
  if (filter?.featuredOnly) {
    list = list.filter((pkg) => pkg.isFeatured);
  }
  if (filter?.limit) {
    list = list.slice(0, filter.limit);
  }
  return list;
}

export async function getPackageBySlug(slug: string): Promise<PackageDetail | null> {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        `SELECT p.*, d.name as dest_name, d.slug as dest_slug
         FROM packages p
         JOIN destinations d ON p.destination_id = d.id
         WHERE p.slug = ? AND p.is_active = 1
         LIMIT 1`,
        [slug],
      );

      if (rows && rows.length > 0) {
        const r = rows[0];
        const [images] = await p.query<any[]>('SELECT id, url FROM package_images WHERE package_id = ? ORDER BY sort_order ASC', [r.id]);
        const [inclusions] = await p.query<any[]>('SELECT id, text FROM package_inclusions WHERE package_id = ? ORDER BY sort_order ASC', [r.id]);
        const [itinerary] = await p.query<any[]>('SELECT id, day_number, title, description FROM itinerary_days WHERE package_id = ? ORDER BY day_number ASC', [r.id]);

        return {
          id: r.id,
          slug: r.slug,
          title: r.title,
          titleEn: r.title_en,
          summary: r.summary,
          description: r.description,
          priceSar: r.price_sar,
          days: r.days,
          nights: r.nights,
          rating: Number(r.rating) || 5,
          maxGuests: r.max_guests,
          coverImage: r.cover_image,
          badges: r.badges,
          category: r.category,
          isFeatured: Boolean(r.is_featured),
          destination: { name: r.dest_name, slug: r.dest_slug },
          images: images || [],
          inclusions: inclusions || [],
          itinerary: itinerary.map((it) => ({ id: it.id, dayNumber: it.day_number, title: it.title, description: it.description })) || [],
        };
      }
    } catch (e) {
      console.warn('MySQL getPackageBySlug error, using fallback:', e);
    }
  }

  return DEFAULT_PACKAGES.find((pkg) => pkg.slug === slug) ?? null;
}

export async function getPublicStats(): Promise<PublicStats> {
  const p = getPool();
  if (p) {
    try {
      const [[pkgCount]]: any = await p.query('SELECT COUNT(*) as cnt FROM packages WHERE is_active = 1');
      const [[revAvg]]: any = await p.query('SELECT AVG(rating) as avg_rating FROM reviews WHERE is_approved = 1');
      const [[bookSum]]: any = await p.query('SELECT SUM(guests) as total_guests FROM bookings');

      return {
        happyGuests: 12000 + (Number(bookSum?.total_guests) || 450),
        exclusiveExperiences: Number(pkgCount?.cnt) || DEFAULT_STATS.exclusiveExperiences,
        averageRating: revAvg?.avg_rating ? Number(Number(revAvg.avg_rating).toFixed(1)) : 4.9,
        vipConcierge: '24/7',
      };
    } catch (e) {
      console.warn('MySQL getPublicStats error, using fallback:', e);
    }
  }
  return DEFAULT_STATS;
}
