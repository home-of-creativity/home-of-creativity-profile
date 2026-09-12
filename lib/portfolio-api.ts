import { demoPortfolioProject, demoPortfolioProjects, demoShowcaseClients } from "./demo-data";
import { isDemoDataEnabled } from "./demo-mode";

export type ShowcaseClient = {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
};

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
};

export type PortfolioSocialLinks = Partial<
  Record<"instagram" | "facebook" | "linkedin" | "x" | "tiktok" | "youtube", string>
>;

export type PortfolioProject = {
  id: number;
  category_id: number;
  category?: PortfolioCategory;
  title_en: string;
  title_ar: string;
  summary_en: string | null;
  summary_ar: string | null;
  website_url: string | null;
  social_links: PortfolioSocialLinks;
  image_url: string | null;
  images: PortfolioProjectImage[];
  sort_order: number;
  featured: boolean;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000/api";

export async function fetchShowcaseClients(): Promise<ShowcaseClient[]> {
  try {
    const response = await fetch(`${API_BASE}/portfolio/clients`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (response.ok) {
      const payload = (await response.json()) as { data?: ShowcaseClient[] };
      const rows = Array.isArray(payload.data) ? payload.data : [];
      if (rows.length > 0) return rows;
    }
  } catch {
    // Static deploy without the VPS API.
  }

  return isDemoDataEnabled() ? demoShowcaseClients() : [];
}

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await fetch(`${API_BASE}/portfolio/projects`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (response.ok) {
      const payload = (await response.json()) as { data?: { projects?: PortfolioProject[] } };
      const rows = Array.isArray(payload.data?.projects) ? payload.data.projects : [];
      if (rows.length > 0) return rows;
    }
  } catch {
    // Static deploy without the VPS API.
  }

  return isDemoDataEnabled() ? demoPortfolioProjects() : [];
}

export async function fetchPortfolioProject(id: string | number): Promise<PortfolioProject | null> {
  try {
    const response = await fetch(`${API_BASE}/portfolio/projects/${id}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (response.ok) {
      const payload = (await response.json()) as { data?: PortfolioProject };
      if (payload.data) return payload.data;
    }
  } catch {
    // Static deploy without the VPS API.
  }

  return isDemoDataEnabled() ? demoPortfolioProject(id) : null;
}
