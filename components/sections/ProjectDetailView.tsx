"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { projectDetail } from "@/lib/content";
import { fetchPortfolioProject, type PortfolioProject, type PortfolioProjectImage } from "@/lib/portfolio-api";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Shell } from "../ui";

const SOCIAL_ORDER = ["instagram", "facebook", "linkedin", "x", "tiktok", "youtube"] as const;

function localizedTitle(project: PortfolioProject, locale: "en" | "ar") {
  return locale === "ar" ? project.title_ar : project.title_en;
}

function localizedSummary(project: PortfolioProject, locale: "en" | "ar") {
  return locale === "ar" ? project.summary_ar : project.summary_en;
}

function localizedCategory(project: PortfolioProject, locale: "en" | "ar") {
  if (!project.category) return "";
  return locale === "ar" ? project.category.name_ar : project.category.name_en;
}

function localizedAlt(image: PortfolioProjectImage, locale: "en" | "ar", fallback: string) {
  const alt = locale === "ar" ? image.alt_ar : image.alt_en;
  return alt || fallback;
}

function allImages(project: PortfolioProject, locale: "en" | "ar") {
  const title = localizedTitle(project, locale);
  const cover = project.image_url
    ? [{ id: 0, image_url: project.image_url, alt_en: title, alt_ar: title, sort_order: 0, featured: true }]
    : [];
  const gallery = project.images ?? [];
  const merged = [...cover, ...gallery.filter((image) => image.image_url && image.image_url !== project.image_url)];
  return merged.filter((image) => image.image_url);
}

export function ProjectDetailView({ id }: { id: string }) {
  const { t, locale } = useLanguage();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchPortfolioProject(id)
      .then(setProject)
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  const images = useMemo(() => (project ? allImages(project, locale) : []), [project, locale]);
  const socialEntries = useMemo(
    () =>
      project
        ? SOCIAL_ORDER.flatMap((platform) => {
            const url = project.social_links?.[platform];
            return url ? [{ platform, url }] : [];
          })
        : [],
    [project],
  );

  if (loading) {
    return (
      <section className="project-detail-page py-24">
        <Shell>
          <p className="muted text-[var(--brand-muted)]">{locale === "ar" ? "جارٍ التحميل…" : "Loading…"}</p>
        </Shell>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="project-detail-page py-24">
        <Shell>
          <p className="text-[var(--brand-muted)]">{t(projectDetail.notFound)}</p>
          <Link href="/#projects" className="project-detail-back mt-6 inline-flex">
            {t(projectDetail.back)}
          </Link>
        </Shell>
      </section>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <section className="project-detail-page pb-20 pt-[calc(var(--nav-height)+2rem)]">
      <Shell>
          <Link href="/#projects" className="project-detail-back inline-flex">
            {t(projectDetail.back)}
          </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-5">
            <p
              className={cn(
                "m-0 text-[0.78rem] uppercase text-[var(--brand-orange)]",
                locale === "ar" ? "tracking-normal" : "tracking-[0.24em]",
              )}
            >
              {localizedCategory(project, locale)}
            </p>
            <h1 className="font-display m-0 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.02] text-[var(--brand-ink)]">
              {localizedTitle(project, locale)}
            </h1>
            {localizedSummary(project, locale) ? (
              <p className="m-0 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--brand-muted)]">
                {localizedSummary(project, locale)}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              {project.website_url ? (
                <a
                  href={project.website_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="project-detail-link project-detail-link--primary"
                >
                  {t(projectDetail.visitWebsite)}
                </a>
              ) : null}
              {socialEntries.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="project-detail-link"
                >
                  {t(projectDetail.social[platform])}
                </a>
              ))}
            </div>
          </div>

          {activeImage?.image_url ? (
            <div className="overflow-hidden rounded-[1.4rem] border border-[var(--brand-line)] bg-[var(--brand-purple-deep)] shadow-[var(--shadow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.image_url}
                alt={localizedAlt(activeImage, locale, localizedTitle(project, locale))}
                referrerPolicy="no-referrer"
                className="block aspect-[4/3] w-full object-cover"
              />
            </div>
          ) : null}
        </div>

        {images.length > 0 ? (
          <div className="mt-14">
            <h2 className="font-display m-0 text-[1.8rem] font-semibold text-[var(--brand-ink)]">
              {t(projectDetail.gallery)}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <button
                  key={`${image.id}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "project-detail-thumb overflow-hidden rounded-2xl border bg-white text-start transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                    index === activeIndex
                      ? "border-[var(--brand-orange)] ring-2 ring-[var(--brand-orange)]/25"
                      : "border-[var(--brand-line)]",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.image_url ?? ""}
                    alt={localizedAlt(image, locale, localizedTitle(project, locale))}
                    referrerPolicy="no-referrer"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12">
          <Link href="/#projects" className="project-detail-back inline-flex">
            {t(projectDetail.back)}
          </Link>
        </div>
      </Shell>
    </section>
  );
}
