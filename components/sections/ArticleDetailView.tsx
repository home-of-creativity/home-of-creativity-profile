"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchArticle, type Article } from "@/lib/articles-api";
import { withBasePath } from "@/lib/base-path";
import { articlesPage } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { Shell } from "../ui";

function formatDate(value: string | null | undefined, locale: "en" | "ar") {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ArticleDetailView({ slug }: { slug: string }) {
  const { locale, t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticle(slug)
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="articles-page py-24">
        <Shell>
          <p className="text-[var(--brand-muted)]">{t(articlesPage.loading)}</p>
        </Shell>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="articles-page py-24">
        <Shell>
          <p className="text-[var(--brand-muted)]">{t(articlesPage.notFound)}</p>
          <Link href={withBasePath("/articles/")} className="article-back-link">
            {t(articlesPage.back)}
          </Link>
        </Shell>
      </section>
    );
  }

  const title = locale === "ar" ? article.title_ar : article.title_en;
  const body = locale === "ar" ? article.body_ar : article.body_en;
  const date = formatDate(article.published_at ?? article.created_at, locale);

  return (
    <section className="articles-page bg-[var(--brand-cream)] py-24 md:py-28">
      <Shell>
        <Link href={withBasePath("/articles/")} className="article-back-link">
          {t(articlesPage.back)}
        </Link>
        <header className="article-detail-head">
          {date ? <time className="article-card-date">{date}</time> : null}
          <h1 className="article-detail-title">{title}</h1>
        </header>
        <article
          className="article-body mx-auto max-w-3xl"
          dir={locale === "ar" ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </Shell>
    </section>
  );
}
