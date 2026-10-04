import type { Copy } from "./i18n";

/**
 * One source of truth for HOC's offices, phone numbers, emails and official profiles.
 * The footer, the contact section, the location pages, JSON-LD, llms.txt, llms-full.txt
 * and the manifest all read from here.
 *
 * Every value comes from the site, the company-profile PDF or the CMS contact channels.
 * Unknown facts stay `null` (with a TODO naming what HOC must supply) and are never
 * rendered: callers skip null fields instead of printing a placeholder.
 */

export type PhoneKind = "mobile" | "whatsapp" | "landline";

export type OfficePhone = {
  kind: PhoneKind;
  /** E.164 digits without the plus, e.g. "963968862822". */
  digits: string;
  /** How the number is written on the site. */
  display: string;
};

export type OfficeId = "syr" | "ksa" | "uae";

export type Office = {
  id: OfficeId;
  /** `/locations/{slug}/`. Null while the office has no public page. */
  slug: string | null;
  countryCode: "SY" | "SA" | "AE";
  country: Copy;
  /** Region label used on the site's contact cards (SYR / KSA / UAE). */
  region: string;
  city: Copy | null;
  district: Copy | null;
  /** The address exactly as HOC writes it, e.g. "دمشق، الحمراء" / "Damascus, Al Hamra". */
  address: Copy | null;
  phones: OfficePhone[];
  geo: { latitude: number; longitude: number; zoom: number } | null;
  /** Google Business Profile URL. Replaces `mapsSearchUrl` once it exists. */
  businessProfileUrl: string | null;
  /** The named Maps search link the site already used before a profile existed. */
  mapsSearchUrl: string | null;
  mapsQuery: string | null;
  /** schema.org `openingHours`, only when HOC supplies them. */
  openingHours: string[] | null;
};

export const offices: Office[] = [
  {
    id: "syr",
    slug: "damascus",
    countryCode: "SY",
    country: { en: "Syria", ar: "سوريا" },
    region: "SYR",
    city: { en: "Damascus", ar: "دمشق" },
    district: { en: "Al Hamra", ar: "الحمراء" },
    address: { en: "Damascus, Al Hamra", ar: "دمشق، الحمراء" },
    phones: [
      { kind: "mobile", digits: "963968862822", display: "+963 968 862 822" },
      { kind: "whatsapp", digits: "963954187154", display: "+963 954 187 154" },
      // From the company-profile PDF, where it has no label.
      { kind: "landline", digits: "963113236255", display: "+963 11 323 6255" },
    ],
    geo: { latitude: 33.5188338, longitude: 36.2916993, zoom: 17 },
    // TODO(GBP): Damascus Google Business Profile URL — NEEDS CONTENT from HOC.
    businessProfileUrl: null,
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Home%20of%20Creativity%2C%20Al%20Hamra%2C%20Damascus%2C%20Syria",
    mapsQuery: "Home of Creativity, Al Hamra, Damascus, Syria",
    // TODO(hours): Damascus opening hours — NEEDS CONTENT from HOC.
    openingHours: null,
  },
  {
    id: "ksa",
    slug: "riyadh",
    countryCode: "SA",
    country: { en: "Saudi Arabia", ar: "السعودية" },
    region: "KSA",
    city: { en: "Riyadh", ar: "الرياض" },
    district: { en: "Al Murabaa", ar: "المربّع" },
    // English from the company-profile PDF; Arabic from the published CMS contact channel.
    address: { en: "Riyadh, Al Murabaa", ar: "الرياض، المربّع" },
    phones: [
      { kind: "mobile", digits: "966550350295", display: "+966 55 035 0295" },
      { kind: "whatsapp", digits: "966550350295", display: "+966 55 035 0295" },
      // From the company-profile PDF, where it has no label.
      { kind: "landline", digits: "966114222528", display: "+966 11 422 2528" },
    ],
    // TODO(riyadh-geo): coordinates for the Riyadh office — NEEDS CONTENT from HOC. Never reuse Damascus.
    geo: null,
    // TODO(GBP): Riyadh Google Business Profile URL — NEEDS CONTENT from HOC.
    businessProfileUrl: null,
    mapsSearchUrl: null,
    mapsQuery: null,
    // TODO(hours): Riyadh opening hours — NEEDS CONTENT from HOC.
    openingHours: null,
  },
  {
    id: "uae",
    // TODO(UAE): publish /locations/uae/ once the city and address are known.
    slug: null,
    countryCode: "AE",
    country: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
    region: "UAE",
    // TODO(UAE): city — NEEDS CONTENT from HOC.
    city: null,
    district: null,
    // TODO(UAE): street address — NEEDS CONTENT from HOC.
    address: null,
    // TODO(UAE): phone and WhatsApp numbers — NEEDS CONTENT from HOC.
    phones: [],
    geo: null,
    // TODO(GBP): UAE Google Business Profile URL — NEEDS CONTENT from HOC.
    businessProfileUrl: null,
    mapsSearchUrl: null,
    mapsQuery: null,
    openingHours: null,
  },
];

