import Link from 'next/link';
import { T, Lb } from '@/components/T';
import { Board } from '@/components/Board';
import { DepthSwitch } from '@/components/Controls';
import { Prototype } from '@/components/Prototype';
import { CaseArt } from '@/components/Illustrations';
import { ai, contact, experience, hero, lead, modes, pogo, prototype, tldr, work } from '@/content/home';
import { Avatar, PortraitCard } from '@/components/Photo';
import { cases } from '@/lib/cases';
import { caseBodies } from '@/content/cases';
import { mdxComponentsFor } from '@/components/mdx';
import { site } from '@/lib/site';
import type { L } from '@/lib/types';

const Wrap = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>;

function SectionHead({ title, intro, id }: { title: L; intro?: L; id: string }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl"><T t={title} /></h2>
      {intro ? <p className="mt-5 text-pretty text-lg leading-relaxed text-muted"><T t={intro} /></p> : null}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <Wrap className="relative grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.45fr_1fr] lg:pb-24 lg:pt-28">
        <div>
          <p className="rise flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <Avatar size={30} />
            <span className="pulse-dot inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="whitespace-nowrap"><T t={hero.kicker} /></span><span aria-hidden="true">·</span><span className="whitespace-nowrap text-accent"><T t={hero.status} /></span>
          </p>
          <h1 id="hero-title" className="rise-y mt-6 text-balance text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold leading-[0.95] tracking-[-0.045em]" style={{ animationDelay: '.05s' }}>
            <span className="block text-muted"><T t={hero.h1a} /></span>
            <span className="block"><T t={hero.h1b} /></span>
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"><T t={hero.sub} /></p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '.18s' }}>
            <a href="#work" data-min="5" className="rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"><T t={hero.ctaWork} /> ↓</a>
            <a href="#tldr" data-only="30" className="rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-fg transition-transform hover:-translate-y-0.5">TL;DR ↓</a>
            <a href="#contact" className="rounded-full border border-line px-6 py-3.5 font-semibold transition-colors hover:border-fg"><T t={hero.ctaContact} /></a>
            <span className="ml-1 font-mono text-xs text-muted"><T t={hero.location} /></span>
          </div>
        </div>
        <Board />
      </Wrap>
      <Wrap className="relative pb-14">
        <div className="flex flex-col items-start gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p id="depth-label" className="text-sm text-muted"><T t={modes.label} /> <span className="font-mono text-xs">(<T en="the page adapts" es="la página se adapta" />)</span></p>
          <DepthSwitch />
        </div>
      </Wrap>
    </section>
  );
}

