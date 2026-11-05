import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** Real photo of Nacho. Renders nothing if the files are missing (checked at build time). */
const has = (f: string) => existsSync(join(process.cwd(), 'public', f));
const ALT = {
  en: 'Nacho Iannella smiling, in a grey T-shirt, sitting in a wooden chair next to a microphone in Despegar’s podcast studio',
  es: 'Nacho Iannella sonriendo, con remera gris, sentado en una silla de madera junto a un micrófono en el estudio de podcast de Despegar',
};

export function Portrait({ lang = 'en', className = '' }: { lang?: 'en' | 'es'; className?: string }) {
  if (!has('nacho-640.webp')) return null;
  const set = (ext: string) => `/nacho-400.${ext} 400w, /nacho-640.${ext} 640w, /nacho-760.${ext} 760w`;
  const sizes = '(min-width: 1024px) 360px, (min-width: 640px) 320px, 70vw';
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/nacho.jpg" alt={ALT[lang]} width={640} height={800} loading="lazy" decoding="async"
        className={`h-full w-full object-cover [filter:saturate(.88)_contrast(1.04)] ${className}`} />
    </picture>
  );
}

export function Avatar({ size = 28 }: { size?: number }) {
  if (!has('nacho-avatar.webp')) return null;
  return (
    <picture>
      <source type="image/avif" srcSet="/nacho-avatar.avif" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/nacho-avatar.webp" alt="" width={size} height={size} decoding="async" fetchPriority="low"
        className="rounded-full object-cover ring-2 ring-accent ring-offset-2 ring-offset-bg" style={{ width: size, height: size }} />
    </picture>
  );
}

/** Framed portrait: rounded card, subtle grade, orange accent detail. */
export function PortraitCard({ caption }: { caption?: React.ReactNode }) {
  if (!has('nacho-640.webp')) return null;
  return (
    <figure className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]">
      <div aria-hidden="true" className="absolute -right-3 -top-3 h-24 w-24 rounded-tr-[28px] border-r-2 border-t-2 border-accent" />
      <div aria-hidden="true" className="absolute -bottom-3 -left-3 h-24 w-24 rounded-bl-[28px] border-b-2 border-l-2 border-accent/60" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-line bg-bg-2 shadow-2xl shadow-black/30">
        <span data-l="en"><Portrait lang="en" /></span>
        <span data-l="es"><Portrait lang="es" /></span>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        {caption ? <figcaption className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#f3f1ea]">{caption}</figcaption> : null}
      </div>
    </figure>
  );
}
