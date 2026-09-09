"use client";

import { useEffect } from "react";
import { BASE_PATH } from "@/lib/base-path";
import { rememberVisit } from "@/lib/visit-cache";

const PRELOAD = [
  "/hummingbird.svg",
  "/photo/hero-section-background.webp",
  "/photo/about_us_background.webp",
];

export function CacheWorker() {
  useEffect(() => {
    rememberVisit();

    if (!("serviceWorker" in navigator)) return;

    const workerUrl = `${BASE_PATH}/sw.js`;
    void navigator.serviceWorker.register(workerUrl, { scope: `${BASE_PATH}/` }).catch(() => {
      /* private mode or unsupported */
    });

    if (!("caches" in window)) return;

    void caches.open("hoc-design-v3").then((cache) =>
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
