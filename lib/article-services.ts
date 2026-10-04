import { brandIdentityPage, brandingPage } from "./content";
import type { Copy } from "./i18n";
import { findServiceDetail } from "./service-details";

/**
 * Which service pages each CMS article relates to. Article pages list these services, and each
 * service page lists the articles that point at it. An article missing here links to no service;
 * a slug here that the CMS no longer publishes is skipped.
 */
const ARTICLE_SERVICES: Record<string, string[]> = {
  "billboard-roadside-ad-design-tips": ["roadside-ads", "marketing"],
  "business-website-ecommerce-checklist": ["websites-ecommerce", "app-design"],
  "exhibition-booth-design-guide": ["booth-design", "exhibitions-conferences", "event-management", "promo-gifts"],
  "how-to-choose-branding-agency-damascus": ["visual-identity", "branding", "brand-identity", "marketing"],
  "mobile-app-design-process": ["app-design", "websites-ecommerce"],
  "monthly-social-media-content-plan": ["social-media", "account-management"],
  "paid-social-ads-campaign-guide": ["paid-ads", "marketing", "financial-analysis"],
  "reels-short-video-for-brands": ["filming-editing", "social-media"],
};

/** `/services/{slug}/` pages that are not in `serviceDetails`. */
const TOPIC_TITLES: Record<string, Copy> = {
  branding: brandingPage.title,
  "brand-identity": brandIdentityPage.title,
};

export function servicesForArticle(articleSlug: string): string[] {
  return ARTICLE_SERVICES[articleSlug] ?? [];
}

/** Service pages an article links to, with their titles. */
export function serviceLinksForArticle(articleSlug: string): { slug: string; title: Copy }[] {
  return servicesForArticle(articleSlug).flatMap((slug) => {
    const title = findServiceDetail(slug)?.title ?? TOPIC_TITLES[slug];
    return title ? [{ slug, title }] : [];
  });
}

export function articlesForService<T extends { slug: string }>(serviceSlug: string, articles: T[]): T[] {
  return articles.filter((article) => servicesForArticle(article.slug).includes(serviceSlug));
}
