"use client";

import { useEffect } from "react";
import { BASE_PATH } from "@/lib/base-path";
import { MEDIA_CACHE } from "@/lib/media-cache";
import { rememberVisit } from "@/lib/visit-cache";

const PRELOAD = ["/hummingbird.svg", "/photo/hero-section-background.webp"];

export function CacheWorker() {
  useEffect(() => {
    rememberVisit();

    if (!("serviceWorker" in navigator)) return;

    const workerUrl = `${BASE_PATH}/sw.js`.replace(/^\/?/, "/");
    const scope = BASE_PATH ? `${BASE_PATH}/` : "/";
    void navigator.serviceWorker.register(workerUrl, { scope }).catch(() => {
      /* private mode or unsupported */
    });

    if (!("caches" in window)) return;

    void caches.open(MEDIA_CACHE).then((cache) =>
      Promise.all(
        PRELOAD.map((path) => {
          const url = `${BASE_PATH}${path}`;
          return cache.match(url).then((hit) => (hit ? undefined : cache.add(url).catch(() => undefined)));
        }),
      ),
    );
  }, []);

  return null;
}
