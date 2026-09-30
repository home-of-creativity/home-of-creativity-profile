import type { Article } from "./articles-api";
import { aboutPage, articlesPage, brandIdentityPage, brandingPage, faq, officePages, projects, serviceDetails, services, servicesPage, type TopicPageCopy } from "./content";
import { emails, officeMapUrl, offices, officesSentence, officeTelephones, type Office } from "./offices";
import type { PortfolioProject } from "./portfolio-api";
import type { PricingCategory } from "./pricing-catalog";
import { SITE_ALTERNATE, SITE_NAME, SITE_NAME_AR, SITE_SHORT, SITE_URL, absoluteUrl, OG_IMAGE_PATH } from "./site";
import { officialSocialUrls } from "./social-embeds";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ALTERNATE_NAMES = [SITE_SHORT, SITE_NAME_AR, "بيت الابداع", SITE_ALTERNATE];

/** Factual one-liner shared by `description` and `disambiguatingDescription` (no affiliation claims). */
export const ORGANIZATION_DESCRIPTION = `Branding, marketing and creative agency with offices in ${officesSentence("en")}.`;

/** Markets named on the site: the three offices in `offices.ts`. */
const AREA_SERVED = [
  { "@type": "Country", name: "Syria" },
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "United Arab Emirates" },
];

export function officeId(office: Office): string {
  return `${SITE_URL}/#place-${office.id}`;
}

function contactPoints(office: Office) {
  return office.phones
    .filter((phone) => phone.kind === "whatsapp")
    .map((phone) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${phone.digits}`,
      url: `https://wa.me/${phone.digits}`,
      areaServed: office.countryCode,
      availableLanguage: ["ar", "en"],
    }));
}

/**
 * One node per office. Unknown fields are left out, never filled with placeholders:
 * the UAE node carries its country only until HOC supplies the city, address and phones.
 */
function officeNode(office: Office) {
  const telephones = officeTelephones(office).filter((number) =>
    office.phones.some((phone) => phone.kind !== "whatsapp" && `+${phone.digits}` === number),
  );
  const points = contactPoints(office);
  const mapUrl = officeMapUrl(office);
  const url = office.slug ? `${SITE_URL}/locations/${office.slug}/` : null;

  return {
    "@type": "ProfessionalService",
    "@id": officeId(office),
    name: `${SITE_NAME} — ${office.city?.en ?? office.country.en}`,
    alternateName: `${SITE_NAME_AR} — ${office.city?.ar ?? office.country.ar}`,
    ...(url ? { url } : {}),
    image: absoluteUrl(OG_IMAGE_PATH),
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      ...(office.district ? { streetAddress: office.district.en } : {}),
      ...(office.city ? { addressLocality: office.city.en } : {}),
      addressCountry: office.countryCode,
    },
    ...(telephones.length === 1 ? { telephone: telephones[0] } : telephones.length > 1 ? { telephone: telephones } : {}),
    ...(points.length ? { contactPoint: points } : {}),
    ...(office.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: office.geo.latitude, longitude: office.geo.longitude } }
      : {}),
    ...(mapUrl ? { hasMap: mapUrl } : {}),
    ...(office.openingHours ? { openingHours: office.openingHours } : {}),
  };
}

function serviceCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.items.map((item, index) => {
      const detail = serviceDetails.find((entry) => entry.id === item.id);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: item.en,
          alternateName: item.ar,
          provider: { "@id": ORG_ID },
          ...(detail ? { url: `${SITE_URL}/services/${detail.slug}/` } : {}),
        },
      };
    }),
  };
}

