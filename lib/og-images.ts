import type { Article } from "./articles-api";

export type OgImage = { url: string; width: number; height: number; alt: string };

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/**
 * 1200x630 crops of the existing category covers in public/photo/project-background
 * (files in public/og/). Services in one category share a cover.
 */
const SERVICE_COVERS: Record<string, string> = {
  marketing: "media",
  "paid-ads": "media",
  "social-media": "media",
  "account-management": "media",
  "filming-editing": "media",
  "roadside-ads": "promo",
  "promo-gifts": "promo",
  "visual-identity": "identity",
  branding: "identity",
  "brand-identity": "identity",
  "exhibitions-conferences": "events",
  "event-management": "events",
  "booth-design": "events",
  "websites-ecommerce": "digital",
  "app-design": "digital",
  "financial-analysis": "finance",
};

export function serviceOgImage(slug: string, alt: string): OgImage | undefined {
  const cover = SERVICE_COVERS[slug];
  return cover ? { url: `/og/service-${cover}.jpg`, width: OG_WIDTH, height: OG_HEIGHT, alt } : undefined;
}

/**
 * The article's own lead picture: the first <img> in its body. Pexels and Unsplash URLs are
 * asked for a 1200x630 crop; any other host is used as is, without size claims.
 */
export function articleOgImage(article: Pick<Article, "body_ar" | "body_en" | "title_ar">): OgImage | { url: string; alt: string } | undefined {
  const match = /<img\b[^>]*\ssrc\s*=\s*["']([^"']+)["']/i.exec(article.body_ar || article.body_en || "");
  if (!match) return undefined;
  const src = match[1].replace(/&amp;/g, "&");
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return undefined;
  }
  if (url.hostname === "images.pexels.com" || url.hostname === "images.unsplash.com") {
    url.searchParams.set("w", String(OG_WIDTH));
    url.searchParams.set("h", String(OG_HEIGHT));
    url.searchParams.set("fit", "crop");
    return { url: url.toString(), width: OG_WIDTH, height: OG_HEIGHT, alt: article.title_ar };
  }
  return { url: url.toString(), alt: article.title_ar };
}
