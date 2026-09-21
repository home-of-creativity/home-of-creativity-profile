import { about, contact, faq, hero, services } from "@/lib/content";
import { officesGeo } from "@/lib/seo";
import { SITE_NAME, SITE_NAME_AR, seoCopy } from "@/lib/site";
import { officialSocialProfiles } from "@/lib/social-embeds";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function crawlerHtml() {
  const syr = contact.offices.find((office) => office.id === "syr");
  const profiles = officialSocialProfiles()
    .map(
      (profile) =>
        `<li><a href="${escapeHtml(profile.url)}" rel="me">${escapeHtml(profile.name)}</a></li>`,
    )
    .join("");
  const offices = contact.offices
    .map((office) => {
      const phone = office.phones[0] ? ` — ${escapeHtml(office.phones[0])}` : "";
      return `<p>${escapeHtml(SITE_NAME)}, ${escapeHtml(office.city.ar)} ${escapeHtml(office.city.en)}${phone}</p>`;
    })
    .join("");
  const syrPhone = syr?.phones[0] ? ` — ${escapeHtml(syr.phones[0])}` : "";
  const servicesList = services.items
    .map((item) => `<li>${escapeHtml(item.ar)} / ${escapeHtml(item.en)}</li>`)
    .join("");
  const faqList = faq.items
    .map(
      (item) =>
        `<article><h3>${escapeHtml(item.q.ar)} / ${escapeHtml(item.q.en)}</h3><p>${escapeHtml(item.a.ar)} ${escapeHtml(item.a.en)}</p></article>`,
    )
    .join("");

  return [
    "<header>",
    `<p>${escapeHtml(SITE_NAME_AR)}</p>`,
    `<p>${escapeHtml(`${hero.titleLead.en} ${hero.titleAccent.en} — ${hero.titleLead.ar} ${hero.titleAccent.ar}`)}</p>`,
    `<p>${escapeHtml(seoCopy.homeDescription.ar)}</p>`,
    `<p>${escapeHtml(seoCopy.homeDescription.en)}</p>`,
    "</header>",
    "<section>",
    `<h2>${escapeHtml(`${about.title.ar} — ${about.title.en}`)}</h2>`,
    `<p>${escapeHtml(about.body.ar)}</p>`,
    "</section>",
    "<section>",
    `<h2>${escapeHtml(`${services.title.ar} — ${services.title.en}`)}</h2>`,
    `<ul>${servicesList}</ul>`,
    "</section>",
    "<section>",
    `<h2>${escapeHtml(`${seoCopy.socialTitle.ar} — ${seoCopy.socialTitle.en}`)}</h2>`,
    `<ul>${profiles}</ul>`,
    "</section>",
    "<section>",
    `<h2>${escapeHtml(`${seoCopy.locationsTitle.ar} — ${seoCopy.locationsTitle.en}`)}</h2>`,
    `<p><a href="/locations/">${escapeHtml(`${contact.map.pageTitle.ar} / ${contact.map.pageTitle.en}`)}</a></p>`,
    syr
      ? `<p><a href="${escapeHtml(officesGeo.syr.mapsUrl)}">${escapeHtml(SITE_NAME)}, ${escapeHtml(syr.city.ar)} ${escapeHtml(syr.city.en)}</a>${syrPhone}</p>`
      : "",
    "</section>",
    "<section>",
    `<h2>${escapeHtml(`${faq.title.ar} — ${faq.title.en}`)}</h2>`,
    `<p>${escapeHtml(faq.lead.ar)} ${escapeHtml(faq.lead.en)}</p>`,
    faqList,
    `<p><a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a></p>`,
    "</section>",
    "<section>",
    "<h2>Contact — تواصل</h2>",
    offices,
    "</section>",
  ].join("");
}

/** Raw HTML inside noscript. Nested React nodes become text in the browser parser and trip hydration #418. */
export function SeoCrawlerCopy() {
  return <noscript dangerouslySetInnerHTML={{ __html: crawlerHtml() }} />;
}
