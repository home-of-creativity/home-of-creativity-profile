"use client";

import { useEffect, useMemo, useState } from "react";
import { clientVoices } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { fetchShowcaseClients, type ShowcaseClient } from "@/lib/portfolio-api";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[&]/g, " ").replace(/\s+/g, " ").trim();
}

function matchClient(item: (typeof clientVoices.items)[number], clients: ShowcaseClient[]) {
  const byId = clients.find((client) => client.id === item.clientId);
  if (byId?.logo_url) return byId;

  const needles = [item.name.en, item.name.ar, ...item.aliases].map(normalizeName);
  return (
    clients.find((client) => {
      const name = normalizeName(client.name);
      return needles.some((needle) => name.includes(needle) || needle.includes(name));
    }) ?? byId
  );
}

export function ClientVoices() {
  const { t } = useLanguage();
  const [clients, setClients] = useState<ShowcaseClient[]>([]);

  useEffect(() => {
    let active = true;
    fetchShowcaseClients()
      .then((rows) => {
        if (active) setClients(rows.filter((client) => Boolean(client.logo_url)));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const quotes = useMemo(
    () =>
      clientVoices.items.map((item) => ({
        ...item,
        client: matchClient(item, clients),
      })),
    [clients],
  );

  return (
    <section
      id="voices"
      className="relative isolate overflow-hidden bg-[var(--brand-off-white)] py-16 text-[var(--brand-ink)] md:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(231_153_58/0.12),transparent_45%)]"
      />
      <Shell className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading kicker={clientVoices.kicker} title={clientVoices.title} align="center" />
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--brand-ink)]/70">{t(clientVoices.lead)}</p>
        </Reveal>

        {clients.length > 0 ? (
          <Reveal>
            <ul
              className="mx-auto mt-12 flex max-w-4xl list-none flex-wrap items-center justify-center gap-3 p-0 sm:gap-4"
              aria-label={t(clientVoices.title)}
            >
              {clients.map((client) => (
                <li key={client.id} className="list-none">
                  <span className="grid h-[4.25rem] w-[4.25rem] place-items-center overflow-hidden rounded-full border border-[var(--brand-ink)]/8 bg-white shadow-[0_10px_24px_rgb(26_18_36/0.08)] sm:h-[4.75rem] sm:w-[4.75rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.logo_url ?? ""}
                      alt={client.name}
                      width={76}
                      height={76}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-2"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Stagger className="mt-16 grid gap-16 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8">
          {quotes.map((item, index) => {
            const logo = item.client?.logo_url;
            const name = t(item.name);
            return (
              <StaggerItem key={item.id} className="h-full">
                <figure
                  className={cn(
                    "relative m-0 flex h-full flex-col items-center rounded-[1.75rem] border border-[var(--brand-ink)]/8 bg-white px-6 pb-8 pt-16 text-center shadow-[0_22px_50px_rgb(26_18_36/0.08)] transition-[box-shadow,border-color,transform] duration-500 motion-safe:hover:border-[var(--brand-orange)]/40 motion-safe:hover:shadow-[0_28px_60px_rgb(26_18_36/0.14)] md:px-7",
                    index === 1 && "md:-translate-y-6",
                  )}
                >
                  <div className="absolute -top-11 left-1/2 grid h-[5.5rem] w-[5.5rem] -translate-x-1/2 place-items-center overflow-hidden rounded-full border-4 border-[var(--brand-off-white)] bg-white shadow-[0_12px_30px_rgb(26_18_36/0.16)] ring-2 ring-[var(--brand-orange)]/60">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo}
                        alt={name}
                        width={88}
                        height={88}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-2.5"
                      />
                    ) : (
                      <span aria-hidden className="font-display text-[1.1rem] font-semibold text-[var(--brand-purple)]">
                        {name.slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <p className="voice-stars" role="img" aria-label={t(clientVoices.ratingLabel)}>
                    {Array.from({ length: 5 }, (_, star) => (
                      <svg key={star} viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                        <path
                          fill="currentColor"
                          d="M12 2.6 14.7 8.4l6.3.9-4.5 4.4 1.1 6.3L12 17.1 6.4 20l1.1-6.3L3 9.3l6.3-.9L12 2.6Z"
                        />
                      </svg>
                    ))}
                  </p>
                  <blockquote className="m-0 mt-3 flex-1">
                    <p className="m-0 text-[1.05rem] leading-[1.85] text-[var(--brand-ink)]/80">{t(item.quote)}</p>
                  </blockquote>
                  <figcaption className="mt-7 w-full border-t border-[var(--brand-ink)]/10 pt-5">
                    <p className="font-display m-0 text-[1.25rem] leading-snug font-semibold text-[var(--brand-ink)]">
                      {name}
                    </p>
                    <p className="m-0 mt-1 text-[0.8rem] text-[var(--brand-muted)]">{t(clientVoices.role)}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Shell>
    </section>
  );
}
