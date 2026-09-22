import { Footer, Nav } from "@/components/chrome";
import { ArticlesIndex } from "@/components/sections/ArticlesIndex";
import { fetchArticles } from "@/lib/articles-api";

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <>
      <Nav />
      <main id="top">
        <ArticlesIndex articles={articles} />
      </main>
      <Footer />
    </>
  );
}
