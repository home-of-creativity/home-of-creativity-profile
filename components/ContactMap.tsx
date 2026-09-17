"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contact } from "@/lib/content";
import {
  createInteractiveGoogleMap,
  googleMapsApiKey,
  googleMapsClassicEmbedSrc,
  googleMapsSearchUrl,
  loadGoogleMapsApi,
  type GoogleMapHandle,
} from "@/lib/google-maps";
import { officesGeo } from "@/lib/seo";
import { useLanguage } from "@/lib/i18n";
import { useInViewOnce } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";

const offices = [
  {
    id: "syr" as const,
    geo: officesGeo.syr,
    office: contact.offices[0],
  },
  {
    id: "ksa" as const,
    geo: officesGeo.ksa,
    office: contact.offices[1],
  },
];

export function ContactMap() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<(typeof offices)[number]["id"]>("syr");
  const [interactive, setInteractive] = useState(Boolean(googleMapsApiKey()));
  const hostRef = useRef<HTMLDivElement>(null);
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapHandleRef = useRef<GoogleMapHandle | null>(null);
  const near = useInViewOnce(hostRef, { rootMargin: "240px 0px" });

  const current = offices.find((office) => office.id === active) ?? offices[0];
  const cityLabel = t(current.office.city);
  const currentRef = useRef(current);
  const cityRef = useRef(cityLabel);
  currentRef.current = current;
  cityRef.current = cityLabel;
  const embedSrc = useMemo(
    () =>
      googleMapsClassicEmbedSrc(
        current.geo.latitude,
        current.geo.longitude,
        locale,
        current.geo.zoom,
      ),
    [current.geo, locale],
  );
  const mapsUrl =
    "mapsUrl" in current.geo && current.geo.mapsUrl
      ? current.geo.mapsUrl
      : googleMapsSearchUrl(`${current.geo.latitude},${current.geo.longitude}`);

  useEffect(() => {
    const element = mapNodeRef.current;
    if (!near || !interactive || !element) return;

    let cancelled = false;

    loadGoogleMapsApi()
      .then((maps) => {
        if (cancelled || !mapNodeRef.current) return;
        const office = currentRef.current;
        mapHandleRef.current = createInteractiveGoogleMap(mapNodeRef.current, maps, {
          center: { lat: office.geo.latitude, lng: office.geo.longitude },
          zoom: office.geo.zoom,
          title: cityRef.current,
        });
      })
      .catch(() => {
        if (!cancelled) {
          mapHandleRef.current = null;
          setInteractive(false);
        }
      });

    return () => {
      cancelled = true;
      mapHandleRef.current = null;
    };
    // Create the map once; office changes update the existing instance below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive, near]);

  useEffect(() => {
    const handle = mapHandleRef.current;
    if (!handle) return;
    const position = { lat: current.geo.latitude, lng: current.geo.longitude };
    handle.setCenter(position);
    handle.setZoom(current.geo.zoom);
    handle.setMarker(position, cityLabel);
  }, [cityLabel, current]);

  return (
    <div ref={hostRef} className="relative mx-auto mt-14 max-w-3xl">
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
        {interactive ? (
          <div
            ref={mapNodeRef}
            role="region"
            tabIndex={0}
            aria-label={`${t(contact.map.title)} — ${cityLabel}`}
            className="contact-map-frame h-[min(22rem,62vw)] w-full overscroll-contain outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--brand-orange)]"
          />
        ) : (
          <iframe
            title={`${t(contact.map.title)} — ${cityLabel}`}
            src={near ? embedSrc : undefined}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="contact-map-frame block h-[min(22rem,62vw)] w-full border-0"
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--brand-line)] px-4 py-3 sm:px-5">
          <p className="m-0 text-[0.92rem] font-medium text-[var(--brand-ink)]">{cityLabel}</p>
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
