import { articlesForService } from "./article-services";
import { fetchArticles } from "./articles-api";

/** Build time: the CMS articles that point at a service page, titles only. */
export async function relatedArticleLinks(serviceSlug: string) {
  return articlesForService(serviceSlug, await fetchArticles()).map(({ slug, title_ar, title_en }) => ({
    slug,
    title_ar,
    title_en,
  }));
}
