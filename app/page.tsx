import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";
import { JsonLd } from "@/components/JsonLd";
import { SeoCrawlerCopy } from "@/components/SeoCrawlerCopy";
import { VisibleFacts } from "@/components/VisibleFacts";
import { withOptimizedLogos } from "@/lib/client-logos";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { fetchPortfolioProjects, fetchShowcaseClients } from "@/lib/portfolio-api";
import { fetchLandingReels } from "@/lib/reels-api";
import { withBasePath } from "@/lib/base-path";
import { HERO_POSTER_DESKTOP, HERO_POSTER_MOBILE } from "@/lib/hero-media";
import { homeJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageSeo.home, path: "/" });

/** Client names, projects and reels are read at build time so they are in the static HTML. */
export default async function HomePage() {
  const [clients, projects, reels] = await Promise.all([
    fetchShowcaseClients(),
    fetchPortfolioProjects().then((rows) => rows.filter((project) => project.id < 1 || project.id > 6)),
    fetchLandingReels(),
  ]);

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={withBasePath(HERO_POSTER_MOBILE)}
        media="(max-width: 799px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={withBasePath(HERO_POSTER_DESKTOP)}
        media="(min-width: 800px)"
        fetchPriority="high"
      />
      <JsonLd data={homeJsonLd()} />
      <SeoCrawlerCopy />
      <VisibleFacts />
      <HomeView clients={withOptimizedLogos(clients)} projects={projects} reels={reels} />
    </>
  );
}