/**
 * Site-wide graph, on every page from the root layout: the Organization, the WebSite and
 * the three offices. Page graphs point at these nodes by `@id` instead of repeating them.
 */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: ALTERNATE_NAMES,
        description: ORGANIZATION_DESCRIPTION,
        disambiguatingDescription: ORGANIZATION_DESCRIPTION,
        knowsAbout: ["Branding", "Visual identity", "Marketing", "Social media management", "Websites and ecommerce"],
        url: `${SITE_URL}/`,
        logo: absoluteUrl("/hummingbird.svg"),
        image: absoluteUrl(OG_IMAGE_PATH),
        email: emails[0].address,
        sameAs: officialSocialUrls(),
        areaServed: AREA_SERVED,
        department: offices.map((office) => ({ "@id": officeId(office) })),
        contactPoint: offices.flatMap(contactPoints),
        hasOfferCatalog: serviceCatalog(),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        alternateName: ALTERNATE_NAMES,
        description: ORGANIZATION_DESCRIPTION,
        inLanguage: ["ar", "en"],
        publisher: { "@id": ORG_ID },
      },
      ...offices.map(officeNode),
    ],
  };
}

/**
 * Home-only graph: the FAQPage. Only `/` renders the visible `#faq` section these
 * questions describe (Arabic, matching the default `lang="ar"` document).
 */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        url: `${SITE_URL}/#faq`,
        name: faq.title.ar,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q.ar,
          acceptedAnswer: { "@type": "Answer", text: item.a.ar },
        })),
      },
    ],
  };
}

function breadcrumb(url: string, trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [{ name: SITE_NAME, path: "/" }, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** `/locations/` — the office index. */
export function locationsPageJsonLd(title: string, description: string) {
  const url = `${SITE_URL}/locations/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: {
          "@type": "ItemList",
          name: `${SITE_NAME} offices`,
          itemListElement: offices.map((office, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@id": officeId(office) },
          })),
        },
      },
      breadcrumb(url, [{ name: "Locations", path: "/locations/" }]),
    ],
  };
}

/** `/locations/{slug}/` — one office page; the office node itself is in the site graph. */
export function officePageJsonLd(office: Office, title: string, description: string) {
  const url = `${SITE_URL}/locations/${office.slug}/`;
  const pageTitle = officePages[office.slug as "damascus" | "riyadh"]?.title.en ?? office.city?.en ?? office.country.en;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": officeId(office) },
        publisher: { "@id": ORG_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumb(url, [
        { name: "Locations", path: "/locations/" },
        { name: pageTitle, path: `/locations/${office.slug}/` },
      ]),
    ],
  };
}

export function socialPageJsonLd(title: string, description: string, profiles: { name: string; url: string }[]) {
  const url = `${SITE_URL}/social/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: {
          "@type": "ItemList",
          name: `${SITE_NAME} official profiles`,
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

/** `/about/` — the canonical, factual description page. */
export function aboutPageJsonLd(title: string) {
  const url = `${SITE_URL}/about/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description: aboutPage.lead.ar,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: { "@id": ORG_ID },
      },
    ],
  };
}

/** `/services/` — index of all fourteen practices, each with its own page. */
export function servicesPageJsonLd(title: string, description: string) {
  const url = `${SITE_URL}/services/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: {
          "@type": "ItemList",
          name: `${SITE_NAME} services`,
          itemListElement: serviceCatalog().itemListElement,
        },
      },
      breadcrumb(url, [{ name: servicesPage.title.en, path: "/services/" }]),
    ],
  };
}

function faqNode(url: string, items: { q: { ar: string }; a: { ar: string } }[]) {
  return {
    // Arabic only: matches the default `lang="ar"` document.
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url: `${url}#faq`,
    inLanguage: "ar",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q.ar,
      acceptedAnswer: { "@type": "Answer", text: item.a.ar },
    })),
  };
}

