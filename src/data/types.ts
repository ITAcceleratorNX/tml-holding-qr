/** Форма одной записи в COMPANIES (src/data/site.js). Общий источник типа
 *  и для JSDoc в самом site.js, и для шаблона CompanyCard.astro. */
export interface Company {
  id: string;
  tag: string;
  title: string;
  text: string;
  accent: string;
  accentFg: string;
  art?: string;
  pills?: string[];
  feats?: string[];
  split?: { k: string; items: string[] }[];
  minis?: { b: string; s: string }[];
  meta?: { k: string; v: string };
  cta: { label: string; href: string; icon: 'wa' | 'arrow' | 'external' | 'shield' };
}
