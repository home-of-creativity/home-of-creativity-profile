import { CLIENT_TELEGRAM_URL } from "@/lib/base-path";
import type { LegalPage } from "@/lib/legal-api";

const TELEGRAM_LIST_ITEM = /<li>(?:(?!<\/li>)[\s\S])*?t\.me\/(?:(?!<\/li>)[\s\S])*?<\/li>\s*/g;

/** The stored policy lists the Telegram bot under contact; drop that line while no handle is set. */
function legalHtml(html: string): string {
  return CLIENT_TELEGRAM_URL ? html : html.replace(TELEGRAM_LIST_ITEM, "");
}
import { LangHeading } from "@/components/LangHeading";

/** Policy text in the static HTML, both languages, no client fetch. */
export function LegalStatic({ page }: { page: LegalPage }) {
  return (
    <section id={page.slug} className="px-0 pb-20 pt-28 sm:pb-24">
      <div className="mx-auto w-[var(--content)]">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-[0.78rem] font-semibold tracking-[0.16em] text-[var(--brand-orange-ink)] uppercase" data-lang="ar">
            قانوني
          </p>
          <p className="text-[0.78rem] font-semibold tracking-[0.16em] text-[var(--brand-orange-ink)] uppercase" data-lang="en">
            Legal
          </p>
          <LangHeading lang="ar" tagged className="font-display mt-3 text-[2rem] font-semibold text-[var(--brand-ink)]">
            {page.title_ar}
          </LangHeading>
          <LangHeading lang="en" tagged className="font-display mt-3 text-[2rem] font-semibold text-[var(--brand-ink)]">
            {page.title_en}
          </LangHeading>
        </header>

        <article className="legal-doc mx-auto max-w-2xl text-start" data-lang="ar" dir="rtl" lang="ar">
          {page.sections.map((section) => {
            const heading = section.heading_ar.trim();
            return (
              <section key={`${section.id}-ar`} id={section.id} className="legal-doc-section">
                {heading ? <h2>{heading}</h2> : null}
                <div dangerouslySetInnerHTML={{ __html: legalHtml(section.html_ar) }} />
              </section>
            );
          })}
        </article>

        <article className="legal-doc mx-auto max-w-2xl text-start" data-lang="en" dir="ltr" lang="en">
          {page.sections.map((section) => {
            const heading = section.heading_en.trim();
            return (
              <section key={`${section.id}-en`} className="legal-doc-section">
                {heading ? <h2>{heading}</h2> : null}
                <div dangerouslySetInnerHTML={{ __html: legalHtml(section.html_en) }} />
              </section>
            );
          })}
        </article>
      </div>
    </section>
  );
}
