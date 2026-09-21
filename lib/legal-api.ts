import { publicApiUrl } from "./public-api";
import defaults from "./legal-defaults.json";

export type LegalSection = {
  id: string;
  heading_ar: string;
  heading_en: string;
  html_ar: string;
  html_en: string;
};

export type LegalPage = {
  slug: string;
  title_ar: string;
  title_en: string;
  sections: LegalSection[];
  updated_at?: string | null;
};

function fallbackPage(slug: "privacy" | "terms"): LegalPage | null {
  const pages = Array.isArray(defaults) ? defaults : [];
  return pages.find((item) => item.slug === slug) ?? null;
}

export async function fetchLegalPage(slug: "privacy" | "terms"): Promise<LegalPage | null> {
  const api = publicApiUrl();
  if (api) {
    try {
      const response = await fetch(`${api}/legal/${slug}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (response.ok) {
        const payload = (await response.json()) as { data?: LegalPage };
        if (payload.data?.sections?.length) {
          return payload.data;
        }
      }
    } catch {
      // Use bundled copy when the API is down.
    }
  }

  return fallbackPage(slug);
}
