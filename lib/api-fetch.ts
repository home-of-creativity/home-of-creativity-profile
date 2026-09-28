import { publicApiUrl } from "./public-api";

/**
 * GET JSON from the public Laravel API.
 *
 * On the server (the static export build) the request uses `force-cache`. A `no-store`
 * fetch inside a page render makes Next.js throw its "dynamic usage" signal, and the old
 * `try/catch` around each fetch swallowed it: every article and project page was exported
 * as the not-found page with `noindex`, and the sitemap and llms.txt listed no articles.
 * `scripts/prebuild.mjs` clears `.next/cache/fetch-cache` so each build reads fresh CMS data.
 *
 * A production build fails when the API cannot be read after retries, so a deploy never
 * replaces the live site with empty pricing, articles or projects. `allowStatus` lists
 * statuses that are a valid answer (for example 404 for a legal page not written yet).
 *
 * In the browser the request uses `no-store`, one attempt, and returns null on failure.
 */
export async function apiGet<T>(path: string, { allowStatus = [] as number[] } = {}): Promise<T | null> {
  const api = publicApiUrl();
  if (!api) return null;
  const url = `${api}${path.startsWith("/") ? path : `/${path}`}`;

  if (typeof window !== "undefined") {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) return null;
      return (await response.json()) as T;
    } catch {
      return null;
    }
  }

  let lastError = "";
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "force-cache",
        signal: AbortSignal.timeout(30000),
      });
      if (response.ok) return (await response.json()) as T;
      if (allowStatus.includes(response.status)) return null;
      lastError = `HTTP ${response.status}`;
      if (response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }

  const message = `API ${url} failed during the build: ${lastError}`;
  if (process.env.NODE_ENV === "production") {
    throw new Error(message);
  }
  console.warn(message);
  return null;
}
