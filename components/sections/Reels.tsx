"use client";

import { useEffect, useRef, useState } from "react";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { LoadingLottie } from "@/components/LoadingLottie";
import { reels as copy } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { fetchLandingReels, type LandingReel } from "@/lib/reels-api";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

function ReelCard({
  reel,
  title,
  loadingLabel,
  shouldLoad,
  onReady,
}: {
  reel: LandingReel;
  title: string;
  loadingLabel: string;
  shouldLoad: boolean;
  onReady: () => void;
}) {
  const [videoReady, setVideoReady] = useState(false);
  const notified = useRef(false);
  const src = shouldLoad && reel.video_url ? reel.video_url : undefined;
  const loadedSrc = useRef(src);

  if (loadedSrc.current !== src) {
    loadedSrc.current = src;
    notified.current = false;
  }

  useEffect(() => {
    setVideoReady(false);
  }, [src]);

  if (!reel.video_url) return null;

  const markReady = () => {
    if (!src) return;
    setVideoReady(true);
    if (notified.current) return;
    notified.current = true;
    onReady();
  };

  return (
    <article className="reel-card group">
      <div className="reel-card-frame" aria-busy={shouldLoad && !videoReady}>
        {shouldLoad && !videoReady ? (
          <div className="reel-card-loading">
            <LoadingLottie className="reel-card-loading-lottie" label={loadingLabel} />
          </div>
        ) : null}
        <AutoplayVideo
          key={src ?? "idle"}
          className="reel-card-video"
          src={src}
          poster={reel.poster_url ?? undefined}
          preload="none"
          onCanPlay={markReady}
          onError={markReady}
        />
      </div>
      <div className="reel-card-meta">
        <h3 className="reel-card-title">{title}</h3>
      </div>
    </article>
  );
}

export function Reels() {
  const { locale, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [items, setItems] = useState<LandingReel[]>([]);
  const [ready, setReady] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    let active = true;
    fetchLandingReels()
      .then((rows) => {
        if (active) setItems(rows);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready || items.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      setLoadCount(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadCount((count) => (count > 0 ? count : 1));
        }
      },
      { rootMargin: "240px 0px", threshold: 0.05 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [items.length, ready]);

  const loadingLabel = t(copy.loading);
  const unlockNext = () => {
    setLoadCount((count) => Math.min(items.length, count + 1));
  };

  return (
    <section
      ref={sectionRef}
      id="reels"
      className="relative bg-[var(--brand-cream)] py-16 md:py-24 lg:py-32"
      aria-busy={!ready}
    >
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <SectionHeading kicker={copy.kicker} title={copy.title} align="center" />
          <p className="mt-5 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/75">
            {t(copy.lead)}
          </p>
        </Reveal>

        {!ready ? <LoadingLottie className="mt-10" label={loadingLabel} /> : null}

        {ready && items.length === 0 ? (
          <p className="mt-10 text-center text-[0.95rem] text-[var(--brand-muted)]">{t(copy.empty)}</p>
        ) : null}

        {ready && items.length > 0 ? (
          <Stagger className="reel-grid" role="list">
            {items.map((reel, index) => (
              <StaggerItem key={reel.id} role="listitem">
                <ReelCard
                  reel={reel}
                  title={locale === "ar" ? reel.title_ar : reel.title_en}
                  loadingLabel={loadingLabel}
                  shouldLoad={index < loadCount}
                  onReady={unlockNext}
                />
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </Shell>
    </section>
  );
}
