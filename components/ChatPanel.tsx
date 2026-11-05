'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefs } from '@/components/Prefs';
import { buildDocs, makeIndex, snippet, norm } from '@/lib/search';
import { site } from '@/lib/site';

type Msg = { who: 'me' | 'bot'; text: string; links?: { title: string; href: string }[] };

const UI = {
  en: {
    title: 'Ask my portfolio', sub: 'Answers come only from this site’s content, with no AI and no tracking.',
    hello: 'Hi! Ask me about Nacho’s work, how he leads, or how he uses AI.',
    ph: 'e.g. What did he do on SOFIA?', send: 'Ask', more: 'Read more', related: 'Related',
    miss: 'I couldn’t find that on this site. Try asking about SOFIA, the cart, Travel Mode, leadership or AI, or just email Nacho at ',
    pending: 'Nacho is still writing up this part (marked [COMPLETAR] on the site).',
    partial: '([COMPLETAR] = details Nacho is still confirming.)',
    sugg: ['What did he do on SOFIA?', 'How does he lead a team?', 'How does he use AI?', 'Why not pre-select add-ons?', 'How can I contact him?'],
  },
  es: {
    title: 'Preguntale a mi portfolio', sub: 'Las respuestas salen solo del contenido de este sitio, sin IA y sin tracking.',
    hello: '¡Hola! Preguntame por el trabajo de Nacho, cómo lidera o cómo usa la IA.',
    ph: 'p. ej. ¿Qué hizo en SOFIA?', send: 'Preguntar', more: 'Leer más', related: 'Relacionado',
    miss: 'No encontré eso en este sitio. Probá preguntar por SOFIA, el carrito, Modo Viaje, liderazgo o IA, o escribile a Nacho a ',
    pending: 'Nacho todavía está escribiendo esta parte (marcada como [COMPLETAR] en el sitio).',
    partial: '([COMPLETAR] = detalles que Nacho todavía está confirmando.)',
    sugg: ['¿Qué hizo en SOFIA?', '¿Cómo lidera un equipo?', '¿Cómo usa la IA?', '¿Por qué no preseleccionar add-ons?', '¿Cómo lo contacto?'],
  },
};

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const { lang } = usePrefs();
  const ui = UI[lang];
  const search = useMemo(() => makeIndex(buildDocs(lang)), [lang]);
  const [msgs, setMsgs] = useState<Msg[]>([{ who: 'bot', text: ui.hello }]);
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => { input.current?.focus(); }, []);
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight }); }, [msgs]);

  const ask = (text: string) => {
    const t = text.trim();
    if (!t) return;
    let ans: Msg;
    if (/\b(contact|contacto|contactar|email|mail|hire|contratar|reach|escribir|linkedin)\b/.test(norm(t))) {
      ans = { who: 'bot', text: lang === 'es' ? `El camino más rápido es por mail: ${site.email}. También está en X (@niachito) y LinkedIn.` : `Fastest is email: ${site.email}. He’s also on X (@niachito) and LinkedIn.`, links: [{ title: lang === 'es' ? 'Contacto' : 'Contact', href: '/#contact' }] };
    } else {
      const res = search(t);
      if (!res.length) ans = { who: 'bot', text: `${ui.miss}${site.email}.` };
      else {
        const top = res[0];
        let body = snippet(top.d.text, top.q);
        if (!body || /^\[COMPLETAR\]\.?$/.test(body)) body = ui.pending;
        else if (body.includes('[COMPLETAR]')) body += ` ${ui.partial}`;
        // Related: prefer other pages/sections first, then other parts of the same page.
        const base = (h: string) => h.split('#')[0] + (h.startsWith('#') ? h : '');
        const others = res.slice(1).filter((r) => base(r.d.href) !== base(top.d.href));
        const same = res.slice(1).filter((r) => base(r.d.href) === base(top.d.href));
        const seen = new Set<string>([base(top.d.href)]);
        const rel = [...others.filter((r) => { const b = base(r.d.href); if (seen.has(b)) return false; seen.add(b); return true; }), ...same].slice(0, 2);
        const fix = (h: string) => (h.startsWith('#') ? `/${h}` : h);
        ans = { who: 'bot', text: body, links: [{ title: `${ui.more}: ${top.d.title}`, href: fix(top.d.href) }, ...rel.map((r) => ({ title: r.d.title, href: fix(r.d.href) }))] };
      }
    }
    setMsgs((m) => [...m, { who: 'me', text: t }, ans]);
    setQ('');
  };

  return (
    <div id="ask-panel" role="dialog" aria-modal="false" aria-labelledby="ask-title"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      className="rise fixed bottom-20 right-3 z-50 flex max-h-[min(640px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-black/30">
      <div className="border-b border-line px-4 py-3">
        <h2 id="ask-title" className="font-semibold">{ui.title}</h2>
        <p className="text-xs text-muted">{ui.sub}</p>
      </div>
      <div ref={list} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-relevant="additions">
        {msgs.map((m, i) => (
          <div key={i} className={m.who === 'me' ? 'ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-fg px-3.5 py-2 text-sm text-bg' : 'max-w-[92%] text-sm leading-relaxed'}>
            {m.who === 'me' ? <span className="sr-only">{lang === 'es' ? 'Vos: ' : 'You: '}</span> : null}
            <p>{m.text}</p>
            {m.links?.length ? (
              <ul className="mt-2 space-y-1">
                {m.links.map((l, j) => (
                  <li key={j}><a href={l.href} onClick={() => l.href.startsWith('/#') && location.pathname === '/' && onClose()} className="text-accent underline underline-offset-2">{j === 0 ? l.title : `${ui.related}: ${l.title}`} →</a></li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        {msgs.length === 1 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {ui.sugg.map((s) => (
              <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-line px-3 py-1.5 text-xs text-fg hover:border-fg/50">{s}</button>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="flex gap-2 border-t border-line p-3">
        <label htmlFor="ask-input" className="sr-only">{ui.ph}</label>
        <input id="ask-input" ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={ui.ph} autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 py-2 text-sm placeholder:text-muted" />
        <button type="submit" className="rounded-xl bg-accent px-3.5 py-2 text-sm font-semibold text-accent-fg">{ui.send}</button>
      </form>
    </div>
  );
}
