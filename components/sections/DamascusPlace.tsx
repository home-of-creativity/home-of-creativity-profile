import Link from "next/link";
import { ContactMap } from "@/components/ContactMap";
import { pagePath } from "@/lib/base-path";
import { contact, damascusPage } from "@/lib/content";
import { officesGeo } from "@/lib/seo";

const office = contact.offices[0];
const links = [
  { href: "services/branding", en: "branding services in Damascus", ar: "خدمات الهوية في دمشق" },
  { href: "services/visual-identity", en: "visual identity design services", ar: "تصميم الهوية البصرية" },
  { href: "services/brand-identity", en: "brand identity services", ar: "خدمات الهوية التجارية" },
  { href: "services/social-media", en: "social media", ar: "السوشال ميديا" },
  { href: "services/websites-ecommerce", en: "websites and ecommerce", ar: "المواقع والمتاجر" },
];

export function DamascusPlace() {
  return (
    <section id="damascus" className="px-0 pb-20 pt-28 sm:pb-24">
      <div className="mx-auto w-[var(--content)]">
        <PlaceCopy lang="ar" />
        <PlaceCopy lang="en" />
        <ContactMap />
        <p className="mx-auto mt-6 max-w-md text-center" dir="ltr">
          <a
            href={officesGeo.syr.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.82rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]"
          >
            {contact.map.open.en}
          </a>
        </p>
      </div>
    </section>
  );
}

function PlaceCopy({ lang }: { lang: "ar" | "en" }) {
  return (
    <div data-lang={lang} lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <nav aria-label={lang === "ar" ? "مسار التصفح" : "Breadcrumb"} className="mb-8 text-center text-[0.8rem] text-[var(--brand-ink)]/50">
        <Link href={pagePath("/")} className="hover:text-[var(--brand-orange)]">
          {lang === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <span aria-hidden> / </span>
        <Link href={pagePath("locations")} className="hover:text-[var(--brand-orange)]">
          {lang === "ar" ? "المواقع" : "Locations"}
        </Link>
        <span aria-hidden> / </span>
        <span>{lang === "ar" ? "دمشق" : "Damascus"}</span>
      </nav>

      <header className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="font-display m-0 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-[var(--brand-ink)]">
          {damascusPage.title[lang]}
        </h1>
        <p className="mt-6 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">{damascusPage.lead[lang]}</p>
      </header>

      <div className="mx-auto mb-10 grid max-w-2xl gap-8">
        <section>
          <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">
            {damascusPage.servicesLabel[lang]}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3 p-0">
            {links.map((link) => (
              <li key={link.href} className="list-none">
                <Link href={pagePath(link.href)} className="text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)]">
                  {link[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display m-0 text-[1.4rem] font-semibold text-[var(--brand-ink)]">
            {damascusPage.contactLabel[lang]}
          </h2>
          <p className="mt-3 text-[0.98rem] leading-[1.75] text-[var(--brand-ink)]/75">
            {office.city[lang]}
          </p>
          <ul className="mt-2 p-0">
            {office.phones.map((phone) => (
              <li key={phone} className="list-none" dir="ltr">
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-[0.95rem] font-semibold text-[var(--brand-ink)]">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
