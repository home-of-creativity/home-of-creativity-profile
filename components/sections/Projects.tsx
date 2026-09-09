"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";
import { useGsapScope } from "@/lib/gsap-client";

type ProjectItem = (typeof projects.items)[number];
type ProjectImage = ProjectItem["images"][number];
type FlatImage = ProjectImage & {
  categoryId: string;
};
const EVENTS_BACKDROP = "/photo/project-background/event-stage.webp";

const FILTERS = ["all", ...projects.items.map((item) => item.id)] as const;
const FILTER_PREVIEW = 6;
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
        className="projects-backdrop-media object-cover"
      />
      {next ? (
        <Image
          src={withBasePath(next)}
          alt=""
          fill
          sizes="100vw"
          className={cn(
            "projects-backdrop-media projects-backdrop-next object-cover transition-opacity ease-in-out",
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
  const item = projects.items.find((entry) => entry.id === filter);
  const cover = item?.images.find((image) => image.featured) ?? item?.images[0];
  return CATEGORY_BACKDROPS[filter] ?? cover?.src ?? ALL_BACKDROP;
}

export function Projects() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const backdropSrc = backdropFor(filter);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const allImages = useMemo<FlatImage[]>(
    () =>
      projects.items.flatMap((item) =>
        item.images.map((image) => ({ ...image, categoryId: item.id })),
      ),
    [],
  );

  const filtered =
    filter === "all"
      ? allImages
      : allImages.filter((image) => image.categoryId === filter);

  const preview =
    filter === "all"
      ? projects.items.flatMap((item) => {
          const cover =
            item.images.find((image) => image.featured) ?? item.images[0];
          return cover ? [{ ...cover, categoryId: item.id }] : [];
        })
      : filtered.slice(0, FILTER_PREVIEW);

  const visible = expanded ? filtered : preview;
  const allPreview = filter === "all" && !expanded;
  const canExpand = filtered.length > preview.length;

  const openAt = (src: string) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    const index = visible.findIndex((image) => image.src === src);
    setActive(index < 0 ? 0 : index);
  };

  const close = useCallback(() => {
    setActive(null);
    queueMicrotask(() => lastFocus.current?.focus());
  }, []);

  const step = useCallback(
    (direction: number) => {
      setActive((index) => {
        if (index === null) return index;
        return (index + direction + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    [ALL_BACKDROP, ...Object.values(CATEGORY_BACKDROPS)].forEach((path) => {
      const img = new window.Image();
      img.src = withBasePath(path);
    });
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      const match = projects.items.find((item) => hash === `project-${item.id}`);
      if (match) {
        setFilter(match.id);
        setExpanded(true);
      }
      if (hash === "projects") {
        setFilter("all");
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    setActive(null);
  }, [filter, expanded]);

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(locale === "ar" ? -1 : 1);
      if (event.key === "ArrowLeft") step(locale === "ar" ? 1 : -1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [active, close, locale, step]);

  useGsapScope(
    ({ gsap }) => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      gsap.set(cards, { autoAlpha: 1, y: 0, clearProps: "transform" });
    },
    { scope: gridRef, dependencies: [filter, expanded, visible.length] },
  );

  const current = active !== null ? visible[active] : null;
  const currentItem = current
    ? projects.items.find((item) => item.id === current.categoryId)
    : null;

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

      {projects.items.map((item) => (
        <span key={item.id} id={`project-${item.id}`} className="sr-only" />
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
            {FILTERS.map((id) => {
              const pressed = filter === id;
              const label =
                id === "all"
                  ? projects.filterAll
                  : projects.items.find((item) => item.id === id)?.filter;

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
                  {label ? t(label) : id}
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
          {visible.map((image) => {
            const item = projects.items.find((entry) => entry.id === image.categoryId);

            return (
              <button
                key={`${filter}-${image.src}`}
                type="button"
                onClick={() => openAt(image.src)}
                className="project-card group text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
              >
                <Image
                  src={withBasePath(image.src)}
                  alt={t(image.alt)}
                  fill
                  sizes="(min-width: 1100px) 720px, (min-width: 768px) 50vw, 100vw"
                  className="project-card-media object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 z-10 p-5 [text-shadow:0_1px_10px_rgb(10_6_24/0.65)]">
                  <span className="font-display block text-[1.2rem] font-semibold leading-tight text-white">
                    {item ? t(item.filter) : t(image.alt)}
                  </span>
                  {item?.tags ? (
                    <span className="mt-1 block text-[0.78rem] text-white/80">
                      {t(item.tags)}
                    </span>
                  ) : null}
                </span>
              </button>
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
                {expanded ? (locale === "ar" ? "↓" : "↓") : locale === "ar" ? "↙" : "↗"}
              </span>
            </button>
          </div>
        ) : null}
      </div>

      {current && currentItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgb(10_6_24/0.9)] p-3 sm:p-4 md:p-8"
          onClick={close}
        >
          <div
            className="relative flex w-full max-w-6xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 text-[var(--brand-cream)]">
              <div className="min-w-0 text-start">
                <p
                  className={cn(
                    "m-0 text-[0.72rem] text-[var(--brand-orange)]",
                    locale === "en" && "tracking-[0.28em] uppercase",
                  )}
                >
                  {t(currentItem.label)}
                </p>
                <h3 id={titleId} className="font-display mt-1 truncate text-[1.15rem] font-semibold">
                  {t(current.alt)}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="shrink-0 rounded-full border border-white/25 px-4 py-2 text-[0.82rem] font-semibold text-[var(--brand-cream)] hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
              >
                {t(projects.close)}
              </button>
            </div>

            <div className="relative aspect-[1871/1323] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image
                src={withBasePath(current.src)}
                alt={t(current.alt)}
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-[var(--brand-cream)]">
              <button
                type="button"
                onClick={() => step(locale === "ar" ? 1 : -1)}
                className="rounded-full border border-white/25 px-4 py-2 text-[0.82rem] font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
              >
                {t(projects.previous)}
              </button>
              <p className="m-0 text-[0.78rem] text-white/65">
                {String((active ?? 0) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => step(locale === "ar" ? -1 : 1)}
                className="rounded-full border border-white/25 px-4 py-2 text-[0.82rem] font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
              >
                {t(projects.next)}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
