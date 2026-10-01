"use client";

import { useEffect, useState } from "react";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";
import { projectDetail } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { fetchPortfolioProject, type PortfolioProject } from "@/lib/portfolio-api";

function projectIdFromPath(pathname: string): string | null {
  const match = pathname.match(/\/projects\/(\d+)\/?$/);
  return match?.[1] ?? null;
}

/**
 * Detail page for a project published after the last site build.
 * The browser URL stays `/projects/{id}/`; this reads that id and the API.
 */
export function ProjectDetailLive() {
  const { t } = useLanguage();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    const id = projectIdFromPath(window.location.pathname);
    if (!id) {
      setStatus("missing");
      return;
    }

    let active = true;
    fetchPortfolioProject(id)
      .then((row) => {
        if (!active) return;
        if (!row) {
          setStatus("missing");
          return;
        }
        setProject(row);
        setStatus("ready");
        const title = row.title_ar || row.title_en;
        if (title) document.title = title;
      })
      .catch(() => {
        if (active) setStatus("missing");
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "ready" && project) {
    return <ProjectDetailView project={project} />;
  }

  return (
    <section className="project-detail-page pb-20 pt-[calc(var(--nav-height)+2rem)]">
      <p className="mx-auto w-[var(--content)] text-center text-[1.05rem] text-[var(--brand-ink)]">
        {status === "loading" ? t(projectDetail.loading) : t(projectDetail.notFound)}
      </p>
    </section>
  );
}
