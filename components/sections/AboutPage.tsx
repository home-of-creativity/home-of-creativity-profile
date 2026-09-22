"use client";

import { aboutPage } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--brand-ink)]/12 bg-white px-5 py-4 shadow-[0_10px_28px_rgb(10_6_24/0.06)]">
      <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-orange)]">
        {label}
      </p>
      <p className="mt-2 m-0 text-[0.95rem] text-[var(--brand-ink)]/80">{value}</p>
    </div>
  );
}

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <section id="about-page" className="px-0 pb-20 pt-28 sm:pb-24">
      <Shell>
        <Reveal className="mx-auto mb-8 max-w-2xl text-center">
          <SectionHeading kicker={aboutPage.kicker} title={aboutPage.title} align="center" level={1} />
          <p className="mt-6 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">{t(aboutPage.lead)}</p>
        </Reveal>

        <Reveal className="mx-auto max-w-2xl text-start">
          <p className="text-[1rem] leading-[1.85] text-[var(--brand-ink)]/75">{t(aboutPage.body)}</p>
        </Reveal>

        <Reveal className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
          <Fact label={t(aboutPage.officeLabel)} value={t(aboutPage.officeValue)} />
          <Fact label={t(aboutPage.marketLabel)} value={t(aboutPage.marketValue)} />
          <Fact label={t(aboutPage.notPublishedLabel)} value={t(aboutPage.notPublishedValue)} />
        </Reveal>
      </Shell>
    </section>
  );
}
