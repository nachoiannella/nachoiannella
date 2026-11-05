/**
 * "Ask my portfolio" — client-side retrieval, no API key, no embeddings.
 * BM25 over chunks of the site's own content + small bilingual synonym map.
 */
import idx from '@/generated/cases-index.json';
import { ai, contact, experience, lead, prototype, tldr, pogo, work, hero } from '@/content/home';
import { WHY } from '@/content/prototype';
import { cases } from '@/lib/cases';
import { plain } from '@/components/T';
import { site } from '@/lib/site';
import type { Lang } from '@/lib/types';

export type Doc = { title: string; href: string; text: string; kw?: string };

const STOP = new Set(('a an the and or of to in on for with at by from is are was were be been it its this that what which who how why when where do does did i me my you your he his him she her they we our us can could would should about as into than then there here not no yes so if just also more most very ' +
  'el la los las un una unos unas y o de del al en con por para es son fue era ser lo le les su sus se que qué como cómo cuál cual quien quién donde dónde cuando cuándo porque por qué mi mis tu tus vos te nos ya muy mas más también hay sobre').split(' '));

const SYN: Record<string, string[]> = {
  ai: ['ia', 'sofia', 'v0', 'agent', 'agente', 'generative', 'generativa', 'brot'], ia: ['ai', 'sofia', 'v0', 'agente', 'generativa', 'brot'],
  lead: ['leadership', 'liderazgo', 'team', 'equipo', 'manager', 'lidero'], leadership: ['lead', 'liderazgo', 'team', 'equipo'], liderazgo: ['leadership', 'lidero', 'equipo'], lidera: ['lidero', 'liderazgo', 'equipo'], manage: ['lead', 'team', 'manager'],
  team: ['equipo', 'designer', 'disenadore'], equipo: ['team'],
  cart: ['carrito', 'checkout', 'cross', 'sell'], carrito: ['cart', 'checkout'], checkout: ['cart', 'carrito'], xsell: ['cross', 'sell'], crosssell: ['cross', 'sell'],
  travel: ['viaje'], viaje: ['travel', 'trip'], mode: ['modo'], modo: ['mode'], offline: ['voucher'],
  hire: ['contact', 'email', 'contacto'], contratar: ['contacto', 'email', 'contact'], contact: ['email', 'contacto', 'linkedin'], email: ['mail', 'contact'], mail: ['email'],
  prototype: ['prototipo', 'v0', 'playable'], prototipo: ['prototype', 'v0'], experience: ['experiencia', 'mercado', 'galicia'], experiencia: ['experience'],
  metric: ['metrica', 'impact', 'impacto', 'outcome', 'resultado', 'conversion'], metrics: ['metrica', 'impact', 'outcome'], impact: ['impacto', 'outcome', 'resultado'], resultado: ['outcome', 'impacto'],
  meli: ['mercado', 'libre'], side: ['pogo', 'brot', 'proyecto'], proyecto: ['pogo', 'brot'], project: ['pogo', 'brot'], recital: ['pogo', 'show'], concert: ['pogo', 'show', 'recital'], music: ['pogo', 'recital', 'show'], musica: ['pogo', 'recital'], building: ['pogo', 'construyendo'], bank: ['galicia', 'banco'], banco: ['galicia'],
};

export function norm(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function stem(w: string) {
  if (w.length > 5 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1);
  return w;
}
export function tokens(s: string) {
  return norm(s).split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w)).map(stem);
}

