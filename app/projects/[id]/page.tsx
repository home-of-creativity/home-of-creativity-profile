import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";
import { publicApiUrl } from "@/lib/public-api";
import { fetchPortfolioProject, fetchPortfolioProjects } from "@/lib/portfolio-api";
import { projectJsonLd } from "@/lib/seo";
import { pageDescription, pageTitle } from "@/lib/site";

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
  if (projects.length === 0) return [{ id: "__none__" }];
  return projects.map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchPortfolioProject(id);
  if (!project) return {};

  const title = pageTitle(project.title_en, project.title_ar);
  const description = pageDescription(
    project.summary_en ?? project.title_en,
    project.summary_ar ?? project.title_ar,
  );
  const url = `/projects/${id}/`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchPortfolioProject(id);
  if (!project) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <Nav />
      <main id="top">
        <ProjectDetailView project={project} />
      </main>
      <Footer />
    </>
  );
}
