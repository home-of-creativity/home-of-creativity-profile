import { publicApiUrl } from "./public-api";

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

function hasContent(page: LegalPage): boolean {
  return page.sections.some((section) => {
    const ar = section.html_ar.replace(/<[^>]+>/g, "").trim();
    const en = section.html_en.replace(/<[^>]+>/g, "").trim();
    return ar.length > 0 || en.length > 0;
  });
}

export async function fetchLegalPage(slug: "privacy" | "terms"): Promise<LegalPage | null> {
  const api = publicApiUrl();
  if (!api) return null;

  try {
    const response = await fetch(`${api}/legal/${slug}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { data?: LegalPage };
    if (!payload.data?.sections?.length || !hasContent(payload.data)) {
      return null;
    }
    return payload.data;
  } catch {
    return null;
  }
}
