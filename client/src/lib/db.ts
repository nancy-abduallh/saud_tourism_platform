import mysql from 'mysql2/promise';
import {
  DEFAULT_AGENDA_ITEMS,
  DEFAULT_BRANCHES,
  DEFAULT_CONGRATULATIONS,
  DEFAULT_DESTINATIONS,
  DEFAULT_HOME_SECTIONS_DATA,
  DEFAULT_LIVE_SETTINGS,
  DEFAULT_PACKAGES,
  DEFAULT_REVIEWS,
  DEFAULT_SERVICES,
  DEFAULT_SETTINGS,
  DEFAULT_SLIDES,
  DEFAULT_STATS,
} from './default-data';
import type { Branch, Destination, HeroSlide, HomeSectionsData, LiveAgendaItem, LiveCongratulation, LiveStreamSettings, LiveStreamStatus, PackageDetail, PackageSummary, PublicStats, Review, SiteSettings, VipService } from './types';
import { parseScheduledDate } from './date-utils';

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool | null {
  if (pool) return pool;

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const port = Number(process.env.DB_PORT) || 3306;
  const dbUrl = process.env.DATABASE_URL;

  try {
    // Prefer explicit host/user/database when provided by Hostinger
    if (user && database) {
      pool = mysql.createPool({
        host: host || '127.0.0.1',
        user,
        password: password || '',
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 5000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      });
      return pool;
    }
    if (dbUrl) {
      pool = mysql.createPool(dbUrl);
      return pool;
    }
  } catch (err) {
    console.error('MySQL pool initialization error:', err);
  }
  return null;
}

/* ==========================================================================
   PUBLIC QUERIES
   ========================================================================== */

export async function getDestinations(): Promise<Destination[]> {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT id, slug, name, name_en, tagline, description, image FROM destinations WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
      );
      if (Array.isArray(rows)) {
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
      const [rows] = await p.query<any[]>(
        'SELECT id, title, title_en, subtitle, image, cta_text, cta_link FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
      );
      if (Array.isArray(rows)) {
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
      const [rows] = await p.query<any[]>(
        'SELECT id, title, description, icon FROM vip_services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
      );
      if (Array.isArray(rows)) {
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
      const [rows] = await p.query<any[]>(
        'SELECT id, name, location, rating, comment FROM reviews WHERE is_approved = 1 ORDER BY created_at DESC LIMIT 10'
      );
      if (Array.isArray(rows)) {
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
      if (Array.isArray(rows)) {
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
    if (filter.destination === 'riyadh') {
      list = list.filter(
        (pkg) =>
          pkg.destination.slug === 'tuwaiq' ||
          pkg.destination.slug === 'diriyah' ||
          pkg.destination.slug === 'riyadh' ||
          pkg.title.includes('الرياض')
      );
    } else {
      list = list.filter((pkg) => pkg.destination.slug === filter.destination);
    }
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

/* ==========================================================================
   ADMIN QUERIES & MUTATIONS
   ========================================================================== */

// --- Destinations ---
export async function getAllDestinationsAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT id, slug, name, name_en as nameEn, tagline, description, image, sort_order as sortOrder, is_active as isActive FROM destinations ORDER BY sort_order ASC, id ASC'
      );
      if (Array.isArray(rows)) return rows.map((r) => ({ ...r, isActive: Boolean(r.isActive) }));
    } catch (e) {
      console.error('getAllDestinationsAdmin error:', e);
    }
  }
  return DEFAULT_DESTINATIONS.map((d, i) => ({ ...d, sortOrder: i + 1, isActive: true }));
}

export async function createDestination(d: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  const [res]: any = await p.query(
    'INSERT INTO destinations (slug, name, name_en, tagline, description, image, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [d.slug, d.name, d.nameEn || null, d.tagline || '', d.description || '', d.image || '', Number(d.sortOrder) || 0, d.isActive ? 1 : 0]
  );
  return { id: res.insertId, ...d };
}

export async function updateDestination(id: number, d: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query(
    'UPDATE destinations SET slug = COALESCE(?, slug), name = COALESCE(?, name), name_en = COALESCE(?, name_en), tagline = COALESCE(?, tagline), description = COALESCE(?, description), image = COALESCE(?, image), sort_order = COALESCE(?, sort_order), is_active = COALESCE(?, is_active) WHERE id = ?',
    [d.slug, d.name, d.nameEn, d.tagline, d.description, d.image, d.sortOrder !== undefined ? Number(d.sortOrder) : null, d.isActive !== undefined ? (d.isActive ? 1 : 0) : null, id]
  );
  return { id, ...d };
}

export async function deleteDestination(id: number) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('DELETE FROM destinations WHERE id = ?', [id]);
  return { ok: true };
}

// --- Hero Slides ---
export async function getAllHeroSlidesAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT id, title, title_en as titleEn, subtitle, image, cta_text as ctaText, cta_link as ctaLink, sort_order as sortOrder, is_active as isActive FROM hero_slides ORDER BY sort_order ASC, id ASC'
      );
      if (Array.isArray(rows)) return rows.map((r) => ({ ...r, isActive: Boolean(r.isActive) }));
    } catch (e) {
      console.error('getAllHeroSlidesAdmin error:', e);
    }
  }
  return DEFAULT_SLIDES.map((s, i) => ({ ...s, sortOrder: i + 1, isActive: true }));
}

export async function createHeroSlide(s: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  const [res]: any = await p.query(
    'INSERT INTO hero_slides (title, title_en, subtitle, image, cta_text, cta_link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [s.title, s.titleEn || null, s.subtitle || '', s.image || '', s.ctaText || 'اكتشف الآن', s.ctaLink || '/packages', Number(s.sortOrder) || 0, s.isActive ? 1 : 0]
  );
  return { id: res.insertId, ...s };
}

export async function updateHeroSlide(id: number, s: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query(
    'UPDATE hero_slides SET title = COALESCE(?, title), title_en = COALESCE(?, title_en), subtitle = COALESCE(?, subtitle), image = COALESCE(?, image), cta_text = COALESCE(?, cta_text), cta_link = COALESCE(?, cta_link), sort_order = COALESCE(?, sort_order), is_active = COALESCE(?, is_active) WHERE id = ?',
    [s.title, s.titleEn, s.subtitle, s.image, s.ctaText, s.ctaLink, s.sortOrder !== undefined ? Number(s.sortOrder) : null, s.isActive !== undefined ? (s.isActive ? 1 : 0) : null, id]
  );
  return { id, ...s };
}

export async function deleteHeroSlide(id: number) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('DELETE FROM hero_slides WHERE id = ?', [id]);
  return { ok: true };
}

// --- VIP Services ---
export async function getAllVipServicesAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT id, title, description, icon, sort_order as sortOrder, is_active as isActive FROM vip_services ORDER BY sort_order ASC, id ASC'
      );
      if (Array.isArray(rows)) return rows.map((r) => ({ ...r, isActive: Boolean(r.isActive) }));
    } catch (e) {
      console.error('getAllVipServicesAdmin error:', e);
    }
  }
  return DEFAULT_SERVICES.map((s, i) => ({ ...s, sortOrder: i + 1, isActive: true }));
}

export async function createVipService(s: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  const [res]: any = await p.query(
    'INSERT INTO vip_services (title, description, icon, sort_order, is_active) VALUES (?, ?, ?, ?, ?)',
    [s.title, s.description || '', s.icon || 'concierge', Number(s.sortOrder) || 0, s.isActive ? 1 : 0]
  );
  return { id: res.insertId, ...s };
}

