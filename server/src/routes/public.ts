import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { wrap } from '../lib/wrap';
import { optionalAuth, AuthRequest } from '../middleware/auth';

const router = Router();
export const VIP_ADDON_PRICE = 2500;

router.get('/health', (_req, res) => res.json({ ok: true }));

router.get('/stats', wrap(async (_req, res) => {
  const [packagesCount, destinationsCount, reviewsAgg, bookingsAgg] = await Promise.all([
    prisma.package.count({ where: { isActive: true } }),
    prisma.destination.count({ where: { isActive: true } }),
    prisma.review.aggregate({
      _avg: { rating: true },
      where: { isApproved: true },
    }),
    prisma.booking.aggregate({
      _sum: { guests: true },
    }),
  ]);

  const confirmedGuests = bookingsAgg._sum.guests ?? 0;
  const avgRating = reviewsAgg._avg.rating ? Number(reviewsAgg._avg.rating.toFixed(1)) : 4.9;

  res.json({
    happyGuests: 12000 + confirmedGuests,
    exclusiveExperiences: packagesCount,
    averageRating: avgRating,
    vipConcierge: '24/7',
  });
}));

router.get('/hero', wrap(async (_req, res) => {
  res.json(await prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }));
}));

router.get('/destinations', wrap(async (_req, res) => {
  res.json(await prisma.destination.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }));
}));

router.get('/destinations/:slug', wrap(async (req, res) => {
  const destination = await prisma.destination.findFirst({
    where: { slug: req.params.slug, isActive: true },
    include: {
      packages: {
        where: { isActive: true },
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      },
    },
  });
  if (!destination) return res.status(404).json({ message: 'الوجهة غير موجودة' });
  res.json(destination);
}));

router.get('/services', wrap(async (_req, res) => {
  res.json(await prisma.vipService.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }));
}));

router.get('/reviews', wrap(async (_req, res) => {
  res.json(await prisma.review.findMany({ where: { isApproved: true }, orderBy: { createdAt: 'desc' }, take: 9 }));
}));

router.get('/packages', wrap(async (req, res) => {
  const q = z.object({
    destination: z.string().optional(),
    category: z.enum(['LUXURY', 'VIP', 'UMRAH', 'DESERT']).optional(),
    featured: z.string().optional(),
    limit: z.coerce.number().int().min(1).max(60).optional(),
    exclude: z.coerce.number().int().optional(),
  }).parse(req.query);

  res.json(await prisma.package.findMany({
    where: {
      isActive: true,
      ...(q.destination ? { destination: { slug: q.destination } } : {}),
      ...(q.category ? { category: q.category } : {}),
      ...(q.featured ? { isFeatured: true } : {}),
      ...(q.exclude ? { id: { not: q.exclude } } : {}),
    },
    include: { destination: { select: { name: true, slug: true } } },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    take: q.limit,
  }));
}));

router.get('/packages/:slug', wrap(async (req, res) => {
  const pkg = await prisma.package.findFirst({
    where: { slug: req.params.slug, isActive: true },
    include: {
      destination: { select: { name: true, slug: true } },
      images: { orderBy: { sortOrder: 'asc' } },
      inclusions: { orderBy: { sortOrder: 'asc' } },
      itinerary: { orderBy: { dayNumber: 'asc' } },
    },
  });
  if (!pkg) return res.status(404).json({ message: 'الباقة غير موجودة' });
  res.json(pkg);
}));

const bookingSchema = z.object({
  packageId: z.coerce.number().int(),
  fullName: z.string().trim().min(3).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(30),
  startDate: z.coerce.date().refine((d) => d.getTime() > Date.now(), 'التاريخ يجب أن يكون في المستقبل'),
  guests: z.coerce.number().int().min(1).max(20),
  vipAddon: z.boolean().default(false),
  notes: z.string().trim().max(1000).optional(),
});

router.post('/bookings', wrap(async (req, res) => {
  const data = bookingSchema.parse(req.body);
  const pkg = await prisma.package.findFirst({ where: { id: data.packageId, isActive: true } });
  if (!pkg) return res.status(404).json({ message: 'الباقة غير موجودة' });
  if (data.guests > pkg.maxGuests) return res.status(400).json({ message: `الحد الأقصى للضيوف ${pkg.maxGuests}` });

  const totalSar = pkg.priceSar * data.guests + (data.vipAddon ? VIP_ADDON_PRICE * data.guests : 0);
  const reference = 'ST-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  await prisma.booking.create({ data: { ...data, notes: data.notes || null, totalSar, reference } });
  res.status(201).json({ reference, total: totalSar });
}));

router.get(
  '/bookings/my',
  optionalAuth,
  wrap(async (req: AuthRequest, res) => {
    let email = typeof req.query.email === 'string' ? req.query.email.trim() : undefined;
    if (req.user?.id) {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (user?.email) email = user.email;
    }
    if (!email) {
      return res.status(400).json({ message: 'يرجى تسجيل الدخول أو تمرير البريد الإلكتروني' });
    }

    const status = typeof req.query.status === 'string' ? req.query.status : undefined;

    const bookings = await prisma.booking.findMany({
      where: {
        email,
        ...(status ? { status: status as any } : {}),
      },
      include: {
        package: {
          select: {
            id: true,
            title: true,
            titleEn: true,
            slug: true,
            coverImage: true,
            days: true,
            nights: true,
            destination: { select: { id: true, name: true, nameEn: true, slug: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings);
  }),
);

router.get(
  '/bookings/lookup/:reference',
  wrap(async (req, res) => {
    const booking = await prisma.booking.findUnique({
      where: { reference: req.params.reference },
      include: {
        package: {
          include: {
            destination: { select: { id: true, name: true, nameEn: true, slug: true } },
          },
        },
      },
    });
    if (!booking) return res.status(404).json({ message: 'الحجز غير موجود' });
    res.json(booking);
  }),
);

router.post(
  '/bookings/:reference/cancel',
  optionalAuth,
  wrap(async (req, res) => {
    const booking = await prisma.booking.findUnique({
      where: { reference: req.params.reference },
    });
    if (!booking) return res.status(404).json({ message: 'الحجز غير موجود' });

    if (booking.status !== 'PENDING') {
      return res.status(400).json({
        message: 'لا يمكن إلغاء الحجز إلا عندما تكون حالته معلقة (قيد المراجعة)',
      });
    }

    const updated = await prisma.booking.update({
      where: { reference: req.params.reference },
      data: { status: 'CANCELLED' },
      include: { package: { select: { title: true } } },
    });

    res.json({ ok: true, booking: updated, message: 'تم إلغاء الحجز بنجاح' });
  }),
);

router.post('/contact', wrap(async (req, res) => {
  const data = z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email(),
    phone: z.string().trim().max(30).optional(),
    message: z.string().trim().min(5).max(3000),
  }).parse(req.body);
  await prisma.contactMessage.create({ data: { ...data, phone: data.phone || null } });
  res.status(201).json({ ok: true });
}));

router.post('/newsletter', wrap(async (req, res) => {
  const { email } = z.object({ email: z.string().trim().email() }).parse(req.body);
  await prisma.subscriber.upsert({ where: { email }, update: {}, create: { email } });
  res.status(201).json({ ok: true });
}));

export default router;
