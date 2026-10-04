import type { Article } from "./articles-api";
import { SITE_NAME_AR } from "./site";

const TITLE_MAX = 60;

/**
 * Short `<title>` topics for CMS articles whose full title is too long for results (the H1 on
 * the page keeps the full title). Each one is cut from the article's own title, no new claims.
 */
const SHORT_TITLES: Record<string, string> = {
  "mobile-app-design-process": "تصميم تطبيق جوال: من الفكرة إلى النموذج",
  "billboard-roadside-ad-design-tips": "كيف تصمم لوحة إعلانية طرقية تُقرأ في ثوانٍ؟",
  "exhibition-booth-design-guide": "دليل تصميم البوث للمشاركة في معرض تجاري",
  "reels-short-video-for-brands": "الريلز والفيديو القصير للعلامات التجارية",
  "business-website-ecommerce-checklist": "قائمة تحقق قبل تصميم موقع أو متجر إلكتروني",
  "paid-social-ads-campaign-guide": "كيف تطلق حملة ممولة ناجحة على السوشال ميديا؟",
};

/** Whole words up to `max` characters, never an ellipsis. */
function fitWords(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const space = cut.lastIndexOf(" ");
  return (space > 0 ? cut.slice(0, space) : text.slice(0, max)).replace(/[\s:،,—-]+$/, "");
}

/**
 * `<title>` for an article: `[topic] | بيت الإبداع`, at most 60 characters. A new article
 * without a short title uses the part before its colon, else whole words of its title.
 */
export function articleSeoTitle(article: Pick<Article, "slug" | "title_ar">): string {
  const suffix = ` | ${SITE_NAME_AR}`;
  const room = TITLE_MAX - suffix.length;
  const title = article.title_ar.trim();
  const beforeColon = title.split(/[:：]/)[0].trim();
  const topic =
    SHORT_TITLES[article.slug] ?? (title.length <= room ? title : beforeColon.length <= room ? beforeColon : fitWords(title, room));
  return `${topic}${suffix}`;
}
