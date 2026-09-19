import { contact, services, WHATSAPP_NUMBER } from "./content";
import { SITE_ALTERNATE, SITE_NAME, SITE_NAME_AR, SITE_URL, absoluteUrl, OG_IMAGE_PATH, seoCopy } from "./site";
import { officialSocialProfiles, officialSocialUrls } from "./social-embeds";

export const officesGeo = {
  syr: {
    latitude: 33.5188338,
    longitude: 36.2916993,
    region: "SY-DI",
    countryCode: "SY",
    mapsQuery: "Al Hamra, Damascus, Syria",
    mapsUrl:
      "https://www.google.com/maps/place/33%C2%B031'07.8%22N+36%C2%B017'30.1%22E/@33.5188338,36.2916993,17z/data=!3m1!4b1!4m4!3m3!8m2!3d33.5188338!4d36.2916993",
    zoom: 17,
  },
  ksa: {
    latitude: 24.6469,
    longitude: 46.7096,
    region: "SA-01",
    countryCode: "SA",
    mapsQuery: "Al Murabba, Riyadh, Saudi Arabia",
    zoom: 15,
  },
} as const;

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

function placeNode(id: "syr" | "ksa") {
  const office = contact.offices.find((item) => item.id === id);
  const geo = officesGeo[id];
  if (!office) return null;

  return {
    "@type": "Place",
    "@id": `${SITE_URL}/#place-${id}`,
    name: `${SITE_NAME} — ${office.city.en}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: office.city.en,
      addressCountry: geo.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    telephone: office.phones[0]?.replace(/\s+/g, "") ?? `+${WHATSAPP_NUMBER}`,
  };
}

export function seoJsonLd() {
  const syr = placeNode("syr");
  const ksa = placeNode("ksa");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [SITE_ALTERNATE, SITE_NAME_AR],
        url: `${SITE_URL}/`,
        logo: absoluteUrl("/hummingbird.svg"),
        image: absoluteUrl(OG_IMAGE_PATH),
        sameAs: officialSocialUrls(),
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        alternateName: SITE_NAME_AR,
        url: `${SITE_URL}/`,
        image: absoluteUrl(OG_IMAGE_PATH),
        sameAs: officialSocialUrls(),
        telephone: `+${WHATSAPP_NUMBER}`,
        priceRange: "$$",
        inLanguage: ["en", "ar"],
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        address: syr?.address,
        geo: syr?.geo,
        hasMap: officesGeo.syr.mapsUrl,
        areaServed: [
          { "@type": "Country", "name": "Syria" },
          { "@type": "Country", "name": "Saudi Arabia" },
        ],
        location: [syr, ksa].filter(Boolean),
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
        knowsAbout: [
          "Brand identity",
          "Social media",
          "Paid ads",
          "Event management",
          "Premium Minimalism",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.items.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: item.en,
              alternateName: item.ar,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: ["en", "ar"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
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
