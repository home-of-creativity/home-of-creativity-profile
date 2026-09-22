import type { Article } from "./articles-api";
import { aboutPage, articlesPage, contact, faq, projects, serviceDetails, services, servicesPage, WHATSAPP_NUMBER } from "./content";
import type { PortfolioProject } from "./portfolio-api";
import { SITE_ALTERNATE, SITE_NAME, SITE_NAME_AR, SITE_SHORT, SITE_URL, absoluteUrl, OG_IMAGE_PATH, seoCopy } from "./site";
import { officialSocialProfiles, officialSocialUrls } from "./social-embeds";

export const officesGeo = {
  syr: {
    latitude: 33.5188338,
    longitude: 36.2916993,
    region: "SY-DI",
    countryCode: "SY",
    locality: "Al Hamra",
    regionName: "Damascus",
    mapsQuery: "Home of Creativity, Al Hamra, Damascus, Syria",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Home%20of%20Creativity%2C%20Al%20Hamra%2C%20Damascus%2C%20Syria",
    zoom: 17,
  },
} as const;

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * There is only one mapped `Place`: the Damascus office. Saudi Arabia /
 * Riyadh is an `areaServed` market, not a second `Place` — see
 * `contact.offices` in `lib/content.ts`, which intentionally has one entry.
 */
function placeNode(id: "syr") {
  const office = contact.offices.find((item) => item.id === id);
  const geo = officesGeo[id];
  if (!office) return null;

  return {
    "@type": "Place",
    "@id": `${SITE_URL}/#place-${id}`,
    name: `${SITE_NAME} — ${office.city.en}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: geo.locality,
      addressRegion: geo.regionName,
      addressCountry: geo.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: geo.mapsUrl,
    telephone: office.phones[0]?.replace(/\s+/g, "") ?? `+${WHATSAPP_NUMBER}`,
  };
}

/**
 * Site-wide graph: Organization + WebSite. Rendered on every page (`SeoJsonLd`
 * in the root layout). Kept free of page-specific claims (no LocalBusiness
 * address/geo, no FAQPage) so it stays valid regardless of which page it is
 * read from.
 */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [SITE_SHORT, SITE_NAME_AR, "بيت الابداع", SITE_ALTERNATE],
        description: `${seoCopy.homeDescription.ar} ${seoCopy.homeDescription.en}`,
        url: `${SITE_URL}/`,
        logo: absoluteUrl("/hummingbird.svg"),
        image: absoluteUrl(OG_IMAGE_PATH),
        sameAs: officialSocialUrls(),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        alternateName: [SITE_SHORT, SITE_NAME_AR, "بيت الابداع", SITE_ALTERNATE],
        description: `${seoCopy.homeDescription.ar} ${seoCopy.homeDescription.en}`,
        inLanguage: ["en", "ar"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

/**
 * Home-only graph: LocalBusiness + FAQPage. Only `/` renders the visible
 * `#faq` section these questions describe, so FAQPage must not ship on any
 * other page (Google requires FAQ markup to match visible page content).
 * `location` only lists the Damascus studio that `/locations/` maps — Riyadh
 * is a served market (`areaServed`), not a second mapped office, so it has
 * no `Place`/`geo` node here.
 */
export function homeJsonLd() {
  const syr = placeNode("syr");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        alternateName: [SITE_SHORT, SITE_NAME_AR, "بيت الابداع", SITE_ALTERNATE],
        url: `${SITE_URL}/`,
        image: absoluteUrl(OG_IMAGE_PATH),
        sameAs: officialSocialUrls(),
        telephone: `+${WHATSAPP_NUMBER}`,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        address: syr?.address,
        geo: syr?.geo,
        hasMap: officesGeo.syr.mapsUrl,
        areaServed: [
          { "@type": "Country", "name": "Syria" },
          { "@type": "Country", "name": "Saudi Arabia" },
        ],
        location: [syr].filter(Boolean),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+963954187154",
            areaServed: "SY",
            availableLanguage: ["ar", "en"],
            url: whatsappUrl,
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+966550350295",
            areaServed: "SA",
            availableLanguage: ["ar", "en"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: item.en,
              alternateName: item.ar,
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          })),
        },
      },
      {
        // Arabic only: the default (non-JS-toggled) page is `lang="ar"`, and
        // FAQ markup must match what is actually visible on that document.
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        url: `${SITE_URL}/#faq`,
        name: faq.title.ar,
        inLanguage: "ar",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q.ar,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a.ar,
          },
        })),
      },
    ],
  };
}

