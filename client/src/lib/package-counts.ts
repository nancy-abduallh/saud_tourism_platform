import type { PackageDetail, PackageSummary } from './types';

/**
 * Counts the real number of packages for a specific city, branch, or destination slug.
 */
export function countPackagesForLocation(
  query: { name?: string; slug?: string; href?: string; city?: string },
  packages?: (PackageSummary | PackageDetail)[]
): number {
  if (!packages || packages.length === 0) return 0;

  // 1. Extract slug from href if present (e.g. /packages?destination=hail -> hail)
  const hrefSlug = query.href?.match(/destination=([^&]+)/)?.[1]?.toLowerCase().trim();
  const directSlug = query.slug?.toLowerCase().trim();
  const targetSlug = hrefSlug || directSlug;

  const rawName = (query.name || query.city || '').toLowerCase().trim();
  const cleanName = rawName
    .replace(/^فرع\s+/, '')
    .replace(/\s*\(.*?\)/g, '')
    .trim();

  // Keyword flags
  const isHail = cleanName.includes('حائل') || cleanName.includes('حايل') || targetSlug === 'hail';
  const isTabuk = cleanName.includes('تبوك') || targetSlug === 'tabuk';
  const isTaif = cleanName.includes('طائف') || cleanName.includes('طايف') || targetSlug === 'taif';
  const isQassim = cleanName.includes('قصيم') || cleanName.includes('بريدة') || cleanName.includes('عنيزة') || targetSlug === 'qassim';
  const isKharj = cleanName.includes('خرج') || targetSlug === 'kharj';
  const isJazan = cleanName.includes('جازان') || cleanName.includes('جيزان') || cleanName.includes('فرسان') || targetSlug === 'jazan';
  const isJeddah = cleanName.includes('جدة') || targetSlug === 'jeddah';
  const isAsir = cleanName.includes('عسير') || cleanName.includes('أبها') || cleanName.includes('ابها') || targetSlug === 'asir';
  const isAlUla = cleanName.includes('علا') || targetSlug === 'alula';
  const isRedSea = cleanName.includes('بحر') || targetSlug === 'red-sea';
  const isMadinah = cleanName.includes('مدينة') || targetSlug === 'madinah';
  const isMakkah = (cleanName.includes('مكة') && !cleanName.includes('مدينة')) || targetSlug === 'makkah';
  const isWestern = cleanName.includes('غربية');
  const isZulfi = cleanName.includes('زلفي') || targetSlug === 'zulfi';
  const isNajran = cleanName.includes('نجران') || targetSlug === 'najran';
  const isEastern = cleanName.includes('دمام') || cleanName.includes('شرقية') || cleanName.includes('أحساء') || cleanName.includes('احساء') || targetSlug === 'dammam';
  const isRiyadh = cleanName.includes('رياض') || cleanName.includes('طويق') || targetSlug === 'tuwaiq' || targetSlug === 'diriyah' || targetSlug === 'riyadh';

  const matches = packages.filter((pkg) => {
    const pkgSlug = (pkg.destination?.slug || '').toLowerCase().trim();
    const pkgDest = (pkg.destination?.name || '').toLowerCase().trim();
    const pkgTitle = (pkg.title || '').toLowerCase();
    const pkgDesc = (('description' in pkg && pkg.description ? pkg.description : '') || '').toLowerCase();
    const pkgSummary = (pkg.summary || '').toLowerCase();
    const pkgBadges = ((pkg.badges || '') as string).toLowerCase();

    // Direct slug match
    if (targetSlug && pkgSlug === targetSlug) return true;

    // Specific city matching
    if (isHail && (pkgSlug === 'hail' || pkgDest.includes('حائل') || pkgDest.includes('حايل') || pkgTitle.includes('حائل') || pkgTitle.includes('حايل'))) return true;
    if (isTabuk && (pkgSlug === 'tabuk' || pkgDest.includes('تبوك') || pkgTitle.includes('تبوك') || pkgTitle.includes('ديسة') || pkgTitle.includes('حقل'))) return true;
    if (isTaif && (pkgSlug === 'taif' || pkgDest.includes('طائف') || pkgTitle.includes('طائف') || pkgTitle.includes('هدا') || pkgTitle.includes('شفا'))) return true;
    if (isQassim && (pkgSlug === 'qassim' || pkgDest.includes('قصيم') || pkgTitle.includes('قصيم') || pkgTitle.includes('عنيزة') || pkgTitle.includes('بريدة'))) return true;
    if (isKharj && (pkgSlug === 'kharj' || pkgDest.includes('خرج') || pkgTitle.includes('خرج'))) return true;
    if (isJazan && (pkgSlug === 'jazan' || pkgDest.includes('جازان') || pkgDest.includes('جيزان') || pkgTitle.includes('جازان') || pkgTitle.includes('فرسان'))) return true;
    if (isJeddah && (pkgSlug === 'jeddah' || pkgDest.includes('جدة') || pkgTitle.includes('جدة') || pkgTitle.includes('عروس') || pkgTitle.includes('يخت'))) return true;
    if (isAsir && (pkgSlug === 'asir' || pkgDest.includes('عسير') || pkgDest.includes('أبها') || pkgTitle.includes('عسير') || pkgTitle.includes('أبها') || pkgTitle.includes('سودة'))) return true;
    if (isAlUla && (pkgSlug === 'alula' || pkgDest.includes('علا') || pkgTitle.includes('علا'))) return true;
    if (isRedSea && (pkgSlug === 'red-sea' || pkgDest.includes('بحر') || pkgTitle.includes('بحر') || pkgTitle.includes('جزر'))) return true;
    if (isMadinah && (pkgTitle.includes('مدينة') || pkgTitle.includes('روضة') || pkgDest.includes('مدينة') || pkgSummary.includes('مدينة') || pkgSummary.includes('روضة'))) return true;
    if (isMakkah && (pkgTitle.includes('مكة') || pkgTitle.includes('عمرة') || (pkgDest.includes('مكة') && !pkgTitle.includes('مدينة')))) return true;
    if (isWestern && (pkgSlug === 'jeddah' || pkgSlug === 'makkah' || pkgDest.includes('جدة') || pkgDest.includes('مكة'))) return true;
    if (isZulfi && (pkgDest.includes('زلفي') || pkgTitle.includes('زلفي'))) return true;
    if (isNajran && (pkgDest.includes('نجران') || pkgTitle.includes('نجران') || pkgDest.includes('أخدود'))) return true;
    if (isEastern && (pkgDest.includes('دمام') || pkgTitle.includes('دمام') || pkgDest.includes('أحساء') || pkgTitle.includes('أحساء'))) return true;
    if (isRiyadh && (pkgSlug === 'tuwaiq' || pkgSlug === 'diriyah' || pkgDest.includes('رياض') || pkgDest.includes('درعية') || pkgDest.includes('طويق') || pkgTitle.includes('رياض') || pkgTitle.includes('طويق') || pkgTitle.includes('درعية') || pkgTitle.includes('حافة العالم'))) return true;

    // Fallback general name search
    if (cleanName && cleanName.length > 2) {
      if (pkgDest.includes(cleanName) || pkgTitle.includes(cleanName) || pkgSummary.includes(cleanName) || pkgBadges.includes(cleanName)) {
        return true;
      }
    }

    return false;
  });

  return matches.length;
}

/**
 * Returns clean Arabic text for package counts.
 */
export function formatPackageCountArabic(count: number): string {
  if (count === 0) return 'باقات قادمة قريباً';
  if (count === 1) return '1 باقة وتجربة';
  if (count === 2) return '2 باقة وتجربة';
  if (count >= 3 && count <= 10) return `${count} باقات وتجارب`;
  return `${count} باقة وتجربة`;
}
