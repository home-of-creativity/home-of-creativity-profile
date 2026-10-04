"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { pagePath } from "@/lib/base-path";
import { projectDetail } from "@/lib/content";
import { fetchPortfolioProject, versionedMediaUrl, type PortfolioProject, type PortfolioProjectImage, type PortfolioRelatedProject } from "@/lib/portfolio-api";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { liveWebsiteUrl } from "@/lib/live-url";
import { Shell } from "../ui";

const SOCIAL_ORDER = ["instagram", "facebook", "linkedin", "x", "tiktok", "youtube"] as const;

function localizedTitle(project: PortfolioProject, locale: "en" | "ar") {
  return locale === "ar" ? project.title_ar : project.title_en;
}

function localizedSummary(project: PortfolioProject, locale: "en" | "ar") {
  return locale === "ar" ? project.summary_ar : project.summary_en;
}

function localizedBody(project: PortfolioProject, locale: "en" | "ar") {
  return (locale === "ar" ? project.body_ar : project.body_en)?.trim() ?? "";
}

function localizedCategory(project: { category?: PortfolioProject["category"] | null }, locale: "en" | "ar") {
  if (!project.category) return "";
  return locale === "ar" ? project.category.name_ar : project.category.name_en;
}

function localizedAlt(image: PortfolioProjectImage, locale: "en" | "ar", fallback: string) {
  const alt = locale === "ar" ? image.alt_ar : image.alt_en;
  return alt || fallback;
}

function mediaPath(url: string | null | undefined) {
  return url?.split("?")[0] ?? "";
}

function allImages(project: PortfolioProject, locale: "en" | "ar") {
  const title = localizedTitle(project, locale);
  const coverUrl = versionedMediaUrl(project.image_url, project.updated_at);
  const cover = coverUrl
    ? [{ id: 0, image_url: coverUrl, alt_en: title, alt_ar: title, sort_order: 0, featured: true }]
    : [];
  const gallery = (project.images ?? []).map((image) => ({
    ...image,
    image_url: versionedMediaUrl(image.image_url, image.updated_at ?? project.updated_at),
  }));
  const coverPath = mediaPath(project.image_url);
  const merged = [...cover, ...gallery.filter((image) => image.image_url && mediaPath(image.image_url) !== coverPath)];
  return merged.filter((image) => image.image_url);
}

