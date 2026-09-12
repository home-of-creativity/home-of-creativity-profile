"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/content";
import { fetchPortfolioProjects, type PortfolioCategory, type PortfolioProject } from "@/lib/portfolio-api";
import { withBasePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useGsapScope } from "@/lib/gsap-client";

const FILTER_PREVIEW = 6;
const EVENTS_BACKDROP = "/photo/project-background/event-stage.webp";
const ALL_BACKDROP = "/photo/project-background/all-projects-cover.webp";
const CATEGORY_BACKDROPS: Record<string, string> = {
  events: EVENTS_BACKDROP,
  identity: "/photo/project-background/identity-cover.png",
  media: "/photo/project-background/media-cover.png",
  promo: "/photo/project-background/promo-cover.png",
  digital: "/photo/project-background/digital-cover.png",
  finance: "/photo/project-background/finance-cover.png",
};
const BACKDROP_FADE_MS = 500;

function backdropMediaClass(src: string) {
  return cn(
    "projects-backdrop-media object-cover",
    src === ALL_BACKDROP && "projects-backdrop-media--all",
  );
}

function ProjectsBackdrop({ src }: { src: string }) {
  const [current, setCurrent] = useState(src);
  const [next, setNext] = useState<string | null>(null);
  const [nextVisible, setNextVisible] = useState(false);
  const transitionRef = useRef<number | null>(null);

  useEffect(() => {
    if (src === current && !next) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(src);
      setNext(null);
      setNextVisible(false);
      return;
    }

    if (src === current) return;

    setNext(src);
    setNextVisible(false);
  }, [src, current, next]);

  useEffect(() => {
    return () => {
      if (transitionRef.current !== null) {
        window.clearTimeout(transitionRef.current);
      }
    };
  }, []);

  const revealNext = useCallback(() => {
    requestAnimationFrame(() => setNextVisible(true));
  }, []);

  const commitNext = useCallback(() => {
    if (!next) return;
    if (transitionRef.current !== null) {
      window.clearTimeout(transitionRef.current);
      transitionRef.current = null;
    }
    setCurrent(next);
    setNext(null);
    setNextVisible(false);
  }, [next]);

  const handleNextTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLImageElement>) => {
      if (event.propertyName !== "opacity" || !nextVisible || !next) return;
      commitNext();
    },
    [commitNext, next, nextVisible],
  );

  useEffect(() => {
    if (!next || !nextVisible) return;

    transitionRef.current = window.setTimeout(commitNext, BACKDROP_FADE_MS);
    return () => {
      if (transitionRef.current !== null) {
        window.clearTimeout(transitionRef.current);
      }
    };
  }, [commitNext, next, nextVisible]);

  return (
    <>
      <Image
        src={withBasePath(current)}
        alt=""
        fill
        sizes="100vw"
        className={backdropMediaClass(current)}
      />
      {next ? (
        <Image
          src={withBasePath(next)}
          alt=""
          fill
          sizes="100vw"
          className={cn(
            backdropMediaClass(next),
            "projects-backdrop-next transition-opacity ease-in-out",
            nextVisible ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDuration: `${BACKDROP_FADE_MS}ms` }}
          onLoad={revealNext}
          onError={revealNext}
          onTransitionEnd={handleNextTransitionEnd}
        />
      ) : null}
    </>
  );
}

function backdropFor(filter: string) {
  if (filter === "all") return ALL_BACKDROP;
  return CATEGORY_BACKDROPS[filter] ?? ALL_BACKDROP;
}

function projectTitle(project: PortfolioProject, locale: "en" | "ar") {
  return locale === "ar" ? project.title_ar : project.title_en;
}

function categoryLabel(category: PortfolioCategory | undefined, locale: "en" | "ar") {
  if (!category) return "";
  return locale === "ar" ? category.name_ar : category.name_en;
}

