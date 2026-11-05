// Builds generated/cases-index.json from the MDX case studies.
// Used by the client-side "Ask my portfolio" chat and the case-study TOC.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'content/cases');

// Keep in sync with lib/slug.ts
const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function mdxToText(src, lang) {
  const L = lang === 'es' ? { chose: 'Elegimos: ', over: 'En lugar de: ' } : { chose: 'We chose: ', over: 'Instead of: ' };
  return src
    .replace(/<Todo[^>]*>[\s\S]*?<\/Todo>/g, '[COMPLETAR]')
    .replace(/<([A-Z]\w*)([^>]*)>/g, (_, _n, attrs) => {
      const vals = [...attrs.matchAll(/(\w+)="([^"]*)"/g)].map(([, k, v]) => `${L[k] || ''}${v}.`);
      return vals.length ? ` ${vals.join(' ')} ` : ' ';
    })
    .replace(/<\/[A-Z]\w*>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_>`]/g, '')
    .replace(/^\s*-\s+/gm, '• ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

const chunks = [];
const toc = {};
for (const f of readdirSync(dir).filter((f) => f.endsWith('.mdx')).sort()) {
  const [slug, lang] = f.replace(/\.mdx$/, '').split('.');
  const src = readFileSync(join(dir, f), 'utf8');
  const parts = src.split(/^## /m).slice(1);
  toc[slug] ??= {};
  toc[slug][lang] = [];
  for (const p of parts) {
    const nl = p.indexOf('\n');
    const heading = p.slice(0, nl).trim();
    const id = `${lang}-${slugify(heading)}`;
    toc[slug][lang].push({ id, heading });
    const text = mdxToText(p.slice(nl + 1), lang);
    if (/^(sources|fuentes)$/i.test(heading)) continue;
    chunks.push({ slug, lang, heading, id, text });
  }
}
mkdirSync(join(root, 'generated'), { recursive: true });
writeFileSync(join(root, 'generated/cases-index.json'), JSON.stringify({ chunks, toc }, null, 1));
console.log(`index: ${chunks.length} chunks from ${Object.keys(toc).length} case studies`);
