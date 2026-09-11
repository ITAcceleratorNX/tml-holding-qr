import { chromium } from 'playwright';
const URL = 'http://localhost:4173/';
const OUT = '/Users/zubanyszarylkasynov/Desktop/TMK HOLDING/.shots';
const b = await chromium.launch();

// ── 1. итоговые значения цифр не должны «поехать» ────────────
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
await p.goto(URL, { waitUntil: 'load' });
for (let y = 0; y < 12000; y += 500) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(60); }
await p.waitForTimeout(1200);
const nums = await p.$$eval('.stat__n, .mini b', (e) => e.map((x) => x.textContent));
console.log('цифры после анимации:', JSON.stringify(nums));
const stuck = await p.$$eval('.r', (e) => e.filter((x) => getComputedStyle(x).opacity !== '1').map((x) => x.className));
console.log('не проявилось:', stuck.length, stuck.slice(0, 5));
await p.close();

// ── 2. кадры каскада в герое ─────────────────────────────────
const f = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
await f.goto(URL, { waitUntil: 'commit' });
for (const ms of [250, 500, 800, 1300]) {
  await f.waitForTimeout(ms === 250 ? 250 : 0);
  if (ms !== 250) await f.waitForTimeout(ms - (ms === 500 ? 250 : ms === 800 ? 500 : 800));
  await f.screenshot({ path: `${OUT}/anim-${ms}.png` });
}
await f.close();

// ── 3. prefers-reduced-motion: без счёта и без сдвигов ───────
const r = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
await r.goto(URL, { waitUntil: 'load' });
await r.waitForTimeout(500);
const rn = await r.$$eval('.stat__n', (e) => e.map((x) => x.textContent));
const rh = await r.$$eval('.r', (e) => e.filter((x) => getComputedStyle(x).opacity !== '1').length);
console.log('reduced-motion — цифры:', JSON.stringify(rn), '| скрыто:', rh);
await r.close();
await b.close();
