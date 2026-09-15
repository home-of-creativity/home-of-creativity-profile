import { withBasePath } from "./base-path";
import { publicApiUrl } from "./public-api";
import { reelDriveStreamUrl, reelLocalSrc, reelsDriveVideos } from "./reels-drive-videos";

export type LandingReel = {
  id: number;
  title_en: string;
  title_ar: string;
  video_url: string | null;
  poster_url: string | null;
  sort_order: number;
};

function fallbackReels(): LandingReel[] {
  return reelsDriveVideos.map((reel, index) => ({
    id: index + 1,
    title_en: reel.title.en,
    title_ar: reel.title.ar,
    video_url: withBasePath(reelLocalSrc(reel.id)),
    poster_url: reelDriveStreamUrl(reel.fileId),
    sort_order: index + 1,
  }));
}

export async function fetchLandingReels(): Promise<LandingReel[]> {
  const api = publicApiUrl();
  if (!api) return fallbackReels();

  try {
    const response = await fetch(`${api}/reels`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (response.ok) {
      const payload = (await response.json()) as { data?: LandingReel[] };
      const rows = Array.isArray(payload.data) ? payload.data.filter((row) => Boolean(row.video_url)) : [];
      if (rows.length > 0) return rows;
    }
  } catch {
    // Static deploy without the API.
  }

  return fallbackReels();
}