export function locationsPageJsonLd() {
  const offices = (["syr"] as const)
    .map((id) => {
      const place = placeNode(id);
      if (!place) return null;
      return {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/locations/#${id}`,
        name: place.name,
        alternateName: SITE_NAME_AR,
        url: `${SITE_URL}/locations/#${id}`,
        image: absoluteUrl(OG_IMAGE_PATH),
        telephone: place.telephone,
        address: place.address,
        geo: place.geo,
        hasMap: place.hasMap,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        sameAs: officialSocialUrls(),
      };
    })
    .filter((office): office is NonNullable<typeof office> => office !== null);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/locations/#page`,
        url: `${SITE_URL}/locations/`,
        name: `${seoCopy.locationsTitle.ar} | ${seoCopy.locationsTitle.en}`,
        description: `${seoCopy.locationsDescription.ar} ${seoCopy.locationsDescription.en}`,
        inLanguage: ["ar", "en"],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          name: `${SITE_NAME} locations`,
          itemListElement: offices.map((office, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@id": office["@id"] },
          })),
        },
      },
      ...offices,
    ],
  };
}

export function socialPageJsonLd() {
  const profiles = officialSocialProfiles();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/social/#page`,
        url: `${SITE_URL}/social/`,
        name: `${seoCopy.socialTitle.ar} | ${seoCopy.socialTitle.en}`,
        description: `${seoCopy.socialDescription.ar} ${seoCopy.socialDescription.en}`,
        inLanguage: ["ar", "en"],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          name: `${SITE_NAME} social profiles`,
          itemListElement: profiles.map((profile, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: profile.name,
            url: profile.url,
          })),
        },
      },
    ],
  };
}

/** `/about/` — the canonical, factual description page (no narrative fluff). */
export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about/#page`,
        url: `${SITE_URL}/about/`,
        name: `${aboutPage.title.ar} | ${aboutPage.title.en}`,
        description: aboutPage.lead.en,
        inLanguage: ["ar", "en"],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

/** `/services/` — index of the published practices, linking to detail pages once they exist. */
export function servicesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/services/#page`,
        url: `${SITE_URL}/services/`,
        name: `${servicesPage.title.ar} | ${servicesPage.title.en}`,
        description: servicesPage.lead.en,
        inLanguage: ["ar", "en"],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          name: `${SITE_NAME} services`,
          itemListElement: services.items.map((item, index) => {
            const detail = serviceDetails.find((entry) => entry.id === item.id);
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: item.en,
                alternateName: item.ar,
                provider: { "@id": `${SITE_URL}/#organization` },
                ...(detail ? { url: `${SITE_URL}/services/${detail.slug}/` } : {}),
              },
            };
          }),
        },
      },
    ],
  };
}

/** `/services/{slug}/` — one dedicated page per confirmed practice. */
export function serviceDetailJsonLd(slug: string) {
  const detail = serviceDetails.find((entry) => entry.slug === slug);
  if (!detail) return null;

  const url = `${SITE_URL}/services/${detail.slug}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: detail.title.en,
        alternateName: detail.title.ar,
        url,
        description: detail.definition.en,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Syria" },
          { "@type": "Country", name: "Saudi Arabia" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: servicesPage.title.en, item: `${SITE_URL}/services/` },
          { "@type": "ListItem", position: 3, name: detail.title.en, item: url },
        ],
      },
      {
        // Arabic only: matches the default `lang="ar"` document, same as the
        // homepage FAQPage in `homeJsonLd()`.
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url: `${url}#faq`,
        inLanguage: "ar",
        mainEntity: detail.faqs.map((item) => ({
          "@type": "Question",
          name: item.q.ar,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a.ar,
          },
        })),
      },
    ],
  };
}

/** `/articles/{slug}/` — one canonical URL per real article, server-rendered at build time. */
export function articleJsonLd(article: Article) {
  const url = `${SITE_URL}/articles/${article.slug}/`;
  const published = article.published_at ?? article.created_at ?? undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: article.title_ar,
        alternativeHeadline: article.title_en,
        ...(published ? { datePublished: published } : {}),
        inLanguage: "ar",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: articlesPage.title.en, item: `${SITE_URL}/articles/` },
          { "@type": "ListItem", position: 3, name: article.title_en, item: url },
        ],
      },
    ],
  };
}

/** `/projects/{id}/` — one canonical URL per real portfolio project, server-rendered at build time. */
export function projectJsonLd(project: PortfolioProject) {
  const url = `${SITE_URL}/projects/${project.id}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        url,
        name: project.title_ar,
        alternateName: project.title_en,
        ...(project.summary_en ? { description: project.summary_en } : {}),
        ...(project.image_url ? { image: project.image_url } : {}),
        creator: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: projects.title.en, item: `${SITE_URL}/#projects` },
          { "@type": "ListItem", position: 3, name: project.title_en, item: url },
        ],
      },
    ],
  };
}