export async function updateVipService(id: number, s: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query(
    'UPDATE vip_services SET title = COALESCE(?, title), description = COALESCE(?, description), icon = COALESCE(?, icon), sort_order = COALESCE(?, sort_order), is_active = COALESCE(?, is_active) WHERE id = ?',
    [s.title, s.description, s.icon, s.sortOrder !== undefined ? Number(s.sortOrder) : null, s.isActive !== undefined ? (s.isActive ? 1 : 0) : null, id]
  );
  return { id, ...s };
}

export async function deleteVipService(id: number) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('DELETE FROM vip_services WHERE id = ?', [id]);
  return { ok: true };
}

// --- Reviews ---
export async function getAllReviewsAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT id, name, location, rating, comment, is_approved as isApproved, created_at as createdAt FROM reviews ORDER BY created_at DESC'
      );
      if (Array.isArray(rows)) return rows.map((r) => ({ ...r, isApproved: Boolean(r.isApproved) }));
    } catch (e) {
      console.error('getAllReviewsAdmin error:', e);
    }
  }
  return DEFAULT_REVIEWS.map((r) => ({ ...r, isApproved: true }));
}

export async function createReview(r: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  const [res]: any = await p.query(
    'INSERT INTO reviews (name, location, rating, comment, is_approved) VALUES (?, ?, ?, ?, ?)',
    [r.name, r.location || null, Number(r.rating) || 5, r.comment || '', r.isApproved ? 1 : 0]
  );
  return { id: res.insertId, ...r };
}

export async function updateReview(id: number, r: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query(
    'UPDATE reviews SET name = COALESCE(?, name), location = COALESCE(?, location), rating = COALESCE(?, rating), comment = COALESCE(?, comment), is_approved = COALESCE(?, is_approved) WHERE id = ?',
    [r.name, r.location, r.rating !== undefined ? Number(r.rating) : null, r.comment, r.isApproved !== undefined ? (r.isApproved ? 1 : 0) : null, id]
  );
  return { id, ...r };
}

export async function deleteReview(id: number) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('DELETE FROM reviews WHERE id = ?', [id]);
  return { ok: true };
}

// --- Packages Admin ---
export async function getAllPackagesAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(`
        SELECT p.id, p.slug, p.title, p.title_en as titleEn, p.summary, p.description, p.destination_id as destinationId,
               p.category, p.price_sar as priceSar, p.days, p.nights, p.rating, p.max_guests as maxGuests,
               p.cover_image as coverImage, p.badges, p.is_featured as isFeatured, p.is_active as isActive,
               d.name as destinationName
        FROM packages p
        LEFT JOIN destinations d ON p.destination_id = d.id
        ORDER BY p.id DESC
      `);
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          ...r,
          isFeatured: Boolean(r.isFeatured),
          isActive: Boolean(r.isActive),
          destination: { name: r.destinationName || '' },
        }));
      }
    } catch (e) {
      console.error('getAllPackagesAdmin error:', e);
    }
  }
  return DEFAULT_PACKAGES.map((pkg) => ({
    ...pkg,
    isFeatured: pkg.isFeatured,
    isActive: true,
    destination: { name: pkg.destination.name },
  }));
}

export async function getPackageByIdAdmin(id: number) {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>('SELECT * FROM packages WHERE id = ?', [id]);
      if (rows && rows.length > 0) {
        const pkg = rows[0];
        const [images] = await p.query<any[]>('SELECT url FROM package_images WHERE package_id = ? ORDER BY sort_order ASC', [id]);
        const [inclusions] = await p.query<any[]>('SELECT text FROM package_inclusions WHERE package_id = ? ORDER BY sort_order ASC', [id]);
        const [itinerary] = await p.query<any[]>('SELECT day_number, title, description FROM itinerary_days WHERE package_id = ? ORDER BY day_number ASC', [id]);

        return {
          id: pkg.id,
          slug: pkg.slug,
          title: pkg.title,
          titleEn: pkg.title_en,
          summary: pkg.summary,
          description: pkg.description,
          destinationId: pkg.destination_id,
          category: pkg.category,
          priceSar: pkg.price_sar,
          days: pkg.days,
          nights: pkg.nights,
          rating: pkg.rating,
          maxGuests: pkg.max_guests,
          coverImage: pkg.cover_image,
          badges: pkg.badges,
          isFeatured: Boolean(pkg.is_featured),
          isActive: Boolean(pkg.is_active),
          gallery: images ? images.map((img) => img.url) : [],
          images: images || [],
          inclusions: inclusions ? inclusions.map((inc) => inc.text) : [],
          itinerary: itinerary || [],
        };
      }
    } catch (e) {
      console.error('getPackageByIdAdmin error:', e);
    }
  }
  const fallback = DEFAULT_PACKAGES.find((pkg) => pkg.id === id);
  return fallback || null;
}

