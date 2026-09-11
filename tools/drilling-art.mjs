/* Арт для карточки TM-3KI Drilling: белый логотип компании на тёмном поле
   холдинга, за ним - концентрические кольца (разрез керна) тёплым золотом.
   Исходник - photo_5269771456420193394_y.jpg: чёрный логотип на белом,
   поэтому invert + mix-blend-mode:screen - фон уходит, знак становится белым.

   Пропорции и «безопасная зона» - те же, что у tools/cocos-art.mjs:
   важное выше 62 % высоты, иначе его съест затухание .card__art::after.

   Пересобрать:
     node tools/drilling-art.mjs
     cwebp -q 82 public/assets/img/brand/drilling-art.png \
       -o public/assets/img/brand/drilling-art.webp
     rm public/assets/img/brand/drilling-art.png
*/
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const SRC = process.env.SRC || path.join(ROOT, 'photo_5269771456420193394_y.jpg');
const OUT = process.env.OUT || path.join(ROOT, 'public/assets/img/brand/drilling-art.png');

if (!fs.existsSync(SRC)) {
  console.error(
    `Не найден исходный логотип: ${SRC}\n` +
    `Он не хранится в репозитории - укажите путь явно:\n` +
    `  SRC=~/…/tmk-3ki-logo.jpg node tools/drilling-art.mjs`,
  );
  process.exit(1);
}

const URI = 'data:image/jpeg;base64,' + fs.readFileSync(SRC).toString('base64');

const W = 1280, H = 461;
const SIDE = 1280;                                   // сторона исходного JPG
/* границы чернил, посчитаны по яркости пикселей */
const INK = { x: 110, y: 402, w: 1060, h: 463 };
const LOGO_H = 175;
const LOGO_W = Math.round(LOGO_H * INK.w / INK.h);
const SCALE = LOGO_H / INK.h;

const html = `<!doctype html><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  .stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;
    background:
      radial-gradient(46% 112% at 50% 34%, rgba(189,165,126,.24) 0%, rgba(189,165,126,0) 66%),
      linear-gradient(152deg,#1A2839 0%,#121C27 46%,#080E15 100%);
  }
  /* кольца керна - тихая текстура по краям, как водяной знак в герое */
  .rings{position:absolute;inset:0}
  .rings::before,.rings::after{content:'';position:absolute;border-radius:50%}
  .rings::before{
    width:660px;height:660px;right:-170px;top:-190px;
    background:repeating-radial-gradient(circle,
      rgba(189,165,126,.16) 0 1.5px, rgba(189,165,126,0) 1.5px 30px);
    mask-image:radial-gradient(circle,#000 38%,transparent 72%);
  }
  .rings::after{
    width:460px;height:460px;left:-150px;bottom:-170px;
    background:repeating-radial-gradient(circle,
      rgba(189,165,126,.12) 0 1.5px, rgba(189,165,126,0) 1.5px 26px);
    mask-image:radial-gradient(circle,#000 40%,transparent 74%);
  }
  /* логотип: чёрный на белом → invert делает его белым, screen убирает фон */
  .logo{position:absolute;left:50%;transform:translateX(-50%);
    top:100px;width:${LOGO_W}px;height:${LOGO_H}px;overflow:hidden;
    filter:invert(1);mix-blend-mode:screen;
  }
  .logo img{position:absolute;
    width:${SIDE * SCALE}px;height:${SIDE * SCALE}px;
    left:${-INK.x * SCALE}px;top:${-INK.y * SCALE}px;
  }
</style>
<div class="stage">
  <div class="rings"></div>
  <div class="logo"><img src="${URI}"></div>
</div>`;

const br = await chromium.launch();
const p = await br.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'networkidle' });
await p.screenshot({ path: OUT });
await br.close();
console.log(`${OUT} · ${W}×${H} · логотип ${LOGO_W}×${LOGO_H}`);
