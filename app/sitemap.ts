import type { MetadataRoute } from "next";
import { fetchArticles } from "@/lib/articles-api";
import { serviceDetails } from "@/lib/content";
import { fetchPortfolioProjects } from "@/lib/portfolio-api";
import { publicApiUrl } from "@/lib/public-api";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const articles = await fetchArticles();
  // Demo/static deploys with no real backend get zero project rows here —
  // real, canonical URLs only, not one per demo fallback project.
  const projects = publicApiUrl() ? await fetchPortfolioProjects() : [];

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceDetails.map((detail) => ({
      url: `${SITE_URL}/services/${detail.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/services/branding/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/brand-identity/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/social/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/locations/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/locations/damascus/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/client-story/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/articles/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}/`,
      lastModified: article.published_at ? new Date(article.published_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${SITE_URL}/privacy/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