export async function createPackageAdmin(data: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');

  const slug =
    data.slug && data.slug.trim()
      ? data.slug.trim()
      : (data.title || 'package')
          .toLowerCase()
          .replace(/[^\w\u0621-\u064A-]+/g, '-')
          .replace(/^-+|-+$/g, '') + '-' + Date.now();

  const [res]: any = await p.query(
    `INSERT INTO packages (
      slug, title, title_en, summary, description, destination_id, category,
      price_sar, days, nights, rating, max_guests, cover_image, badges,
      is_featured, is_active, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      slug,
      data.title,
      data.titleEn || null,
      data.summary || '',
      data.description || '',
      Number(data.destinationId) || 1,
      data.category || 'LUXURY',
      Number(data.priceSar) || 0,
      Number(data.days) || 1,
      Number(data.nights) || 0,
      Number(data.rating) || 5,
      Number(data.maxGuests) || 6,
      data.coverImage || '',
      data.badges || '',
      data.isFeatured ? 1 : 0,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1,
    ]
  );
  const pkgId = res.insertId;

  if (Array.isArray(data.gallery) && data.gallery.length > 0) {
    for (let i = 0; i < data.gallery.length; i++) {
      const url = typeof data.gallery[i] === 'string' ? data.gallery[i] : data.gallery[i]?.url;
      if (url) {
        await p.query('INSERT INTO package_images (package_id, url, sort_order) VALUES (?, ?, ?)', [pkgId, url, i]);
      }
    }
  }

  if (Array.isArray(data.inclusions) && data.inclusions.length > 0) {
    for (let i = 0; i < data.inclusions.length; i++) {
      const text = typeof data.inclusions[i] === 'string' ? data.inclusions[i] : data.inclusions[i]?.text;
      if (text) {
        await p.query('INSERT INTO package_inclusions (package_id, text, sort_order) VALUES (?, ?, ?)', [pkgId, text, i]);
      }
    }
  }

  if (Array.isArray(data.itinerary) && data.itinerary.length > 0) {
    for (let i = 0; i < data.itinerary.length; i++) {
      const it = data.itinerary[i];
      if (it) {
        await p.query(
          'INSERT INTO itinerary_days (package_id, day_number, title, description) VALUES (?, ?, ?, ?)',
          [pkgId, i + 1, it.title || `اليوم ${i + 1}`, it.description || '']
        );
      }
    }
  }

  return { id: pkgId, slug, ...data };
}

export async function updatePackageAdmin(id: number, data: any) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');

  await p.query(
    `UPDATE packages SET
      slug = COALESCE(?, slug),
      title = COALESCE(?, title),
      title_en = COALESCE(?, title_en),
      summary = COALESCE(?, summary),
      description = COALESCE(?, description),
      destination_id = COALESCE(?, destination_id),
      category = COALESCE(?, category),
      price_sar = COALESCE(?, price_sar),
      days = COALESCE(?, days),
      nights = COALESCE(?, nights),
      rating = COALESCE(?, rating),
      max_guests = COALESCE(?, max_guests),
      cover_image = COALESCE(?, cover_image),
      badges = COALESCE(?, badges),
      is_featured = COALESCE(?, is_featured),
      is_active = COALESCE(?, is_active),
      updated_at = NOW()
     WHERE id = ?`,
    [
      data.slug ?? null,
      data.title ?? null,
      data.titleEn ?? null,
      data.summary ?? null,
      data.description ?? null,
      data.destinationId !== undefined ? Number(data.destinationId) : null,
      data.category ?? null,
      data.priceSar !== undefined ? Number(data.priceSar) : null,
      data.days !== undefined ? Number(data.days) : null,
      data.nights !== undefined ? Number(data.nights) : null,
      data.rating !== undefined ? Number(data.rating) : null,
      data.maxGuests !== undefined ? Number(data.maxGuests) : null,
      data.coverImage ?? null,
      data.badges ?? null,
      data.isFeatured !== undefined ? (data.isFeatured ? 1 : 0) : null,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : null,
      id,
    ]
  );

  if (Array.isArray(data.gallery)) {
    await p.query('DELETE FROM package_images WHERE package_id = ?', [id]);
    for (let i = 0; i < data.gallery.length; i++) {
      const url = typeof data.gallery[i] === 'string' ? data.gallery[i] : data.gallery[i]?.url;
      if (url) {
        await p.query('INSERT INTO package_images (package_id, url, sort_order) VALUES (?, ?, ?)', [id, url, i]);
      }
    }
  }

  if (Array.isArray(data.inclusions)) {
    await p.query('DELETE FROM package_inclusions WHERE package_id = ?', [id]);
    for (let i = 0; i < data.inclusions.length; i++) {
      const text = typeof data.inclusions[i] === 'string' ? data.inclusions[i] : data.inclusions[i]?.text;
      if (text) {
        await p.query('INSERT INTO package_inclusions (package_id, text, sort_order) VALUES (?, ?, ?)', [id, text, i]);
      }
    }
  }

  if (Array.isArray(data.itinerary)) {
    await p.query('DELETE FROM itinerary_days WHERE package_id = ?', [id]);
    for (let i = 0; i < data.itinerary.length; i++) {
      const it = data.itinerary[i];
      if (it) {
        await p.query(
          'INSERT INTO itinerary_days (package_id, day_number, title, description) VALUES (?, ?, ?, ?)',
          [id, i + 1, it.title || `اليوم ${i + 1}`, it.description || '']
        );
      }
    }
  }

  return { id, ...data };
}

export async function deletePackageAdmin(id: number) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('DELETE FROM package_images WHERE package_id = ?', [id]);
  await p.query('DELETE FROM package_inclusions WHERE package_id = ?', [id]);
  await p.query('DELETE FROM itinerary_days WHERE package_id = ?', [id]);
  await p.query('DELETE FROM packages WHERE id = ?', [id]);
  return { ok: true };
}

// --- Bookings Admin ---
export async function getAllBookingsAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(`
        SELECT b.id, b.reference, b.package_id as packageId, b.full_name as fullName, b.email, b.phone,
               b.start_date as startDate, b.guests, b.vip_addon as vipAddon, b.notes, b.total_sar as totalSar,
               b.status, b.created_at as createdAt,
               COALESCE(p.title, 'باقة خاصة') as packageTitle
        FROM bookings b
        LEFT JOIN packages p ON b.package_id = p.id
        ORDER BY b.created_at DESC
      `);
      if (rows && rows.length > 0) {
        return rows.map((b) => ({
          ...b,
          vipAddon: Boolean(b.vipAddon),
          package: { title: b.packageTitle },
        }));
      }
    } catch (e) {
      console.error('getAllBookingsAdmin error:', e);
    }
  }
  return [];
}

export async function updateBookingStatus(id: number, status: string) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
  return { id, status };
}

// --- Messages & Subscribers Admin ---
export async function getAllMessagesAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT id, name, email, phone, subject, message, is_read as isRead, created_at as createdAt FROM contact_messages ORDER BY created_at DESC'
      );
      if (rows) return rows.map((r) => ({ ...r, isRead: Boolean(r.isRead) }));
    } catch (e) {
      console.error('getAllMessagesAdmin error:', e);
    }
  }
  return [];
}

export async function markMessageRead(id: number) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('UPDATE contact_messages SET is_read = 1 WHERE id = ?', [id]);
  return { id, isRead: true };
}

export async function deleteMessage(id: number) {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await p.query('DELETE FROM contact_messages WHERE id = ?', [id]);
  return { ok: true };
}

export async function getAllSubscribersAdmin() {
  const p = getPool();
  if (p) {
    try {
      const [rows] = await p.query<any[]>(
        'SELECT id, email, is_active as isActive, created_at as createdAt FROM subscribers ORDER BY created_at DESC'
      );
      if (rows) return rows;
    } catch (e) {
      console.error('getAllSubscribersAdmin error:', e);
    }
  }
  return [];
}

// --- Admin Stats ---
export async function getAdminStats() {
  const p = getPool();
  if (p) {
    try {
      const [destinations] = await p.query<any[]>('SELECT id, name FROM destinations');
      const [packages] = await p.query<any[]>('SELECT id, title, category, destination_id FROM packages');
      const [bookings] = await p.query<any[]>(`
        SELECT b.id, b.reference, b.full_name as fullName, b.email, b.phone, b.start_date as startDate,
               b.guests, b.vip_addon as vipAddon, b.total_sar as totalSar, b.status, b.created_at as createdAt,
               p.title as packageTitle, p.category as packageCategory, p.destination_id as destId
        FROM bookings b
        LEFT JOIN packages p ON b.package_id = p.id
        ORDER BY b.created_at DESC
      `);
      const [[msgCount]]: any = await p.query('SELECT COUNT(*) as unread FROM contact_messages WHERE is_read = 0');
      const [[subCount]]: any = await p.query('SELECT COUNT(*) as cnt FROM subscribers');
      const [[revAgg]]: any = await p.query('SELECT AVG(rating) as avg_rating FROM reviews WHERE is_approved = 1');

      const allBookings = bookings || [];
      const confirmedOrCompleted = allBookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED');
      const totalRevenue = confirmedOrCompleted.reduce((sum, b) => sum + Number(b.totalSar || 0), 0);
      const totalGuests = confirmedOrCompleted.reduce((sum, b) => sum + Number(b.guests || 0), 0);
      const avgOrderValue = confirmedOrCompleted.length > 0 ? Math.round(totalRevenue / confirmedOrCompleted.length) : 0;
      const vipAddonCount = allBookings.filter((b) => Boolean(b.vipAddon)).length;
      const vipAddonRate = allBookings.length > 0 ? Math.round((vipAddonCount / allBookings.length) * 100) : 0;
      const pending = allBookings.filter((b) => b.status === 'PENDING').length;

      // Category breakdown
      const categoryMap: Record<string, { label: string; count: number; revenue: number; color: string }> = {
        DESERT: { label: 'تخييم وسفاري ومغامرات', count: 0, revenue: 0, color: '#d9b563' },
        LUXURY: { label: 'تجارب فاخرة وتراثية', count: 0, revenue: 0, color: '#0a1631' },
        VIP: { label: 'جزر ويخوت VIP', count: 0, revenue: 0, color: '#4d6ebd' },
        UMRAH: { label: 'عمرة ملكية', count: 0, revenue: 0, color: '#10b981' },
      };

      for (const b of allBookings) {
        const cat = b.packageCategory || 'LUXURY';
        if (categoryMap[cat]) {
          categoryMap[cat].count += 1;
          if (b.status === 'CONFIRMED' || b.status === 'COMPLETED') {
            categoryMap[cat].revenue += Number(b.totalSar || 0);
          }
        }
      }

      const categoryDistribution = Object.entries(categoryMap).map(([key, val]) => ({
        category: key,
        label: val.label,
        count: val.count,
        revenue: val.revenue,
        percentage: allBookings.length > 0 ? Math.round((val.count / allBookings.length) * 100) : 25,
        color: val.color,
      }));

      // Destination performance
      const destMap: Record<string, { name: string; bookings: number; revenue: number }> = {};
      for (const d of destinations || []) {
        destMap[d.id] = { name: d.name, bookings: 0, revenue: 0 };
      }
      for (const b of allBookings) {
        const destId = b.destId;
        if (destId && destMap[destId]) {
          destMap[destId].bookings += 1;
          if (b.status === 'CONFIRMED' || b.status === 'COMPLETED') {
            destMap[destId].revenue += Number(b.totalSar || 0);
          }
        }
      }

      const destinationPerformance = Object.values(destMap)
        .sort((a, b) => b.revenue - a.revenue || b.bookings - a.bookings)
        .map((d) => ({
          ...d,
          percentage: totalRevenue > 0 ? Math.round((d.revenue / totalRevenue) * 100) : 0,
        }));

      const statusCounts = {
        CONFIRMED: allBookings.filter((b) => b.status === 'CONFIRMED').length,
        PENDING: pending,
        COMPLETED: allBookings.filter((b) => b.status === 'COMPLETED').length,
        CANCELLED: allBookings.filter((b) => b.status === 'CANCELLED').length,
      };

      const monthlyTrend = [
        { month: 'مايو', revenue: 115000, bookings: 6, target: 100000 },
        { month: 'يونيو', revenue: 168000, bookings: 9, target: 140000 },
        { month: 'يوليو', revenue: 210000, bookings: 11, target: 180000 },
        { month: 'أغسطس', revenue: 245000, bookings: 13, target: 220000 },
        { month: 'سبتمبر', revenue: 295000, bookings: 15, target: 260000 },
        { month: 'أكتوبر', revenue: totalRevenue > 0 ? totalRevenue : 380000, bookings: allBookings.length > 0 ? allBookings.length : 18, target: 320000 },
      ];

      return {
        packages: (packages || []).length,
        destinations: (destinations || []).length,
        bookings: allBookings.length,
        pending,
        unread: Number(msgCount?.unread) || 0,
        revenue: totalRevenue,
        totalGuests,
        avgOrderValue,
        vipAddonCount,
        vipAddonRate,
        subscribersCount: Number(subCount?.cnt) || 0,
        satisfactionScore: revAgg?.avg_rating ? Number(Number(revAgg.avg_rating).toFixed(1)) : 4.9,
        monthlyTrend,
        categoryDistribution,
        destinationPerformance,
        statusCounts,
        recent: allBookings.slice(0, 8).map((b) => ({
          ...b,
          vipAddon: Boolean(b.vipAddon),
          package: { title: b.packageTitle },
        })),
      };
    } catch (e) {
      console.error('getAdminStats error:', e);
    }
  }

  // Fallback defaults
  return {
    packages: DEFAULT_PACKAGES.length,
    destinations: DEFAULT_DESTINATIONS.length,
    bookings: 16,
    pending: 2,
    unread: 0,
    revenue: 485000,
    totalGuests: 48,
    avgOrderValue: 35000,
    vipAddonCount: 11,
    vipAddonRate: 69,
    subscribersCount: 5,
    satisfactionScore: 4.9,
    monthlyTrend: [
      { month: 'مايو', revenue: 115000, bookings: 6, target: 100000 },
      { month: 'يونيو', revenue: 168000, bookings: 9, target: 140000 },
      { month: 'يوليو', revenue: 210000, bookings: 11, target: 180000 },
      { month: 'أغسطس', revenue: 245000, bookings: 13, target: 220000 },
      { month: 'سبتمبر', revenue: 295000, bookings: 15, target: 260000 },
      { month: 'أكتوبر', revenue: 485000, bookings: 16, target: 320000 },
    ],
    categoryDistribution: [
      { category: 'DESERT', label: 'تخييم وسفاري ومغامرات', count: 6, revenue: 112000, percentage: 38, color: '#d9b563' },
      { category: 'LUXURY', label: 'تجارب فاخرة وتراثية', count: 5, revenue: 165000, percentage: 31, color: '#0a1631' },
      { category: 'VIP', label: 'جزر ويخوت VIP', count: 3, revenue: 147000, percentage: 19, color: '#4d6ebd' },
      { category: 'UMRAH', label: 'عمرة ملكية', count: 2, revenue: 61000, percentage: 12, color: '#10b981' },
    ],
    destinationPerformance: [
      { name: 'العلا', bookings: 6, revenue: 165000, percentage: 34 },
      { name: 'البحر الأحمر', bookings: 4, revenue: 147000, percentage: 30 },
      { name: 'حافة العالم', bookings: 4, revenue: 112000, percentage: 23 },
      { name: 'الدرعية', bookings: 2, revenue: 61000, percentage: 13 },
    ],
    statusCounts: { CONFIRMED: 10, PENDING: 2, COMPLETED: 3, CANCELLED: 1 },
    recent: [],
  };
}

/* ==========================================================================
   SITE SETTINGS (FOOTER LINKS, WHATSAPP, CONTACT)
   ========================================================================== */

export async function getSiteSettings(): Promise<SiteSettings> {
  const p = getPool();
  if (p) {
    try {
      // Ensure table exists automatically
      await p.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
          setting_value TEXT NULL,
          updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      const [rows] = await p.query<any[]>('SELECT setting_key, setting_value FROM site_settings');
      if (rows && rows.length > 0) {
        const map: Record<string, string> = {};
        for (const r of rows) {
          map[r.setting_key] = r.setting_value ?? '';
        }
        const isOldDefault =
          !map.owner_message ||
          map.owner_message.trim() === '' ||
          map.owner_message.trim().startsWith('السياحة ليست مجرد رحلة');
        const ownerMessage = isOldDefault ? DEFAULT_SETTINGS.ownerMessage : map.owner_message;

        if (isOldDefault && p) {
          p.query(
            `INSERT INTO site_settings (setting_key, setting_value)
             VALUES ('owner_message', ?)
             ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
            [DEFAULT_SETTINGS.ownerMessage]
          ).catch(() => {});
        }

        return {
          instagramUrl: map.instagram_url ?? DEFAULT_SETTINGS.instagramUrl,
          twitterUrl: map.twitter_url ?? DEFAULT_SETTINGS.twitterUrl,
          youtubeUrl: map.youtube_url ?? DEFAULT_SETTINGS.youtubeUrl,
          tiktokUrl: map.tiktok_url ?? DEFAULT_SETTINGS.tiktokUrl,
          snapchatUrl: map.snapchat_url ?? DEFAULT_SETTINGS.snapchatUrl,
          linkedinUrl: map.linkedin_url ?? DEFAULT_SETTINGS.linkedinUrl,
          whatsappNumber: map.whatsapp_number ?? DEFAULT_SETTINGS.whatsappNumber,
          whatsappMessage: map.whatsapp_message ?? DEFAULT_SETTINGS.whatsappMessage,
          phone: map.phone ?? DEFAULT_SETTINGS.phone,
          email: map.email ?? DEFAULT_SETTINGS.email,
          address: map.address ?? DEFAULT_SETTINGS.address,
          workingHours: map.working_hours ?? DEFAULT_SETTINGS.workingHours,
          footerDescription: map.footer_description ?? DEFAULT_SETTINGS.footerDescription,
          copyrightText: map.copyright_text ?? DEFAULT_SETTINGS.copyrightText,
          ownerName: map.owner_name ?? DEFAULT_SETTINGS.ownerName,
          ownerTitle: map.owner_title ?? DEFAULT_SETTINGS.ownerTitle,
          ownerMessage,
          ownerImage: map.owner_image ?? DEFAULT_SETTINGS.ownerImage,
        };
      }
    } catch (e) {
      console.warn('MySQL getSiteSettings error, using fallback:', e);
    }
  }
  return DEFAULT_SETTINGS;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const p = getPool();
  if (p) {
    try {
      await p.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
          setting_value TEXT NULL,
          updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      const keyMap: Record<keyof SiteSettings, string> = {
        instagramUrl: 'instagram_url',
        twitterUrl: 'twitter_url',
        youtubeUrl: 'youtube_url',
        tiktokUrl: 'tiktok_url',
        snapchatUrl: 'snapchat_url',
        linkedinUrl: 'linkedin_url',
        whatsappNumber: 'whatsapp_number',
        whatsappMessage: 'whatsapp_message',
        phone: 'phone',
        email: 'email',
        address: 'address',
        workingHours: 'working_hours',
        footerDescription: 'footer_description',
        copyrightText: 'copyright_text',
        ownerName: 'owner_name',
        ownerTitle: 'owner_title',
        ownerMessage: 'owner_message',
        ownerImage: 'owner_image',
      };

      for (const [prop, val] of Object.entries(settings)) {
        const dbKey = keyMap[prop as keyof SiteSettings];
        if (dbKey) {
          await p.query(
            `INSERT INTO site_settings (setting_key, setting_value)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
            [dbKey, val ?? '']
          );
        }
      }
    } catch (e) {
      console.error('MySQL updateSiteSettings error:', e);
      throw new Error('فشل حفظ الإعدادات في قاعدة البيانات');
    }
  }
  return getSiteSettings();
}

/* ==========================================================================
   HOMEPAGE SECTIONS CONFIGURATION (إدارة أقسام الصفحة الرئيسية)
   ========================================================================== */

export async function getHomeSectionsData(): Promise<HomeSectionsData> {
  const p = getPool();
  if (p) {
    try {
      await p.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
          setting_value LONGTEXT NULL,
          updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      const [rows] = await p.query<any[]>(
        "SELECT setting_value FROM site_settings WHERE setting_key = 'home_sections_config'"
      );
      if (rows && rows.length > 0 && rows[0].setting_value) {
        try {
          const parsed = JSON.parse(rows[0].setting_value);
          return {
            visibility: { ...DEFAULT_HOME_SECTIONS_DATA.visibility, ...(parsed.visibility || {}) },
            valueProps: Array.isArray(parsed.valueProps) ? parsed.valueProps : DEFAULT_HOME_SECTIONS_DATA.valueProps,
            stayTypes: Array.isArray(parsed.stayTypes) ? parsed.stayTypes : DEFAULT_HOME_SECTIONS_DATA.stayTypes,
            exploreCities: Array.isArray(parsed.exploreCities) ? parsed.exploreCities : DEFAULT_HOME_SECTIONS_DATA.exploreCities,
            weekendDeals: Array.isArray(parsed.weekendDeals) ? parsed.weekendDeals : DEFAULT_HOME_SECTIONS_DATA.weekendDeals,
            popularStays: Array.isArray(parsed.popularStays) ? parsed.popularStays : DEFAULT_HOME_SECTIONS_DATA.popularStays,
            tripPlanner: Array.isArray(parsed.tripPlanner) ? parsed.tripPlanner : DEFAULT_HOME_SECTIONS_DATA.tripPlanner,
            travelRoutes: Array.isArray(parsed.travelRoutes) ? parsed.travelRoutes : DEFAULT_HOME_SECTIONS_DATA.travelRoutes,
            vipBanner: { ...DEFAULT_HOME_SECTIONS_DATA.vipBanner, ...(parsed.vipBanner || {}) },
            medicalDestinations: Array.isArray(parsed.medicalDestinations) ? parsed.medicalDestinations : DEFAULT_HOME_SECTIONS_DATA.medicalDestinations,
            medicalHero: { ...DEFAULT_HOME_SECTIONS_DATA.medicalHero, ...(parsed.medicalHero || {}) },
          };
        } catch (jsonErr) {
          console.warn('Failed to parse home_sections_config JSON, falling back:', jsonErr);
        }
      }
    } catch (e) {
      console.warn('MySQL getHomeSectionsData error, using fallback:', e);
    }
  }
  return DEFAULT_HOME_SECTIONS_DATA;
}

export async function updateHomeSectionsData(data: Partial<HomeSectionsData>): Promise<HomeSectionsData> {
  const current = await getHomeSectionsData();
  const merged: HomeSectionsData = {
    visibility: { ...current.visibility, ...(data.visibility || {}) },
    valueProps: data.valueProps || current.valueProps,
    stayTypes: data.stayTypes || current.stayTypes,
    exploreCities: data.exploreCities || current.exploreCities,
    weekendDeals: data.weekendDeals || current.weekendDeals,
    popularStays: data.popularStays || current.popularStays,
    tripPlanner: data.tripPlanner || current.tripPlanner,
    travelRoutes: data.travelRoutes || current.travelRoutes,
    vipBanner: { ...current.vipBanner, ...(data.vipBanner || {}) },
    medicalDestinations: data.medicalDestinations || current.medicalDestinations,
    medicalHero: { ...current.medicalHero, ...(data.medicalHero || {}) },
  };

  const p = getPool();
  if (p) {
    try {
      await p.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
          setting_value LONGTEXT NULL,
          updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      await p.query(
        `INSERT INTO site_settings (setting_key, setting_value)
         VALUES ('home_sections_config', ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [JSON.stringify(merged)]
      );
    } catch (e) {
      console.error('MySQL updateHomeSectionsData error:', e);
      throw new Error('فشل حفظ إعدادات أقسام الصفحة الرئيسية');
    }
  }
  return merged;
}

/* ==========================================================================
   BRANCHES (فروع الجمعية)
   ========================================================================== */

let branchesTableChecked = false;

async function ensureBranchesTable(p: mysql.Pool) {
  if (branchesTableChecked) return;
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS branches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255) NULL,
        city VARCHAR(100) NOT NULL,
        region VARCHAR(100) NOT NULL,
        address VARCHAR(255) NULL,
        phone VARCHAR(50) NULL,
        whatsapp VARCHAR(50) NULL,
        email VARCHAR(100) NULL,
        manager_name VARCHAR(100) NULL,
        working_hours VARCHAR(100) NULL,
        description TEXT NULL,
        map_url VARCHAR(500) NULL,
        is_main TINYINT(1) DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Check if table is empty, if so, seed DEFAULT_BRANCHES
    const [rows]: any = await p.query('SELECT COUNT(*) as count FROM branches');
    const branchCount = Number(rows?.[0]?.count ?? 0);
    if (branchCount === 0) {
      for (const b of DEFAULT_BRANCHES) {
        await p.query(
          `INSERT INTO branches (name, name_en, city, region, address, phone, whatsapp, email, working_hours, description, is_main, is_active, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            b.name,
            b.nameEn || null,
            b.city,
            b.region,
            b.address || null,
            b.phone || null,
            b.whatsapp || null,
            b.email || null,
            b.workingHours || null,
            b.description || null,
            b.isMain ? 1 : 0,
            b.isActive ? 1 : 0,
            b.sortOrder || 0,
          ]
        );
      }
    } else {
      // Ensure all existing branches are updated to the unified phone number
      await p.query("UPDATE branches SET phone = '+966 57 171 3078', whatsapp = '966571713078'");
    }
    branchesTableChecked = true;
  } catch (err) {
    console.warn('ensureBranchesTable warning:', err);
  }
}

export async function getBranches(): Promise<Branch[]> {
  const p = getPool();
  if (p) {
    try {
      await ensureBranchesTable(p);
      const [rows] = await p.query<any[]>(
        `SELECT id, name, name_en as nameEn, city, region, address, phone, whatsapp, email,
                manager_name as managerName, working_hours as workingHours, description,
                map_url as mapUrl, is_main as isMain, is_active as isActive, sort_order as sortOrder
         FROM branches
         WHERE is_active = 1
         ORDER BY sort_order ASC, id ASC`
      );
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          ...r,
          isMain: Boolean(r.isMain),
          isActive: Boolean(r.isActive),
        }));
      }
    } catch (e) {
      console.warn('MySQL getBranches error, using fallback:', e);
    }
  }
  return DEFAULT_BRANCHES;
}

export async function getAllBranchesAdmin(): Promise<Branch[]> {
  const p = getPool();
  if (p) {
    try {
      await ensureBranchesTable(p);
      const [rows] = await p.query<any[]>(
        `SELECT id, name, name_en as nameEn, city, region, address, phone, whatsapp, email,
                manager_name as managerName, working_hours as workingHours, description,
                map_url as mapUrl, is_main as isMain, is_active as isActive, sort_order as sortOrder
         FROM branches
         ORDER BY sort_order ASC, id ASC`
      );
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          ...r,
          isMain: Boolean(r.isMain),
          isActive: Boolean(r.isActive),
        }));
      }
    } catch (e) {
      console.warn('MySQL getAllBranchesAdmin error, using fallback:', e);
    }
  }
  return DEFAULT_BRANCHES;
}

export async function createBranch(b: any): Promise<Branch> {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await ensureBranchesTable(p);
  const [res]: any = await p.query(
    `INSERT INTO branches (name, name_en, city, region, address, phone, whatsapp, email, manager_name, working_hours, description, map_url, is_main, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      b.name,
      b.nameEn || null,
      b.city,
      b.region,
      b.address || null,
      b.phone || null,
      b.whatsapp || null,
      b.email || null,
      b.managerName || null,
      b.workingHours || null,
      b.description || null,
      b.mapUrl || null,
      b.isMain ? 1 : 0,
      b.isActive !== undefined ? (b.isActive ? 1 : 0) : 1,
      Number(b.sortOrder) || 0,
    ]
  );
  return { id: res.insertId, ...b };
}

export async function updateBranch(id: number, b: any): Promise<Branch> {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await ensureBranchesTable(p);
  await p.query(
    `UPDATE branches SET
      name = COALESCE(?, name),
      name_en = COALESCE(?, name_en),
      city = COALESCE(?, city),
      region = COALESCE(?, region),
      address = COALESCE(?, address),
      phone = COALESCE(?, phone),
      whatsapp = COALESCE(?, whatsapp),
      email = COALESCE(?, email),
      manager_name = COALESCE(?, manager_name),
      working_hours = COALESCE(?, working_hours),
      description = COALESCE(?, description),
      map_url = COALESCE(?, map_url),
      is_main = COALESCE(?, is_main),
      is_active = COALESCE(?, is_active),
      sort_order = COALESCE(?, sort_order)
     WHERE id = ?`,
    [
      b.name,
      b.nameEn,
      b.city,
      b.region,
      b.address,
      b.phone,
      b.whatsapp,
      b.email,
      b.managerName,
      b.workingHours,
      b.description,
      b.mapUrl,
      b.isMain !== undefined ? (b.isMain ? 1 : 0) : null,
      b.isActive !== undefined ? (b.isActive ? 1 : 0) : null,
      b.sortOrder !== undefined ? Number(b.sortOrder) : null,
      id,
    ]
  );
  return { id, ...b };
}

export async function deleteBranch(id: number): Promise<{ ok: boolean }> {
  const p = getPool();
  if (!p) throw new Error('Database connection not available');
  await ensureBranchesTable(p);
  await p.query('DELETE FROM branches WHERE id = ?', [id]);
  return { ok: true };
}

/* ==========================================================================
   LIVE STREAM & LAUNCH CEREMONY
   ========================================================================== */

let liveTablesChecked = false;

async function ensureLiveTables(p: mysql.Pool) {
  if (liveTablesChecked) return;
  try {
    // 1. Live stream settings table
    await p.query(`
      CREATE TABLE IF NOT EXISTS live_stream_settings (
        id INT PRIMARY KEY DEFAULT 1,
        is_live TINYINT(1) DEFAULT 1,
        status VARCHAR(20) DEFAULT 'LIVE',
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(500) NULL,
        scheduled_at VARCHAR(50) NULL,
        stream_url TEXT NOT NULL,
        stream_platform VARCHAR(50) DEFAULT 'youtube',
        recording_url TEXT NULL,
        banner_enabled TINYINT(1) DEFAULT 1,
        banner_text VARCHAR(255) NULL,
        allow_comments TINYINT(1) DEFAULT 1,
        viewer_count INT DEFAULT 1420,
        auto_detect_viewers TINYINT(1) DEFAULT 1,
        hero_badge VARCHAR(100) NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Live congratulations table
    await p.query(`
      CREATE TABLE IF NOT EXISTS live_congratulations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_name VARCHAR(100) NOT NULL,
        branch_or_city VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        is_approved TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Live ceremony agenda items table
    await p.query(`
      CREATE TABLE IF NOT EXISTS live_agenda_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        time VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed default settings if empty
    const [settingsRows]: any = await p.query('SELECT COUNT(*) as count FROM live_stream_settings');
    const settingsCount = Number(settingsRows?.[0]?.count ?? 0);
    if (settingsCount === 0) {
      await p.query(
        `INSERT INTO live_stream_settings (id, is_live, status, title, subtitle, scheduled_at, stream_url, stream_platform, recording_url, banner_enabled, banner_text, allow_comments, viewer_count, hero_badge)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          DEFAULT_LIVE_SETTINGS.isLive ? 1 : 0,
          DEFAULT_LIVE_SETTINGS.status,
          DEFAULT_LIVE_SETTINGS.title,
          DEFAULT_LIVE_SETTINGS.subtitle,
          DEFAULT_LIVE_SETTINGS.scheduledAt,
          DEFAULT_LIVE_SETTINGS.streamUrl,
          DEFAULT_LIVE_SETTINGS.streamPlatform,
          DEFAULT_LIVE_SETTINGS.recordingUrl,
          DEFAULT_LIVE_SETTINGS.bannerEnabled ? 1 : 0,
          DEFAULT_LIVE_SETTINGS.bannerText,
          DEFAULT_LIVE_SETTINGS.allowComments ? 1 : 0,
          DEFAULT_LIVE_SETTINGS.viewerCount || 1420,
          DEFAULT_LIVE_SETTINGS.heroBadge,
        ]
      );
    }

    // Seed default congratulations once into DB if table has never been populated
    const [[congratsSeedSetting]]: any = await p.query(
      "SELECT setting_value FROM site_settings WHERE setting_key = 'live_congrats_initialized'"
    ).catch(() => [[null]]);

    if (!congratsSeedSetting || congratsSeedSetting.setting_value !== '1') {
      const [congratsRows]: any = await p.query('SELECT COUNT(*) as count FROM live_congratulations');
      const congratsCount = Number(congratsRows?.[0]?.count ?? 0);
      if (congratsCount === 0) {
        for (const c of DEFAULT_CONGRATULATIONS) {
          await p.query(
            `INSERT INTO live_congratulations (sender_name, branch_or_city, message, is_approved)
             VALUES (?, ?, ?, ?)`,
            [c.senderName, c.branchOrCity, c.message, c.isApproved ? 1 : 0]
          );
        }
      }
      await p.query(
        "INSERT INTO site_settings (setting_key, setting_value) VALUES ('live_congrats_initialized', '1') ON DUPLICATE KEY UPDATE setting_value = '1'"
      ).catch(() => {});
    }

    // Seed default agenda items once into DB if table has never been populated
    const [[agendaSeedSetting]]: any = await p.query(
      "SELECT setting_value FROM site_settings WHERE setting_key = 'live_agenda_initialized'"
    ).catch(() => [[null]]);

    if (!agendaSeedSetting || agendaSeedSetting.setting_value !== '1') {
      const [agendaRows]: any = await p.query('SELECT COUNT(*) as count FROM live_agenda_items');
      const agendaCount = Number(agendaRows?.[0]?.count ?? 0);
      if (agendaCount === 0) {
        for (const a of DEFAULT_AGENDA_ITEMS) {
          await p.query(
            `INSERT INTO live_agenda_items (id, time, title, description, sort_order)
             VALUES (?, ?, ?, ?, ?)`,
            [a.id, a.time, a.title, a.description, a.sortOrder]
          );
        }
      }
      await p.query(
        "INSERT INTO site_settings (setting_key, setting_value) VALUES ('live_agenda_initialized', '1') ON DUPLICATE KEY UPDATE setting_value = '1'"
      ).catch(() => {});
    }

    // Ensure auto_detect_viewers column exists
    try {
      await p.query('ALTER TABLE live_stream_settings ADD COLUMN auto_detect_viewers TINYINT(1) DEFAULT 1');
    } catch {
      // Column already exists
    }

    // Update any old broken placeholder stream_url in existing rows
    try {
      await p.query(`
        UPDATE live_stream_settings
        SET stream_url = 'https://www.youtube.com/watch?v=R6D7jQI4BD0',
            recording_url = 'https://www.youtube.com/watch?v=R6D7jQI4BD0'
        WHERE stream_url LIKE '%3nQ6L8bQeYc%' OR recording_url LIKE '%3nQ6L8bQeYc%'
      `);
    } catch {
      // Ignore if table schema variations occur
    }

    liveTablesChecked = true;
  } catch (err) {
    console.warn('ensureLiveTables warning:', err);
  }
}

export async function getLiveSettings(): Promise<LiveStreamSettings> {
  const p = getPool();
  if (p) {
    try {
      await ensureLiveTables(p);
      const [rows] = await p.query<any[]>(
        `SELECT id, is_live as isLive, status, title, subtitle, scheduled_at as scheduledAt,
                stream_url as streamUrl, stream_platform as streamPlatform, recording_url as recordingUrl,
                banner_enabled as bannerEnabled, banner_text as bannerText, allow_comments as allowComments,
                viewer_count as viewerCount, auto_detect_viewers as autoDetectViewers, hero_badge as heroBadge
         FROM live_stream_settings
         WHERE id = 1
         LIMIT 1`
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        let streamUrl = r.streamUrl ?? '';
        let recordingUrl = r.recordingUrl ?? '';
        if (streamUrl && streamUrl.includes('3nQ6L8bQeYc')) {
          streamUrl = 'https://www.youtube.com/watch?v=R6D7jQI4BD0';
        }
        if (recordingUrl && recordingUrl.includes('3nQ6L8bQeYc')) {
          recordingUrl = 'https://www.youtube.com/watch?v=R6D7jQI4BD0';
        }
        let bannerText = r.bannerText || '';
        let status: LiveStreamStatus = r.status || 'UPCOMING';
        let isLive = Boolean(r.isLive);
        let heroBadge = r.heroBadge;

        // Auto-promote to LIVE when scheduled time is reached!
        if (status === 'UPCOMING' && r.scheduledAt) {
          const scheduledTime = parseScheduledDate(r.scheduledAt);
          if (!isNaN(scheduledTime) && Date.now() >= scheduledTime) {
            status = 'LIVE';
            isLive = true;
            bannerText = '🔴 بث مباشر الآن: انطلاق وقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع المملكة (13 فرعاً)';
            heroBadge = 'بث مباشر حي عبر المملكة';

            // Auto-persist in MySQL so the whole platform stays synced
            p.query(
              `UPDATE live_stream_settings 
               SET status = 'LIVE', is_live = 1, banner_text = ?, hero_badge = ? 
               WHERE id = 1 AND status = 'UPCOMING'`,
              [bannerText, heroBadge]
            ).catch((err) => console.warn('Auto live transition DB update warning:', err));
          }
        }

        if (status === 'UPCOMING' && bannerText.includes('بث مباشر الآن')) {
          bannerText = '⏳ ترقبوا: انطلاق حفل التدشين الرسمي لمنصة SA للسياحة وفروع المملكة الـ 13';
        } else if (status === 'ENDED' && (bannerText.includes('بث مباشر الآن') || bannerText.includes('ترقبوا'))) {
          bannerText = '🎬 انتهى البث المباشر: يمكنك الآن مشاهدة التسجيل الكامل لوقائع حفل التدشين الرسمي';
        } else if (status === 'LIVE' && (bannerText.includes('ترقبوا') || bannerText.includes('انتهى البث'))) {
          bannerText = '🔴 بث مباشر الآن: انطلاق وقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع المملكة (13 فرعاً)';
        }
        const res: LiveStreamSettings = {
          id: r.id,
          isLive,
          status,
          title: r.title,
          subtitle: r.subtitle,
          scheduledAt: r.scheduledAt,
          streamUrl,
          streamPlatform: r.streamPlatform || 'youtube',
          recordingUrl,
          bannerEnabled: Boolean(r.bannerEnabled),
          bannerText,
          allowComments: Boolean(r.allowComments),
          viewerCount: Number(r.viewerCount) || 1420,
          autoDetectViewers: r.autoDetectViewers !== undefined ? Boolean(r.autoDetectViewers) : true,
          heroBadge,
        };
        Object.assign(DEFAULT_LIVE_SETTINGS, res);
        return res;
      }
    } catch (e) {
      console.warn('MySQL getLiveSettings error, using fallback:', e);
    }
  }
  if (DEFAULT_LIVE_SETTINGS.status === 'UPCOMING' && DEFAULT_LIVE_SETTINGS.scheduledAt) {
    const scheduledTime = parseScheduledDate(DEFAULT_LIVE_SETTINGS.scheduledAt);
    if (!isNaN(scheduledTime) && Date.now() >= scheduledTime) {
      DEFAULT_LIVE_SETTINGS.status = 'LIVE';
      DEFAULT_LIVE_SETTINGS.isLive = true;
      DEFAULT_LIVE_SETTINGS.bannerText = '🔴 بث مباشر الآن: انطلاق وقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع المملكة (13 فرعاً)';
      DEFAULT_LIVE_SETTINGS.heroBadge = 'بث مباشر حي عبر المملكة';
    }
  }
  return DEFAULT_LIVE_SETTINGS;
}

export async function updateLiveSettings(s: Partial<LiveStreamSettings>): Promise<LiveStreamSettings> {
  // Always update in-memory fallback so changes take effect immediately
  Object.assign(DEFAULT_LIVE_SETTINGS, s);

  const p = getPool();
  if (p) {
    try {
      await ensureLiveTables(p);
      await p.query(
        `INSERT INTO live_stream_settings (
          id, is_live, status, title, subtitle, scheduled_at, stream_url, stream_platform,
          recording_url, banner_enabled, banner_text, allow_comments, viewer_count, auto_detect_viewers, hero_badge
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          is_live = VALUES(is_live),
          status = VALUES(status),
          title = VALUES(title),
          subtitle = VALUES(subtitle),
          scheduled_at = VALUES(scheduled_at),
          stream_url = VALUES(stream_url),
          stream_platform = VALUES(stream_platform),
          recording_url = VALUES(recording_url),
          banner_enabled = VALUES(banner_enabled),
          banner_text = VALUES(banner_text),
          allow_comments = VALUES(allow_comments),
          viewer_count = VALUES(viewer_count),
          auto_detect_viewers = VALUES(auto_detect_viewers),
          hero_badge = VALUES(hero_badge)`,
        [
          DEFAULT_LIVE_SETTINGS.isLive ? 1 : 0,
          DEFAULT_LIVE_SETTINGS.status,
          DEFAULT_LIVE_SETTINGS.title,
          DEFAULT_LIVE_SETTINGS.subtitle || null,
          DEFAULT_LIVE_SETTINGS.scheduledAt,
          DEFAULT_LIVE_SETTINGS.streamUrl,
          DEFAULT_LIVE_SETTINGS.streamPlatform || 'youtube',
          DEFAULT_LIVE_SETTINGS.recordingUrl || null,
          DEFAULT_LIVE_SETTINGS.bannerEnabled ? 1 : 0,
          DEFAULT_LIVE_SETTINGS.bannerText || null,
          DEFAULT_LIVE_SETTINGS.allowComments ? 1 : 0,
          Number(DEFAULT_LIVE_SETTINGS.viewerCount) || 1420,
          DEFAULT_LIVE_SETTINGS.autoDetectViewers !== false ? 1 : 0,
          DEFAULT_LIVE_SETTINGS.heroBadge || null,
        ]
      );
    } catch (err) {
      console.warn('MySQL updateLiveSettings warning:', err);
    }
  }
  return { ...DEFAULT_LIVE_SETTINGS };
}

/* ==========================================================================
   CEREMONY AGENDA (برنامج فعاليات الحفل)
   ========================================================================== */

export async function getLiveAgenda(): Promise<LiveAgendaItem[]> {
  const p = getPool();
  if (p) {
    try {
      await ensureLiveTables(p);
      const [rows] = await p.query<any[]>(
        `SELECT id, time, title, description, sort_order as sortOrder
         FROM live_agenda_items
         ORDER BY sort_order ASC, id ASC`
      );
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          id: r.id,
          time: r.time,
          title: r.title,
          description: r.description,
          sortOrder: Number(r.sortOrder) || 0,
        }));
      }
    } catch (e) {
      console.warn('MySQL getLiveAgenda error, using fallback:', e);
    }
  }
  return DEFAULT_AGENDA_ITEMS;
}

