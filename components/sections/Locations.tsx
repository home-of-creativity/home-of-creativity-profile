"use client";

import Link from "next/link";
import { contact } from "@/lib/content";
import { pagePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { officeHeading, officePath, offices, officesSentence, phoneHref, phoneLabels } from "@/lib/offices";
import { seoCopy } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

export function Locations() {
  const { t, locale } = useLanguage();

  return (
    <section id="locations" className="px-0 pb-20 pt-28 sm:pb-24">
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <SectionHeading kicker={contact.map.title} title={seoCopy.locationsTitle} align="center" level={1} />
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-[var(--brand-ink)]/75">
            {locale === "ar"
              ? `لبيت الإبداع مكاتب في ${officesSentence("ar")}. تجد أدناه عنوان كل مكتب وأرقام التواصل.`
              : `Home of Creativity has offices in ${officesSentence("en")}. Each office's address and phone numbers are below.`}
          </p>
        </Reveal>

        <Reveal className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {offices.map((office) => {
            const path = officePath(office);
            return (
              <article
                key={office.id}
                className="flex flex-col rounded-2xl border border-[var(--brand-ink)]/12 bg-white px-5 py-5 shadow-[0_10px_28px_rgb(10_6_24/0.06)]"
              >
                {office.city ? (
                  <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-orange)]">
                    {t(office.country)}
                  </p>
                ) : null}
                <h2 className="mt-2 text-[1.15rem] font-semibold text-[var(--brand-ink)]">{officeHeading(office, locale)}</h2>
                {office.address ? <p className="mt-2 m-0 text-[0.92rem] text-[var(--brand-ink)]/80">{t(office.address)}</p> : null}
                {office.phones.length ? (
                  <ul className="mt-3 grid gap-1 p-0">
                    {office.phones.map((phone) => (
                      <li key={`${phone.kind}-${phone.digits}`} className="list-none text-[0.88rem] text-[var(--brand-ink)]/80">
                        {t(phoneLabels[phone.kind])}:{" "}
                        <a
                          href={phone.kind === "whatsapp" ? whatsappHref(t(contact.greeting), phone.digits) : phoneHref(phone)}
                          {...(phone.kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          dir="ltr"
                          className="font-semibold text-[var(--brand-ink)]"
                        >
                          {phone.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {path ? (
                  <Link
                    href={pagePath(path)}
                    className="mt-4 text-[0.9rem] font-semibold text-[var(--brand-purple)] hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                  >
                    {locale === "ar" ? `صفحة ${officeHeading(office, "ar")}` : `${officeHeading(office, "en")} page`}
                  </Link>
                ) : null}
              </article>
            );
          })}
        </Reveal>
      </Shell>
    </section>
  );
}
