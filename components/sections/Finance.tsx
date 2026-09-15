"use client";

import Image from "next/image";
import { finance } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

export function Finance() {
  const { t } = useLanguage();

  return (
    <section
      id="finance"
      className="relative overflow-hidden bg-[var(--brand-purple-deep)] py-16 text-[var(--brand-cream)] md:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(43_181_168/0.12),transparent_34%)]"
      />
      <Shell className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 xl:gap-20">
          <Reveal>
            <SectionHeading kicker={finance.kicker} title={finance.title} invert />
            <p className="font-display mt-6 text-[1.35rem] leading-snug text-[var(--brand-cream)] md:text-[1.55rem]">
              {t(finance.heading)}
            </p>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-white/75">
              {t(finance.body)}
            </p>
          </Reveal>

          <Reveal>
            <div className="relative mx-auto aspect-[1942/809] w-full max-w-xl lg:max-w-none">
              <Image
                src={withBasePath("/photo/financial-analysis.webp")}
                alt={t(finance.imageAlt)}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-contain object-center"
              />
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {finance.offerings.map((item, index) => (
            <StaggerItem key={item.id}>
              <article className="lux-card group flex h-full flex-col border border-white/12 bg-[color-mix(in_srgb,var(--brand-purple)_42%,transparent)] p-7 backdrop-blur-sm">
                <div className="mb-8 flex items-center justify-between">
                  <span className="lux-rule block h-px w-10 bg-[var(--brand-orange)]" />
                  <span className="text-[0.72rem] text-white/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display m-0 text-[1.4rem] leading-tight font-semibold">
                  {t(item.title)}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-white/72">
                  {t(item.body)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Shell>
    </section>
  );
}
