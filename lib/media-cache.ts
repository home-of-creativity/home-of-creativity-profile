export const MEDIA_CACHE = "hoc-design-v8";

const remembered = new Set<string>();

const VIDEO_URL = /\.(mp4|webm|ogv|ogg|m4v|mov)(\?|$)/i;

export function isVideoUrl(url: string | undefined | null): boolean {
  return Boolean(url && VIDEO_URL.test(url));
}

export async function rememberLoadedMedia(url: string | undefined | null) {
  if (!url || typeof window === "undefined") return;
  // Videos stream byte-range through <video>; a full fetch here would block the first frame.
  if (isVideoUrl(url)) return;
  if (remembered.has(url)) return;
  remembered.add(url);
  if (!("caches" in window)) return;

  try {
    const cache = await caches.open(MEDIA_CACHE);
    if (await cache.match(url)) return;
    const response = await fetch(url, {
      cache: "force-cache",
      mode: "cors",
      credentials: "omit",
    });
    if (response.ok) await cache.put(url, response.clone());
  } catch {
    remembered.delete(url);
  }
}
