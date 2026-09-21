"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { ArticleDetailView } from "@/components/sections/ArticleDetailView";

function ArticleDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";

  return <ArticleDetailView slug={slug} />;
}

export default function ArticleDetailPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Suspense fallback={<div className="articles-page py-24" />}>
          <ArticleDetailContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
