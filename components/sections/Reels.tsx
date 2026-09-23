"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { LoadingLottie } from "@/components/LoadingLottie";
import { reels as copy } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { fetchLandingReels, peekLandingReels, type LandingReel } from "@/lib/reels-api";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

function ReelCard({
  reel,
  title,
  loadingLabel,
  errorLabel,
}: {
  reel: LandingReel;
  title: string;
  loadingLabel: string;
  errorLabel: string;
}) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [ratio, setRatio] = useState<number | null>(null);

  if (!reel.video_url) return null;

  return (
    <article className="reel-card group">
      <div
        className="reel-card-frame"
        style={ratio ? ({ "--reel-ratio": ratio } as CSSProperties) : undefined}
      >
        {state === "loading" ? (
          <div className="reel-card-loading">
            <LoadingLottie className="reel-card-loading-lottie" label={loadingLabel} />
          </div>
        ) : null}
        {state === "error" ? (
          <div className="reel-card-loading reel-card-loading-error" role="status">
            <span className="loading-lottie__label">{errorLabel}</span>
          </div>
        ) : null}
        <AutoplayVideo
          className="reel-card-video"
          src={reel.video_url}
          preload="metadata"
          onReady={(video) => {
            setState("ready");
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              setRatio(video.videoWidth / video.videoHeight);
            }
          }}
          onError={() => setState("error")}
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
  // Always start empty so SSR HTML matches the first client render.
  // Reading localStorage here made returning visits hydrate a reel grid
  // (React #418) while the static HTML still had the loading lottie.
  const [items, setItems] = useState<LandingReel[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const cached = peekLandingReels();
    if (cached.length > 0) {
      setItems(cached);
      setReady(true);
    }
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

  const loadingLabel = t(copy.loading);
  const cardLoadingLabel = t(copy.cardLoading);
  const cardErrorLabel = t(copy.cardError);

  return (
    <section
      id="reels"
      className="relative bg-[var(--brand-cream)] py-16 md:py-24 lg:py-32"
      aria-busy={!ready}
    >
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <SectionHeading title={copy.title} align="center" />
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
            {items.map((reel) => (
              <StaggerItem key={reel.id} role="listitem">
                <ReelCard
                  reel={reel}
                  title={locale === "ar" ? reel.title_ar : reel.title_en}
                  loadingLabel={cardLoadingLabel}
                  errorLabel={cardErrorLabel}
                />
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </Shell>
    </section>
  );
}
