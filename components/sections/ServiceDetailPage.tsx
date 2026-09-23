"use client";

import Link from "next/link";
import { servicesPage } from "@/lib/content";
import { pagePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/lib/i18n";
import { findServiceDetail, serviceDetailLabels as labels, serviceProcess } from "@/lib/service-details";
import { whatsappHref } from "@/lib/whatsapp";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Shell } from "../ui";

const identityLinks = [
  { href: "services/branding", en: "Branding services in Damascus", ar: "خدمات الهوية في دمشق" },
  { href: "services/brand-identity", en: "Brand identity services", ar: "خدمات الهوية التجارية" },
  { href: "locations/damascus", en: "The Damascus office", ar: "مكتب دمشق" },
];

export function ServiceDetailPage({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const detail = findServiceDetail(slug);

  if (!detail) return null;

  const related = detail.related
    .map((relatedSlug) => findServiceDetail(relatedSlug))
    .filter((entry) => entry !== undefined);

  return (
    <>
      <section
        id="service-detail"
        className="relative isolate overflow-hidden bg-[var(--brand-purple-deep)] pb-16 pt-32 text-[var(--brand-ivory)] md:pb-20 md:pt-36"
      >
        <div
          aria-hidden
          className="radial-burst pointer-events-none absolute inset-0 opacity-25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgb(231_153_58/0.22),transparent_45%)]"
        />
        <Shell className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <nav aria-label={t(labels.breadcrumb)} className="text-[0.8rem] text-white/55">
              <Link href={pagePath("services")} className="hover:text-[var(--brand-orange)]">
                {t(servicesPage.title)}
              </Link>
              <span aria-hidden> / </span>
              <span>{t(detail.title)}</span>
            </nav>
            <span aria-hidden className="mx-auto my-5 block h-px w-10 bg-[var(--brand-orange)]" />
            <div data-lang="ar" lang="ar" dir="rtl">
              <h1 className="font-display m-0 text-[clamp(2.1rem,5.5vw,3.8rem)] font-semibold leading-[1.1]">
                {detail.title.ar}
              </h1>
              <p className="mt-5 text-[1.15rem] font-semibold text-[var(--brand-orange)]">{detail.tagline.ar}</p>
            </div>
            <div data-lang="en" lang="en" dir="ltr">
              <h1 className="font-display m-0 text-[clamp(2.1rem,5.5vw,3.8rem)] font-semibold leading-[1.1]">
                {detail.title.en}
              </h1>
              <p className="mt-5 text-[1.15rem] font-semibold text-[var(--brand-orange)]">{detail.tagline.en}</p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-white/78">{t(detail.definition)}</p>
            <a
              href={whatsappHref(t(detail.title))}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--brand-orange)] px-7 py-3 text-[0.85rem] font-semibold text-[var(--brand-purple-deep)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                locale === "en" && "tracking-[0.1em] uppercase",
              )}
            >
              {t(labels.cta)}
              <span aria-hidden className={cn(locale === "ar" && "inline-block rotate-180")}>→</span>
            </a>
          </Reveal>
        </Shell>
      </section>

      <section className="bg-[var(--brand-off-white)] py-16 text-[var(--brand-ink)] md:py-20">
        <Shell>
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display m-0 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">{t(labels.covers)}</h2>
            <p className="mt-3 text-[0.92rem] text-[var(--brand-ink)]/60">{t(labels.coversNote)}</p>
          </Reveal>
          <Stagger className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {detail.covers.map((item, index) => (
              <StaggerItem key={item.en}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-5 shadow-[0_12px_30px_rgb(10_6_24/0.05)]">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand-orange)]/12 font-display text-[0.95rem] font-semibold text-[var(--brand-purple-deep)]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="m-0 pt-2 text-[1rem] font-semibold leading-snug">{t(item)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-cream)] p-7">
                <h2 className="font-display m-0 text-[1.35rem] font-semibold">{t(labels.audience)}</h2>
                <span aria-hidden className="mt-3 block h-px w-10 bg-[var(--brand-orange)]" />
                <p className="mt-4 text-[0.98rem] leading-[1.8] text-[var(--brand-ink)]/78">{t(detail.audience)}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-cream)] p-7">
                <h2 className="font-display m-0 text-[1.35rem] font-semibold">{t(labels.process)}</h2>
                <span aria-hidden className="mt-3 block h-px w-10 bg-[var(--brand-orange)]" />
                <p className="mt-4 text-[0.98rem] leading-[1.8] text-[var(--brand-ink)]/78">{t(serviceProcess)}</p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mx-auto mt-14 max-w-3xl">
            <h2 id="faq" className="font-display m-0 text-center text-[clamp(1.5rem,3vw,2rem)] font-semibold">
              {t(labels.faq)}
            </h2>
            <div className="mt-6 border-y border-[var(--brand-ink)]/12">
              {detail.faqs.map((item) => (
                <details
                  key={item.q.en}
                  name="service-faq"
                  className="group border-b border-[var(--brand-ink)]/12 last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1rem] font-semibold marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] [&::-webkit-details-marker]:hidden">
                    {t(item.q)}
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--brand-ink)]/15 text-[var(--brand-orange)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="m-0 pb-5 text-[0.96rem] leading-[1.8] text-[var(--brand-ink)]/72">{t(item.a)}</p>
                </details>
              ))}
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-14 max-w-4xl">
            <h2 className="font-display m-0 text-center text-[1.3rem] font-semibold">{t(labels.related)}</h2>
            <ul className="mt-6 grid gap-3 p-0 sm:grid-cols-3">
              {related.map((entry) => (
                <li key={entry.slug} className="list-none">
                  <Link
                    href={pagePath(`services/${entry.slug}`)}
                    className="flex h-full flex-col rounded-2xl border border-[var(--brand-ink)]/12 bg-white px-5 py-4 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                  >
                    <span className="text-[1rem] font-semibold">{t(entry.title)}</span>
                    <span className="mt-1 text-[0.85rem] leading-snug text-[var(--brand-ink)]/60">{t(entry.tagline)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {slug === "visual-identity" ? (
              <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 p-0">
                {identityLinks.map((link) => (
                  <li key={link.href} className="list-none">
                    <Link
                      href={pagePath(link.href)}
                      className="text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
                    >
                      {locale === "ar" ? link.ar : link.en}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 text-center">
              <Link
                href={pagePath("services")}
                className="text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
              >
                {t(labels.allServices)} →
              </Link>
            </p>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
