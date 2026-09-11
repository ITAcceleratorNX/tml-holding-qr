/* Арт для карточки CoCo's: фирменный золотой логотип бренда на тёмном поле
   холдинга. Исходник - Coco's hlopok.png (логотип на прозрачном фоне).

   Пропорция 2,78:1 подобрана под полосу .card__art (object-fit:cover,
   высота 11-13rem): по вертикали кроп не режет ничего, по горизонтали
   на узком экране остаются центральные ~70 % ширины - логотип всегда внутри.
   Локап держим выше 62 % высоты: ниже начинается штатное затухание
   .card__art::after в белый.

   Пересобрать:
     node tools/cocos-art.mjs
     cwebp -q 82 public/assets/img/brand/cocos-art.png \
       -o public/assets/img/brand/cocos-art.webp
     rm public/assets/img/brand/cocos-art.png
*/
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const SRC = process.env.SRC || path.join(ROOT, "Coco's hlopok", "Coco's hlopok.png");
const OUT = process.env.OUT || path.join(ROOT, 'public/assets/img/brand/cocos-art.png');

if (!fs.existsSync(SRC)) {
  console.error(
    `Не найден исходный логотип: ${SRC}\n` +
    `Он не хранится в репозитории - укажите путь явно:\n` +
    `  SRC=~/…/Coco's hlopok.png node tools/cocos-art.mjs`,
  );
  process.exit(1);
}

const URI = 'data:image/png;base64,' + fs.readFileSync(SRC).toString('base64');

const W = 1280, H = 461;
const K = H / 620;                                      // всё построено от базовых 620 px
const SIDE = 2363;                                      // сторона исходного PNG
/* границы чернил в исходнике, посчитаны по альфа-каналу */
const INK = { x: 630, y: 487, w: 1103, h: 1389 };       // весь локап: цветок + слово
const FLOWER = { x: 630, y: 487, w: 1103 };             // только коробочка хлопка

/** блок с обрезкой: показать фрагмент исходника шириной box, начиная с (cx,cy) */
const crop = (box, cx, cy) =>
  `width:${box * SIDE / FLOWER.w}px;height:${box * SIDE / FLOWER.w}px;` +
  `left:${-cx * box / FLOWER.w}px;top:${-cy * box / FLOWER.w}px`;

const wmR = 820 * K, wmL = 700 * K, lock = 285 * K;

const html = `<!doctype html><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  .stage{position:relative;width:${W}px;height:${H}px;
    background:
      radial-gradient(50% 116% at 50% 33%, rgba(189,165,126,.26) 0%, rgba(189,165,126,0) 66%),
      linear-gradient(152deg,#1A2839 0%,#121C27 46%,#080E15 100%);
  }
  /* крупные полупрозрачные коробочки хлопка по краям - тихая текстура,
     тот же приём, что у водяного знака в герое */
  .wm{position:absolute;overflow:hidden}
  .wm img{position:absolute}
  .wm--r{right:${-190 * K}px;top:${-170 * K}px;width:${wmR}px;height:${wmR * .905}px;opacity:.085}
  .wm--l{left:${-230 * K}px;bottom:${-250 * K}px;width:${wmL}px;height:${wmL * .905}px;opacity:.055;transform:rotate(-14deg)}
  .lockup{position:absolute;left:50%;transform:translateX(-50%);
    top:${100 * K}px;height:${lock}px;width:${lock * INK.w / INK.h}px;overflow:hidden;
    filter:drop-shadow(0 ${10 * K}px ${30 * K}px rgba(0,0,0,.35));
  }
  .lockup img{position:absolute}
</style>
<div class="stage">
  <div class="wm wm--r"><img src="${URI}" style="${crop(wmR, FLOWER.x, FLOWER.y)}"></div>
  <div class="wm wm--l"><img src="${URI}" style="${crop(wmL, FLOWER.x, FLOWER.y)}"></div>
  <div class="lockup"><img src="${URI}" style="
    width:${lock * SIDE / INK.h}px;height:${lock * SIDE / INK.h}px;
    left:${-INK.x * lock / INK.h}px;top:${-INK.y * lock / INK.h}px"></div>
</div>`;

const br = await chromium.launch();
const p = await br.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'networkidle' });
await p.screenshot({ path: OUT });
await br.close();
console.log(`${OUT} · ${W}×${H}`);
