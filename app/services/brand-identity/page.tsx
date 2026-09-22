import { Footer, Nav } from "@/components/chrome";
import { TopicPage } from "@/components/sections/TopicPage";
import { brandIdentityPage } from "@/lib/content";

export default function BrandIdentityServicePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <TopicPage copy={brandIdentityPage} />
      </main>
      <Footer />
    </>
  );
}
