export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoc.agency").replace(/\/+$/, "");

export const SITE_NAME = "Home of Creativity";
export const SITE_NAME_AR = "بيت الإبداع";
export const SITE_ALTERNATE = "Creativation Source";

export const OG_IMAGE_PATH = "/photo/hero-section-background.webp";

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  "1KZ1bAVmo1TfqoQJbCVgJ9v4VUGbekh5tnzcAueiFlE";

export const seoCopy = {
  homeTitle: {
    en: "Home of Creativity — Brand Architects in Syria & Saudi Arabia",
    ar: "بيت الإبداع — مهندسو الهوية التجارية في سوريا والسعودية",
  },
  homeDescription: {
    en: "Brand architects in Damascus and Riyadh. Premium Minimalism, identity, social, ads, and events — built on numbers, not noise.",
    ar: "مهندسو هوية تجارية في دمشق والرياض. فخامة بسيطة، هوية، سوشال، إعلانات وفعاليات — مبنية على أرقام لا على ضجيج.",
  },
  pricingTitle: {
    en: "Pricing",
    ar: "الأسعار",
  },
  pricingDescription: {
    en: "Home of Creativity packages in USD. Confirm payment details on WhatsApp before checkout.",
    ar: "باقات بيت الإبداع بالدولار. تفاصيل الدفع تُؤكَّد عبر واتساب قبل الاشتراك.",
  },
  projectTitle: {
    en: "Project",
    ar: "مشروع",
  },
  projectDescription: {
    en: "Selected Home of Creativity work — identity, campaigns, and brand architecture.",
    ar: "أعمال مختارة من بيت الإبداع — هوية، حملات، وهندسة العلامة.",
  },
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return normalized;
}
