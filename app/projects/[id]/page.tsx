import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";
import { publicApiUrl } from "@/lib/public-api";
import { fetchPortfolioProject, fetchPortfolioProjects } from "@/lib/portfolio-api";
import { projectJsonLd } from "@/lib/seo";
import { brandedTitle, brandedTitleEn, clampDescription, pageMetadata, pageSeo } from "@/lib/page-meta";
import { OG_IMAGE_PATH } from "@/lib/site";

/**
 * Demo/static deploys (no real backend configured) intentionally get zero
 * pages here — the GEO audit calls for real, canonical project URLs only,
 * not one per `demoPortfolioProjects()` fallback name. Next's static export
 * still requires a non-empty array, so a placeholder id is used; it resolves
 * to `notFound()` below and never produces an output file.
 */
export async function generateStaticParams() {
  if (!publicApiUrl()) return [{ id: "__none__" }];
  const projects = await fetchPortfolioProjects();
  if (projects.length === 0) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Portfolio API returned no projects. Refusing to export /projects without real ids.");
    }
    return [{ id: "__none__" }];
  }
  return projects
    .filter((project) => project.id < 1 || project.id > 6)
    .map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchPortfolioProject(id);
  if (!project) return {};

  return pageMetadata({
    title: brandedTitle(project.title_ar || project.title_en),
    titleEn: project.title_en ? brandedTitleEn(project.title_en) : undefined,
    description: clampDescription(project.summary_ar ?? project.title_ar, pageSeo.home.description),
    path: `/projects/${id}/`,
    type: "article",
    image: project.image_url
      ? { url: project.image_url, alt: project.title_ar || project.title_en }
      : { url: OG_IMAGE_PATH, width: 1920, height: 1080, alt: project.title_ar || project.title_en },
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const all = await fetchPortfolioProjects();
  const listed = all.find((item) => String(item.id) === id) ?? null;
  const found = (await fetchPortfolioProject(id)) ?? listed;
  if (!found) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(found)) }}
      />
      <Nav />
      <main id="top">
        <ProjectDetailView project={found} />
      </main>
      <Footer />
    </>
  );
}
