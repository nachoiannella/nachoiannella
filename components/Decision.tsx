import type { ReactNode } from 'react';

export function Decision({ title, chose, over, children, lang = 'en' }: { title: string; chose: string; over: string; children?: ReactNode; lang?: 'en' | 'es' }) {
  const l = lang === 'es' ? { c: 'Elegimos', o: 'En lugar de', w: 'Por qué' } : { c: 'We chose', o: 'Over', w: 'Why' };
  return (
    <section className="not-prose my-8 overflow-hidden rounded-2xl border border-line bg-card">
      <h3 className="border-b border-line px-5 py-4 text-lg font-semibold tracking-tight">{title}</h3>
      <dl className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-card px-5 py-4">
          <dt className="font-mono text-xs uppercase tracking-wider text-ok">✓ {l.c}</dt>
          <dd className="mt-1.5 text-[0.98rem] leading-relaxed">{chose}</dd>
        </div>
        <div className="bg-card px-5 py-4">
          <dt className="font-mono text-xs uppercase tracking-wider text-muted">✕ {l.o}</dt>
          <dd className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">{over}</dd>
        </div>
      </dl>
      {children ? (
        <div className="border-t border-line px-5 py-4 text-[0.98rem] leading-relaxed">
          <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-accent">{l.w}</p>
          <div className="[&>p]:m-0">{children}</div>
        </div>
      ) : null}
    </section>
  );
}
