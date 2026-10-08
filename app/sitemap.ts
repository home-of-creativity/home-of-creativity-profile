import type { MetadataRoute } from "next";
import { fetchArticles } from "@/lib/articles-api";
import { serviceDetails } from "@/lib/content";
import { officePath, publishedOffices } from "@/lib/offices";
import { fetchPortfolioProjects, type PortfolioProject } from "@/lib/portfolio-api";
import { publicApiUrl } from "@/lib/public-api";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Project URLs stay out of the sitemap until the page has real body text. */
function projectHasBody(project: PortfolioProject): boolean {
  const text = `${project.body_ar ?? ""} ${project.body_en ?? ""}`.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length >= 80;
}

/** A real content date. Build time is not a content date: stamping every URL as "now" makes Google ignore lastmod. */
function contentDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function latestDate(dates: Array<Date | undefined>): Date | undefined {
  const valid = dates.filter((date): date is Date => date !== undefined);
  if (valid.length === 0) return undefined;
  return new Date(Math.max(...valid.map((date) => date.getTime())));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchArticles();
  // Demo/static deploys with no real backend get zero project rows here —
  // real, canonical URLs only, not one per demo fallback project.
  const projects = (publicApiUrl() ? await fetchPortfolioProjects() : [])
    .filter((project) => project.id < 1 || project.id > 6)
    .filter(projectHasBody);
  const newestArticle = latestDate(
    articles.map((article) => contentDate(article.updated_at) ?? contentDate(article.published_at) ?? contentDate(article.created_at)),
  );

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceDetails.map((detail) => ({
      url: `${SITE_URL}/services/${detail.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/services/branding/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/brand-identity/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/social/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/locations/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...publishedOffices().flatMap((office) => {
      const path = officePath(office);
      return path
        ? [{
            url: `${SITE_URL}${path}`,
            changeFrequency: "monthly" as const,
            priority: 0.85,
          }]
        : [];
    }),
    {
      url: `${SITE_URL}/client-story/`,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/articles/`,
      ...(newestArticle ? { lastModified: newestArticle } : {}),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...articles.map((article) => {
      const lastModified = contentDate(article.updated_at) ?? contentDate(article.published_at) ?? contentDate(article.created_at);
      return {
        url: `${SITE_URL}/articles/${article.slug}/`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.65,
      };
    }),
    {
      url: `${SITE_URL}/privacy/`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms/`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...projects.map((project) => {
      const lastModified = contentDate(project.updated_at);
      return {
        url: `${SITE_URL}/projects/${project.id}/`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    }),
  ];
}
