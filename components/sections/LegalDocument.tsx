"use client";

import { useEffect, useState } from "react";
import { fetchLegalPage, type LegalPage } from "@/lib/legal-api";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

export function LegalDocument({ slug }: { slug: "privacy" | "terms" }) {
  const { locale } = useLanguage();
  const [page, setPage] = useState<LegalPage | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    setReady(false);
    fetchLegalPage(slug)
      .then((data) => {
        if (active) setPage(data);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const title = page
    ? { en: page.title_en, ar: page.title_ar }
    : slug === "terms"
      ? { en: "Terms of Use", ar: "شروط الاستخدام" }
      : { en: "Privacy Policy", ar: "سياسة الخصوصية" };

  return (
    <section id={slug} className="px-0 pb-20 pt-28 sm:pb-24">
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <SectionHeading
            kicker={{ en: "Legal", ar: "قانوني" }}
            title={title}
            align="center"
            level={1}
          />
        </Reveal>

        {!ready ? (
          <p className="mx-auto max-w-2xl text-center text-[0.95rem] text-[var(--brand-ink)]/70">
            {locale === "ar" ? "جاري التحميل…" : "Loading…"}
          </p>
        ) : !page ? (
          <p className="mx-auto max-w-2xl text-center text-[0.95rem] text-[var(--brand-ink)]/70">
            {locale === "ar" ? "تعذر تحميل هذه الصفحة." : "This page could not be loaded."}
          </p>
        ) : (
          <article className="legal-doc mx-auto max-w-2xl text-start">
            {page.sections.map((section) => {
              const heading = (locale === "ar" ? section.heading_ar : section.heading_en).trim();
              const html = locale === "ar" ? section.html_ar : section.html_en;
              return (
                <section key={section.id} id={section.id} className="legal-doc-section">
                  {heading ? <h2>{heading}</h2> : null}
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </section>
              );
            })}
          </article>
        )}
      </Shell>
    </section>
  );
}
