"use client";

import { ContactMap } from "@/components/ContactMap";
import { contact } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { officesGeo } from "@/lib/seo";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

const office = contact.offices[0];
const geo = officesGeo.syr;

export function Locations() {
  const { t } = useLanguage();

  return (
    <section id="locations" className="px-0 pb-20 pt-28 sm:pb-24">
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <SectionHeading kicker={contact.map.title} title={contact.map.pageTitle} align="center" level={1} />
        </Reveal>

        <ContactMap />

        <div
          id="syr"
          className="mx-auto mt-10 max-w-md rounded-2xl border border-[var(--brand-ink)]/12 bg-white px-5 py-5 shadow-[0_10px_28px_rgb(10_6_24/0.06)]"
        >
          <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-orange)]">
            {t(office.country)}
          </p>
          <h2 className="mt-2 text-[1.15rem] font-semibold text-[var(--brand-ink)]">{t(office.city)}</h2>
          <p className="mt-2 m-0 text-[0.92rem] text-[var(--brand-ink)]/70" dir="ltr">
            {office.phones[0]}
          </p>
          <a
            href={geo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-[0.82rem] font-semibold text-[var(--brand-purple)] transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
          >
            {t(contact.map.open)}
          </a>
        </div>
      </Shell>
    </section>
  );
}
