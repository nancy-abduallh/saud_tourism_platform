export const formatPrice = (n: number) => `${n.toLocaleString('en-US')} ر.س`;
export const VIP_ADDON_PRICE = 2500;
export const splitBadges = (b?: string | null) => (b ? b.split(',').map((s) => s.trim()).filter(Boolean) : []);
