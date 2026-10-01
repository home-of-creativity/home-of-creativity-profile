import { apiGet } from "./api-fetch";
import { demoPortfolioProject, demoPortfolioProjects, demoShowcaseClients } from "./demo-data";
import { isDemoDataEnabled } from "./demo-mode";
import { publicApiUrl } from "./public-api";

export type ShowcaseClient = {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  updated_at?: string | null;
};

/** A new upload is a new file, and this query makes the browser fetch it at once. */
export function versionedMediaUrl(url: string | null | undefined, updatedAt?: string | null): string | null {
  if (!url) return null;
  if (!updatedAt) return url;
  const version = updatedAt.replace(/\D/g, "");
  if (!version) return url;
  const join = url.includes("?") ? "&" : "?";
  return `${url}${join}v=${version}`;
}

export function clientLogoSrc(client: ShowcaseClient): string | null {
  return versionedMediaUrl(client.logo_url, client.updated_at);
}

export type PortfolioCategory = {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  sort_order: number;
};

export type PortfolioProjectImage = {
  id: number;
  image_url: string | null;
  alt_en: string | null;
  alt_ar: string | null;
  sort_order: number;
  featured: boolean;
  updated_at?: string | null;
};

export type PortfolioSocialLinks = Partial<
  Record<"instagram" | "facebook" | "linkedin" | "x" | "tiktok" | "youtube", string>
>;

export type PortfolioRelatedProject = {
  id: number;
  title_en: string;
  title_ar: string;
  summary_en: string | null;
  summary_ar: string | null;
  image_url: string | null;
  category: PortfolioCategory | null;
  updated_at?: string | null;
};

export type PortfolioProject = {
  id: number;
  category_id: number;
  category?: PortfolioCategory;
  title_en: string;
  title_ar: string;
  summary_en: string | null;
  summary_ar: string | null;
  /** Rich text for the project page, cleaned by the API (headings, paragraphs, lists, links, tables). */
  body_en?: string | null;
  body_ar?: string | null;
  website_url: string | null;
  social_links: PortfolioSocialLinks;
  image_url: string | null;
  images: PortfolioProjectImage[];
  updated_at?: string | null;
  /** Published projects linked from this one, in the order chosen in the dashboard (detail endpoint only). */
  related?: PortfolioRelatedProject[];
  sort_order: number;
  featured: boolean;
};

let showcaseClientsRequest: Promise<ShowcaseClient[]> | null = null;

/** Logos marquee and client notes both read this list; share one request per page load. */
export function fetchShowcaseClients(): Promise<ShowcaseClient[]> {
  showcaseClientsRequest ??= requestShowcaseClients().catch((error: unknown) => {
    showcaseClientsRequest = null;
    throw error;
  });
  return showcaseClientsRequest;
}

async function requestShowcaseClients(): Promise<ShowcaseClient[]> {
  if (!publicApiUrl()) return isDemoDataEnabled() ? demoShowcaseClients() : [];
  const payload = await apiGet<{ data?: ShowcaseClient[] }>("/portfolio/clients");
  return Array.isArray(payload?.data) ? payload.data : [];
}

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!publicApiUrl()) return isDemoDataEnabled() ? demoPortfolioProjects() : [];
  const payload = await apiGet<{ data?: { projects?: PortfolioProject[] } }>("/portfolio/projects");
  return Array.isArray(payload?.data?.projects) ? payload.data.projects : [];
}

export async function fetchPortfolioProject(id: string | number): Promise<PortfolioProject | null> {
  if (!publicApiUrl()) return isDemoDataEnabled() ? demoPortfolioProject(id) : null;
  const payload = await apiGet<{ data?: PortfolioProject }>(`/portfolio/projects/${encodeURIComponent(String(id))}`, {
    allowStatus: [404],
  });
  return payload?.data ?? null;
}
