export type LandingReel = {
  id: number;
  title_en: string;
  title_ar: string;
  video_url: string | null;
  poster_url: string | null;
  sort_order: number;
};

function reelsApiUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "") ?? "";
  return raw.length > 0 ? raw : null;
}

export async function fetchLandingReels(): Promise<LandingReel[]> {
  const api = reelsApiUrl();
  if (!api) return [];

  try {
    const response = await fetch(`${api}/reels`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as { data?: LandingReel[] };
    if (!Array.isArray(payload.data)) return [];
    return payload.data.filter((row) => Boolean(row.video_url));
  } catch {
    return [];
  }
}
