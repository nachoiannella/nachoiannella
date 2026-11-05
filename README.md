# nachoiannella — "Nacho, en producción"

Personal portfolio for **Nacho Iannella**, UX Manager at Despegar (Packages, Cart & Cross-sell).
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · MDX · fully static export.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in ./out (also regenerates the chat index + CONTENT_TODO.md)
npm start            # serves ./out on http://localhost:3000
npm run lint         # type-check
npm run screenshots  # after a build: desktop 1440 + mobile 390 screenshots into ./screenshots
```

Node ≥ 20.9. Screenshots use the system Chrome (`CHROME_PATH` to override).

## What’s where

| Path | What |
|---|---|
| `content/home.ts` | All homepage copy, EN + ES (voseo). Single source for the page **and** the chat. |
| `content/cases/*.{en,es}.mdx` | The three case studies. `<Decision>` and `<Todo>` are available in MDX. |
| `content/prototype.ts` | Design rationale shown in the playable cross-sell prototype. |
| `lib/cases.ts` | Case metadata (role, team, highlights for the 5-minute view). |
| `components/Prototype.tsx` | The playable checkout (placement · default state · price framing). |
| `components/ChatPanel.tsx`, `lib/search.ts` | "Ask my portfolio": BM25 keyword retrieval in the browser, lazy-loaded. |
| `scripts/build-index.mjs` | Chunks the MDX into `generated/cases-index.json` (chat + table of contents). |
| `scripts/build-todo.mjs` | Scans every placeholder → `CONTENT_TODO.md`. |
| `SOURCES.md` | Where every fact on the site comes from. |
| `design/opengraph-image.tsx` | Source of the OG image (see below). |

### Placeholders (none in use right now)
- In TS strings: `{{todo:id|what is missing}}` · possibly-NDA numbers: `{{todo!:id|…}}`
- In MDX: `<Todo id="id">what is missing</Todo>` · `<Todo id="id" nda>…</Todo>`

They render as a loud yellow `[COMPLETAR: …]` tag so nothing ships unfilled. Editorial rules: no metrics on the site, no Despegar-specific leadership details (see CONTENT_TODO.md). Replace them in **both** languages, then `npm run build` to refresh `CONTENT_TODO.md`.

### Photo
`public/nacho-{400,640,960}.{avif,webp}` (4:5 crop of the original), `public/nacho.jpg` (fallback) and `public/nacho-avatar.{avif,webp}` (hero avatar). Served with `<picture>` + `srcset`/`sizes` (next/image optimization isn't available in a static export). `components/Photo.tsx` checks the files at build time and renders nothing if they are missing. To replace the photo, overwrite those files with the same names.

### Language, theme, recruiter mode
Both languages are rendered into the HTML; a tiny inline script sets `data-lang`, `data-theme` and `data-depth` on `<html>` before paint (no flash), and CSS shows the right content. Deep links: `?lang=es`, `?mode=30|5|20`.
- `data-min="5"` / `data-min="20"` → only visible from that depth up; `data-only="30"` → only in the 30-second view.

## Deploy to Vercel

1. Push the folder to a Git repo and import it in Vercel (framework preset: **Next.js**). No settings needed — `output: 'export'` produces a static site and Vercel serves `out/`.
2. Environment variables (Project → Settings → Environment Variables), all optional:
   - `NEXT_PUBLIC_SITE_URL` — canonical URL for metadata/sitemap/OG (default `https://nachoiannella.vercel.app`).
   - `NEXT_PUBLIC_GA_ID` — GA4 measurement ID (`G-XXXX`). Nothing loads if empty.
   - `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity project ID. Nothing loads if empty.
   
   If you enable analytics, add a short cookie/analytics notice.
3. Or deploy without Git: `npx vercel deploy --prebuilt` after `vercel build`, or upload `out/` to any static host (Netlify, Cloudflare Pages, S3).

### Custom domain (e.g. nachoiannella.com.ar)
1. Vercel → Project → Settings → Domains → add `nachoiannella.com.ar` and `www.nachoiannella.com.ar` (redirect one to the other).
2. At NIC.ar / your DNS provider: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` (use the values Vercel shows).
3. Set `NEXT_PUBLIC_SITE_URL=https://nachoiannella.com.ar` and redeploy so canonical URLs, sitemap, robots and OG tags point to the new domain.

### OG image
`app/opengraph-image.png` / `app/twitter-image.png` are static PNGs (static hosts serve them with the right content type). To regenerate after changing the headline: copy `design/opengraph-image.tsx` to `app/opengraph-image.tsx`, delete the PNGs, `npm run build`, copy `out/opengraph-image` back to `app/opengraph-image.png` (and `twitter-image.png`), then remove the `.tsx` again.

## Optional: real AI answers in the chat (Vercel AI SDK)
The default chat needs no key: it retrieves passages from the site’s own content and links to them. To add generated answers grounded on the same passages:
1. Remove `output: 'export'` from `next.config.mjs` (a server route is needed; Vercel handles it).
2. `npm i ai @ai-sdk/react` plus a provider package, and set the provider key as a **server-only** env var (never `NEXT_PUBLIC_…`).
3. Add `app/api/ask/route.ts` that receives the question + the top passages from `lib/search.ts`, calls `streamText()` with a system prompt like “Answer only from these passages; if not covered, say so and link to the section”, and streams the reply.
4. In `ChatPanel.tsx`, if `process.env.NEXT_PUBLIC_ASK_AI === '1'`, POST to `/api/ask` and fall back to the local answer on error.
Keep the local retrieval as the source of truth so the model can’t invent facts.

## Quality checks run on this build
- `npm run build` clean (TypeScript strict), 12 static routes.
- Lighthouse (local static server, 19 Oct 2026, after photo + pogo.ar): home — mobile 92–97 performance across 6 runs (typically 94–97; LCP is the hero paragraph, render-bound under simulated throttling), 100 a11y / best practices / SEO; desktop 100 across the board. /work/sofia-ai-travel-assistant/ — mobile 95 / 100 / 100 / 100, desktop 100 across the board.
- axe-core (WCAG 2.1 A/AA + best practices): 0 violations across dark/light × EN/ES × 30s/5m/20m, all three case pages, the prototype interstitial and the open chat.
- `prefers-reduced-motion` disables all motion (split-flap board, reveals). No infinite animations.

## Building (side project)

The `#building` section features pogo.ar, Nacho's own live-music map. Copy lives in `content/home.ts` (`pogo`); the visual is a real headless screenshot of https://pogo.ar taken 19 Oct 2026 (`public/pogo-800|1280.avif|webp`, fallback `public/pogo.jpg`). Re-take it if the site's look changes. It shows third-party show posters as they appear on the live site.
