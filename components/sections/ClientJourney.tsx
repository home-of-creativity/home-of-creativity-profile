"use client";

import { clientJourney } from "@/lib/content";
import { CLIENT_TELEGRAM_URL } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

export function ClientJourney() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[var(--brand-cream)] py-16 md:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgb(231_153_58/0.08),transparent_42%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_88%,rgb(46_14_92/0.06),transparent_38%)]"
      />

      <Shell className="relative">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <SectionHeading
            kicker={clientJourney.kicker}
            title={clientJourney.title}
            align="center"
          />
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--brand-ink)]/75">
            {t(clientJourney.lead)}
          </p>
        </Reveal>

        <Stagger className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {clientJourney.steps.map((step, index) => (
            <StaggerItem key={step.id}>
              <article
                className={cn(
                  "lux-card group relative flex h-full flex-col border border-[var(--brand-line)] bg-white/70 p-6 backdrop-blur-sm md:p-7",
                  "transition-[border-color,box-shadow] duration-500 motion-safe:hover:border-[var(--brand-orange)]/45 motion-safe:hover:shadow-[0_18px_40px_rgb(26_18_36/0.08)]",
                )}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--brand-orange)] bg-[var(--brand-orange)]/10 font-display text-[1rem] font-semibold text-[var(--brand-purple-deep)]",
                      locale === "en" && "tracking-[0.06em]",
                    )}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-[0.72rem] text-[var(--brand-muted)]",
                      locale === "en" && "tracking-[0.22em] uppercase",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(clientJourney.steps.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display m-0 text-[1.35rem] leading-snug font-semibold text-[var(--brand-ink)]">
                  {t(step.title)}
                </h3>
                <span className="mt-3 block h-px w-10 bg-[var(--brand-orange)] transition-[width] duration-500 motion-safe:group-hover:w-full" />
                <p className="mt-4 flex-1 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/78">
                  {t(step.body)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex justify-center">
          <a
            href={CLIENT_TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-[var(--brand-purple-deep)] px-6 py-3 text-[0.82rem] font-semibold text-[var(--brand-cream)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
              locale === "ar" ? "tracking-normal" : "tracking-[0.12em] uppercase",
            )}
          >
            {t(clientJourney.cta)}
            <span
              aria-hidden
              className={cn("text-[var(--brand-orange)]", locale === "ar" && "inline-block rotate-180")}
            >
              →
            </span>
          </a>
        </Reveal>
      </Shell>
    </section>
  );
}
