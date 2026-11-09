'use client';
import { useEffect, useRef, useState } from 'react';

export function Img({ src, alt, className = '', priority = false }: { src?: string | null; alt: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !src) {
    return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-navy-700 via-navy-800 to-gold-600/60 ${className}`} />;
  }
  return <img ref={ref} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} onError={() => setFailed(true)} className={className} />;
}
