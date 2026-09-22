import Link from "next/link";
import type { Article } from "@/lib/articles-api";
import { articlesPage } from "@/lib/content";
import { pagePath } from "@/lib/base-path";

function articleHref(slug: string) {
  return pagePath(`articles/${slug}`);
}

function excerpt(article: Article, locale: "en" | "ar") {
  const value = locale === "ar" ? article.excerpt_ar : article.excerpt_en;
  if (value?.trim()) return value.trim();
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

/**
 * Titles, excerpts, and links are in the server HTML for both languages.
 * There is no loading state: an empty list is the empty copy, already in the HTML.
 */
export function ArticlesIndex({ articles }: { articles: Article[] }) {
  return (
    <section className="articles-page bg-[var(--brand-cream)] py-24 md:py-28">
      <div className="mx-auto w-[var(--content)]">
        <IndexLocale articles={articles} locale="ar" />
        <IndexLocale articles={articles} locale="en" />
      </div>
    </section>
  );
}

function IndexLocale({ articles, locale }: { articles: Article[]; locale: "en" | "ar" }) {
  return (
    <div data-lang={locale} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
        <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--brand-orange)]">
          {articlesPage.kicker[locale]}
        </p>
        <h1 className="font-display mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] text-[var(--brand-ink)]">
          {articlesPage.title[locale]}
        </h1>
        <p className="mt-5 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/75">{articlesPage.lead[locale]}</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-center text-[0.95rem] text-[var(--brand-muted)]">{articlesPage.empty[locale]}</p>
      ) : (
        <div className="articles-grid" role="list">
          {articles.map((article) => {
            const date = formatDate(article.published_at ?? article.created_at, locale);
            return (
              <article key={article.slug} className="article-card group" role="listitem">
                {date ? <time className="article-card-date">{date}</time> : null}
                <h2 className="article-card-title">{locale === "ar" ? article.title_ar : article.title_en}</h2>
                <p className="article-card-excerpt">{excerpt(article, locale)}</p>
                <Link href={articleHref(article.slug)} className="article-card-link">
                  {articlesPage.readMore[locale]}
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
