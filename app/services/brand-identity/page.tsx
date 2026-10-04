import { Footer, Nav } from "@/components/chrome";
import { TopicPage } from "@/components/sections/TopicPage";
import { relatedArticleLinks } from "@/lib/article-services-server";
import { brandIdentityPage } from "@/lib/content";

export default async function BrandIdentityServicePage() {
  const articles = await relatedArticleLinks("brand-identity");
  return (
    <>
      <Nav />
      <main id="top">
        <TopicPage copy={brandIdentityPage} articles={articles} />
      </main>
      <Footer />
    </>
  );
}
