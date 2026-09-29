import Link from "next/link";
import type { Article } from "@/lib/articles-api";
import { pagePath } from "@/lib/base-path";
import { articlesPage } from "@/lib/content";

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

/**
 * Server-rendered, bilingual article body — no client fetch. Both `lang="ar"`
 * and `lang="en"` blocks are baked into the static HTML so crawlers see the
 * full text; `[data-lang]` CSS (see `globals.css`) shows only the block that
 * matches the visitor's locale.
 */
export function ArticleDetailStatic({ article }: { article: Article }) {
  const dateAr = formatDate(article.published_at ?? article.created_at, "ar");
  const dateEn = formatDate(article.published_at ?? article.created_at, "en");

  return (
    <section className="articles-page bg-[var(--brand-cream)] py-24 md:py-28">
      <div className="mx-auto w-[var(--content)]">
        <div data-lang="ar" dir="rtl" lang="ar">
          <Link href={pagePath("articles")} className="article-back-link">
            العودة للمقالات
          </Link>
          <header className="article-detail-head">
            {dateAr ? <time className="article-card-date">{dateAr}</time> : null}
            <h1 className="article-detail-title">{article.title_ar}</h1>
          </header>
          <article
            className="article-body mx-auto max-w-3xl"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: article.body_ar }}
          />
        </div>

        <div data-lang="en" dir="ltr" lang="en">
          <Link href={pagePath("articles")} className="article-back-link">
            {articlesPage.back.en}
          </Link>
          <header className="article-detail-head">
            {dateEn ? <time className="article-card-date">{dateEn}</time> : null}
            <h1 className="article-detail-title">{article.title_en}</h1>
          </header>
          <article
            className="article-body mx-auto max-w-3xl"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: article.body_en }}
          />
        </div>
      </div>
    </section>
  );
}
