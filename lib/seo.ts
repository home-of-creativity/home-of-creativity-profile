import { contact, services, WHATSAPP_NUMBER } from "./content";
import { SITE_ALTERNATE, SITE_NAME, SITE_NAME_AR, SITE_URL, absoluteUrl, OG_IMAGE_PATH, seoCopy } from "./site";
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
  ksa: {
    latitude: 24.6469,
    longitude: 46.7096,
    region: "SA-01",
    countryCode: "SA",
    locality: "Al Murabba",
    regionName: "Riyadh",
    mapsQuery: "Home of Creativity, Al Murabba, Riyadh, Saudi Arabia",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Home%20of%20Creativity%2C%20Al%20Murabba%2C%20Riyadh%2C%20Saudi%20Arabia",
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
