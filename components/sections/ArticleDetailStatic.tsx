import Link from "next/link";
import type { Article } from "@/lib/articles-api";
import { pagePath } from "@/lib/base-path";
import { serviceLinksForArticle } from "@/lib/article-services";
import { articlesPage } from "@/lib/content";
import { serviceDetailLabels } from "@/lib/service-details";
import { LangHeading } from "@/components/LangHeading";

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
 * Projects 1–6 were removed (the server answers 410), but older article bodies in the CMS
 * still link to them. Point those links at the live projects section instead.
 */
const REMOVED_PROJECT_HREF = /href="(?:https?:\/\/(?:www\.)?hoc\.agency)?\/projects\/[1-6]\/?"/g;

function withLiveProjectLinks(html: string): string {
  return html.replace(REMOVED_PROJECT_HREF, 'href="/#projects"');
}

/** The first image in a CMS body is the article's main picture (its LCP): load it at once. */
function withEagerLeadImage(html: string): string {
  return html.replace(/<img\b[^>]*>/i, (tag) =>
    tag
      .replace(/\s(?:loading|fetchpriority)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/^<img\b/i, '<img loading="eager" fetchpriority="high"'),
  );
}

function articleHtml(html: string): string {
  return withEagerLeadImage(withLiveProjectLinks(html));
}

function RelatedServices({ slug, locale }: { slug: string; locale: "en" | "ar" }) {
  const services = serviceLinksForArticle(slug);
  if (services.length === 0) return null;

  return (
    <nav className="article-related mx-auto mt-10 max-w-3xl" aria-label={serviceDetailLabels.related[locale]}>
      <h2 className="article-related-title">{serviceDetailLabels.related[locale]}</h2>
      <ul>
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={pagePath(`services/${service.slug}`)}>{service.title[locale]}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
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
            <LangHeading lang="ar" className="article-detail-title">{article.title_ar}</LangHeading>
          </header>
          <article
            className="article-body mx-auto max-w-3xl"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: articleHtml(article.body_ar) }}
          />
          <RelatedServices slug={article.slug} locale="ar" />
        </div>

        <div data-lang="en" dir="ltr" lang="en">
          <Link href={pagePath("articles")} className="article-back-link">
            {articlesPage.back.en}
          </Link>
          <header className="article-detail-head">
            {dateEn ? <time className="article-card-date">{dateEn}</time> : null}
            <LangHeading lang="en" className="article-detail-title">{article.title_en}</LangHeading>
          </header>
          <article
            className="article-body mx-auto max-w-3xl"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: articleHtml(article.body_en) }}
          />
          <RelatedServices slug={article.slug} locale="en" />
        </div>
      </div>
    </section>
  );
}
