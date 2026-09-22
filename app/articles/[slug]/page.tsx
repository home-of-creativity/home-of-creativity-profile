import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { ArticleDetailStatic } from "@/components/sections/ArticleDetailStatic";
import { fetchArticle, fetchArticles } from "@/lib/articles-api";
import { articleJsonLd } from "@/lib/seo";
import { pageDescription, pageTitle } from "@/lib/site";

/**
 * Next's static export requires a non-empty array here even when zero
 * articles exist (demo/local builds without an API). The placeholder slug
 * resolves to `notFound()` below, so it never produces an output file —
 * it only satisfies the `output: "export"` build requirement.
 */
export async function generateStaticParams() {
  const articles = await fetchArticles();
  if (articles.length === 0) return [{ slug: "__none__" }];
  return articles.map((article) => ({ slug: article.slug }));
}

function excerptFor(article: Awaited<ReturnType<typeof fetchArticle>>) {
  if (!article) return { en: "", ar: "" };
  const en = article.excerpt_en?.trim() || article.body_en.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  const ar = article.excerpt_ar?.trim() || article.body_ar.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  return { en, ar };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return {};

  const title = pageTitle(article.title_en, article.title_ar);
  const excerpt = excerptFor(article);
  const description = pageDescription(excerpt.en, excerpt.ar);
  const url = `/articles/${slug}/`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <Nav />
      <main id="top">
        <ArticleDetailStatic article={article} />
      </main>
      <Footer />
    </>
  );
}
