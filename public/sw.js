const CACHE = "hoc-design-v7";
const BASE = new URL("./", self.registration.scope).pathname.replace(/\/$/, "");
const PRECACHE = [
  `${BASE}/hummingbird.svg`,
  `${BASE}/photo/hero-section-background.webp`,
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
  if (isMedia(url)) return false;
  const path = url.pathname;
  return (
    path.startsWith("/dashboard") ||
    path.startsWith("/staff") ||
    path.startsWith("/api") ||
    path.startsWith("/auth") ||
    path.startsWith("/storage") ||
    path.includes("hot-update") ||
    path.includes("webpack-hmr") ||
    path.includes("/_next/webpack") ||
    request.headers.get("accept")?.includes("text/event-stream") === true
  );
}

function isMedia(url) {
  return (
    /\.(webp|png|jpe?g|gif|svg|avif|woff2?|ttf|mp4|webm|ogg|m4v|mov)(\?|$)/i.test(url.pathname) ||
    /fbcdn|cdninstagram|instagram\.|googleusercontent|ggpht|drive\.google|googleapis/i.test(url.hostname)
  );
}

self.addEventListener("fetch", (event) => {
  if (shouldBypass(event.request)) return;

  const url = new URL(event.request.url);
  const media = isMedia(url);
  if (url.origin !== self.location.origin && !media) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(event.request);

      if (media && cached) {
        return cached;
      }

      try {
        const response = await fetch(event.request);
        if (response && (response.ok || response.type === "opaque") && response.type !== "error") {
          const type = response.headers.get("content-type") || "";
          if (response.type === "opaque" || (media && !type.includes("text/html"))) {
            cache.put(event.request, response.clone());
          } else if (!type.includes("text/html") && !type.includes("application/json")) {
            cache.put(event.request, response.clone());
          }
        }
        return response;
      } catch {
        if (cached) return cached;
        throw new Error("offline");
      }
    }),
  );
});
