"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchArticles, type Article } from "@/lib/articles-api";
import { articlesPage } from "@/lib/content";
import { pagePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

function articleHref(slug: string) {
  return `${pagePath("articles/detail")}?slug=${encodeURIComponent(slug)}`;
}

function localizedTitle(article: Article, locale: "en" | "ar") {
  return locale === "ar" ? article.title_ar : article.title_en;
}

function localizedExcerpt(article: Article, locale: "en" | "ar") {
  const excerpt = locale === "ar" ? article.excerpt_ar : article.excerpt_en;
  if (excerpt?.trim()) return excerpt.trim();
  const body = locale === "ar" ? article.body_ar : article.body_en;
  return body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
}

function formatDate(value: string | null | undefined, locale: "en" | "ar") {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Live list from the dashboard API. The static export cannot know slugs added after the last build. */
export function ArticlesIndex() {
  const { locale, t } = useLanguage();
  const [items, setItems] = useState<Article[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    fetchArticles()
      .then((rows) => {
        if (active) setItems(rows);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="articles-page bg-[var(--brand-cream)] py-24 md:py-28">
      <Shell>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <SectionHeading kicker={articlesPage.kicker} title={articlesPage.title} align="center" level={1} />
          <p className="mt-5 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/75">{t(articlesPage.lead)}</p>
        </Reveal>

        {!ready ? (
          <p className="text-center text-[0.95rem] text-[var(--brand-muted)]">{t(articlesPage.loading)}</p>
        ) : items.length === 0 ? (
          <p className="text-center text-[0.95rem] text-[var(--brand-muted)]">{t(articlesPage.empty)}</p>
        ) : (
          <Stagger className="articles-grid" role="list">
            {items.map((article) => {
              const date = formatDate(article.published_at ?? article.created_at, locale);
              return (
                <StaggerItem key={article.id} role="listitem">
                  <article className="article-card group">
                    {date ? <time className="article-card-date">{date}</time> : null}
                    <h2 className="article-card-title">{localizedTitle(article, locale)}</h2>
                    <p className="article-card-excerpt">{localizedExcerpt(article, locale)}</p>
                    <Link href={articleHref(article.slug)} className="article-card-link">
                      {t(articlesPage.readMore)}
                    </Link>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </Shell>
    </section>
  );
}
