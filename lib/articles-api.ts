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

async function fetchRemoteArticles(): Promise<Article[]> {
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

/** Dashboard articles only (`GET /articles`). No bundled stand-in posts. */
export async function fetchArticles(): Promise<Article[]> {
  return fetchRemoteArticles();
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "__none__") return null;

  const api = publicApiUrl();
  if (api) {
    try {
      const response = await fetch(`${api}/articles/${encodeURIComponent(trimmed)}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) {
        const payload = (await response.json()) as { data?: Article };
        if (payload.data) return payload.data;
      }
    } catch {
      // Fall through to the static cluster.
    }
  }

  return null;
}
