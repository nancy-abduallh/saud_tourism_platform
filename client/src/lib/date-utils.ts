/**
 * Safely parses any date string (ISO, UTC, or local datetime-local without timezone)
 * into a valid epoch timestamp (milliseconds).
 * 
 * In Saudi Arabia, official standard time is AST (UTC+3, no DST).
 * If a date string has no timezone offset (e.g. '2026-11-17T14:05'):
 * - On servers running in UTC (like Hostinger): a local input of '14:05'
 *   represents either Saudi Arabia Standard Time (UTC+3) or local browser time.
 * - We parse it with Saudi Arabia offset (+03:00) so that local times
 *   match the real-world event timeline across all client browsers and server instances.
 */
export function parseScheduledDate(dateStr?: string | null): number {
  if (!dateStr || typeof dateStr !== 'string') return NaN;
  const trimmed = dateStr.trim();
  if (!trimmed) return NaN;

  // Case 1: Already has explicit ISO timezone offset (Z, +HH:MM, or -HH:MM)
  if (trimmed.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(trimmed)) {
    const t = new Date(trimmed).getTime();
    if (!isNaN(t)) return t;
  }

  // Case 2: Standard datetime string without timezone (e.g. '2026-11-17T14:05' or '2026-11-17 14:05:00')
  // We normalize to Saudi Arabia Standard Time (UTC+3)
  const normalized = trimmed.includes('T') ? trimmed : trimmed.replace(' ', 'T');
  const withSeconds = normalized.length === 16 ? `${normalized}:00` : normalized;
  const saudiIso = `${withSeconds}+03:00`;
  const tSaudi = new Date(saudiIso).getTime();
  if (!isNaN(tSaudi)) return tSaudi;

  // Fallback to standard JS Date parsing
  return new Date(trimmed).getTime();
}

/**
 * Checks if the scheduled timeline has arrived or passed.
 */
export function isScheduledTimeReached(dateStr?: string | null): boolean {
  const targetTime = parseScheduledDate(dateStr);
  if (isNaN(targetTime)) return false;
  return Date.now() >= targetTime;
}
