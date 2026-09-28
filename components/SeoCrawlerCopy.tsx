import { about, faq, hero, services } from "@/lib/content";
import { officeMapUrl, officePath, offices, phoneLabels } from "@/lib/offices";
import { pageSeo } from "@/lib/page-meta";
import { serviceDetailById } from "@/lib/service-details";
import { SITE_NAME, SITE_NAME_AR } from "@/lib/site";
import { officialSocialProfiles } from "@/lib/social-embeds";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function crawlerHtml() {
  const profiles = officialSocialProfiles()
    .map(
      (profile) =>
        `<li><a href="${escapeHtml(profile.url)}" rel="me">${escapeHtml(profile.name)}</a></li>`,
    )
    .join("");
  const officeList = offices
    .map((office) => {
      const name = office.city ? `${office.city.ar} / ${office.city.en}` : `${office.country.ar} / ${office.country.en}`;
      const path = officePath(office);
      const mapUrl = officeMapUrl(office);
      const heading = path ? `<a href="${path}">${escapeHtml(name)}</a>` : escapeHtml(name);
      const address = office.address ? `<p>${escapeHtml(office.address.ar)} — ${escapeHtml(office.address.en)}</p>` : "";
      const phones = office.phones
        .map((phone) => `<li>${escapeHtml(phoneLabels[phone.kind].ar)}: <span dir="ltr">${escapeHtml(phone.display)}</span></li>`)
        .join("");
      const map = mapUrl ? `<p><a href="${escapeHtml(mapUrl)}">Google Maps</a></p>` : "";
      return `<article><h3>${heading}</h3>${address}${phones ? `<ul>${phones}</ul>` : ""}${map}</article>`;
    })
    .join("");
  const servicesList = services.items
    .map((item) => {
      const label = `${escapeHtml(item.ar)} / ${escapeHtml(item.en)}`;
      const detail = serviceDetailById(item.id);
      return detail ? `<li><a href="/services/${detail.slug}/">${label}</a></li>` : `<li>${label}</li>`;
    })
    .join("");
  const faqList = faq.items
    .map(
      (item) =>
        `<article><h3>${escapeHtml(item.q.ar)} / ${escapeHtml(item.q.en)}</h3><p>${escapeHtml(item.a.ar)} ${escapeHtml(item.a.en)}</p></article>`,
    )
    .join("");

  return [
    "<header>",
    `<p>${escapeHtml(SITE_NAME_AR)} — ${escapeHtml(SITE_NAME)}</p>`,
    `<p>${escapeHtml(`${hero.titleLead.en} ${hero.titleAccent.en} — ${hero.titleLead.ar} ${hero.titleAccent.ar}`)}</p>`,
    `<p>${escapeHtml(pageSeo.home.description)}</p>`,
    "</header>",
    "<section>",
    `<h2>${escapeHtml(`${about.title.ar} — ${about.title.en}`)}</h2>`,
    `<p>${escapeHtml(about.body.ar)}</p>`,
    `<p><a href="/about/">${escapeHtml(about.readMore.ar)}</a></p>`,
    "</section>",
    "<section>",
    `<h2>${escapeHtml(`${services.title.ar} — ${services.title.en}`)}</h2>`,
    `<ul>${servicesList}</ul>`,
    `<p><a href="/pricing/">الباقات والأسعار — Packages and prices</a></p>`,
    "</section>",
    "<section>",
    `<h2>${escapeHtml(pageSeo.social.title)}</h2>`,
    `<ul>${profiles}</ul>`,
    "</section>",
    "<section>",
    `<h2>${escapeHtml(pageSeo.locations.title)}</h2>`,
    officeList,
    "</section>",
    "<section>",
    `<h2>${escapeHtml(`${faq.title.ar} — ${faq.title.en}`)}</h2>`,
    `<p>${escapeHtml(faq.lead.ar)} ${escapeHtml(faq.lead.en)}</p>`,
    faqList,
    `<p><a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a></p>`,
    "</section>",
  ].join("");
}

/** Raw HTML inside noscript. Nested React nodes become text in the browser parser and trip hydration #418. */
export function SeoCrawlerCopy() {
  return <noscript dangerouslySetInnerHTML={{ __html: crawlerHtml() }} />;
}