export function Tldr() {
  return (
    <section id="tldr" aria-labelledby="tldr-title" data-only="30" className="pb-20">
      <Wrap>
        <div className="rounded-3xl border border-line bg-card p-7 shadow-sm sm:p-10">
          <h2 id="tldr-title" className="text-3xl font-semibold tracking-tight"><T t={tldr.title} /></h2>
          <ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {tldr.items.map((it, i) => (
              <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed">
                <span className="mt-1 font-mono text-xs text-accent" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span><T t={it} /></span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted"><T t={tldr.more} /></p>
        </div>
      </Wrap>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" data-min="5" className="border-t border-line py-20">
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <h2 id="exp-title" className="text-3xl font-semibold tracking-tight"><T t={experience.title} /></h2>
        <ol className="divide-y divide-line border-y border-line">
          {experience.items.map((e, i) => (
            <li key={i} className="grid gap-1 py-5 sm:grid-cols-[120px_1fr] sm:gap-6">
              <span className="font-mono text-sm text-muted">{e.when}</span>
              <div>
                <p className="text-lg font-semibold">{typeof e.org === 'string' ? e.org : <T t={e.org} />} <span className="font-normal text-muted">· <T t={e.role} /></span></p>
                <p className="mt-1 leading-relaxed text-muted"><T t={e.note} /></p>
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" data-min="5" className="border-t border-line py-24">
      <Wrap>
        <SectionHead id="work-title" title={work.title} intro={work.intro} />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <li key={c.slug} className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
              <div className="h-48 border-b border-line bg-bg-2"><CaseArt slug={c.slug} accent={c.accent} /></div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex justify-between font-mono text-xs uppercase tracking-wider text-muted"><span>{c.index} · <T t={c.stage} /></span><span>{c.period}</span></p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                  <Link href={`/work/${c.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none"><T t={c.title} /></Link>
                </h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-muted"><T t={c.dek} /></p>
                <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm leading-relaxed">
                  {c.highlights.map((h, i) => <li key={i} className="flex gap-2"><span className="text-accent" aria-hidden="true">→</span><span><T t={h} /></span></li>)}
                </ul>
                <p className="mt-4 text-sm"><T t={c.outcome} /></p>
                <p className="mt-auto pt-5 text-sm font-semibold text-accent"><T t={work.readFull} /> →</p>
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
      {/* 20-minute mode: the full case studies, inline */}
      <div data-min="20" className="mt-20">
        {cases.map((c) => {
          const B = caseBodies[c.slug];
          return (
            <article key={c.slug} aria-labelledby={`full-${c.slug}`} className="border-t border-line py-16">
              <Wrap className="grid gap-10 lg:grid-cols-[1fr_2.2fr]">
                <header className="lg:sticky lg:top-24 lg:self-start">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent"><T t={work.fullBelow} /> · {c.index}</p>
                  <h3 id={`full-${c.slug}`} className="mt-2 text-3xl font-semibold leading-tight tracking-tight"><T t={c.title} /></h3>
                  <p className="mt-3 text-muted"><T t={c.role} /> · {c.period}</p>
                  <Link href={`/work/${c.slug}/`} className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-4"><T en="Open as a page" es="Abrir como página" /> →</Link>
                </header>
                <div className="prose-case max-w-[68ch]">
                  <Lb lang="en"><B.en components={mdxComponentsFor('en', `${c.slug}-`)} /></Lb>
                  <Lb lang="es"><B.es components={mdxComponentsFor('es', `${c.slug}-`)} /></Lb>
                </div>
              </Wrap>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function PrototypeSection() {
  return (
    <section id="prototype" aria-labelledby="proto-title" data-min="5" className="border-t border-line bg-bg-2/60 py-24">
      <Wrap>
        <SectionHead id="proto-title" title={prototype.title} intro={prototype.intro} />
        <div className="mt-12"><Prototype /></div>
        <p className="mt-6 font-mono text-xs text-muted"><T t={prototype.disclaimer} /></p>
      </Wrap>
    </section>
  );
}

export function Lead() {
  return (
    <section id="lead" aria-labelledby="lead-title" data-min="5" className="border-t border-line py-24">
      <Wrap>
        <SectionHead id="lead-title" title={lead.title} intro={lead.intro} />
        <p className="mt-8 max-w-3xl rounded-2xl border border-line bg-card p-5 leading-relaxed"><T t={lead.team} /></p>
        <ul className="mt-12 max-w-4xl divide-y divide-line border-y border-line">
          {lead.principles.map((p) => (
            <li key={p.k} className="grid gap-1 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-10">
              <h3 className="text-xl font-semibold tracking-tight"><T t={p.t} /></h3>
              <p className="leading-relaxed text-muted"><T t={p.d} /></p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted"><T t={lead.more} /> <a href="#contact" className="font-semibold text-accent underline underline-offset-4"><T en="Let’s talk" es="Hablemos" /> →</a></p>
      </Wrap>
    </section>
  );
}

export function AI() {
  return (
    <section id="ai" aria-labelledby="ai-title" data-min="5" className="border-t border-line bg-bg py-24 text-fg" data-theme="dark">
      <Wrap>
        <SectionHead id="ai-title" title={ai.title} intro={ai.intro} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ai.items.map((a, i) => (
            <li key={i} className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 ${a.tag === 'hardware' ? 'lg:col-span-2' : ''}`}>
              <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">{a.tag}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight"><T t={a.t} /></h3>
              <p className="mt-2 leading-relaxed text-muted"><T t={a.d} /></p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

export function Building() {
  const set = (ext: string) => `/pogo-800.${ext} 800w, /pogo-1280.${ext} 1280w`;
  const sizes = '(min-width: 1024px) 640px, 92vw';
  return (
    <section id="building" aria-labelledby="b-title" data-min="5" className="border-t border-line py-24">
      <Wrap className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <h2 id="b-title" className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl"><T t={pogo.title} /></h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted"><T t={pogo.intro} /></p>
          <ul className="mt-6 space-y-3">
            {pogo.points.map((p, i) => <li key={i} className="flex gap-3 leading-relaxed"><span className="text-accent" aria-hidden="true">→</span><span><T t={p} /></span></li>)}
          </ul>
          <a href="https://pogo.ar" target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 font-semibold text-bg transition-transform hover:-translate-y-0.5">
            <T t={pogo.cta} /> <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <a href="https://pogo.ar" target="_blank" rel="noopener" className="group block" tabIndex={-1} aria-hidden="true">
          <div className="overflow-hidden rounded-2xl border border-line bg-[#111] shadow-2xl shadow-black/30 transition-transform group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" /><span className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[11px] text-[#b8b3a6]">pogo.ar</span>
            </div>
            <picture>
              <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
              <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pogo.jpg" alt="" width={1280} height={800} loading="lazy" decoding="async" className="block h-auto w-full" />
            </picture>
          </div>
        </a>
        <p className="sr-only"><T t={pogo.alt} /></p>
      </Wrap>
    </section>
  );
}

export function Contact() {
  const links = [
    { href: `mailto:${site.email}`, label: site.email, k: 'Email' },
    { href: site.links.linkedin, label: 'in/nachoiannella', k: 'LinkedIn' },
    { href: site.links.x, label: '@niachito', k: 'X' },
    { href: site.links.github, label: 'nachoiannella', k: 'GitHub' },
    { href: site.links.medium, label: '@NachoAzulgrana', k: 'Medium' },
  ];
  return (
    <section id="contact" aria-labelledby="c-title" className="border-t border-line py-24">
      <Wrap className="grid items-center gap-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
        <h2 id="c-title" className="max-w-4xl text-balance text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]"><T t={contact.title} /></h2>
        <p className="mt-5 text-lg text-muted"><T t={contact.sub} /></p>
        <a href={`mailto:${site.email}`} className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-lg font-semibold text-accent-fg transition-transform hover:-translate-y-0.5">{site.email} <span aria-hidden="true">↗</span></a>
        </div>
        <PortraitCard caption={<><span className="text-accent">●</span> Nacho Iannella · Buenos Aires</>} />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr_1fr]">
          {links.map((l) => (
            <li key={l.k} className="bg-bg">
              <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'me noopener noreferrer' } : {})} className="block p-5 transition-colors hover:bg-card">
                <span className="block font-mono text-xs uppercase tracking-wider text-muted">{l.k}</span>
                <span className="mt-1 block break-words font-medium">{l.label}</span>
                {l.href.startsWith('http') ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10 pb-28">
      <Wrap className="flex flex-col gap-3 font-mono text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Ignacio (Nacho) Iannella · Buenos Aires</p>
        <p><T en="The photo is mine and every fact on this site links to its source." es="La foto es mía y cada dato del sitio tiene su fuente." /></p>
      </Wrap>
    </footer>
  );
}
