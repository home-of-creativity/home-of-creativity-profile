"use client";

import { useEffect, useState } from "react";
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
}: {
  reel: LandingReel;
  title: string;
}) {
  if (!reel.video_url) return null;

  return (
    <article className="reel-card group">
      <div className="reel-card-frame">
        <AutoplayVideo
          className="reel-card-video"
          src={reel.video_url}
          poster={reel.poster_url ?? undefined}
          preload="auto"
          eager
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
  const cached = peekLandingReels();
  const [items, setItems] = useState<LandingReel[]>(cached);
  const [ready, setReady] = useState(cached.length > 0);

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
                />
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </Shell>
    </section>
  );
}
