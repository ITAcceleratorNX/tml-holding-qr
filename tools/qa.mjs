/* Проверка живой страницы: ссылки, липкие CTA, вес, доступность разметки. */
import { chromium } from 'playwright';

const URL = process.env.URL || 'http://localhost:4173/';
const OUT = '/Users/zubanyszarylkasynov/Desktop/TMK HOLDING/.shots';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

let bytes = 0;
const reqs = [];
page.on('response', async (r) => {
  const len = Number(r.headers()['content-length'] || 0);
  bytes += len;
  reqs.push({ url: r.url().replace(URL, '/'), status: r.status(), len });
});

const t0 = Date.now();
await page.goto(URL, { waitUntil: 'load' });
const loadMs = Date.now() - t0;
await page.waitForTimeout(600);

// ── 1. ссылки ────────────────────────────────────────────────
const links = await page.$$eval('a[href]', (as) =>
  as.map((a) => ({
    text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 34),
    href: a.getAttribute('href'),
    target: a.getAttribute('target') || '',
    rel: a.getAttribute('rel') || '',
  }))
);
console.log('\n── ССЫЛКИ ──');
for (const l of links) console.log(`${l.text.padEnd(34)} → ${l.href}  [${l.target} ${l.rel}]`);

// ── 2. липкие элементы ───────────────────────────────────────
const state = async () =>
  page.evaluate(() => ({
    topbar: document.getElementById('topbar')?.classList.contains('is-on'),
    dock: document.getElementById('dock')?.classList.contains('is-on'),
  }));

console.log('\n── ЛИПКИЕ CTA ──');
console.log('в герое     ', JSON.stringify(await state()));
await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
await page.waitForTimeout(350);
console.log('после героя ', JSON.stringify(await state()));
await page.screenshot({ path: `${OUT}/state-scrolled.png` });

await page.evaluate(() => {
  const c = document.getElementById('contact');
  window.scrollTo({ top: c.offsetTop - 200, behavior: 'instant' });
});
await page.waitForTimeout(350);
console.log('у блока CTA ', JSON.stringify(await state()));
await page.screenshot({ path: `${OUT}/state-contact.png` });

// ── 3. появление секций сработало ────────────────────────────
for (let y = 0; y < 12000; y += 600) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(40);
}
await page.waitForTimeout(300);
const notRevealed = await page.$$eval('.r', (els) =>
  els.filter((e) => !e.classList.contains('in')).length
);
console.log('\nне раскрытых блоков после полной прокрутки (должно быть 0):', notRevealed);

// ── 4. вес и запросы ─────────────────────────────────────────
const failed = reqs.filter((r) => r.status >= 400);
console.log('\n── ВЕС ──');
console.log('load, мс:', loadMs, '| запросов:', reqs.length, '| передано, КБ:', Math.round(bytes / 1024));
const heavy = [...reqs].sort((a, b) => b.len - a.len).slice(0, 6);
for (const h of heavy) console.log('  ', String(Math.round(h.len / 1024)).padStart(5), 'КБ', h.url);
console.log('ошибок загрузки:', failed.length, failed.map((f) => `${f.status} ${f.url}`).join(', '));

// ── 5. доступность разметки ──────────────────────────────────
const a11y = await page.evaluate(() => {
  const imgs = [...document.images].filter((i) => i.alt === null);
  const small = [...document.querySelectorAll('a,button')].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && (r.height < 44 || r.width < 44);
  }).map((el) => `${el.tagName}:${(el.textContent || '').trim().slice(0, 20)} ${Math.round(el.getBoundingClientRect().height)}px`);
  return {
    h1: document.querySelectorAll('h1').length,
    h2: document.querySelectorAll('h2').length,
    imgsNoAlt: imgs.length,
    smallTargets: small,
    lang: document.documentElement.lang,
  };
});
console.log('\n── ДОСТУПНОСТЬ ──');
console.log(JSON.stringify(a11y, null, 1));

await page.close();

// ── 6. режим «уменьшенное движение» ──────────────────────────
const rm = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});
await rm.goto(URL, { waitUntil: 'load' });
await rm.waitForTimeout(400);
const rmHidden = await rm.$$eval('.r', (els) =>
  els.filter((e) => getComputedStyle(e).opacity !== '1').length
);
console.log('\n── PREFERS-REDUCED-MOTION ──');
console.log('скрытых блоков (должно быть 0):', rmHidden);
await rm.screenshot({ path: `${OUT}/reduced-motion.png` });
await rm.close();

await browser.close();
