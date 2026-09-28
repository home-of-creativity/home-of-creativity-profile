"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Footer, Nav } from "@/components/chrome";
import { pagePath } from "@/lib/base-path";

function LegacyArticleRedirect() {
  const params = useSearchParams();
  const slug = params.get("slug")?.trim() ?? "";

  useEffect(() => {
    const next = slug ? pagePath(`articles/${slug}`) : pagePath("articles");
    window.location.replace(next);
  }, [slug]);

  return null;
}

/** Old `?slug=` links. Caddy also 301s this path; this covers static hosts. */
export default function ArticleQueryPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Suspense fallback={null}>
          <LegacyArticleRedirect />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