export function Projects() {
  const { t, locale } = useLanguage();
  const [items, setItems] = useState<PortfolioProject[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const backdropSrc = backdropFor(filter);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPortfolioProjects()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, PortfolioCategory>();
    for (const project of items) {
      if (project.category) map.set(project.category.slug, project.category);
    }
    return [...map.values()].sort((a, b) => a.sort_order - b.sort_order);
  }, [items]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((project) => project.category?.slug === filter);
  }, [filter, items]);

  const preview = useMemo(() => filtered.slice(0, FILTER_PREVIEW), [filtered]);
  const visible = expanded ? filtered : preview;
  const allPreview = filter === "all" && !expanded;
  const canExpand = filtered.length > preview.length;

  useEffect(() => {
    [ALL_BACKDROP, ...Object.values(CATEGORY_BACKDROPS)].forEach((path) => {
      const img = new window.Image();
      img.src = withBasePath(path);
    });
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      const match = categories.find((category) => hash === `project-${category.slug}`);
      if (match) {
        setFilter(match.slug);
        setExpanded(true);
      }
      if (hash === "projects") {
        setFilter("all");
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [categories]);

  useGsapScope(
    ({ gsap }) => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      gsap.set(cards, { autoAlpha: 1, y: 0, clearProps: "transform" });
    },
    { scope: gridRef, dependencies: [filter, expanded, visible.length] },
  );

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[var(--brand-purple-deep)] py-16 text-[var(--brand-cream)] md:py-24 lg:py-32"
    >
      <div aria-hidden className="projects-backdrop pointer-events-none absolute inset-0">
        <ProjectsBackdrop src={backdropSrc} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgb(10_6_24/0.62)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(10_6_24/0.28)_0%,transparent_26%,transparent_58%,rgb(10_6_24/0.5)_100%)]"
      />

      {categories.map((category) => (
        <span key={category.slug} id={`project-${category.slug}`} className="sr-only" />
      ))}

      <div className="relative z-10 mx-auto w-[min(1280px,calc(100%-1.5rem))]">
        <div className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl text-start">
            <span aria-hidden className="mb-3 block h-px w-9 bg-[var(--brand-orange)]" />
            <p
              className={cn(
                "m-0 text-[0.78rem] uppercase text-[var(--brand-orange)]",
                locale === "ar" ? "tracking-normal" : "tracking-[0.28em]",
              )}
            >
              {t(projects.kicker)}
            </p>
            <h2 className="font-display m-0 mt-3 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-[var(--brand-cream)]">
              {t(projects.title)}
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-2 lg:justify-end"
            role="group"
            aria-label={t(projects.title)}
          >
            {(["all", ...categories.map((category) => category.slug)] as const).map((id) => {
              const pressed = filter === id;
              const label =
                id === "all"
                  ? t(projects.filterAll)
                  : categoryLabel(categories.find((category) => category.slug === id), locale);

              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => {
                    setFilter(id);
                    setExpanded(false);
                  }}
                  className={cn(
                    "h-10 rounded-md border px-3.5 text-[0.72rem] font-semibold uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                    locale === "ar" ? "tracking-normal" : "tracking-[0.12em]",
                    pressed
                      ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-[var(--brand-purple-deep)]"
                      : "border-white/30 bg-transparent text-white hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]",
                  )}
                >
                  {label || id}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={gridRef}
          className={cn(
            "projects-grid transition-opacity duration-300 ease-out",
            allPreview && "projects-grid-all",
          )}
        >
          {visible.map((project) => {
            const title = projectTitle(project, locale);
            const category = categoryLabel(project.category, locale);

            return (
              <Link
                key={project.id}
                href={`/projects/detail/?id=${project.id}`}
                className="project-card group text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
              >
                {project.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image_url}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="project-card-media absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 bg-[var(--brand-purple)]" />
                )}
                <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[rgb(10_6_24/0.82)] to-transparent p-5 pt-16 [text-shadow:0_1px_10px_rgb(10_6_24/0.65)]">
                  <span className="font-display block text-[1.2rem] font-semibold leading-tight text-white">
                    {title}
                  </span>
                  {category ? (
                    <span className="mt-1 block text-[0.78rem] text-white/80">{category}</span>
                  ) : null}
                  <span className="mt-2 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase text-[var(--brand-orange)]">
                    {t(projects.viewDetails)}
                    <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {canExpand || expanded ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => {
                setExpanded((prev) => {
                  const next = !prev;
                  if (!next) {
                    window.requestAnimationFrame(() => {
                      document.getElementById("projects")?.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                          .matches
                          ? "auto"
                          : "smooth",
                        block: "start",
                      });
                    });
                  }
                  return next;
                });
              }}
              className={cn(
                "inline-flex items-center gap-3 rounded-md border border-[var(--brand-orange)] px-6 py-3 text-[0.82rem] font-semibold uppercase text-[var(--brand-cream)] transition-colors duration-300 hover:bg-[var(--brand-orange)] hover:text-[var(--brand-purple-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
              )}
            >
              {t(expanded ? projects.viewLess : projects.viewAll)}
              <span aria-hidden className="text-[1.05rem] leading-none">
                {expanded ? "↓" : locale === "ar" ? "↙" : "↗"}
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
