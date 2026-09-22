"use client";

import Link from "next/link";
import { serviceDetails, servicesPage } from "@/lib/content";
import { pagePath } from "@/lib/base-path";

const identityLinks = [
  { href: "services/branding", en: "branding services in Damascus", ar: "خدمات الهوية في دمشق" },
  { href: "services/brand-identity", en: "brand identity services", ar: "خدمات الهوية التجارية" },
  { href: "locations/damascus", en: "the Damascus office", ar: "مكتب دمشق" },
  { href: "articles/what-is-visual-identity", en: "what visual identity is", ar: "ما هي الهوية البصرية" },
];
import { useLanguage } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";
import { Reveal } from "../motion";
import { Shell } from "../ui";

export function ServiceDetailPage({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const detail = serviceDetails.find((entry) => entry.slug === slug);
  const siblings = serviceDetails.filter((entry) => entry.slug !== slug);

  if (!detail) return null;

  return (
    <section id="service-detail" className="px-0 pb-20 pt-28 sm:pb-24">
      <Shell>
        <Reveal className="mx-auto mb-4 max-w-2xl text-center">
          <nav aria-label={locale === "ar" ? "مسار التصفح" : "Breadcrumb"} className="text-[0.8rem] text-[var(--brand-ink)]/50">
            <Link href={pagePath("services")} className="hover:text-[var(--brand-orange)]">
              {t(servicesPage.title)}
            </Link>
            <span aria-hidden> / </span>
            <span>{t(detail.title)}</span>
          </nav>
        </Reveal>

        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span aria-hidden className="mx-auto mb-3 block h-px w-9 bg-[var(--brand-orange)]" />
          <div data-lang="ar" lang="ar" dir="rtl">
            <h1 className="font-display m-0 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-[var(--brand-ink)]">
              {detail.title.ar}
            </h1>
            <p className="mt-6 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">{detail.definition.ar}</p>
          </div>
          <div data-lang="en" lang="en" dir="ltr">
            <h1 className="font-display m-0 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-[var(--brand-ink)]">
              {detail.title.en}
            </h1>
            <p className="mt-6 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">{detail.definition.en}</p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-2xl gap-8">
          <Reveal>
            <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">
              {t(detail.audienceLabel)}
            </h2>
            <p className="mt-3 text-[0.98rem] leading-[1.75] text-[var(--brand-ink)]/75">{t(detail.audience)}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">
              {t(detail.processLabel)}
            </h2>
            <p className="mt-3 text-[0.98rem] leading-[1.75] text-[var(--brand-ink)]/75">{t(detail.process)}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">
              {locale === "ar" ? "أسئلة شائعة" : "FAQ"}
            </h2>
            <div className="mt-4 border-y border-[var(--brand-ink)]/12">
              {detail.faqs.map((item, index) => (
                <details key={index} className="group border-b border-[var(--brand-ink)]/12 last:border-b-0">
                  <summary className="cursor-pointer py-4 text-[0.98rem] font-semibold text-[var(--brand-ink)] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]">
                    {t(item.q)}
                  </summary>
                  <p className="m-0 pb-4 text-[0.95rem] leading-[1.7] text-[var(--brand-ink)]/70">{t(item.a)}</p>
                </details>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <a
              href={whatsappHref(t(detail.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--brand-purple)] px-6 py-3 text-[0.82rem] font-semibold uppercase text-[var(--brand-ivory)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
            >
              {locale === "ar" ? "ابدأ عبر واتساب" : "Start on WhatsApp"}
            </a>
          </Reveal>

          {slug === "visual-identity" ? (
            <Reveal>
              <h2 className="font-display m-0 text-[1.1rem] font-semibold text-[var(--brand-ink)]">
                {locale === "ar" ? "صفحات ذات صلة" : "Related pages"}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-3 p-0">
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
            </Reveal>
          ) : null}

          {siblings.length ? (
            <Reveal>
              <h2 className="font-display m-0 text-[1.1rem] font-semibold text-[var(--brand-ink)]">
                {locale === "ar" ? "خدمات أخرى" : "Other services"}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-3 p-0">
                {siblings.map((sibling) => (
                  <li key={sibling.slug} className="list-none">
                    <Link
                      href={pagePath(`services/${sibling.slug}`)}
                      className="text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
                    >
                      {t(sibling.title)}
                    </Link>
                  </li>
                ))}
                <li className="list-none">
                  <Link
                    href={pagePath("services")}
                    className="text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
                  >
                    {t(servicesPage.title)}
                  </Link>
                </li>
              </ul>
            </Reveal>
          ) : null}
        </div>
      </Shell>
    </section>
  );
}
