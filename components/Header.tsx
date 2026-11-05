import Link from 'next/link';
import { nav } from '@/content/home';
import { T } from '@/components/T';
import { DepthSwitch, LangToggle, ThemeToggle } from '@/components/Controls';

export function Header({ home = true }: { home?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg">
        <T en="Skip to content" es="Saltar al contenido" />
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          nacho<span className="text-accent">.</span>iannella
        </Link>
        <nav aria-label="Primary" className="ml-4 hidden lg:block">
          <ul className="flex gap-1 text-sm">
            {nav.map((n) => (
              <li key={n.href} data-min={n.min === '5' ? '5' : undefined}>
                <a href={home ? n.href : `/${n.href}`} className="rounded-full px-3 py-2 text-muted transition-colors hover:text-fg"><T t={n.label} /></a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {home ? <div className="hidden md:block"><DepthSwitch size="sm" /></div> : null}
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
