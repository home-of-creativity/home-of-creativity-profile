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

        <div className="mt-12 max-w-3xl border-y border-[var(--brand-ink)]/12">
          {faq.items.map((item) => (
            <details
              key={item.id}
              name="faq"
              className="group border-b border-[var(--brand-ink)]/12 last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-7 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] [&::-webkit-details-marker]:hidden">
                <h3 className="font-display m-0 text-[1.35rem] leading-snug text-[var(--brand-ink)] md:text-[1.5rem]">
                  {t(item.q)}
                </h3>
                <span
                  aria-hidden
                  className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--brand-ink)]/18 text-[var(--brand-orange)]"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 ease-out group-open:scale-y-0 motion-reduce:transition-none" />
                </span>
              </summary>
              <p className="m-0 max-w-2xl pb-7 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/75">
                {t(item.a)}
              </p>
            </details>
          ))}
        </div>
      </Shell>
    </section>
  );
}