export function buildDocs(lang: Lang): Doc[] {
  const L = <T extends { en: string; es: string }>(x: T) => plain(x[lang]);
  const docs: Doc[] = [];
  docs.push({ title: lang === 'es' ? 'Quién es Nacho' : 'Who Nacho is', href: '#top', text: `${L(hero.h1a)} ${L(hero.h1b)} ${L(hero.sub)}` });
  docs.push({ title: L(tldr.title), href: '#tldr', text: tldr.items.map(L).join(' ') });
  experience.items.forEach((e) => docs.push({ title: `${typeof e.org === 'string' ? e.org : L(e.org)} · ${e.when}`, href: '#experience', text: `${L(e.role)}. ${L(e.note)}` }));
  docs.push({ title: L(work.title), href: '#work', text: L(work.intro) });
  cases.forEach((c) => docs.push({ title: L(c.title), href: `/work/${c.slug}/`, text: `${L(c.dek)} ${L(c.role)}. ${c.highlights.map(L).join(' ')}` }));
  docs.push({ title: L(prototype.title), href: '#prototype', text: `${L(prototype.intro)} ${Object.values(WHY).map((w) => L(w.t)).join(' ')}` });
  docs.push({ title: L(lead.title), href: '#lead', text: `${L(lead.intro)} ${L(lead.team)} ${lead.principles.map((p) => `${L(p.t)}: ${L(p.d)}`).join(' ')} ${L(lead.more)}` });
  docs.push({ title: `${L(ai.eyebrow)} · ${L(ai.title)}`, href: '#ai', text: `${L(ai.intro)} ${ai.items.map((a) => `${L(a.t)}: ${L(a.d).split(/(?<=\.)\s/)[0]}`).join(' ')}` });
  ai.items.forEach((a) => docs.push({ title: `${L(ai.eyebrow)} · ${L(a.t)}`, href: '#ai', text: `${L(a.t)}. ${L(a.d)}` }));
  docs.push({ title: L(pogo.title), href: '#building', kw: 'pogo side project proyecto propio', text: `${L(pogo.eyebrow)}. ${L(pogo.intro)} ${pogo.points.map(L).join(' ')}` });
  docs.push({ title: L(contact.eyebrow), href: '#contact', text: `${L(contact.title)} ${L(contact.sub)} Email: ${site.email}. X: @niachito. LinkedIn: linkedin.com/in/nachoiannella. GitHub: nachoiannella. Medium: @NachoAzulgrana.` });
  for (const ch of (idx as { chunks: { slug: string; lang: string; heading: string; id: string; text: string }[] }).chunks) {
    if (ch.lang !== lang) continue;
    const c = cases.find((x) => x.slug === ch.slug)!;
    docs.push({ title: `${L(c.title)} · ${ch.heading}`, href: `/work/${ch.slug}/#${ch.id}`, text: ch.text });
  }
  return docs;
}

export function makeIndex(docs: Doc[]) {
  const toks = docs.map((d) => [...tokens(d.title), ...tokens(d.title), ...tokens(d.kw ?? ''), ...tokens(d.text)]);
  const df = new Map<string, number>();
  toks.forEach((t) => new Set(t).forEach((w) => df.set(w, (df.get(w) || 0) + 1)));
  const avg = toks.reduce((a, t) => a + t.length, 0) / toks.length;
  const N = docs.length;
  return (q: string) => {
    const base = tokens(q);
    const qs = new Map<string, number>();
    base.forEach((w) => { qs.set(w, 1); (SYN[w] || []).forEach((s) => qs.set(stem(s), Math.max(qs.get(stem(s)) || 0, 0.5))); });
    const qn = norm(q);
    return docs
      .map((d, i) => {
        const tf = new Map<string, number>();
        toks[i].forEach((w) => tf.set(w, (tf.get(w) || 0) + 1));
        let s = 0;
        qs.forEach((wt, w) => {
          const f = tf.get(w); if (!f) return;
          const idf = Math.log(1 + (N - (df.get(w) || 0) + 0.5) / ((df.get(w) || 0) + 0.5));
          s += wt * idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (toks[i].length / avg))));
        });
        if (norm(d.title).split(/\W+/).some((w) => w.length > 3 && qn.includes(w))) s *= 1.25;
        if (/^\[COMPLETAR\]$/.test(d.text.trim())) s *= 0.2;
        return { d, s, q: base };
      })
      .filter((r) => r.s > 0.9)
      .sort((a, b) => b.s - a.s);
  };
}

/** Pick the most relevant sentences of a chunk for the answer. */
export function snippet(text: string, q: string[], max = 2) {
  const ABBR = /\b(Sr|Sra|Dr|p\. ej|e\.g|i\.e|art|dic|sep|mar|ene|feb|abr|jun|jul|ago|oct|nov|Mr|Ms|vs)\./gi;
  const safe = text.replace(/\n/g, ' ').replace(ABBR, (m) => m.replace(/\./g, '\u2024'));
  const sents = safe.split(/(?<=[.!?])\s+(?=[A-Z\u00C0-\u00DD¿¡“"(•\[0-9])/).map((x) => x.replace(/\u2024/g, '.')).filter((s) => s.trim().length > 2);
  const scored = sents.map((s, i) => {
    const t = new Set(tokens(s));
    let sc = q.reduce((a, w) => a + (t.has(w) ? 1 : 0), 0) - i * 0.01;
    if (s.includes('[COMPLETAR]')) sc -= 2;
    return { s, sc, i };
  });
  const top = scored.sort((a, b) => b.sc - a.sc).slice(0, max).sort((a, b) => a.i - b.i).map((x) => x.s.trim());
  return top.join(' ');
}
