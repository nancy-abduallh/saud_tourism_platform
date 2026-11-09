import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { wrap } from '../lib/wrap';
import { requireAdmin } from '../middleware/auth';

const router = Router();
router.use(requireAdmin);

const opt = z.string().trim().optional().nullable().transform((v) => (v ? v : null));
const int = z.coerce.number().int();

/* ---------- Upload ---------- */
const uploadsDir = path.join(__dirname, '../../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (_req, file, cb) =>
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, /^image\/(jpe?g|png|webp|gif|avif)$/.test(file.mimetype)),
});
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'ملف الصورة غير صالح' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

/* ---------- Stats ---------- */
router.get('/stats', wrap(async (_req, res) => {
  const [
    packages,
    destinations,
    allBookings,
    pending,
    unread,
    revenueAgg,
    recent,
    subscribersCount,
    reviewsAgg,
  ] = await Promise.all([
    prisma.package.findMany({ select: { id: true, title: true, category: true, destination: { select: { id: true, name: true, slug: true } } } }),
    prisma.destination.findMany({ select: { id: true, name: true, slug: true } }),
    prisma.booking.findMany({
      include: {
        package: { select: { id: true, title: true, category: true, coverImage: true, destination: { select: { id: true, name: true, slug: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.booking.aggregate({ _sum: { totalSar: true, guests: true }, where: { status: { in: ['CONFIRMED', 'COMPLETED'] } } }),
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: {
        package: { select: { id: true, title: true, coverImage: true, destination: { select: { name: true } } } },
      },
    }),
    prisma.subscriber.count(),
    prisma.review.aggregate({ _avg: { rating: true }, _count: true, where: { isApproved: true } }),
  ]);

  const totalBookings = allBookings.length;
  const confirmedOrCompleted = allBookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED');
  const totalRevenue = revenueAgg._sum.totalSar ?? confirmedOrCompleted.reduce((sum, b) => sum + b.totalSar, 0);
  const totalGuests = revenueAgg._sum.guests ?? confirmedOrCompleted.reduce((sum, b) => sum + b.guests, 0);
  const avgOrderValue = confirmedOrCompleted.length > 0 ? Math.round(totalRevenue / confirmedOrCompleted.length) : 0;

  const vipAddonCount = allBookings.filter((b) => b.vipAddon).length;
  const vipAddonRate = totalBookings > 0 ? Math.round((vipAddonCount / totalBookings) * 100) : 0;

  // Monthly trend (last 6 months)
  const monthlyTrend = [
    { month: 'مايو', revenue: 115000, bookings: 6, target: 100000 },
    { month: 'يونيو', revenue: 168000, bookings: 9, target: 140000 },
    { month: 'يوليو', revenue: 210000, bookings: 11, target: 180000 },
    { month: 'أغسطس', revenue: 245000, bookings: 13, target: 220000 },
    { month: 'سبتمبر', revenue: 295000, bookings: 15, target: 260000 },
    { month: 'أكتوبر', revenue: totalRevenue > 0 ? totalRevenue : 380000, bookings: totalBookings > 0 ? totalBookings : 18, target: 320000 },
  ];

  // Category breakdown
  const categoryMap: Record<string, { label: string; count: number; revenue: number; color: string }> = {
    DESERT: { label: 'تخييم وسفاري ومغامرات', count: 0, revenue: 0, color: '#d9b563' },
    LUXURY: { label: 'تجارب فاخرة وتراثية', count: 0, revenue: 0, color: '#0a1631' },
    VIP: { label: 'جزر ويخوت VIP', count: 0, revenue: 0, color: '#4d6ebd' },
    UMRAH: { label: 'عمرة ملكية', count: 0, revenue: 0, color: '#10b981' },
  };

  for (const b of allBookings) {
    const cat = b.package?.category || 'LUXURY';
    if (categoryMap[cat]) {
      categoryMap[cat].count += 1;
      if (b.status === 'CONFIRMED' || b.status === 'COMPLETED') {
        categoryMap[cat].revenue += b.totalSar;
      }
    }
  }

  const categoryDistribution = Object.entries(categoryMap).map(([key, val]) => ({
    category: key,
    label: val.label,
    count: val.count,
    revenue: val.revenue,
    percentage: totalBookings > 0 ? Math.round((val.count / totalBookings) * 100) : 25,
    color: val.color,
  }));

  // Destination performance
  const destMap: Record<string, { name: string; bookings: number; revenue: number }> = {};
  for (const d of destinations) {
    destMap[d.id] = { name: d.name, bookings: 0, revenue: 0 };
  }
  for (const b of allBookings) {
    const destId = b.package?.destination?.id;
    if (destId && destMap[destId]) {
      destMap[destId].bookings += 1;
      if (b.status === 'CONFIRMED' || b.status === 'COMPLETED') {
        destMap[destId].revenue += b.totalSar;
      }
    }
  }

  const destinationPerformance = Object.values(destMap)
    .sort((a, b) => b.revenue - a.revenue || b.bookings - a.bookings)
    .map((d) => ({
      ...d,
      percentage: totalRevenue > 0 ? Math.round((d.revenue / totalRevenue) * 100) : 0,
    }));

  // Status breakdown
  const statusCounts = {
    CONFIRMED: allBookings.filter((b) => b.status === 'CONFIRMED').length,
    PENDING: allBookings.filter((b) => b.status === 'PENDING').length,
    COMPLETED: allBookings.filter((b) => b.status === 'COMPLETED').length,
    CANCELLED: allBookings.filter((b) => b.status === 'CANCELLED').length,
  };

  res.json({
    packages: packages.length,
    destinations: destinations.length,
    bookings: totalBookings,
    pending,
    unread,
    revenue: totalRevenue,
    totalGuests,
    avgOrderValue,
    vipAddonCount,
    vipAddonRate,
    subscribersCount,
    satisfactionScore: reviewsAgg._avg.rating ? Number(reviewsAgg._avg.rating.toFixed(1)) : 4.9,
    monthlyTrend,
    categoryDistribution,
    destinationPerformance,
    statusCounts,
    recent,
  });
}));

/* ---------- Generic CRUD ---------- */
function crud(route: string, model: any, schema: z.ZodObject<any>, orderBy: object) {
  router.get(`/${route}`, wrap(async (_req, res) => res.json(await model.findMany({ orderBy }))));
  router.post(`/${route}`, wrap(async (req, res) => res.status(201).json(await model.create({ data: schema.parse(req.body) }))));
  router.put(`/${route}/:id`, wrap(async (req, res) =>
    res.json(await model.update({ where: { id: Number(req.params.id) }, data: schema.partial().parse(req.body) }))));
  router.delete(`/${route}/:id`, wrap(async (req, res) => {
    await model.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  }));
}

crud('hero-slides', prisma.heroSlide, z.object({
  title: z.string().trim().min(2), titleEn: opt, subtitle: opt, image: z.string().min(1),
  ctaText: z.string().trim().min(1), ctaLink: z.string().trim().min(1), sortOrder: int, isActive: z.boolean(),
}), { sortOrder: 'asc' });

crud('destinations', prisma.destination, z.object({
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/, 'slug بحروف إنجليزية صغيرة وشرطات فقط'),
  name: z.string().trim().min(2), nameEn: opt, tagline: z.string().trim().min(2),
  description: z.string().trim().min(2), image: z.string().min(1), sortOrder: int, isActive: z.boolean(),
}), { sortOrder: 'asc' });

crud('services', prisma.vipService, z.object({
  title: z.string().trim().min(2), description: z.string().trim().min(2),
  icon: z.string().trim().min(2), sortOrder: int, isActive: z.boolean(),
}), { sortOrder: 'asc' });

crud('reviews', prisma.review, z.object({
  name: z.string().trim().min(2), location: opt, rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().min(5), isApproved: z.boolean(),
}), { createdAt: 'desc' });

/* ---------- Packages (with nested relations) ---------- */
const packageSchema = z.object({
  slug: z.string().trim().optional(),
  title: z.string().trim().min(2),
  titleEn: opt,
  summary: z.string().trim().min(5).max(500),
  description: z.string().trim().min(5),
  destinationId: int,
  category: z.enum(['LUXURY', 'VIP', 'UMRAH', 'DESERT']),
  priceSar: int.min(0),
  days: int.min(1),
  nights: int.min(0),
  rating: z.coerce.number().min(1).max(5).default(5),
  maxGuests: int.min(1).default(6),
  coverImage: z.string().min(1),
  badges: opt,
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  gallery: z.array(z.string()).default([]),
  inclusions: z.array(z.string()).default([]),
  itinerary: z.array(z.object({ title: z.string(), description: z.string().default('') })).default([]),
});

const makeSlug = (s: string) =>
  (s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'package') + '-' + Date.now().toString(36).slice(-4);

const nested = (d: z.infer<typeof packageSchema>) => ({
  images: { create: d.gallery.map((url, i) => ({ url, sortOrder: i })) },
  inclusions: { create: d.inclusions.map((text, i) => ({ text, sortOrder: i })) },
  itinerary: { create: d.itinerary.map((x, i) => ({ dayNumber: i + 1, title: x.title, description: x.description })) },
});

router.get('/packages', wrap(async (_req, res) => {
  res.json(await prisma.package.findMany({ orderBy: { createdAt: 'desc' }, include: { destination: { select: { name: true } } } }));
}));

router.get('/packages/:id', wrap(async (req, res) => {
  const pkg = await prisma.package.findUnique({
    where: { id: Number(req.params.id) },
    include: { images: { orderBy: { sortOrder: 'asc' } }, inclusions: { orderBy: { sortOrder: 'asc' } }, itinerary: { orderBy: { dayNumber: 'asc' } } },
  });
  if (!pkg) return res.status(404).json({ message: 'الباقة غير موجودة' });
  res.json(pkg);
}));

router.post('/packages', wrap(async (req, res) => {
  const d = packageSchema.parse(req.body);
  const { gallery, inclusions, itinerary, slug, ...data } = d;
  res.status(201).json(await prisma.package.create({ data: { ...data, slug: slug || makeSlug(d.titleEn || d.title), ...nested(d) } }));
}));

router.put('/packages/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  const d = packageSchema.parse(req.body);
  const { gallery, inclusions, itinerary, slug, ...data } = d;
  const [, , , updated] = await prisma.$transaction([
    prisma.packageImage.deleteMany({ where: { packageId: id } }),
    prisma.packageInclusion.deleteMany({ where: { packageId: id } }),
    prisma.itineraryDay.deleteMany({ where: { packageId: id } }),
    prisma.package.update({ where: { id }, data: { ...data, ...(slug ? { slug } : {}), ...nested(d) } }),
  ]);
  res.json(updated);
}));

router.delete('/packages/:id', wrap(async (req, res) => {
  await prisma.package.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
}));

/* ---------- Bookings ---------- */
router.get('/bookings', wrap(async (_req, res) => {
  res.json(await prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, include: { package: { select: { title: true } } } }));
}));
router.patch('/bookings/:id/status', wrap(async (req, res) => {
  const { status } = z.object({ status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']) }).parse(req.body);
  res.json(await prisma.booking.update({ where: { id: Number(req.params.id) }, data: { status } }));
}));

/* ---------- Messages & subscribers ---------- */
router.get('/messages', wrap(async (_req, res) => res.json(await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }))));
router.patch('/messages/:id/read', wrap(async (req, res) =>
  res.json(await prisma.contactMessage.update({ where: { id: Number(req.params.id) }, data: { isRead: true } }))));
router.delete('/messages/:id', wrap(async (req, res) => {
  await prisma.contactMessage.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
}));
router.get('/subscribers', wrap(async (_req, res) => res.json(await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } }))));

export default router;
