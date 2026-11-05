import { Fragment, type ReactNode } from 'react';
import type { L } from '@/lib/types';

/**
 * Renders inline rich text. Supports:
 *   "{{" + "todo:id|text}}"   -> visible [COMPLETAR: text] placeholder
 *   "{{" + "todo!:id|text}}"  -> same, flagged as possibly under NDA
 *   **bold**
 */
export function rich(s: string): ReactNode {
  const parts = s.split(/(\{\{todo!?:[^}]+\}\}|\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    const m = p.match(/^\{\{todo(!?):([^|]+)\|([^}]+)\}\}$/);
    if (m) return <Todo key={i} id={m[2]} nda={m[1] === '!'}>{m[3]}</Todo>;
    const b = p.match(/^\*\*([^*]+)\*\*$/);
    if (b) return <strong key={i} className="font-semibold text-fg">{b[1]}</strong>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

export function Todo({ children, nda, id }: { children: ReactNode; nda?: boolean; id?: string }) {
  return (
    <span className={`todo${nda ? ' todo-nda' : ''}`} data-todo={id}>
      [COMPLETAR: {children}]
    </span>
  );
}

/** Inline bilingual text. Both languages are in the DOM; CSS shows the active one. */
export function T({ t, en, es }: { t?: L; en?: string; es?: string }) {
  const e = t?.en ?? en ?? '';
  const s = t?.es ?? es ?? '';
  return (
    <>
      <span data-l="en" lang="en">{rich(e)}</span>
      <span data-l="es" lang="es-AR">{rich(s)}</span>
    </>
  );
}

/** Block-level bilingual wrapper. */
export function Lb({ lang, children, className, as: As = 'div' }: { lang: 'en' | 'es'; children: ReactNode; className?: string; as?: 'div' | 'section' | 'article' }) {
  return <As data-l={lang} lang={lang === 'es' ? 'es-AR' : 'en'} className={className}>{children}</As>;
}

/** Plain-text version (for chat index, aria labels). */
export function plain(s: string) {
  return s.replace(/\{\{todo!?:[^|]+\|([^}]+)\}\}/g, '[COMPLETAR]').replace(/\*\*([^*]+)\*\*/g, '$1');
}
