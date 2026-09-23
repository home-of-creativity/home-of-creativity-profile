"use client";

import { clientVoices } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

export function ClientVoices() {
  const { t } = useLanguage();

  return (
    <section
      id="voices"
      className="relative bg-[var(--brand-off-white)] py-16 text-[var(--brand-ink)] md:py-24 lg:py-32"
    >
      <Shell>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            kicker={clientVoices.kicker}
            title={clientVoices.title}
            align="center"
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {clientVoices.items.map((item) => (
            <StaggerItem key={item.id}>
              <figure className="flex h-full flex-col border border-[var(--brand-ink)]/12 bg-white p-6 md:p-8">
                <blockquote className="m-0">
                  <p className="m-0 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">
                    {t(item.quote)}
                  </p>
                </blockquote>
                <figcaption className="mt-8 border-t border-[var(--brand-ink)]/10 pt-5">
                  <p className="font-display m-0 text-[1.25rem] leading-snug text-[var(--brand-ink)]">
                    {t(item.name)}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Shell>
    </section>
  );
}
