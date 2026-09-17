"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

type InViewOptions = {
  root?: RefObject<Element | null>;
  rootMargin?: string;
  disabled?: boolean;
};

export function useInViewOnce(
  ref: RefObject<Element | null>,
  { root, rootMargin = "280px 0px", disabled = false }: InViewOptions = {},
) {
  const [visible, setVisible] = useState(disabled);

  useLayoutEffect(() => {
    if (disabled) {
      setVisible(true);
      return;
    }
    if (visible) return;

    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      {
        root: root?.current ?? null,
        rootMargin,
        threshold: 0.01,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [disabled, ref, root, rootMargin, visible]);

  return visible;
}
