"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { pagePath } from "@/lib/base-path";

function Redirect() {
  const slug = useSearchParams().get("slug")?.trim() ?? "";

  useEffect(() => {
    if (!slug) return;
    window.location.replace(pagePath(`articles/${slug}`));
  }, [slug]);

  return null;
}

/** Old `/articles/?slug=` and `/articles/detail/?slug=` links. */
export function ArticleLegacyRedirect() {
  return (
    <Suspense fallback={null}>
      <Redirect />
    </Suspense>
  );
}
