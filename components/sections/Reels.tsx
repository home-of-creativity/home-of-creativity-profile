"use client";

import { reels as copy } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { reelDrivePreviewUrl, reelsDriveVideos } from "@/lib/reels-drive-videos";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

function ReelCard({ fileId, title }: { fileId: string; title: string }) {
  const previewUrl = reelDrivePreviewUrl(fileId);

  return (
    <article className="reel-card group">
      <div className="reel-card-frame">
        <iframe
          src={previewUrl}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="reel-card-iframe"
        />
      </div>
      <div className="reel-card-meta">
        <h3 className="reel-card-title">{title}</h3>
      </div>
    </article>
  );
}

export function Reels() {
  const { t } = useLanguage();

  return (
    <section id="reels" className="relative bg-[var(--brand-cream)] py-16 md:py-24 lg:py-32">
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <SectionHeading kicker={copy.kicker} title={copy.title} align="center" />
          <p className="mt-5 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/75">
            {t(copy.lead)}
          </p>
        </Reveal>

        <Stagger className="reel-grid" role="list">
          {reelsDriveVideos.map((reel) => (
            <StaggerItem key={reel.id} role="listitem">
              <ReelCard fileId={reel.fileId} title={t(reel.title)} />
            </StaggerItem>
          ))}
        </Stagger>
      </Shell>
    </section>
  );
}