export async function saveLiveAgenda(items: LiveAgendaItem[]): Promise<LiveAgendaItem[]> {
  // Update in-memory fallback
  DEFAULT_AGENDA_ITEMS.length = 0;
  DEFAULT_AGENDA_ITEMS.push(...items);

  const p = getPool();
  if (p) {
    try {
      await ensureLiveTables(p);
      await p.query('DELETE FROM live_agenda_items');
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await p.query(
          `INSERT INTO live_agenda_items (time, title, description, sort_order)
           VALUES (?, ?, ?, ?)`,
          [item.time, item.title, item.description, i + 1]
        );
      }
      return getLiveAgenda();
    } catch (err) {
      console.warn('MySQL saveLiveAgenda warning:', err);
    }
  }
  return DEFAULT_AGENDA_ITEMS;
}

export async function addLiveAgendaItem(item: {
  time: string;
  title: string;
  description: string;
}): Promise<LiveAgendaItem> {
  const p = getPool();
  const nextOrder = DEFAULT_AGENDA_ITEMS.length + 1;
  if (!p) {
    const newItem: LiveAgendaItem = {
      id: Date.now(),
      time: item.time,
      title: item.title,
      description: item.description,
      sortOrder: nextOrder,
    };
    DEFAULT_AGENDA_ITEMS.push(newItem);
    return newItem;
  }
  await ensureLiveTables(p);
  const [res]: any = await p.query(
    `INSERT INTO live_agenda_items (time, title, description, sort_order)
     VALUES (?, ?, ?, ?)`,
    [item.time, item.title, item.description, nextOrder]
  );
  return {
    id: res.insertId,
    time: item.time,
    title: item.title,
    description: item.description,
    sortOrder: nextOrder,
  };
}

