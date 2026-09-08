"use client";

import { services } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { Hummingbird, Wordmark } from "../brand";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";
import { cn } from "@/lib/cn";

function serviceHref(id: string) {
  switch (id) {
    case "finance":
      return "#finance";
    case "exhibitions":
    case "events":
    case "booths":
      return "#project-events";
    case "identity":
      return "#project-identity";
    case "social":
    case "accounts":
    case "marketing":
    case "ads":
    case "film":
      return "#project-media";
    case "gifts":
    case "outdoor":
      return "#project-promo";
    case "web":
    case "apps":
      return "#project-digital";
    default:
      return "#projects";
  }
}

const tones = {
  orange: "bg-[var(--brand-orange)] text-[var(--brand-purple-deep)]",
  teal: "bg-[var(--brand-teal)] text-[var(--brand-purple-deep)]",
  purple: "bg-[#5a2d8c] text-white",
  blue: "bg-[#3d6cb9] text-white",
  peach: "bg-[#f0b7a0] text-[var(--brand-purple-deep)]",
};

export function Services() {
  const { locale, t } = useLanguage();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[var(--brand-purple)] py-16 text-[var(--brand-cream)] md:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="radial-burst pointer-events-none absolute inset-0 opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(231_153_58/0.16),transparent_42%)]"
      />

      <Shell className="relative">
        <Reveal className="mb-6 flex flex-col items-center text-center">
          <Hummingbird float className="mb-4 h-14 w-20" />
          <Wordmark invert size="sm" />
        </Reveal>
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <SectionHeading kicker={services.kicker} title={services.title} invert align="center" />
          <p className="mt-5 text-white/70">{t(services.lead)}</p>
        </Reveal>

        <Stagger className="flex flex-wrap justify-center gap-2 md:gap-3">
          {services.items.map((item, i) => {
            const primary = locale === "ar" ? item.ar : item.en;
            const secondary = locale === "ar" ? item.en : item.ar;
            return (
              <StaggerItem key={item.id}>
                <a
                  href={serviceHref(item.id)}
                  className={cn(
                    "inline-flex max-w-full items-center overflow-hidden rounded-full shadow-[0_10px_30px_rgb(10_6_24/0.24)] transition-transform duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                    i % 3 === 0 && "md:-rotate-2",
                    i % 3 === 1 && "md:rotate-1",
                    i % 3 === 2 && "md:rotate-2",
                    "hover:z-10 hover:rotate-0 motion-safe:hover:scale-[1.04]",
                  )}
                >
                  <span className="bg-[var(--brand-purple-deep)] px-2.5 py-1.5 text-xs leading-tight md:px-4 md:py-2.5 md:text-[0.82rem]">
                    {primary}
                  </span>
                  <span className={cn("px-2.5 py-1.5 text-xs leading-tight md:px-4 md:py-2.5 md:text-[0.82rem]", tones[item.tone])}>
                    {secondary}
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Shell>
    </section>
  );
}
