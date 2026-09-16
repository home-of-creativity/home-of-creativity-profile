"use client";

import { useMemo, useState } from "react";
import { contact } from "@/lib/content";
import { googleMapsEmbedSrc, googleMapsSearchUrl } from "@/lib/google-maps";
import { officesGeo } from "@/lib/seo";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const offices = [
  {
    id: "syr" as const,
    query: officesGeo.syr.mapsQuery,
    geo: officesGeo.syr,
    office: contact.offices[0],
  },
  {
    id: "ksa" as const,
    query: officesGeo.ksa.mapsQuery,
    geo: officesGeo.ksa,
    office: contact.offices[1],
  },
];

export function ContactMap() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<(typeof offices)[number]["id"]>("syr");

  const current = offices.find((office) => office.id === active) ?? offices[0];
  const embedSrc = useMemo(
    () => googleMapsEmbedSrc(current.query, locale, 15, current.geo),
    [current.query, current.geo, locale],
  );
  const mapsUrl = googleMapsSearchUrl(`${current.geo.latitude},${current.geo.longitude}`);

  return (
    <div className="relative mx-auto mt-14 max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label={t(contact.map.title)}>
        {offices.map((office) => {
          const selected = office.id === active;
          return (
            <button
              key={office.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(office.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.78rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                locale === "ar" ? "tracking-normal" : "uppercase tracking-[0.12em]",
                selected
                  ? "border-[var(--brand-purple)] bg-[var(--brand-purple)] text-[var(--brand-cream)]"
                  : "border-[var(--brand-line)] bg-white/80 text-[var(--brand-ink)] hover:border-[var(--brand-orange)]",
              )}
            >
              {t(office.office.country)}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--brand-ink)]/12 bg-white shadow-[0_14px_36px_rgb(10_6_24/0.08)]">
        {embedSrc ? (
          <iframe
            title={`${t(contact.map.title)} — ${t(current.office.city)}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="contact-map-frame block h-[min(22rem,62vw)] w-full border-0"
          />
        ) : (
          <div className="contact-map-frame grid h-[min(22rem,62vw)] place-items-center bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-off-white)_88%,white),var(--brand-cream))] px-6 text-center">
            <p className="m-0 max-w-md text-[0.98rem] leading-relaxed text-[var(--brand-ink)]/78">
              {t(current.office.city)}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--brand-line)] px-4 py-3 sm:px-5">
          <p className="m-0 text-[0.92rem] font-medium text-[var(--brand-ink)]">{t(current.office.city)}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.82rem] font-semibold text-[var(--brand-purple)] transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
          >
            {t(contact.map.open)}
          </a>
        </div>
      </div>
    </div>
  );
}
