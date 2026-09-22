import { Footer, Nav } from "@/components/chrome";
import { TopicPage } from "@/components/sections/TopicPage";
import { brandingPage } from "@/lib/content";

export default function BrandingServicePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <TopicPage copy={brandingPage} />
      </main>
      <Footer />
    </>
  );
}
