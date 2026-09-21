import { publicApiUrl } from "./public-api";

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
};

export async function fetchArticles(): Promise<Article[]> {
  const api = publicApiUrl();
  if (!api) return [];

  try {
    const response = await fetch(`${api}/articles`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as { data?: Article[] };
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const api = publicApiUrl();
  if (!api || !slug.trim()) return null;

  try {
    const response = await fetch(`${api}/articles/${encodeURIComponent(slug.trim())}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { data?: Article };
    return payload.data ?? null;
  } catch {
    return null;
  }
}
