"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { showcaseClients as copy } from "@/lib/content";
import {
  fetchShowcaseClients,
  type ShowcaseClient,
} from "@/lib/portfolio-api";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";


function ClientLogoDisc({
  client,
  decorative = false,
}: {
  client: ShowcaseClient;
  decorative?: boolean;
}) {
  const initials = client.name.slice(0, 2).toUpperCase();
  const content = client.logo_url ? (
    <img
      src={client.logo_url}
      alt={decorative ? "" : client.name}
      width={120}
      height={120}
      draggable={false}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className="client-logo-disc-image"
    />
  ) : (
    <span className="client-logo-disc-fallback" aria-hidden>
      {initials}
    </span>
  );

  if (client.website_url) {
    return (
      <a
        href={client.website_url}
        target="_blank"
        rel="noreferrer noopener"
        className="client-logo-disc"
        aria-label={client.name}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="client-logo-disc" aria-label={client.name}>
      {content}
    </div>
  );
}

function ClientLogoSet({
  clients,
  hidden = false,
}: {
  clients: ShowcaseClient[];
  hidden?: boolean;
}) {
  return (
    <div className="client-marquee-set" aria-hidden={hidden || undefined}>
      {clients.map((client, index) => (
        <ClientLogoDisc
          key={`${hidden ? "b" : "a"}-${client.id}-${index}`}
          client={client}
          decorative={hidden}
        />
      ))}
    </div>
  );
}

function ClientLogoMarquee({ clients }: { clients: ShowcaseClient[] }) {
  const { t } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);

  const loopClients = useMemo(() => {
    if (clients.length === 0) return [];

    const items: ShowcaseClient[] = [];
    let pass = 0;

    while (items.length < Math.max(clients.length, 6)) {
      clients.forEach((client) => {
        items.push(client);
      });
      pass += 1;
      if (pass > 8) break;
    }

    return items;
  }, [clients]);

  const duration = Math.max(22, loopClients.length * 2.6);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || loopClients.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      viewport.classList.add("is-static");
      return;
    }

    const visibility = new IntersectionObserver(
      ([entry]) => {
        viewport.classList.toggle("is-offscreen", !entry?.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    visibility.observe(viewport);

    return () => {
      visibility.disconnect();
    };
  }, [loopClients.length]);

  return (
    <div className="client-marquee-shell">
      <div
        ref={viewportRef}
        className="client-marquee-viewport"
        dir="ltr"
        aria-label={t(copy.gridLabel)}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="client-marquee-track">
          <ClientLogoSet clients={loopClients} />
          <ClientLogoSet clients={loopClients} hidden />
        </div>
      </div>
    </div>
  );
}

export function ShowcaseClients() {
  const { t } = useLanguage();
  const [clients, setClients] = useState<ShowcaseClient[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    fetchShowcaseClients()
      .then((items) => {
        if (!active) return;
        setClients(items);
      })
      .catch(() => {
        if (active) setClients([]);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="clients"
      className={cn(
        "relative py-10 text-[var(--brand-ivory)] md:py-14 md:pt-6 lg:pb-24",
        !ready && "min-h-[14rem]",
      )}
      aria-busy={!ready}
    >
      <Shell className="relative mb-10 md:mb-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title={copy.title}
            align="center"
            invert
          />
        </Reveal>
      </Shell>

      {ready ? (
        <ClientLogoMarquee clients={clients} />
      ) : (
        <div className="client-marquee-shell">
          <div className="client-marquee-viewport" dir="ltr" aria-hidden>
            <div className="client-marquee-track">
              <div className="client-marquee-set">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="client-logo-disc client-logo-disc-skeleton" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <span className="sr-only">{t(copy.lead)}</span>
    </section>
  );
}
