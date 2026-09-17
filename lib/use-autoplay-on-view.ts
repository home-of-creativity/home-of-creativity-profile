"use client";

import { useEffect, type RefObject } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useAutoplayOnView(
  ref: RefObject<HTMLVideoElement | null>,
  root?: RefObject<Element | null>,
  src?: string,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;

    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    el.playsInline = true;

    if (prefersReducedMotion()) {
      el.pause();
      el.controls = true;
      return;
    }

    const play = () => {
      el.muted = true;
      const attempt = el.play();
      if (attempt) void attempt.catch(() => undefined);
    };

    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && entry.intersectionRatio >= 0.2) {
          play();
        } else if (!entry?.isIntersecting) {
          el.pause();
        }
      },
      { root: root?.current ?? null, threshold: [0, 0.2, 0.45, 0.7], rootMargin: "80px 0px" },
    );

    observer.observe(el);
    el.addEventListener("loadeddata", play);
    el.addEventListener("canplay", play);
    play();

    return () => {
      el.removeEventListener("loadeddata", play);
      el.removeEventListener("canplay", play);
      observer.disconnect();
    };
  }, [ref, root, src]);
}
