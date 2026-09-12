"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { showcaseClients as copy } from "@/lib/content";
import {
  fetchShowcaseClients,
  type ShowcaseClient,
} from "@/lib/portfolio-api";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useGsapScope } from "@/lib/gsap-client";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";


function ClientLogoDisc({
  client,
  onHoverStart,
  onHoverEnd,
}: {
  client: ShowcaseClient;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  const initials = client.name.slice(0, 2).toUpperCase();
  const content = client.logo_url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={client.logo_url}
      alt={client.name}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="client-logo-disc-image"
    />
  ) : (
    <span className="client-logo-disc-fallback" aria-hidden>
      {initials}
    </span>
  );

  const hoverProps = {
    onMouseEnter: onHoverStart,
    onMouseLeave: onHoverEnd,
    onFocus: onHoverStart,
    onBlur: onHoverEnd,
  };

  if (client.website_url) {
    return (
      <a
        href={client.website_url}
        target="_blank"
        rel="noreferrer noopener"
        className="client-logo-disc"
        aria-label={client.name}
        {...hoverProps}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="client-logo-disc" aria-label={client.name} {...hoverProps}>
      {content}
    </div>
  );
}

function ClientLogoSet({
  clients,
  setRef,
  hidden = false,
  onHoverStart,
  onHoverEnd,
}: {
  clients: ShowcaseClient[];
  setRef?: React.RefObject<HTMLDivElement | null>;
  hidden?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  return (
    <div
      ref={setRef}
      className="client-marquee-set"
      aria-hidden={hidden || undefined}
    >
      {clients.map((client) => (
        <ClientLogoDisc
          key={client.id}
          client={client}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      ))}
    </div>
  );
}

function ClientLogoMarquee({ clients }: { clients: ShowcaseClient[] }) {
  const { t, locale } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const hoverCountRef = useRef(0);

  const pauseScroll = () => {
    hoverCountRef.current += 1;
  };

  const resumeScroll = () => {
    hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
  };

  const loopClients = useMemo(() => {
    if (clients.length === 0) return [];

    const items: ShowcaseClient[] = [];
    let pass = 0;

    while (items.length < Math.max(clients.length, 6)) {
      clients.forEach((client, index) => {
        items.push({
          ...client,
          id: client.id * 1000 + pass * 100 + index,
        });
      });
      pass += 1;
    }

    return items;
  }, [clients]);

  useGsapScope(
    ({ gsap }) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const setEl = setRef.current;
      if (!viewport || !track || !setEl || clients.length === 0) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      let disposed = false;
      let draggableInstance: { kill: () => void } | null = null;
      let loopWidth = 0;
      let dragging = false;
      const speed = 1.5;

      const measure = () => {
        const trackStyles = window.getComputedStyle(track);
        const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
        loopWidth = setEl.offsetWidth + gap;
      };

      const wrapX = (value: number) => {
        if (loopWidth <= 0) return value;
        while (value <= -loopWidth) value += loopWidth;
        while (value > 0) value -= loopWidth;
        return value;
      };

      const tick = () => {
        if (dragging || hoverCountRef.current > 0 || loopWidth <= 0) return;
        const next = wrapX(Number(gsap.getProperty(track, "x")) - speed);
        gsap.set(track, { x: next });
      };

      const setup = async () => {
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });

        if (disposed) return;

        measure();
        if (loopWidth <= 0) return;

        gsap.set(track, { x: 0, force3D: true });
        gsap.ticker.add(tick);

        try {
          const [{ Draggable }, { InertiaPlugin }] = await Promise.all([
            import("gsap/Draggable"),
            import("gsap/InertiaPlugin"),
          ]);

          if (disposed) return;

          gsap.registerPlugin(Draggable, InertiaPlugin);

          const instances = Draggable.create(track, {
            type: "x",
            inertia: true,
            cursor: "inherit",
            activeCursor: "grabbing",
            edgeResistance: 0.82,
            onPress() {
              dragging = true;
            },
            onDrag() {
              gsap.set(track, { x: wrapX(Number(gsap.getProperty(track, "x"))) });
            },
            onThrowUpdate() {
              gsap.set(track, { x: wrapX(Number(gsap.getProperty(track, "x"))) });
            },
            onRelease() {
              dragging = false;
              gsap.set(track, { x: wrapX(Number(gsap.getProperty(track, "x"))) });
            },
          });

          draggableInstance = instances[0] ?? null;
        } catch {
          /* auto-scroll still works without drag inertia */
        }
      };

      void setup();

      const onResize = () => {
        const previous = loopWidth;
        measure();
        if (loopWidth <= 0) return;

        const currentX = Number(gsap.getProperty(track, "x"));
        if (previous > 0 && loopWidth !== previous) {
          gsap.set(track, { x: wrapX(currentX) });
        }
      };

      window.addEventListener("resize", onResize);
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(viewport);
      resizeObserver.observe(setEl);
      resizeObserver.observe(track);

      return () => {
        disposed = true;
        window.removeEventListener("resize", onResize);
        resizeObserver.disconnect();
        gsap.ticker.remove(tick);
        draggableInstance?.kill();
      };
    },
    { scope: viewportRef, dependencies: [clients, loopClients, locale] },
  );

  return (
    <div className="client-marquee-shell">
      <div
        ref={viewportRef}
        className="client-marquee-viewport"
        dir="ltr"
        aria-label={t(copy.gridLabel)}
      >
        <div ref={trackRef} className="client-marquee-track">
          <ClientLogoSet
            clients={loopClients}
            setRef={setRef}
            onHoverStart={pauseScroll}
            onHoverEnd={resumeScroll}
          />
          <ClientLogoSet
            clients={loopClients}
            hidden
            onHoverStart={pauseScroll}
            onHoverEnd={resumeScroll}
          />
          <ClientLogoSet
            clients={loopClients}
            hidden
            onHoverStart={pauseScroll}
            onHoverEnd={resumeScroll}
          />
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
        "relative isolate overflow-hidden bg-[var(--brand-purple-deep)] py-14 text-[var(--brand-cream)] md:py-20 lg:py-24",
        !ready && "min-h-[14rem]",
      )}
      aria-busy={!ready}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgb(231_153_58/0.14),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_82%,rgb(43_181_168/0.1),transparent_38%)]"
      />
      <div
        aria-hidden
        className="radial-burst pointer-events-none absolute inset-0 opacity-20"
      />

      <Shell className="relative mb-10 md:mb-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            kicker={copy.kicker}
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
