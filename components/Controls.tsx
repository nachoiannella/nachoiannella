'use client';
import { usePrefs } from '@/components/Prefs';
import { modes } from '@/content/home';
import type { Depth } from '@/lib/types';
import { T } from '@/components/T';

export function LangToggle() {
  const { lang, setLang } = usePrefs();
  return (
    <div role="group" aria-label={lang === 'es' ? 'Idioma' : 'Language'} className="flex rounded-full border border-line p-0.5 font-mono text-xs">
      {(['en', 'es'] as const).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} lang={l}
          className={`min-h-8 min-w-9 rounded-full px-2.5 uppercase transition-colors ${lang === l ? 'bg-fg text-bg' : 'text-muted hover:text-fg'}`}>
          {l}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme, lang } = usePrefs();
  const next = theme === 'dark' ? 'light' : 'dark';
  const label = lang === 'es' ? (next === 'dark' ? 'Activar modo oscuro' : 'Activar modo claro') : `Switch to ${next} mode`;
  return (
    <button type="button" onClick={() => setTheme(next)} aria-label={label} title={label}
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg">
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      )}
    </button>
  );
}

export function DepthSwitch({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const { depth, setDepth, lang } = usePrefs();
  const lg = size === 'lg';
  return (
    <div role="radiogroup" aria-label={modes.label[lang]}
      className={`inline-flex rounded-full border border-line bg-card/70 p-1 backdrop-blur ${lg ? '' : 'text-xs'}`}
      onKeyDown={(e) => {
        const order: Depth[] = ['30', '5', '20'];
        const i = order.indexOf(depth);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const n = order[(i + 1) % 3]; setDepth(n); (e.currentTarget.querySelector(`[data-v="${n}"]`) as HTMLElement)?.focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const n = order[(i + 2) % 3]; setDepth(n); (e.currentTarget.querySelector(`[data-v="${n}"]`) as HTMLElement)?.focus(); }
      }}>
      {modes.options.map((o) => {
        const on = depth === o.v;
        return (
          <button key={o.v} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1} data-v={o.v}
            onClick={() => setDepth(o.v as Depth)}
            className={`rounded-full font-medium transition-all ${lg ? 'px-4 py-2 text-sm sm:px-5' : 'px-3 py-1.5'} ${on ? 'bg-accent text-accent-fg shadow-sm' : 'text-muted hover:text-fg'}`}>
            <span className="font-mono"><T t={o.label} /></span>
            {lg ? <span className={`ml-2 hidden sm:inline ${on ? 'opacity-90' : 'opacity-70'}`}><T t={o.hint} /></span> : null}
          </button>
        );
      })}
    </div>
  );
}
