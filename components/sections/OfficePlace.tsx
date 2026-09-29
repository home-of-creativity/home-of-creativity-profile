import Link from "next/link";
import { ContactMap } from "@/components/ContactMap";
import { pagePath } from "@/lib/base-path";
import { contact, officePages } from "@/lib/content";
import { officeMapUrl, officeName, officePath, offices, phoneHref, phoneLabels, type Office } from "@/lib/offices";
import { serviceDetails } from "@/lib/service-details";
import { whatsappHref } from "@/lib/whatsapp";

type OfficeSlug = keyof Omit<typeof officePages, "labels">;

/**
 * `/locations/{slug}/` for one office: title, lead, services, address and every number,
 * the map when coordinates exist, and links to the other offices. Both languages are in
 * the static HTML (`data-lang`). Each language block has its own `<h1>`;
 * CSS hides the inactive language so one heading is visible.
 */
export function OfficePlace({ office }: { office: Office }) {
  const mapUrl = officeMapUrl(office);
  return (
    <section id={office.slug ?? office.id} className="px-0 pb-20 pt-28 sm:pb-24">
      <div className="mx-auto w-[var(--content)]">
        <PlaceCopy office={office} lang="ar" />
        <PlaceCopy office={office} lang="en" />
        {office.geo ? (
          <>
            <ContactMap officeId={office.id} />
            {mapUrl ? (
              <p className="mx-auto mt-6 max-w-md text-center" dir="ltr">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
                >
                  {officePages.labels.map.en}
                </a>
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}

function PlaceCopy({ office, lang }: { office: Office; lang: "ar" | "en" }) {
  const copy = officePages[office.slug as OfficeSlug];
  const others = offices.filter((entry) => entry.id !== office.id);

  return (
    <div data-lang={lang} lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <nav aria-label={lang === "ar" ? "مسار التصفح" : "Breadcrumb"} className="mb-8 text-center text-[0.8rem] text-[var(--brand-ink)]/70">
        <Link href={pagePath("/")} className="hover:text-[var(--brand-orange)]">
          {lang === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <span aria-hidden> / </span>
        <Link href={pagePath("locations")} className="hover:text-[var(--brand-orange)]">
          {lang === "ar" ? "المواقع" : "Locations"}
        </Link>
        <span aria-hidden> / </span>
        <span>{officeName(office, lang, { district: false })}</span>
      </nav>

      <header className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="font-display m-0 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-[var(--brand-ink)]">
          {copy.title[lang]}
        </h1>
        <p className="mt-6 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">{copy.lead[lang]}</p>
      </header>

      <div className="mx-auto mb-10 grid max-w-2xl gap-8">
        <section>
          <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">
            {officePages.labels.contact[lang]}
          </h2>
          {office.address ? (
            <p className="mt-3 text-[0.98rem] leading-[1.75] text-[var(--brand-ink)]/75">
              {officePages.labels.address[lang]}: {office.address[lang]}
            </p>
          ) : null}
          <ul className="mt-2 p-0">
            {office.phones.map((phone) => (
              <li key={`${phone.kind}-${phone.digits}`} className="list-none">
                <span className="text-[0.9rem] text-[var(--brand-ink)]/75">{phoneLabels[phone.kind][lang]}: </span>
                <a
                  href={phone.kind === "whatsapp" ? whatsappHref(contact.greeting[lang], phone.digits) : phoneHref(phone)}
                  {...(phone.kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  dir="ltr"
                  className="text-[0.95rem] font-semibold text-[var(--brand-ink)]"
                >
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">{copy.servicesLabel[lang]}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 p-0">
            {serviceDetails.map((detail) => (
              <li key={detail.slug} className="list-none">
                <Link
                  href={pagePath(`services/${detail.slug}`)}
                  className="text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
                >
                  {detail.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">{officePages.labels.offices[lang]}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 p-0">
            {others.map((entry) => {
              const path = officePath(entry);
              const name = officeName(entry, lang);
              return (
                <li key={entry.id} className="list-none text-[0.9rem] font-semibold text-[var(--brand-ink)]/80">
                  {path ? (
                    <Link href={pagePath(path)} className="text-[var(--brand-purple)] hover:text-[var(--brand-orange)]">
                      {name}
                    </Link>
                  ) : (
                    name
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