function GalleryDialog({
  images,
  index,
  locale,
  title,
  closeLabel,
  previousLabel,
  nextLabel,
  onIndex,
  onClose,
}: {
  images: PortfolioProjectImage[];
  index: number;
  locale: "en" | "ar";
  title: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const image = images[index];
  const alt = image ? localizedAlt(image, locale, title) : title;
  const canBrowse = images.length > 1;

  const step = useCallback(
    (delta: number) => {
      if (images.length < 2) return;
      onIndex((index + delta + images.length) % images.length);
    },
    [images.length, index, onIndex],
  );

  useEffect(() => {
    lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      lastFocus.current?.focus();
    };
  }, []);

  useEffect(() => {
    const forward = locale === "ar" ? "ArrowLeft" : "ArrowRight";
    const back = locale === "ar" ? "ArrowRight" : "ArrowLeft";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === forward) {
        event.preventDefault();
        step(1);
      }
      if (event.key === back) {
        event.preventDefault();
        step(-1);
      }
      if (event.key === "Tab") {
        const buttons = [...(panelRef.current?.querySelectorAll("button") ?? [])];
        if (buttons.length === 0) return;
        event.preventDefault();
        const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
        const shift = event.shiftKey;
        const next = shift
          ? current <= 0
            ? buttons.length - 1
            : current - 1
          : current === -1
            ? 0
            : (current + 1) % buttons.length;
        buttons[next]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [locale, onClose, step]);

  if (!image?.image_url) return null;

  const controlClass =
    "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.82rem] font-semibold text-white hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] disabled:pointer-events-none disabled:opacity-40";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgb(10_6_24/0.88)] p-4 md:p-8"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="flex max-h-full w-full max-w-5xl flex-col gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="m-0 text-[0.85rem] text-white/80" aria-live="polite">
            {index + 1} / {images.length}
          </p>
          <button ref={closeRef} type="button" onClick={onClose} className={controlClass}>
            {closeLabel}
          </button>
        </div>
        <img
          src={image.image_url}
          alt={alt}
          className="max-h-[78vh] w-full object-contain"
          referrerPolicy="no-referrer"
        />
        {canBrowse ? (
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={() => step(-1)} className={controlClass}>
              {previousLabel}
            </button>
            <button type="button" onClick={() => step(1)} className={controlClass}>
              {nextLabel}
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

export function ProjectDetailView({ project }: { project: PortfolioProject }) {
  const { t, locale } = useLanguage();
  const [current, setCurrent] = useState(project);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeGallery = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    let active = true;
    fetchPortfolioProject(project.id)
      .then((row) => {
        // Keep the build's fallback related projects when the dashboard picked none.
        if (active && row) setCurrent(row.related?.length ? row : { ...row, related: project.related });
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [project.id, project.related]);

  const images = useMemo(() => allImages(current, locale), [current, locale]);
  const socialEntries = useMemo(
    () =>
      SOCIAL_ORDER.flatMap((platform) => {
        const url = current.social_links?.[platform];
        return url ? [{ platform, url }] : [];
      }),
    [current],
  );

  const website = liveWebsiteUrl(current.website_url);
  const cover = images[0];
  const body = localizedBody(current, locale);
  const related: PortfolioRelatedProject[] = current.related ?? [];

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
              {localizedCategory(current, locale)}
            </p>
            <h1 className="font-display m-0 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.02] text-[var(--brand-ink)]">
              {localizedTitle(current, locale)}
            </h1>
            {localizedSummary(current, locale) ? (
              <p className="m-0 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--brand-muted)]">
                {localizedSummary(current, locale)}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              {website ? (
                <a
                  href={website}
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

          {cover?.image_url ? (
            <div className="overflow-hidden rounded-[1.4rem] border border-[var(--brand-line)] bg-[var(--brand-purple-deep)] shadow-[var(--shadow)]">
              <ProgressiveImage
                src={cover.image_url}
                alt={localizedAlt(cover, locale, localizedTitle(current, locale))}
                referrerPolicy="no-referrer"
                priority
                className="aspect-[4/3]"
                imgClassName="block h-full w-full object-cover"
              />
            </div>
          ) : null}
        </div>

        {body ? (
          <article
            className="article-body mt-14 max-w-3xl"
            dir={locale === "ar" ? "rtl" : "ltr"}
            // Cleaned by the API: only headings, paragraphs, lists, links and tables reach here.
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : null}

        {images.length > 0 ? (
          <div className="mt-14">
            <h2 className="font-display m-0 text-[1.8rem] font-semibold text-[var(--brand-ink)]">
              {t(projectDetail.gallery)}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => {
                const alt = localizedAlt(image, locale, localizedTitle(current, locale));
                return (
                <button
                  key={`${image.id}-${index}`}
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="project-detail-thumb overflow-hidden rounded-2xl border border-[var(--brand-line)] bg-white text-start transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                >
                  <ProgressiveImage
                    src={image.image_url}
                    alt={alt}
                    referrerPolicy="no-referrer"
                    className="aspect-[4/3]"
                    imgClassName="h-full w-full object-cover"
                  />
                </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {related.length > 0 ? (
          <div className="mt-14">
            <h2 className="font-display m-0 text-[1.8rem] font-semibold text-[var(--brand-ink)]">
              {t(projectDetail.related)}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const title = locale === "ar" ? item.title_ar : item.title_en;
                const category = localizedCategory(item, locale);
                return (
                  <Link
                    key={item.id}
                    href={pagePath(`projects/${item.id}`)}
                    className="project-detail-thumb group block overflow-hidden rounded-2xl border border-[var(--brand-line)] bg-white text-start transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                  >
                    {item.image_url ? (
                      <ProgressiveImage
                        src={versionedMediaUrl(item.image_url, item.updated_at)}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="aspect-[4/3]"
                        imgClassName="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="block aspect-[4/3] bg-[var(--brand-purple)]" />
                    )}
                    <span className="block p-4">
                      {category ? <span className="block text-[0.75rem] text-[var(--brand-orange)]">{category}</span> : null}
                      <span className="font-display mt-1 block text-[1.1rem] font-semibold leading-snug text-[var(--brand-ink)]">{title}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-12">
          <Link href="/#projects" className="project-detail-back inline-flex">
            {t(projectDetail.back)}
          </Link>
        </div>
      </Shell>
      {openIndex !== null && images[openIndex]?.image_url ? (
        <GalleryDialog
          images={images}
          index={openIndex}
          locale={locale}
          title={localizedTitle(current, locale)}
          closeLabel={t(projectDetail.close)}
          previousLabel={t(projectDetail.previous)}
          nextLabel={t(projectDetail.next)}
          onIndex={setOpenIndex}
          onClose={closeGallery}
        />
      ) : null}
    </section>
  );
}
