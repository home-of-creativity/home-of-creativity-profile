"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { ArticleDetailLive } from "@/components/sections/ArticleDetailLive";
import { articlesPage } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

function ArticleByQuery() {
  const params = useSearchParams();
  const slug = params.get("slug")?.trim() ?? "";
  return <ArticleDetailLive slug={slug} />;
}

function LoadingLine() {
  const { t } = useLanguage();
  return <p className="px-6 py-28 text-center text-[0.95rem] text-[var(--brand-muted)]">{t(articlesPage.loading)}</p>;
}

export default function ArticleQueryPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Suspense fallback={<LoadingLine />}>
          <ArticleByQuery />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
