import { apiGet } from "./api-fetch";

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

/** The page from the dashboard (`/privacy`, `/terms` editors), or null while HOC has not published it. */
export async function fetchLegalPage(slug: "privacy" | "terms"): Promise<LegalPage | null> {
  const payload = await apiGet<{ data?: LegalPage }>(`/legal/${slug}`, { allowStatus: [404] });
  if (!payload?.data?.sections?.length || !hasContent(payload.data)) return null;
  return payload.data;
}
