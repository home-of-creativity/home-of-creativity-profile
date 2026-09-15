"use client";

import { useEffect, useState } from "react";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { LoadingLottie } from "@/components/LoadingLottie";
import { reels as copy } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { fetchLandingReels, type LandingReel } from "@/lib/reels-api";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

function ReelCard({ reel, title, loadingLabel }: { reel: LandingReel; title: string; loadingLabel: string }) {
  const [videoReady, setVideoReady] = useState(false);

  if (!reel.video_url) return null;

  return (
    <article className="reel-card group">
      <div className="reel-card-frame" aria-busy={!videoReady}>
        {!videoReady ? (
          <div className="reel-card-loading">
            <LoadingLottie className="reel-card-loading-lottie" label={loadingLabel} />
          </div>
        ) : null}
        <AutoplayVideo
          className="reel-card-video"
          src={reel.video_url}
          poster={reel.poster_url ?? undefined}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(true)}
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
  const [items, setItems] = useState<LandingReel[]>([]);
  const [ready, setReady] = useState(false);

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

  const loadingLabel = t(copy.loading);

  return (
    <section
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

        {ready ? (
          <Stagger className="reel-grid" role="list">
            {items.map((reel) => (
              <StaggerItem key={reel.id} role="listitem">
                <ReelCard
                  reel={reel}
                  title={locale === "ar" ? reel.title_ar : reel.title_en}
                  loadingLabel={loadingLabel}
                />
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </Shell>
    </section>
  );
}
