// Usage: npm run build && npm run screenshots
// Serves ./out on :4173 and captures desktop (1440) + mobile (390) screenshots into ./screenshots
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const exe = process.env.CHROME_PATH || ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
mkdirSync('screenshots', { recursive: true });

const server = spawn('npx', ['serve', 'out', '-l', String(PORT), '--no-clipboard'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));

const browser = await chromium.launch({ executablePath: exe });
const shots = [];
async function page(vp, { theme = 'dark', lang = 'en', depth = '5' } = {}) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: vp.width < 500 ? 2 : 1, reducedMotion: 'reduce' });
  await ctx.addInitScript(([t, l, d]) => { localStorage.setItem('theme', t); localStorage.setItem('lang', l); localStorage.setItem('depth', d); }, [theme, lang, depth]);
  return ctx.newPage();
}
async function snap(p, name, opts = {}) {
  if (opts.fullPage) { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); }); await p.waitForTimeout(400); }
  const path = `screenshots/${name}.png`; await p.screenshot({ path, ...opts }); shots.push(path); }
async function el(p, sel, name) { await p.addStyleTag({ content: 'header.sticky{position:static!important}' }); const path = `screenshots/${name}.png`; await p.locator(sel).first().screenshot({ path }); shots.push(path); }

for (const [tag, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  // Hero (dark + light + Spanish)
  let p = await page(vp);
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await snap(p, `${tag}-01-hero-dark`);
  await snap(p, `${tag}-02-home-5min-full`, { fullPage: true });
  await p.locator('#prototype').scrollIntoViewIfNeeded();
  await el(p, '#prototype', `${tag}-05-prototype-default`);
  await p.getByRole('button', { name: /Nacho’s pick/ }).click();
  await p.waitForTimeout(200);
  await el(p, '#prototype', `${tag}-06-prototype-nachos-pick`);
  await p.getByText('Before paying', { exact: true }).click();
  await p.getByRole('button', { name: 'Continue to payment' }).click();
  await p.waitForTimeout(200);
  await el(p, '#prototype', `${tag}-07-prototype-interstitial`);
  await p.locator('#building').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await el(p, '#building', `${tag}-14-building-pogo`);
  await p.locator('#contact').scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await el(p, '#contact', `${tag}-13-contact-photo`);
  // Chat
  await p.getByRole('button', { name: /Ask my portfolio/ }).click();
  await p.waitForSelector('#ask-input');
  await p.fill('#ask-input', 'What did he do on SOFIA?');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(300);
  await snap(p, `${tag}-08-chat`);
  await p.context().close();

  p = await page(vp, { theme: 'light' });
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await snap(p, `${tag}-03-hero-light`);
  await p.context().close();

  p = await page(vp, { lang: 'es', depth: '30' });
  await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await snap(p, `${tag}-04-home-30s-es-full`, { fullPage: true });
  await p.context().close();

  // Case study
  p = await page(vp);
  await p.goto(`${BASE}/work/sofia-ai-travel-assistant/`, { waitUntil: 'networkidle' });
  await snap(p, `${tag}-09-case-sofia`);
  await snap(p, `${tag}-10-case-sofia-full`, { fullPage: true });
  await p.goto(`${BASE}/work/despegar-cart-cross-sell/#en-key-decisions-and-trade-offs`, { waitUntil: 'networkidle' });
  await snap(p, `${tag}-11-case-cart-decisions`);
  await p.context().close();
}

// 20-minute mode (desktop only, full page)
const p = await page({ width: 1440, height: 900 }, { depth: '20' });
await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await snap(p, 'desktop-12-home-20min-full', { fullPage: true });

await browser.close();
server.kill();
console.log(shots.join('\n'));
