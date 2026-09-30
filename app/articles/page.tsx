import { Footer, Nav } from "@/components/chrome";
import { ArticleLegacyRedirect } from "@/components/sections/ArticleLegacyRedirect";
import { ArticlesIndexStatic } from "@/components/sections/ArticlesIndexStatic";
import { fetchArticles } from "@/lib/articles-api";

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <>
      <Nav />
      <main id="top">
        <ArticleLegacyRedirect />
        <ArticlesIndexStatic articles={articles} />
      </main>
      <Footer />
    </>
  );
}
