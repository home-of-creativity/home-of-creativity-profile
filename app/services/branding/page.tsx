import { Footer, Nav } from "@/components/chrome";
import { TopicPage } from "@/components/sections/TopicPage";
import { relatedArticleLinks } from "@/lib/article-services-server";
import { brandingPage } from "@/lib/content";

export default async function BrandingServicePage() {
  const articles = await relatedArticleLinks("branding");
  return (
    <>
      <Nav />
      <main id="top">
        <TopicPage copy={brandingPage} articles={articles} />
      </main>
      <Footer />
    </>
  );
}
