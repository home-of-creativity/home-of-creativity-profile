"use client";

import Link from "next/link";
import { serviceDetails, servicesPage, services } from "@/lib/content";
import { pagePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";
import { cn } from "@/lib/cn";

export function ServicesPage() {
  const { t, locale } = useLanguage();

  return (
    <section id="services-page" className="px-0 pb-20 pt-28 sm:pb-24">
      <Shell>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <SectionHeading kicker={servicesPage.kicker} title={servicesPage.title} align="center" level={1} />
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-[var(--brand-ink)]/75">{t(servicesPage.lead)}</p>
        </Reveal>

        <Stagger className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {services.items.map((item) => {
            const detail = serviceDetails.find((entry) => entry.id === item.id);
            const label = locale === "ar" ? item.ar : item.en;
            const content = (
              <>
                <span className="text-[1rem] font-semibold text-[var(--brand-ink)]">{label}</span>
                {detail ? (
                  <span className="mt-1 text-[0.82rem] font-semibold text-[var(--brand-orange)]">
                    {t(servicesPage.viewPage)} →
                  </span>
                ) : (
                  <span className="mt-1 text-[0.82rem] text-[var(--brand-ink)]/50">
                    {t(servicesPage.comingSoon)}
                  </span>
                )}
              </>
            );

            return (
              <StaggerItem key={item.id}>
                {detail ? (
                  <Link
                    href={pagePath(`services/${detail.slug}`)}
                    className="flex flex-col rounded-2xl border border-[var(--brand-ink)]/12 bg-white px-5 py-4 shadow-[0_10px_28px_rgb(10_6_24/0.06)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "flex flex-col rounded-2xl border border-[var(--brand-ink)]/12 bg-white/60 px-5 py-4",
                    )}
                  >
                    {content}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Shell>
    </section>
  );
}
