/**
 * Which service pages each CMS article relates to. Article pages list these services, and each
 * service page lists the articles that point at it. An article missing here links to no service;
 * a slug here that the CMS no longer publishes is skipped.
 */
const ARTICLE_SERVICES: Record<string, string[]> = {
  "billboard-roadside-ad-design-tips": ["roadside-ads", "marketing"],
  "business-website-ecommerce-checklist": ["websites-ecommerce", "app-design"],
  "exhibition-booth-design-guide": ["booth-design", "exhibitions-conferences"],
  "how-to-choose-branding-agency-damascus": ["visual-identity", "marketing"],
  "mobile-app-design-process": ["app-design", "websites-ecommerce"],
  "monthly-social-media-content-plan": ["social-media", "account-management"],
  "paid-social-ads-campaign-guide": ["paid-ads", "marketing"],
  "reels-short-video-for-brands": ["filming-editing", "social-media"],
};

export function servicesForArticle(articleSlug: string): string[] {
  return ARTICLE_SERVICES[articleSlug] ?? [];
}

export function articlesForService<T extends { slug: string }>(serviceSlug: string, articles: T[]): T[] {
  return articles.filter((article) => servicesForArticle(article.slug).includes(serviceSlug));
}
