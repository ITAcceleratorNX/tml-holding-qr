import { chromium } from 'playwright';

const URL = process.env.URL || 'http://localhost:4321/';
const OUT = '/Users/zubanyszarylkasynov/Desktop/TMK HOLDING/.shots';

const views = [
  { name: 'small', width: 320, height: 640, dsf: 2 },
  { name: 'mobile', width: 390, height: 844, dsf: 2 },
  { name: 'tablet', width: 834, height: 1112, dsf: 1 },
  { name: 'desktop', width: 1440, height: 900, dsf: 1 },
];

const browser = await chromium.launch();
for (const v of views) {
  const page = await browser.newPage({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: v.dsf,
    isMobile: v.width < 800,
    hasTouch: v.width < 800,
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  // показать все секции, чтобы снять статичный кадр целиком
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('.r').forEach((e) => e.classList.add('in'));
    // липкие элементы прячем: на длинном кадре они дублируются
    document.querySelectorAll('#dock, #topbar').forEach((e) => (e.style.display = 'none'));
  });
  // самая долгая волна появления - 880ms задержки + 640ms анимации
  await page.waitForTimeout(1700);
  await page.screenshot({ path: `${OUT}/${v.name}-full.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log('shots ready');
