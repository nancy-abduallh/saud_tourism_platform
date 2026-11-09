export default function Marquee({ items }: { items: string[] }) {
  const half = [...items, ...items, ...items];
  const row = [...half, ...half];
  return (
    <div dir="ltr" className="overflow-hidden border-y border-gold-500/20 bg-navy-950 py-4">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-bold text-gold-300/90">
            {t} <span className="text-gold-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
