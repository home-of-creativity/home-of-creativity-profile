import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";
import { JsonLd } from "@/components/JsonLd";
import { SeoCrawlerCopy } from "@/components/SeoCrawlerCopy";
import { withOptimizedLogos } from "@/lib/client-logos";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { fetchPortfolioProjects, fetchShowcaseClients } from "@/lib/portfolio-api";
import { fetchLandingReels } from "@/lib/reels-api";
import { homeJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageSeo.home, path: "/" });

/** Client names, projects and reels are read at build time so they are in the static HTML. */
export default async function HomePage() {
  const [clients, projects, reels] = await Promise.all([
    fetchShowcaseClients(),
    fetchPortfolioProjects(),
    fetchLandingReels(),
  ]);

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <SeoCrawlerCopy />
      <HomeView clients={withOptimizedLogos(clients)} projects={projects} reels={reels} />
    </>
  );
}
