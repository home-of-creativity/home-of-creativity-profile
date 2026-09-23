"use client";

import { useEffect, useRef, useState } from "react";
import { faq } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { Hummingbird } from "../brand";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

function FaqMark() {
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const details = ref.current?.closest("details");
    if (!details) return;
    const onToggle = () => setOpen(details.open);
    details.addEventListener("toggle", onToggle);
    return () => details.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="grid h-11 w-11 shrink-0 place-items-center overflow-visible rounded-full border border-[var(--brand-ink)]/18 bg-white"
    >
      <Hummingbird
        surface="light"
        float={!open}
        stationary
        wingsRaised={open}
        className="h-7 w-9"
      />
    </span>
  );
}

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
                <FaqMark />
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
