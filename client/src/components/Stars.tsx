import { Star } from 'lucide-react';
import clsx from 'clsx';

export function Stars({ rating, size = 14, className }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={clsx('inline-flex gap-0.5', className)} aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < Math.round(rating) ? 'fill-gold-400 text-gold-400' : 'text-gold-400/30'} />
      ))}
    </span>
  );
}
