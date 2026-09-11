/* Единый источник правды по контактам, партнёрам и компаниям холдинга.
   Контент и цифры взяты из актуальной презентации TMK Holding (2026).
   Цвета акцентов ('accent'/'accentFg') - только фирменные navy/gold
   с tmk-limited.com, без произвольных цветов на направление. */

/** @typedef {import('./types').Company} Company */

export const PHONE_RAW = '77023391998';
export const PHONE_PRETTY = '+7 702 339 1998';
export const SITE = 'tmk-limited.com';

const WA_MESSAGE =
  'Здравствуйте! Хочу обсудить проект и возможности сотрудничества с TMK Holding.';

/** Ссылка в WhatsApp с заранее заполненным сообщением. */
export const WA_LINK = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(WA_MESSAGE)}`;

export const DIRECTIONS = ['Инвестиции', 'Недвижимость', 'Маркетинг', 'Технологии'];

export const STATS = [
  { n: '400 000 м²', l: 'коммерческой недвижимости под управлением', wide: true },
  { n: '$5 млн+', l: 'годовой оборот' },
  { n: '200+', l: 'клиентов и партнёров' },
  { n: '10+', l: 'лет экспертизы' },
  { n: '5', l: 'стран присутствия' },
];

export const COUNTRIES = 'Казахстан · ОАЭ · Латвия · Турция · Узбекистан';

/* Логотипы вырезаны из слайда «Нам доверяют» презентации TMK Holding. */
export const PARTNERS = [
  { file: 'chevron', alt: 'Chevron', w: 340, h: 391 },
  { file: 'cocacola', alt: 'Coca-Cola', w: 340, h: 107 },
  { file: 'beeline', alt: 'Beeline', w: 340, h: 67 },
  { file: 'airbus', alt: 'Airbus', w: 340, h: 66 },
  { file: 'chanel', alt: 'Chanel', w: 340, h: 219 },
  { file: 'kcell', alt: 'Kcell', w: 340, h: 115 },
  { file: 'wildberries', alt: 'Wildberries', w: 340, h: 40 },
  { file: 'ozon', alt: 'Ozon', w: 340, h: 75 },
  { file: 'qazpost', alt: 'QazPost', w: 340, h: 75 },
  { file: 'altynbank', alt: 'Altyn Bank', w: 340, h: 96 },
  { file: 'bankrbk', alt: 'Bank RBK', w: 340, h: 168 },
  { file: 'samsung', alt: 'Samsung', w: 340, h: 115 },
  { file: 'toyota', alt: 'Toyota', w: 340, h: 56 },
  { file: 'esentaimall', alt: 'Esentai Mall', w: 340, h: 99 },
  { file: 'dostykplaza', alt: 'Dostyk Plaza', w: 340, h: 248 },
  { file: 'shymbulak', alt: 'Shymbulak', w: 340, h: 221 },
];

/** @type {Company[]} */
export const COMPANIES = [
  {
    id: 'techno-horizon',
    tag: 'Технологии',
    title: 'TMK Techno Horizon',
    text: 'Разработка цифровых продуктов для бизнеса: платформы, мобильные приложения, AI-решения и веб-сервисы.',
    accent: '#2B3F58',
    accentFg: '#FFFFFF',
    art: '/assets/img/brand/techno-art.webp',
    pills: ['Digital Platforms', 'Mobile Apps', 'AI Solutions', 'Digital Products'],
    meta: {
      k: 'Проекты',
      v: 'WorkFlow · Extra Space Platform · PhysTech · Kcell Service',
    },
    cta: {
      label: 'Посмотреть презентацию',
      href: '/assets/files/TMK-Techno-Horizon-presentation.pdf',
      icon: 'external',
    },
  },
  {
    id: 'extra-space',
    tag: 'Складская инфраструктура',
    title: 'Extra Space',
    text: 'Современный оператор хранения для частных клиентов и бизнеса.',
    accent: '#BDA57E',
    accentFg: '#2B3F58',
    feats: ['Индивидуальное хранение', 'Облачное хранение', 'Фулфилмент', 'Smart Storage'],
    minis: [
      { b: '24/7', s: 'доступ' },
      { b: '2', s: 'локации' },
      { b: '2500+ м²', s: 'площадей' },
      { b: '200+', s: 'клиентов' },
    ],
    cta: { label: 'Перейти на сайт', href: 'https://extraspace.kz/', icon: 'external' },
  },
  {
    id: 'metropolis-property',
    tag: 'Коммерческая недвижимость',
    title: 'Metropolis Property',
    text: 'Управление и развитие коммерческой недвижимости, аренда офисных пространств и решения для бизнеса.',
    accent: '#2B3F58',
    accentFg: '#FFFFFF',
    pills: ['Property Management', 'Office Leasing', 'Commercial Real Estate'],
    /* цифры со слайда «Доказанные результаты» презентации TMK Holding */
    minis: [
      { b: '+162%', s: 'ставка аренды · Koktem Grand' },
      { b: '+253%', s: 'ставка аренды · Venus' },
    ],
    meta: {
      k: 'Объекты',
      v: 'Koktem Grand · Venus · Teniz Towers - BTS-проект под ключ',
    },
    cta: {
      label: 'Перейти на сайт',
      href: 'https://tmk-workflow.vercel.app/',
      icon: 'external',
    },
  },
  {
    id: 'qaitadan',
    tag: 'Marketing + Production',
    title: 'Qaitadan',
    text: 'Маркетинг, ориентированный на бизнес-результат, и полный цикл видеопроизводства от идеи до готового материала.',
    accent: '#BDA57E',
    accentFg: '#2B3F58',
    split: [
      { k: 'Marketing', items: ['Strategy', 'Performance', 'Content', 'Branding', 'Analytics'] },
      { k: 'Production', items: ['Concept', 'Shooting', 'Production', 'Post-production'] },
    ],
    minis: [
      { b: '500+', s: 'проектов' },
      { b: '$4 млн+', s: 'бюджетов' },
      { b: '200 млн+', s: 'просмотров' },
      { b: '$60 млн+', s: 'для клиентов' },
    ],
    cta: { label: 'Перейти на сайт', href: 'https://www.qaitadan.com/', icon: 'external' },
  },
  {
    /* Контент по листовке бренда (A6) и его собственному сайту-витрине
       cocoskz.taplink.kz: линейка, состав и формат сотрудничества - оттуда.
       Номер - тот, что стоит за кнопкой «Сотрудничество» на сайте бренда
       (на листовке напечатан другой: 8 702 339 90 98). */
    id: 'cocos',
    tag: 'Женское здоровье',
    title: "CoCo's",
    text: 'Премиальные средства женской гигиены из натурального хлопка: первые в Казахстане прокладки с лечебными свойствами.',
    accent: '#2B3F58',
    accentFg: '#FFFFFF',
    art: '/assets/img/brand/cocos-art.webp',
    artW: 1280,
    artH: 461,
    feats: [
      'Прокладки Premium: ежедневные, дневные, ночные',
      'Ежедневные с экстрактом полыни',
      'Бельё для цикла и послеродовые наборы',
      'Подгузники для взрослых',
    ],
    meta: {
      k: 'Сотрудничество',
      v: 'Опт, дистрибуция и совместные проекты · 8\u00A0707\u00A0355\u00A050\u00A098',
    },
    cta: {
      label: 'Перейти на сайт',
      href: 'https://cocoskz.taplink.kz/',
      icon: 'external',
    },
  },
  {
    /* Контент и все цифры - со страницы компании на сайте холдинга:
       tmk-limited.com/tm-3ki-drilling-llp/ru (направление «Строительство
       и бурение»). Написание названия там - TM-3KI, на логотипе - TMK 3Ki. */
    id: 'tm-3ki-drilling',
    tag: 'Бурение и геологоразведка',
    title: 'TM-3KI Drilling',
    text: 'Буровые работы на твёрдых полезных ископаемых по всей территории Казахстана: геологоразведка высокой точности.',
    accent: '#BDA57E',
    accentFg: '#2B3F58',
    art: '/assets/img/brand/drilling-art.webp',
    artW: 1280,
    artH: 461,
    feats: [
      'Современное буровое оборудование',
      'Команда инженеров и геологов',
      'Безопасность и экологические стандарты',
      'Индивидуальный подход к каждому проекту',
    ],
    minis: [
      { b: '6+', s: 'месторождений' },
      { b: '20 000+ м', s: 'совокупная глубина бурения' },
      { b: '400 000 т', s: 'извлечённой породы' },
    ],
    meta: {
      k: 'География',
      v: 'Вся территория Казахстана - от горных районов до степных зон',
    },
    cta: {
      label: 'Перейти на сайт',
      href: 'https://tmk-limited.com/tm-3ki-drilling-llp/ru',
      icon: 'external',
    },
  },
];