export const emails = [
  { id: "info", label: { en: "Info", ar: "معلومات" }, address: "info@hoc.agency" },
  { id: "support", label: { en: "Support", ar: "الدعم" }, address: "support@hoc.agency" },
  { id: "sales", label: { en: "Sales", ar: "المبيعات" }, address: "sales@hoc.agency" },
] as const;

export const phoneLabels: Record<PhoneKind, Copy> = {
  mobile: { en: "Mobile", ar: "الجوال" },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  // TODO(phone-labels): HOC to confirm the label for the two PDF landlines.
  landline: { en: "Landline", ar: "الهاتف الأرضي" },
};

/** Payment methods per market. Only methods HOC confirms are listed. */
export const paymentMarkets: Record<"syr" | "ksa" | "uae", Copy[] | null> = {
  syr: [
    { en: "Sham Cash", ar: "شام كاش" },
    { en: "Cash", ar: "نقداً" },
  ],
  // TODO(payments): how clients in Saudi Arabia pay — NEEDS CONTENT from HOC.
  ksa: null,
  // TODO(payments): how clients in the UAE pay — NEEDS CONTENT from HOC.
  uae: null,
};

export function officeById(id: OfficeId): Office {
  const office = offices.find((entry) => entry.id === id);
  if (!office) throw new Error(`Unknown office ${id}`);
  return office;
}

/** Offices with a public location page (the UAE joins once its city is known). */
export function publishedOffices(): Office[] {
  return offices.filter((office) => office.slug !== null && office.city !== null);
}

export function officePath(office: Office): string | null {
  return office.slug ? `/locations/${office.slug}/` : null;
}

/** "دمشق (الحمراء)" / "Damascus (Al Hamra)", or the country while the city is unknown. */
export function officeName(office: Office, lang: "ar" | "en", { district = true } = {}): string {
  if (!office.city) return office.country[lang];
  return district && office.district ? `${office.city[lang]} (${office.district[lang]})` : office.city[lang];
}

/**
 * The three offices named the same way everywhere:
 * "دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة" /
 * "Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates".
 */
export function officesSentence(lang: "ar" | "en", { districts = true } = {}): string {
  const names = offices.map((office) => {
    const name = officeName(office, lang, { district: districts });
    return lang === "en" && !office.city ? `the ${name}` : name;
  });
  if (lang === "ar") return names.join(" و");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** `tel:` in E.164, or `https://wa.me/<digits>` for WhatsApp (callers add `?text=` when they have one). */
export function phoneHref(phone: OfficePhone): string {
  return phone.kind === "whatsapp" ? `https://wa.me/${phone.digits}` : `tel:+${phone.digits}`;
}

/** Heading for an office group: "دمشق" / "Damascus", or the country while the city is unknown. */
export function officeHeading(office: Office, lang: "ar" | "en"): string {
  return office.city ? office.city[lang] : office.country[lang];
}

/** Every rendered phone line, office by office (UAE lines appear once supplied). */
export function officePhoneLines() {
  return offices.flatMap((office) =>
    office.phones.map((phone) => ({ office, phone, label: phoneLabels[phone.kind] })),
  );
}

/** Distinct E.164 numbers of an office, for JSON-LD `telephone`. */
export function officeTelephones(office: Office): string[] {
  return [...new Set(office.phones.map((phone) => `+${phone.digits}`))];
}

export function whatsappDigits(id: "syr" | "ksa"): string {
  const phone = officeById(id).phones.find((entry) => entry.kind === "whatsapp");
  if (!phone) throw new Error(`No WhatsApp number for ${id}`);
  return phone.digits;
}

/**
 * Map link: the Business Profile once HOC supplies it, else a pin on the office coordinates,
 * else the named search. A search URL is not a map of the place (schema.org `hasMap`).
 */
export function officeMapUrl(office: Office): string | null {
  if (office.businessProfileUrl) return office.businessProfileUrl;
  if (office.geo) return `https://www.google.com/maps/place/${office.geo.latitude},${office.geo.longitude}`;
  return office.mapsSearchUrl;
}
