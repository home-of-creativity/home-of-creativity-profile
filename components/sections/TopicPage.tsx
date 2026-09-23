import Link from "next/link";
import type { TopicPageCopy } from "@/lib/content";
import { pagePath } from "@/lib/base-path";
import { whatsappHref } from "@/lib/whatsapp";
import { FaqList } from "./Faq";

/**
 * Bilingual category page. Both languages are in the static HTML;
 * `[data-lang]` shows the one that matches the visitor's locale.
 */
export function TopicPage({ copy }: { copy: TopicPageCopy }) {
  return (
    <section id="topic" className="px-0 pb-20 pt-28 sm:pb-24">
      <div className="mx-auto w-[var(--content)]">
        <TopicLocale copy={copy} lang="ar" />
        <TopicLocale copy={copy} lang="en" />
      </div>
    </section>
  );
}

function TopicLocale({ copy, lang }: { copy: TopicPageCopy; lang: "ar" | "en" }) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div data-lang={lang} lang={lang} dir={dir}>
      <nav aria-label={lang === "ar" ? "مسار التصفح" : "Breadcrumb"} className="mb-8 text-center text-[0.8rem] text-[var(--brand-ink)]/50">
        <Link href={pagePath("/")} className="hover:text-[var(--brand-orange)]">
          {lang === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <span aria-hidden> / </span>
        <Link href={pagePath("services")} className="hover:text-[var(--brand-orange)]">
          {lang === "ar" ? "خدماتنا" : "Services"}
        </Link>
        <span aria-hidden> / </span>
        <span>{copy.title[lang]}</span>
      </nav>

      <header className="mx-auto mb-10 max-w-2xl text-center">
        <span aria-hidden className="mx-auto mb-3 block h-px w-9 bg-[var(--brand-orange)]" />
        <h1 className="font-display m-0 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-[var(--brand-ink)]">
          {copy.title[lang]}
        </h1>
        <p className="mt-6 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">{copy.lead[lang]}</p>
      </header>

      <div className="mx-auto grid max-w-2xl gap-8">
        {copy.sections.map((section) => (
          <section key={section.heading.en}>
            <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">{section.heading[lang]}</h2>
            <p className="mt-3 text-[0.98rem] leading-[1.75] text-[var(--brand-ink)]/75">{section.body[lang]}</p>
          </section>
        ))}

        {copy.faqs.length ? (
          <section>
            <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">
              {lang === "ar" ? "أسئلة شائعة" : "FAQ"}
            </h2>
            <FaqList
              name={`topic-faq-${lang}`}
              items={copy.faqs.map((item) => ({
                id: item.q.en,
                question: item.q[lang],
                answer: item.a[lang],
              }))}
            />
          </section>
        ) : null}

        <p className="m-0">
          <a
            href={whatsappHref(copy.title.en)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--brand-purple)] px-6 py-3 text-[0.82rem] font-semibold uppercase text-[var(--brand-ivory)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
          >
            {lang === "ar" ? "ابدأ عبر واتساب" : "Start on WhatsApp"}
          </a>
        </p>

        {copy.links.length ? (
          <nav aria-label={lang === "ar" ? "صفحات ذات صلة" : "Related pages"}>
            <h2 className="font-display m-0 text-[1.1rem] font-semibold text-[var(--brand-ink)]">
              {lang === "ar" ? "صفحات ذات صلة" : "Related pages"}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3 p-0">
              {copy.links.map((link) => (
                <li key={link.href} className="list-none">
                  <Link
                    href={pagePath(link.href)}
                    className="text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
                  >
                    {link.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
