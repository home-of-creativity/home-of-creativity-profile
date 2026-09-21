"use client";

import { faq } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

export function Faq() {
  const { t } = useLanguage();

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[var(--brand-off-white)] py-16 text-[var(--brand-ink)] md:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgb(231_153_58/0.12),transparent_36%)]"
      />
      <Shell className="relative">
        <Reveal>
          <SectionHeading kicker={faq.kicker} title={faq.title} />
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/75">
            {t(faq.lead)}
          </p>
        </Reveal>

        <div className="mt-12 max-w-3xl divide-y divide-[var(--brand-ink)]/12 border-y border-[var(--brand-ink)]/12">
          {faq.items.map((item) => (
            <article key={item.id} className="py-7">
              <h3 className="font-display m-0 text-[1.35rem] leading-snug text-[var(--brand-ink)] md:text-[1.5rem]">
                {t(item.q)}
              </h3>
              <p className="mt-3 m-0 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/75">
                {t(item.a)}
              </p>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
