import { about, contact, hero, services } from "@/lib/content";
import { officesGeo } from "@/lib/seo";
import { SITE_NAME, SITE_NAME_AR, seoCopy } from "@/lib/site";
import { officialSocialProfiles } from "@/lib/social-embeds";

export function SeoCrawlerCopy() {
  return (
    <noscript>
      <header>
        <p>{SITE_NAME_AR}</p>
        <h1>
          {hero.titleLead.en} {hero.titleAccent.en} — {hero.titleLead.ar} {hero.titleAccent.ar}
        </h1>
        <p>{seoCopy.homeDescription.ar}</p>
        <p>{seoCopy.homeDescription.en}</p>
      </header>
      <section>
        <h2>
          {about.title.ar} — {about.title.en}
        </h2>
        <p>{about.body.ar}</p>
      </section>
      <section>
        <h2>
          {services.title.ar} — {services.title.en}
        </h2>
        <ul>
          {services.items.map((item) => (
            <li key={item.id}>
              {item.ar} / {item.en}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>
          {seoCopy.socialTitle.ar} — {seoCopy.socialTitle.en}
        </h2>
        <ul>
          {officialSocialProfiles().map((profile) => (
            <li key={profile.platform}>
              <a href={profile.url} rel="me">
                {profile.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>
          {seoCopy.locationsTitle.ar} — {seoCopy.locationsTitle.en}
        </h2>
        <p>
          <a href="/locations/">{contact.map.add.ar} / {contact.map.add.en}</a>
        </p>
        {contact.offices
          .filter((office) => office.id === "syr")
          .map((office) => (
            <p key={office.id}>
              <a href={officesGeo.syr.mapsUrl}>
                {SITE_NAME}, {office.city.ar} {office.city.en}
              </a>
              {office.phones[0] ? ` — ${office.phones[0]}` : ""}
            </p>
          ))}
      </section>
      <section>
        <h2>Contact — تواصل</h2>
        {contact.offices.map((office) => (
          <p key={office.id}>
            {SITE_NAME}, {office.city.ar} {office.city.en}
            {office.phones[0] ? ` — ${office.phones[0]}` : ""}
          </p>
        ))}
      </section>
    </noscript>
  );
}
