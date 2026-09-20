const CACHE = "hoc-design-v9";
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

function isThirdPartyCdn(url) {
  return /fbcdn|cdninstagram|instagram\.|facebook\.|googleusercontent|ggpht|drive\.google|googleapis|gstatic|maps\.google/i.test(
    url.hostname,
  );
}

function shouldBypass(request) {
  if (request.method !== "GET") return true;
  const url = new URL(request.url);
  // Let the browser own video, Maps, and social CDNs. Intercepting those
  // yields opaque responses that cannot be reused for cors/preload fetches.
  if (request.headers.has("range") || isVideo(url) || isThirdPartyCdn(url)) return true;
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

function isVideo(url) {
  return /\.(mp4|webm|ogv|ogg|m4v|mov)(\?|$)/i.test(url.pathname);
}

function isMedia(url) {
  return /\.(webp|png|jpe?g|gif|svg|avif|woff2?|ttf)(\?|$)/i.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  if (shouldBypass(event.request)) return;

  const url = new URL(event.request.url);
  const media = isMedia(url);
  if (url.origin !== self.location.origin && !media) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(event.request);

      if (media && cached && cached.type !== "opaque") {
        return cached;
      }

      try {
        const response = await fetch(event.request);
        const storable =
          response &&
          response.type !== "error" &&
          response.type !== "opaque" &&
          response.status === 200;
        if (storable) {
          const type = response.headers.get("content-type") || "";
          if (type.startsWith("video/")) {
            return response;
          }
          if (media && !type.includes("text/html")) {
            void cache.put(event.request, response.clone()).catch(() => undefined);
          } else if (!type.includes("text/html") && !type.includes("application/json")) {
            void cache.put(event.request, response.clone()).catch(() => undefined);
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
