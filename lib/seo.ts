import { contact, services, WHATSAPP_NUMBER } from "./content";
import { SITE_ALTERNATE, SITE_NAME, SITE_NAME_AR, SITE_URL, absoluteUrl, OG_IMAGE_PATH } from "./site";

export const officesGeo = {
  syr: {
    latitude: 33.5192,
    longitude: 36.2917,
    region: "SY-DI",
    countryCode: "SY",
    mapsQuery: "Al Hamra, Damascus, Syria",
  },
  ksa: {
    latitude: 24.6469,
    longitude: 46.7096,
    region: "SA-01",
    countryCode: "SA",
    mapsQuery: "Al Murabba, Riyadh, Saudi Arabia",
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
        sameAs: [
          "https://www.instagram.com/homeofcreativity.sy/",
          "https://www.facebook.com/profile.php?id=61584616932975",
        ],
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        alternateName: SITE_NAME_AR,
        url: `${SITE_URL}/`,
        image: absoluteUrl(OG_IMAGE_PATH),
        telephone: `+${WHATSAPP_NUMBER}`,
        priceRange: "$$",
        inLanguage: ["en", "ar"],
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        address: syr?.address,
        geo: syr?.geo,
        hasMap: `https://www.google.com/maps/search/?api=1&query=${officesGeo.syr.latitude}%2C${officesGeo.syr.longitude}`,
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
