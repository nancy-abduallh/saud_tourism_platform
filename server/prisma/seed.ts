import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const plan = (titles: string[]) =>
  titles.map(
    (t, i) => [t, `برنامج اليوم ${i + 1}: ${t}. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.`] as [string, string],
  );

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@saudtourism.sa';
  const password = process.env.ADMIN_PASSWORD ?? 'Admin@12345';
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { name: 'مدير النظام', email, passwordHash: await bcrypt.hash(password, 10), role: 'ADMIN' },
  });

  if ((await prisma.destination.count()) > 0) {
    console.log('✔ Content already seeded (admin ensured).');
    return;
  }

  await prisma.heroSlide.createMany({
    data: [
      { title: 'حافة العالم.. شموخ طويق وأنشطة المغامرة', titleEn: 'Edge of the World & Tuwaiq Expeditions', subtitle: 'الواجهة الاستكشافية الأولى لرحلاتنا.. هايكنج فوق أعظم المنحدرات وسفاري الدفع الرباعي وتجارب حصرية لا تُنسى', image: '/images/tuwaiq-edge.jpg', ctaText: 'استكشف الرحلات', ctaLink: '/packages?destination=tuwaiq', sortOrder: 1 },
      { title: 'اكتشف سحر المملكة بفخامة', titleEn: 'Experience Saudi in Ultimate Luxury', subtitle: 'إقامات استثنائية بين صخور العلا الذهبية ومنتجعات البحر الأحمر الساحرة', image: '/images/hero-1.jpg', ctaText: 'استكشف الآن', ctaLink: '/packages', sortOrder: 2 },
      { title: 'العلا.. حيث يلتقي التاريخ بالفخامة', titleEn: 'Ancient Wonders & Desert Luxury', subtitle: 'فلل خاصة وسط الصخور الأثرية وليالٍ تحت سماء مرصعة بالنجوم', image: '/images/hero-2.jpg', ctaText: 'باقات العلا', ctaLink: '/packages?destination=alula', sortOrder: 3 },
      { title: 'البحر الأحمر.. أرخبيل بكر لا يُنسى', titleEn: 'Pristine Archipelago', subtitle: 'بنغلات فوق الماء ويخوت خاصة وجزر لم تطأها قدم', image: '/images/hero-3.jpg', ctaText: 'باقات البحر الأحمر', ctaLink: '/packages?destination=red-sea', sortOrder: 4 },
      { title: 'الدرعية.. مهد الثقافة والأصالة', titleEn: 'The Cradle of Culture', subtitle: 'قصور تاريخية ومطاعم فاخرة في قلب التراث السعودي', image: '/images/hero-4.jpg', ctaText: 'باقات الدرعية', ctaLink: '/packages?destination=diriyah', sortOrder: 5 },
    ],
  });

  const dests = [
    { slug: 'tuwaiq', name: 'حافة العالم', nameEn: 'Edge of the World', tagline: 'شموخ جبال طويق وسحر المغامرة', description: 'الواجهة الاستكشافية الأولى لرحلاتنا وأعظم المنحدرات الصخرية في قلب نجد، إطلالة شاهقة فوق السحاب وأنشطة هايكنج وسفاري صحراوي فاخر وتخييم ملكي.', image: '/images/tuwaiq-safari.jpg', sortOrder: 1 },
    { slug: 'alula', name: 'العلا', nameEn: 'AlUla', tagline: 'عجائب قديمة وفخامة الصحراء', description: 'واحة تاريخية تحتضن مدائن صالح وجبال الصخور الذهبية ومنتجعات صحراوية عالمية.', image: '/images/alula.jpg', sortOrder: 2 },
    { slug: 'red-sea', name: 'البحر الأحمر', nameEn: 'The Red Sea', tagline: 'أرخبيل بكر وبنغلات فوق الماء', description: 'أكثر من 90 جزيرة بكر وشعاب مرجانية ومنتجعات فوق الماء.', image: '/images/red-sea.jpg', sortOrder: 3 },
    { slug: 'diriyah', name: 'الدرعية', nameEn: 'Diriyah', tagline: 'مهد الثقافة والتاريخ', description: 'مهد الدولة السعودية الأولى، حي الطريف التاريخي المدرج في قائمة اليونسكو.', image: '/images/diriyah.jpg', sortOrder: 4 },
    { slug: 'asir', name: 'عسير', nameEn: 'Asir', tagline: 'قمم السحاب وجبال الضباب', description: 'مرتفعات خضراء وضباب ساحر وقرى تراثية ومنتجعات جبلية.', image: '/images/asir.jpg', sortOrder: 5 },
    { slug: 'makkah', name: 'مكة والمدينة', nameEn: 'Makkah & Madinah', tagline: 'رحلة إيمانية فاخرة', description: 'عمرة ملكية بخدمات كبار الشخصيات وإقامة قرب الحرمين.', image: '/images/diriyah.jpg', sortOrder: 6 },
  ];
  await prisma.destination.createMany({ data: dests });
  const idOf: Record<string, number> = {};
  for (const d of await prisma.destination.findMany()) idOf[d.slug] = d.id;

  await prisma.vipService.createMany({
    data: [
      { title: 'طيران خاص', description: 'طائرات خاصة بتجهيزات فاخرة وصالات VIP.', icon: 'plane', sortOrder: 1 },
      { title: 'يخوت فاخرة', description: 'رحلات بحرية خاصة بين جزر البحر الأحمر.', icon: 'ship', sortOrder: 2 },
      { title: 'كونسيرج VIP على مدار الساعة', description: 'فريق مخصص لك طوال الرحلة 24/7.', icon: 'concierge', sortOrder: 3 },
      { title: 'مرشدون تاريخيون خاصون', description: 'خبراء يروون حكايات المكان بطريقة حصرية.', icon: 'guide', sortOrder: 4 },
      { title: 'سيارات فاخرة بسائق', description: 'رينج روفر ومرسيدس بسائقين محترفين.', icon: 'car', sortOrder: 5 },
      { title: 'أجنحة سبا وعافية', description: 'جلسات علاجية وأجنحة استجمام خاصة.', icon: 'spa', sortOrder: 6 },
    ],
  });

  const pkgs = [
    { slug: 'tuwaiq-edge-adventure', title: 'مغامرة حافة العالم وسفاري جبل طويق VIP', titleEn: 'Edge of the World VIP Safari & Adventure', dest: 'tuwaiq', category: 'DESERT' as const, price: 3500, days: 1, nights: 0, rating: 5, cover: '/images/tuwaiq-edge.jpg', badges: 'الوجهة الأولى,سفاري دفع رباعي,هايكنج VIP,عشاء تحت النجوم', featured: true,
      summary: 'الواجهة الأبرز لرحلاتنا الحالية: سفاري بسيارات الدفع الرباعي الفاخرة، هايكنج احترافي لمطل حافة العالم، وتخييم ملكي مع عشاء نجدي فاخر.',
      itin: [['الانطلاق وسفاري الدفع الرباعي', 'التجمع والانطلاق بسيارات الدفع الرباعي الفاخرة عبر المسار الصحراوي وصولاً لقاعدة جبال طويق.'], ['مسار الهايكنج واستكشاف حافة العالم', 'خوض مسار هايكنج آمن بصحبة المرشدين المعتمدين للوصول إلى قمة المطل الخيالي فوق السحاب.'], ['غروب الشمس والتخييم الملكي والعشاء', 'جلسة استرخاء وتناول القهوة السعودية عند لحظة الغروب تليها ليلة تخييم وعشاء شواء نجدي فاخر تحت أضواء النجوم.']] as [string, string][] },
    { slug: 'alula-stars-heritage', title: 'رحلة نجوم العلا التراثية الفاخرة', titleEn: 'AlUla Stars Heritage Journey', dest: 'alula', category: 'LUXURY' as const, price: 14500, days: 5, nights: 4, rating: 5, cover: '/images/pkg-1.jpg', badges: 'فيلا 5 نجوم,طيران خاص مشمول', featured: true,
      summary: 'إقامة فاخرة وسحر مدائن صالح مع عشاء تحت النجوم ورحلة منطاد.',
      itin: [['جولة العلا', 'استقبال خاص في المطار ونقل بسيارة رينج روفر إلى الفيلا، ثم جولة في البلدة القديمة.'], ['طيران خاص', 'رحلة جوية خاصة فوق التكوينات الصخرية الشهيرة وغداء في الصحراء.'], ['روافد العلا', 'زيارة مدائن صالح مع مرشد تاريخي خاص وتجارب ثقافية حصرية.'], ['فيلا 5 نجوم', 'يوم استجمام كامل في جناح السبا وعشاء تحت النجوم.'], ['العلا', 'رحلة منطاد عند الشروق ثم وداع وتوصيل إلى المطار.']] as [string, string][] },
    { slug: 'red-sea-water-villas', title: 'ملاذ البحر الأحمر: فلل مائية ويخوت', titleEn: 'Red Sea Water Villas & Yachts', dest: 'red-sea', category: 'VIP' as const, price: 22000, days: 6, nights: 5, rating: 5, cover: '/images/pkg-2.jpg', badges: 'فيلا فوق الماء,يخت خاص', featured: true,
      summary: 'بنغلات فوق الماء وتنقل بين الجزر على متن يخت خاص مع طاقم كامل.',
      itin: plan(['الوصول بالطائرة المائية', 'يوم الغوص والشعاب', 'رحلة اليخت الخاص', 'عشاء على شاطئ جزيرة', 'سبا فوق الماء', 'المغادرة']) },
    { slug: 'diriyah-kings-route', title: 'الدرعية والرياض: مسار الملوك', titleEn: "Diriyah & Riyadh: The Kings' Route", dest: 'diriyah', category: 'LUXURY' as const, price: 8900, days: 4, nights: 3, rating: 4.8, cover: '/images/pkg-3.jpg', badges: 'قصر تاريخي,عشاء فاخر', featured: true,
      summary: 'جولة في حي الطريف التاريخي وتجارب طعام راقية وسط الرياض.',
      itin: plan(['الوصول وجولة الرياض', 'حي الطريف التاريخي', 'تجربة الطهي السعودي الفاخر', 'التسوق والمغادرة']) },
    { slug: 'asir-clouds-peaks', title: 'عسير وأبها: قمم السحاب', titleEn: 'Asir & Abha: Peaks of Clouds', dest: 'asir', category: 'LUXURY' as const, price: 7500, days: 4, nights: 3, rating: 4.7, cover: '/images/pkg-4.jpg', badges: 'منتجع جبلي,تلفريك خاص', featured: false,
      summary: 'ضباب الجبال والقرى التراثية وإقامة في منتجع على القمة.',
      itin: plan(['الوصول إلى أبها', 'قرية رجال ألمع', 'جولة التلفريك والسحاب', 'المغادرة']) },
    { slug: 'royal-umrah-vip', title: 'عمرة ملكية VIP', titleEn: 'Royal VIP Umrah', dest: 'makkah', category: 'UMRAH' as const, price: 11900, days: 5, nights: 4, rating: 5, cover: '/images/pkg-5.jpg', badges: 'إقامة قرب الحرم,مرافق خاص', featured: false,
      summary: 'عمرة بخدمات كبار الشخصيات مع إقامة فاخرة ومرشد ديني خاص.',
      itin: plan(['الوصول والانتقال إلى مكة', 'أداء العمرة بمرافقة خاصة', 'زيارة المعالم', 'المدينة المنورة', 'المغادرة']) },
    { slug: 'alula-desert-camp', title: 'مخيم العلا الصحراوي الفاخر', titleEn: 'AlUla Luxury Desert Camp', dest: 'alula', category: 'DESERT' as const, price: 9800, days: 3, nights: 2, rating: 4.9, cover: '/images/pkg-6.jpg', badges: 'تخييم فاخر,سماء النجوم', featured: false,
      summary: 'خيام ملكية في قلب الصحراء مع عشاء بدوي وسفاري خاص.',
      itin: plan(['الوصول إلى المخيم', 'سفاري وليلة النجوم', 'الشروق والمغادرة']) },
  ];

  const inclusions = ['طيران خاص أو درجة أولى', 'إقامة في فيلا 5 نجوم', 'سيارة رينج روفر خاصة بسائق', 'جناح سبا خاص', 'عشاء تحت النجوم', 'مرشد تاريخي خاص', 'كونسيرج VIP على مدار الساعة'];

  for (const p of pkgs) {
    await prisma.package.create({
      data: {
        slug: p.slug, title: p.title, titleEn: p.titleEn, summary: p.summary,
        description: `${p.summary} نصمم كل تفصيل في رحلتك بعناية فائقة، من لحظة الاستقبال حتى الوداع، لتعيش تجربة سعودية لا تُنسى بأعلى معايير الفخامة والخصوصية.`,
        destinationId: idOf[p.dest], category: p.category, priceSar: p.price, days: p.days, nights: p.nights,
        rating: p.rating, coverImage: p.cover, badges: p.badges, isFeatured: p.featured,
        images: { create: [1, 2, 3, 4].map((n, i) => ({ url: `/images/gallery-${n}.jpg`, sortOrder: i })) },
        inclusions: { create: inclusions.map((text, i) => ({ text, sortOrder: i })) },
        itinerary: { create: p.itin.map(([title, description], i) => ({ dayNumber: i + 1, title, description })) },
      },
    });
  }

  await prisma.review.createMany({
    data: [
      { name: 'عبدالله القحطاني', location: 'الرياض', rating: 5, comment: 'تجربة تفوق الخيال. الفيلا في العلا والعشاء تحت النجوم كانا من أجمل لحظات حياتي، وخدمة الكونسيرج كانت بلا أي تقصير.' },
      { name: 'Sarah Whitfield', location: 'London', rating: 5, comment: 'Impeccable service from the first call to the last farewell. The yacht days in the Red Sea were pure magic.' },
      { name: 'نورة العتيبي', location: 'جدة', rating: 5, comment: 'تنظيم راقٍ واهتمام بأدق التفاصيل. أنصح بها لكل من يبحث عن رحلة عائلية فاخرة وخاصة.' },
      { name: 'خالد الشمري', location: 'الدمام', rating: 4, comment: 'عمرة ملكية بكل معنى الكلمة؛ راحة وطمأنينة وخدمة محترفة من أول لحظة.' },
    ],
  });

  console.log('✔ Database seeded');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
