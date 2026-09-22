"use client";

import { useEffect, useState } from "react";
import { fetchArticle, type Article } from "@/lib/articles-api";
import { articlesPage } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { ArticleDetailStatic } from "./ArticleDetailStatic";

export function ArticleDetailLive({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    if (!slug.trim()) {
      setReady(true);
      return;
    }
    fetchArticle(slug)
      .then((row) => {
        if (active) setArticle(row);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!ready) {
    return <p className="px-6 py-28 text-center text-[0.95rem] text-[var(--brand-muted)]">{t(articlesPage.loading)}</p>;
  }

  if (!article) {
    return <p className="px-6 py-28 text-center text-[0.95rem] text-[var(--brand-muted)]">{t(articlesPage.notFound)}</p>;
  }

  return (
    <div data-article-slug={article.slug}>
      <ArticleDetailStatic article={article} />
    </div>
  );
}
