import { rememberLoadedMedia } from "@/lib/media-cache";

export type LandingReel = {
  id: number;
  title_en: string;
  title_ar: string;
  video_url: string | null;
  poster_url: string | null;
  sort_order: number;
};

const REELS_LIST_KEY = "hoc-landing-reels-v1";

function reelsApiUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "") ?? "";
  return raw.length > 0 ? raw : null;
}

function isReel(row: unknown): row is LandingReel {
  return Boolean(row && typeof row === "object" && (row as LandingReel).video_url);
}

export function peekLandingReels(): LandingReel[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(REELS_LIST_KEY) ?? "");
    return Array.isArray(parsed) ? parsed.filter(isReel) : [];
  } catch {
    return [];
  }
}

function rememberReels(rows: LandingReel[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(REELS_LIST_KEY, JSON.stringify(rows));
  } catch {
    /* quota */
  }
  for (const row of rows) {
    void rememberLoadedMedia(row.poster_url);
    void rememberLoadedMedia(row.video_url);
  }
}

export async function fetchLandingReels(): Promise<LandingReel[]> {
  const api = reelsApiUrl();
  if (!api) return peekLandingReels();

  try {
    const response = await fetch(`${api}/reels`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return peekLandingReels();
    const payload = (await response.json()) as { data?: LandingReel[] };
    if (!Array.isArray(payload.data)) return peekLandingReels();
    const rows = payload.data.filter(isReel);
    rememberReels(rows);
    return rows;
  } catch {
    return peekLandingReels();
  }
}
