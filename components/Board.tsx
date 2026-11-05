'use client';
import { useEffect, useState } from 'react';
import { board } from '@/content/home';
import { T } from '@/components/T';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const STATUS = {
  shipped: { en: 'SHIPPED', es: 'LANZADO', cls: 'text-[#7ee2a8]' },
  live: { en: 'IN PROD', es: 'EN PROD', cls: 'text-[#ffb020]' },
  proto: { en: 'PROTOTYPE', es: 'PROTOTIPO', cls: 'text-[#c4b5fd]' },
  building: { en: 'BUILDING', es: 'EN OBRA', cls: 'text-[#7dd3fc]' },
} as const;

/** Split-flap text: scrambles then settles. Static when reduced motion is on. */
function Flap({ text, delay }: { text: string; delay: number }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0, raf = 0, start = 0;
    const total = 16 + text.length * 2;
    const tick = (t: number) => {
      if (!start) start = t;
      if (t - start < delay) { raf = requestAnimationFrame(tick); return; }
      frame++;
      setOut(text.split('').map((c, i) => (c === ' ' || frame > 10 + i * 2 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''));
      if (frame < total) raf = requestAnimationFrame(tick); else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay]);
  return <span aria-hidden="true">{out}</span>;
}

export function Board() {
  return (
    <figure className="rise relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0a] text-[#f3f1ea] shadow-2xl shadow-black/20" style={{ animationDelay: '.25s' }}>
      <figcaption className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#b8b3a6]">
        <span><T en="Departures · EZE" es="Partidas · EZE" /></span>
        <span className="flex items-center gap-2"><span className="pulse-dot inline-block size-1.5 rounded-full bg-[#ffb020]" aria-hidden="true" /><T en="Live" es="En vivo" /></span>
      </figcaption>
      <table className="w-full font-mono text-[13px] sm:text-sm">
        <caption className="sr-only"><T en="Products I have worked on and their status" es="Productos en los que trabajé y su estado" /></caption>
        <thead className="text-[10px] uppercase tracking-[0.18em] text-[#9a958a]">
          <tr>
            <th scope="col" className="px-5 pb-1 pt-3 text-left font-normal"><T en="Flight" es="Vuelo" /></th>
            <th scope="col" className="hidden px-2 pb-1 pt-3 text-left font-normal sm:table-cell"><T en="Product" es="Producto" /></th>
            <th scope="col" className="px-2 pb-1 pt-3 text-left font-normal"><T en="Year" es="Año" /></th>
            <th scope="col" className="px-5 pb-1 pt-3 text-right font-normal"><T en="Status" es="Estado" /></th>
          </tr>
        </thead>
        <tbody>
          {board.map((r, i) => {
            const st = STATUS[r.status];
            return (
              <tr key={r.code} className="border-t border-white/[0.06]">
                <td className="whitespace-nowrap px-5 py-3 font-semibold tracking-wider">
                  <span className="sr-only">{r.code}</span><Flap text={r.code} delay={350 + i * 140} />
                </td>
                <td className="hidden px-2 py-3 text-[#b8b3a6] sm:table-cell"><T t={r.what} /></td>
                <td className="px-2 py-3 text-[#b8b3a6]">{r.year}</td>
                <td className={`px-5 py-3 text-right font-semibold tracking-wider ${st.cls}`}>
                  <T en={st.en} es={st.es} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-t border-white/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a958a]">
        <T en="Before the trip · Buying it · During it" es="Antes del viaje · Al comprarlo · Durante" />
      </div>
    </figure>
  );
}
