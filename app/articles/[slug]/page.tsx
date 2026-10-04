import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { JsonLd } from "@/components/JsonLd";
import { ArticleDetailStatic } from "@/components/sections/ArticleDetailStatic";
import { fetchArticle, fetchArticles } from "@/lib/articles-api";
import { articleSeoTitle } from "@/lib/article-seo";
import { brandedTitle, brandedTitleEn, clampDescription, pageMetadata, pageSeo } from "@/lib/page-meta";
import { articleJsonLd } from "@/lib/seo";
import { OG_IMAGE_PATH } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await fetchArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) {
    return { title: brandedTitle("Article"), robots: { index: false, follow: false } };
  }

  const description = clampDescription(
    article.excerpt_ar || article.body_ar,
    pageSeo.articles.description,
  );

  return pageMetadata({
    title: articleSeoTitle(article),
    titleEn: article.title_en ? brandedTitleEn(article.title_en) : undefined,
    description,
    path: `/articles/${article.slug}/`,
    type: "article",
    image: { url: OG_IMAGE_PATH, width: 1920, height: 1080, alt: article.title_ar },
  });
}

export default async function ArticleRoutePage({ params }: Params) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) notFound();

  const description = clampDescription(article.excerpt_ar || article.body_ar, pageSeo.articles.description);

  return (
    <>
      <JsonLd data={articleJsonLd(article, description)} />
      <Nav />
      <main id="top">
        <ArticleDetailStatic article={article} />
      </main>
      <Footer />
    </>
  );
}
