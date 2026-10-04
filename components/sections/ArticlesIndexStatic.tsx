import Link from "next/link";
import type { Article } from "@/lib/articles-api";
import { pagePath } from "@/lib/base-path";
import { articlesPage } from "@/lib/content";
import { LangHeading } from "@/components/LangHeading";

function excerpt(article: Article, locale: "ar" | "en") {
  const raw = locale === "ar" ? article.excerpt_ar : article.excerpt_en;
  if (raw?.trim()) return raw.trim();
  const body = locale === "ar" ? article.body_ar : article.body_en;
  return body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
}

function formatDate(value: string | null | undefined, locale: "ar" | "en") {
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
 * Article cards baked into the static HTML. Both languages are present;
 * `[data-lang]` shows the visitor's locale.
 */
export function ArticlesIndexStatic({ articles }: { articles: Article[] }) {
  return (
    <section className="articles-page bg-[var(--brand-cream)] py-24 md:py-28">
      <div className="mx-auto w-[var(--content)]">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <p className="text-[0.78rem] font-semibold tracking-[0.16em] text-[var(--brand-orange-ink)] uppercase" data-lang="ar">
            {articlesPage.kicker.ar}
          </p>
          <p className="text-[0.78rem] font-semibold tracking-[0.16em] text-[var(--brand-orange-ink)] uppercase" data-lang="en">
            {articlesPage.kicker.en}
          </p>
          <LangHeading lang="ar" tagged className="font-display mt-3 text-[2rem] font-semibold text-[var(--brand-ink)] md:text-[2.6rem]">
            {articlesPage.title.ar}
          </LangHeading>
          <LangHeading lang="en" tagged className="font-display mt-3 text-[2rem] font-semibold text-[var(--brand-ink)] md:text-[2.6rem]">
            {articlesPage.title.en}
          </LangHeading>
          <p className="mt-5 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/75" data-lang="ar">
            {articlesPage.lead.ar}
          </p>
          <p className="mt-5 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/75" data-lang="en">
            {articlesPage.lead.en}
          </p>
        </header>

        {articles.length === 0 ? (
          <>
            <p className="text-center text-[0.95rem] text-[var(--brand-muted)]" data-lang="ar">
              {articlesPage.empty.ar}
            </p>
            <p className="text-center text-[0.95rem] text-[var(--brand-muted)]" data-lang="en">
              {articlesPage.empty.en}
            </p>
          </>
        ) : (
          <div className="articles-grid" role="list">
            {articles.map((article) => {
              const href = pagePath(`articles/${article.slug}`);
              const dateAr = formatDate(article.published_at ?? article.created_at, "ar");
              const dateEn = formatDate(article.published_at ?? article.created_at, "en");
              return (
                <article key={article.id} className="article-card group" role="listitem">
                  <div data-lang="ar" dir="rtl" lang="ar">
                    {dateAr ? <time className="article-card-date">{dateAr}</time> : null}
                    <h2 className="article-card-title">
                      <Link href={href}>{article.title_ar}</Link>
                    </h2>
                    <p className="article-card-excerpt">{excerpt(article, "ar")}</p>
                    <Link href={href} className="article-card-link">
                      {articlesPage.readMore.ar}
                    </Link>
                  </div>
                  <div data-lang="en" dir="ltr" lang="en">
                    {dateEn ? <time className="article-card-date">{dateEn}</time> : null}
                    <h2 className="article-card-title">
                      <Link href={href}>{article.title_en}</Link>
                    </h2>
                    <p className="article-card-excerpt">{excerpt(article, "en")}</p>
                    <Link href={href} className="article-card-link">
                      {articlesPage.readMore.en}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