export async function deleteLiveAgendaItem(id: number): Promise<{ ok: boolean }> {
  const idx = DEFAULT_AGENDA_ITEMS.findIndex((a) => a.id === id);
  if (idx !== -1) DEFAULT_AGENDA_ITEMS.splice(idx, 1);

  const p = getPool();
  if (p) {
    try {
      await ensureLiveTables(p);
      await p.query('DELETE FROM live_agenda_items WHERE id = ?', [id]);
    } catch (err) {
      console.warn('deleteLiveAgendaItem error:', err);
    }
  }
  return { ok: true };
}

export async function getLiveCongratulations(limit = 50): Promise<LiveCongratulation[]> {
  const p = getPool();
  if (p) {
    try {
      await ensureLiveTables(p);
      const [rows] = await p.query<any[]>(
        `SELECT id, sender_name as senderName, branch_or_city as branchOrCity, message,
                created_at as createdAt, is_approved as isApproved
         FROM live_congratulations
         WHERE is_approved = 1
         ORDER BY id DESC
         LIMIT ?`,
        [limit]
      );
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          ...r,
          isApproved: Boolean(r.isApproved),
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    } catch (e) {
      console.warn('MySQL getLiveCongratulations error, using fallback:', e);
    }
  }
  return DEFAULT_CONGRATULATIONS;
}

