"use client";

import { useEffect, type DependencyList, type RefObject } from "react";

type Gsap = typeof import("gsap").default;
type ScrollTriggerPlugin = typeof import("gsap/ScrollTrigger").ScrollTrigger;

export type GsapBundle = {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerPlugin;
};

let cached: GsapBundle | null = null;
let pending: Promise<GsapBundle> | null = null;

export function loadGsap(): Promise<GsapBundle> {
  if (cached) {
    return Promise.resolve(cached);
  }

  if (typeof window === "undefined") {
    return Promise.reject(new Error("GSAP is client-only"));
  }

  pending ??= (async () => {
    const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());

    cached = { gsap, ScrollTrigger };
    return cached;
  })();

  return pending;
}

export function useGsapScope(
  callback: (bundle: GsapBundle) => void | (() => void),
  options?: {
    scope?: RefObject<Element | null>;
    dependencies?: DependencyList;
  },
) {
  const scope = options?.scope;
  const deps = options?.dependencies ?? [];

  useEffect(() => {
    let cancelled = false;
    let localCleanup: void | (() => void);
    let ctx: ReturnType<Gsap["context"]> | undefined;

    void loadGsap().then((bundle) => {
      if (cancelled) return;

      const run = () => callback(bundle);

      const attach = (attempt = 0) => {
        if (cancelled) return;

        const element = scope?.current;
        if (element) {
          ctx = bundle.gsap.context(() => {
            localCleanup = run();
          }, element);
          return;
        }

        if (scope && attempt < 12) {
          requestAnimationFrame(() => attach(attempt + 1));
          return;
        }

        localCleanup = run();
      };

      if (scope) {
        attach();
      } else {
        localCleanup = run();
      }
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      if (typeof localCleanup === "function") {
        localCleanup();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
