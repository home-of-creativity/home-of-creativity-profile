const CACHE = "hoc-design-v2";
const BASE = "/home-of-creativity-profile";
const PRECACHE = [
  `${BASE}/hummingbird.svg`,
  `${BASE}/photo/hero-section-background.webp`,
  `${BASE}/photo/about_us_background.webp`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

function shouldBypass(request) {
  if (request.method !== "GET") return true;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return true;
  const path = url.pathname;
  return (
    path.includes("hot-update") ||
    path.includes("webpack-hmr") ||
    path.includes("/_next/webpack") ||
    request.headers.get("accept")?.includes("text/event-stream") === true
  );
}

function isMedia(url) {
  return /\.(webp|png|jpe?g|gif|svg|avif|woff2?|ttf)$/i.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  if (shouldBypass(event.request)) return;

  const url = new URL(event.request.url);

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(event.request);

      if (isMedia(url) && cached) {
        return cached;
      }

      try {
        const response = await fetch(event.request);
        if (response && response.ok && response.type === "basic") {
          cache.put(event.request, response.clone());
        }
        return response;
      } catch {
        if (cached) return cached;
        throw new Error("offline");
      }
    }),
  );
});
