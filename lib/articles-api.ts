import { apiGet } from "./api-fetch";

export type Article = {
  id: number;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  body_en: string;
  body_ar: string;
  published_at: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

/** Dashboard articles only (`GET /articles`). No bundled stand-in posts. */
export async function fetchArticles(): Promise<Article[]> {
  const payload = await apiGet<{ data?: Article[] }>("/articles");
  return Array.isArray(payload?.data) ? payload.data.filter((article) => article.slug.trim().length > 0) : [];
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "__none__") return null;
  const payload = await apiGet<{ data?: Article }>(`/articles/${encodeURIComponent(trimmed)}`, { allowStatus: [404] });
  return payload?.data ?? null;
}
