import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Sections';
import { T, Lb, plain } from '@/components/T';
import { CaseArt } from '@/components/Illustrations';
import { mdxComponentsFor } from '@/components/mdx';
import { caseBodies } from '@/content/cases';
import { cases, getCase } from '@/lib/cases';
import idx from '@/generated/cases-index.json';

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: c.title.en,
    description: plain(c.dek.en),
    alternates: { canonical: `/work/${c.slug}/` },
    openGraph: { title: `${c.title.en} · Nacho Iannella`, description: plain(c.dek.en), type: 'article', url: `/work/${c.slug}/`, images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Nacho Iannella · Product design leader in travel e-commerce' }] },
  };
}

type Toc = Record<string, Record<'en' | 'es', { id: string; heading: string }[]>>;

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const B = caseBodies[slug];
  const toc = (idx as unknown as { toc: Toc }).toc[slug];
  const i = cases.findIndex((x) => x.slug === slug);
  const next = cases[(i + 1) % cases.length];

  return (
    <>
      <Header home={false} />
      <main id="main">
        <article aria-labelledby="case-title">
          <header className="border-b border-line">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 lg:grid-cols-[1.4fr_1fr] lg:pt-20">
              <div>
                <Link href="/#work" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-fg">← <T en="All work" es="Todo el trabajo" /></Link>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">{c.index} · {c.company} · <T t={c.stage} /></p>
                <h1 id="case-title" className="rise-y mt-3 text-balance text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em]"><T t={c.title} /></h1>
                <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-muted"><T t={c.dek} /></p>
              </div>
              <div className="h-64 overflow-hidden rounded-3xl border border-line bg-bg-2 lg:h-auto"><CaseArt slug={c.slug} accent={c.accent} /></div>
            </div>
            <dl className="mx-auto grid max-w-6xl gap-px border-t border-line px-5 sm:grid-cols-4">
              {[
                [{ en: 'Role', es: 'Rol' }, c.role],
                [{ en: 'Team', es: 'Equipo' }, c.team],
                [{ en: 'When', es: 'Cuándo' }, { en: c.period, es: c.period }],
                [{ en: 'Outcome', es: 'Resultado' }, c.outcome],
              ].map(([k, v], j) => (
                <div key={j} className="py-5 sm:pr-6">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted"><T t={k} /></dt>
                  <dd className="mt-1.5 text-[0.97rem] leading-snug"><T t={v} /></dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[220px_1fr]">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-24">
                <p className="font-mono text-xs uppercase tracking-wider text-muted"><T en="On this page" es="En esta página" /></p>
                {(['en', 'es'] as const).map((l) => (
                  <ol key={l} data-l={l} className="mt-3 space-y-2 border-l border-line text-sm">
                    {toc[l].map((h) => (
                      <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-accent hover:text-fg">{h.heading}</a></li>
                    ))}
                  </ol>
                ))}
              </div>
            </nav>
            <div className="prose-case max-w-[70ch]">
              <Lb lang="en"><B.en components={mdxComponentsFor('en')} /></Lb>
              <Lb lang="es"><B.es components={mdxComponentsFor('es')} /></Lb>
            </div>
          </div>
        </article>

        <aside className="border-t border-line">
          <Link href={`/work/${next.slug}/`} className="group mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-14">
            <span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted"><T en="Next case" es="Siguiente caso" /></span>
              <span className="mt-2 block text-3xl font-semibold tracking-tight group-hover:text-accent"><T t={next.title} /></span>
            </span>
            <span aria-hidden="true" className="text-4xl transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </aside>
      </main>
      <Footer />
    </>
  );
}