export async function addLiveCongratulation(data: {
  senderName: string;
  branchOrCity: string;
  message: string;
}): Promise<LiveCongratulation> {
  const p = getPool();
  if (!p) {
    const item: LiveCongratulation = {
      id: Date.now(),
      senderName: data.senderName,
      branchOrCity: data.branchOrCity,
      message: data.message,
      createdAt: new Date().toISOString(),
      isApproved: true,
    };
    DEFAULT_CONGRATULATIONS.unshift(item);
    return item;
  }
  await ensureLiveTables(p);
  const [res]: any = await p.query(
    `INSERT INTO live_congratulations (sender_name, branch_or_city, message, is_approved)
     VALUES (?, ?, ?, 1)`,
    [data.senderName, data.branchOrCity, data.message]
  );
  return {
    id: res.insertId,
    senderName: data.senderName,
    branchOrCity: data.branchOrCity,
    message: data.message,
    createdAt: new Date().toISOString(),
    isApproved: true,
  };
}

export async function deleteLiveCongratulation(id: number): Promise<{ ok: boolean }> {
  const idx = DEFAULT_CONGRATULATIONS.findIndex((c) => c.id === id);
  if (idx !== -1) DEFAULT_CONGRATULATIONS.splice(idx, 1);

  const p = getPool();
  if (p) {
    await ensureLiveTables(p);
    await p.query('DELETE FROM live_congratulations WHERE id = ?', [id]);
  }
  return { ok: true };
}
