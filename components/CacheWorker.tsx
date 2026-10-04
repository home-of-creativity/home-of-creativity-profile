"use client";

import { useEffect } from "react";
import { BASE_PATH } from "@/lib/base-path";
import { HERO_POSTER_DESKTOP, HERO_POSTER_MOBILE } from "@/lib/hero-media";
import { MEDIA_CACHE } from "@/lib/media-cache";
import { rememberVisit } from "@/lib/visit-cache";

/** The hero poster for this viewport only (same 800px split as the hero `<picture>`). */
function preloadPaths(): string[] {
  const poster = window.matchMedia("(min-width: 800px)").matches ? HERO_POSTER_DESKTOP : HERO_POSTER_MOBILE;
  return ["/hummingbird.svg", poster];
}

function whenIdle(run: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 1800 });
    return;
  }
  window.setTimeout(run, 400);
}

export function CacheWorker() {
  useEffect(() => {
    rememberVisit();

    whenIdle(() => {
      if ("serviceWorker" in navigator) {
        const workerUrl = `${BASE_PATH}/sw.js`.replace(/^\/?/, "/");
        const scope = BASE_PATH ? `${BASE_PATH}/` : "/";
        void navigator.serviceWorker.register(workerUrl, { scope }).catch(() => {
          /* private mode or unsupported */
        });
      }

      if (!("caches" in window)) return;

      void caches.open(MEDIA_CACHE).then((cache) =>
        Promise.all(
          preloadPaths().map((path) => {
            const url = `${BASE_PATH}${path}`;
            return cache.match(url).then((hit) => (hit ? undefined : cache.add(url).catch(() => undefined)));
          }),
        ),
      ).catch(() => {
        /* private mode blocks CacheStorage */
      });
    });
  }, []);

  return null;
}
