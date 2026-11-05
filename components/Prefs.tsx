'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Depth, Lang } from '@/lib/types';

type Theme = 'light' | 'dark';
type Prefs = {
  lang: Lang; setLang: (l: Lang) => void;
  depth: Depth; setDepth: (d: Depth) => void;
  theme: Theme; setTheme: (t: Theme) => void;
};
const Ctx = createContext<Prefs | null>(null);

/** Runs in <head> before first paint so there is no language/theme/depth flash. */
export const prefsScript = `(function(){try{var d=document.documentElement,s=localStorage,q=new URLSearchParams(location.search);
var l=q.get('lang')||s.getItem('lang')||((navigator.language||'').toLowerCase().indexOf('es')===0?'es':'en');if(l!=='es')l='en';
var m=q.get('mode')||s.getItem('depth')||'5';if(['30','5','20'].indexOf(m)<0)m='5';
var t=s.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
d.dataset.lang=l;d.lang=l==='es'?'es-AR':'en';d.dataset.depth=m;d.dataset.theme=t;}catch(e){}})();`;

function attr<T extends string>(name: string, fallback: T): T {
  if (typeof document === 'undefined') return fallback;
  return ((document.documentElement.dataset as Record<string, string>)[name] as T) || fallback;
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangS] = useState<Lang>('en');
  const [depth, setDepthS] = useState<Depth>('5');
  const [theme, setThemeS] = useState<Theme>('dark');

  useEffect(() => {
    setLangS(attr('lang', 'en'));
    setDepthS(attr('depth', '5'));
    setThemeS(attr('theme', 'dark'));
  }, []);

  const setLang = useCallback((l: Lang) => {
    const d = document.documentElement;
    d.dataset.lang = l; d.lang = l === 'es' ? 'es-AR' : 'en';
    localStorage.setItem('lang', l); setLangS(l);
  }, []);
  const setDepth = useCallback((m: Depth) => {
    document.documentElement.dataset.depth = m;
    localStorage.setItem('depth', m); setDepthS(m);
  }, []);
  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem('theme', t); setThemeS(t);
  }, []);

  return <Ctx.Provider value={{ lang, setLang, depth, setDepth, theme, setTheme }}>{children}</Ctx.Provider>;
}

export function usePrefs() {
  const c = useContext(Ctx);
  if (!c) throw new Error('usePrefs outside provider');
  return c;
}
