export const MEDIA_CACHE = "hoc-design-v5";

const remembered = new Set<string>();

export async function rememberLoadedMedia(url: string | undefined | null) {
  if (!url || typeof window === "undefined") return;
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
