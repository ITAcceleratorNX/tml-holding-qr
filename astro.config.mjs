import { defineConfig } from 'astro/config';

// Статический сайт: на выходе чистый HTML/CSS, JS почти нет —
// критично для перехода по QR-коду с телефона на форуме.
export default defineConfig({
  site: 'https://tmk-holding.vercel.app',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