/** `/services/{slug}/` — one page per practice in `services.items`. */
export function serviceDetailJsonLd(slug: string) {
  const detail = serviceDetails.find((entry) => entry.slug === slug);
  if (!detail) return null;

  const url = `${SITE_URL}/services/${detail.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: detail.metaTitle.ar,
        description: detail.metaDescription.ar,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: detail.title.en,
        alternateName: detail.title.ar,
        serviceType: detail.title.en,
        url,
        description: detail.definition.ar,
        provider: { "@id": ORG_ID },
        areaServed: AREA_SERVED,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: detail.title.ar,
          itemListElement: detail.covers.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@type": "Service", name: item.en, alternateName: item.ar },
          })),
        },
      },
      breadcrumb(url, [
        { name: servicesPage.title.en, path: "/services/" },
        { name: detail.title.en, path: `/services/${detail.slug}/` },
      ]),
      faqNode(url, detail.faqs),
    ],
  };
}

function topicPageJsonLd(copy: TopicPageCopy, path: string) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: copy.title.en,
        alternateName: copy.title.ar,
        url,
        description: copy.lead.ar,
        provider: { "@id": ORG_ID },
        areaServed: AREA_SERVED,
      },
      breadcrumb(url, [
        { name: servicesPage.title.en, path: "/services/" },
        { name: copy.title.en, path },
      ]),
      faqNode(url, copy.faqs),
    ],
  };
}

/** Category page. Not a new practice beyond published visual identities. */
export function brandingPageJsonLd() {
  return topicPageJsonLd(brandingPage, "/services/branding/");
}

/** Explains logo / visual identity / brand identity. The hired practice stays visual identities. */
export function brandIdentityPageJsonLd() {
  return topicPageJsonLd(brandIdentityPage, "/services/brand-identity/");
}

/**
 * `/pricing/` — an OfferCatalog of the monthly subscription prices. Only prices the page
 * shows in its HTML are included: the default (monthly) price of each subscription plan.
 */
export function pricingPageJsonLd(categories: PricingCategory[], title: string, description: string) {
  const url = `${SITE_URL}/pricing/`;
  const offers = categories.flatMap((category) =>
    category.subcategories
      .filter((subcategory) => !subcategory.oneTime)
      .flatMap((subcategory) =>
        subcategory.plans
          .filter((plan) => plan.prices?.monthly)
          .map((plan) => ({
            "@type": "Offer",
            name: plan.name.en,
            description: plan.subtitle.ar,
            category: subcategory.name.en,
            price: plan.prices!.monthly,
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: plan.prices!.monthly,
              priceCurrency: "USD",
              billingDuration: "P1M",
              unitCode: "MON",
            },
            seller: { "@id": ORG_ID },
            url,
          })),
      ),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        ...(offers.length ? { mainEntity: { "@id": `${url}#offers` } } : {}),
      },
      ...(offers.length
        ? [
            {
              "@type": "OfferCatalog",
              "@id": `${url}#offers`,
              name: `${SITE_NAME} subscription packages`,
              itemListElement: offers,
            },
          ]
        : []),
    ],
  };
}

/** `/articles/{slug}/` — one canonical URL per real article, server-rendered at build time. */
export function articleJsonLd(article: Article, description: string) {
  const url = `${SITE_URL}/articles/${article.slug}/`;
  const published = article.published_at ?? article.created_at ?? undefined;
  const modified = article.updated_at ?? published;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: article.title_ar,
        alternativeHeadline: article.title_en,
        description,
        image: absoluteUrl(OG_IMAGE_PATH),
        mainEntityOfPage: { "@id": url },
        ...(published ? { datePublished: published } : {}),
        ...(modified ? { dateModified: modified } : {}),
        inLanguage: "ar",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      },
      breadcrumb(url, [
        { name: articlesPage.title.en, path: "/articles/" },
        { name: article.title_en, path: `/articles/${article.slug}/` },
      ]),
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
        ...(project.summary_ar ? { description: project.summary_ar } : {}),
        ...(project.image_url ? { image: project.image_url } : {}),
        creator: { "@id": ORG_ID },
      },
      breadcrumb(url, [
        { name: projects.title.en, path: "/#projects" },
        { name: project.title_en, path: `/projects/${project.id}/` },
      ]),
    ],
  };
}

/** Serialise for `<script type="application/ld+json">`, escaping `<` so no content can close the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
