import mysql from 'mysql2/promise';
import {
  DEFAULT_DESTINATIONS,
  DEFAULT_PACKAGES,
  DEFAULT_REVIEWS,
  DEFAULT_SERVICES,
  DEFAULT_SETTINGS,
  DEFAULT_SLIDES,
  DEFAULT_STATS,
} from './default-data';
import type { Destination, HeroSlide, PackageDetail, PackageSummary, PublicStats, Review, SiteSettings, VipService } from './types';

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
      const [rows] = await p.query<any[]>(
        'SELECT id, title, title_en, subtitle, image, cta_text, cta_link FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
      );
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
      const [rows] = await p.query<any[]>(
        'SELECT id, title, description, icon FROM vip_services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
      );
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
      const [rows] = await p.query<any[]>(
        'SELECT id, name, location, rating, comment FROM reviews WHERE is_approved = 1 ORDER BY created_at DESC LIMIT 10'
      );
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
      if (rows && rows.length > 0) return rows.map((r) => ({ ...r, isActive: Boolean(r.isActive) }));
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
      if (rows && rows.length > 0) return rows.map((r) => ({ ...r, isActive: Boolean(r.isActive) }));
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
      if (rows && rows.length > 0) return rows.map((r) => ({ ...r, isActive: Boolean(r.isActive) }));
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
      if (rows && rows.length > 0) return rows.map((r) => ({ ...r, isApproved: Boolean(r.isApproved) }));
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
      if (rows && rows.length > 0) {
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
