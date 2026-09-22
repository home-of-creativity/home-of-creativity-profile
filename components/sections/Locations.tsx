"use client";

import Link from "next/link";
import { contact } from "@/lib/content";
import { pagePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { seoCopy } from "@/lib/site";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

const office = contact.offices[0];

export function Locations() {
  const { t, locale } = useLanguage();

  return (
    <section id="locations" className="px-0 pb-20 pt-28 sm:pb-24">
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <SectionHeading kicker={contact.map.title} title={seoCopy.locationsTitle} align="center" level={1} />
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-[var(--brand-ink)]/75">
            {locale === "ar"
              ? "المكتب المنشور واحد: الحمراء في دمشق. السعودية سوق نخدمها وليست مكتباً ثانياً."
              : "The published office is one place: Al Hamra, Damascus. Saudi Arabia is a market served, not a second office."}
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-md">
          <Link
            href={pagePath("locations/damascus")}
            className="block rounded-2xl border border-[var(--brand-ink)]/12 bg-white px-5 py-5 shadow-[0_10px_28px_rgb(10_6_24/0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
          >
            <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-orange)]">
              {t(office.country)}
            </p>
            <h2 className="mt-2 text-[1.15rem] font-semibold text-[var(--brand-ink)]">{t(office.city)}</h2>
            <p className="mt-3 m-0 text-[0.9rem] font-semibold text-[var(--brand-purple)]">
              {locale === "ar" ? "صفحة دمشق" : "Damascus page"}
            </p>
          </Link>
        </Reveal>
      </Shell>
    </section>
  );
}
