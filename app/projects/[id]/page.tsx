import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";
import { publicApiUrl } from "@/lib/public-api";
import { fetchPortfolioProject, fetchPortfolioProjects } from "@/lib/portfolio-api";
import { projectJsonLd } from "@/lib/seo";
import { OG_IMAGE_PATH, SITE_URL, pageDescription, pageTitle } from "@/lib/site";

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
    openGraph: {
      title,
      description,
      url,
      images: [{ url: `${SITE_URL}${OG_IMAGE_PATH}`, width: 1920, height: 1080, alt: title }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listed = (await fetchPortfolioProjects()).find((item) => String(item.id) === id) ?? null;
  const project = (await fetchPortfolioProject(id)) ?? listed;
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
