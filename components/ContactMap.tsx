"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contact } from "@/lib/content";
import {
  createInteractiveGoogleMap,
  googleMapsApiKey,
  googleMapsClassicEmbedSrc,
  loadGoogleMapsApi,
  type GoogleMapHandle,
} from "@/lib/google-maps";
import { SITE_NAME } from "@/lib/site";
import { officesGeo } from "@/lib/seo";
import { useLanguage } from "@/lib/i18n";
import { useInViewOnce } from "@/lib/use-in-view";

const office = contact.offices[0];
const geo = officesGeo.syr;

export function ContactMap() {
  const { t, locale } = useLanguage();
  const [interactive, setInteractive] = useState(Boolean(googleMapsApiKey()));
  const hostRef = useRef<HTMLDivElement>(null);
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapHandleRef = useRef<GoogleMapHandle | null>(null);
  const near = useInViewOnce(hostRef, { rootMargin: "240px 0px" });
  const cityLabel = t(office.city);
  const cityRef = useRef(cityLabel);
  cityRef.current = cityLabel;
  const embedSrc = useMemo(
    () => googleMapsClassicEmbedSrc(geo.latitude, geo.longitude, locale, geo.zoom, geo.mapsQuery),
    [locale],
  );

  useEffect(() => {
    const element = mapNodeRef.current;
    if (!near || !interactive || !element) return;

    let cancelled = false;

    loadGoogleMapsApi()
      .then((maps) => {
        if (cancelled || !mapNodeRef.current) return;
        mapHandleRef.current = createInteractiveGoogleMap(mapNodeRef.current, maps, {
          center: { lat: geo.latitude, lng: geo.longitude },
          zoom: geo.zoom,
          title: `${SITE_NAME} — ${cityRef.current}`,
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
  }, [interactive, near]);

  useEffect(() => {
    mapHandleRef.current?.setMarker({ lat: geo.latitude, lng: geo.longitude }, `${SITE_NAME} — ${cityLabel}`);
  }, [cityLabel]);

  return (
    <div ref={hostRef} className="relative mx-auto mt-14 max-w-3xl">
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
            href={geo.mapsUrl}
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
