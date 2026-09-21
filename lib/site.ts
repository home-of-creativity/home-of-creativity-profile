export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoc.agency").replace(/\/+$/, "");

export const SITE_NAME = "Home of Creativity";
export const SITE_NAME_AR = "بيت الإبداع";
export const SITE_SHORT = "HOC";
export const SITE_ALTERNATE = "Creativation Source";

export const OG_IMAGE_PATH = "/photo/hero-section-background.webp";

export function pageTitle(en: string, ar?: string): string {
  if (ar && ar !== en) {
    return `${ar} | ${en} — ${SITE_NAME}`;
  }

  return `${en} — ${SITE_NAME}`;
}

export function pageDescription(en: string, ar?: string): string {
  if (ar && ar !== en) {
    return `${ar} ${en}`;
  }

  return en;
}

function resolveGoogleSiteVerification(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (value) {
    return value;
  }

  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_USE_DEMO_DATA === "false") {
    throw new Error(
      "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION is required for production builds. Set it in GitHub Actions secrets or .env.local.",
    );
  }

  return undefined;
}

export const GOOGLE_SITE_VERIFICATION = resolveGoogleSiteVerification();

export const seoCopy = {
  homeTitle: {
    en: "Home of Creativity (HOC) — Brand Agency in Damascus",
    ar: "بيت الإبداع HOC — وكالة هوية بصرية دمشق",
  },
  homeDescription: {
    en: "HOC — Home of Creativity (hoc.agency) is a brand agency in Damascus and Riyadh: visual identity, social, ads, and events.",
    ar: "بيت الإبداع (HOC / hoc) وكالة هوية بصرية في دمشق وتصميم هوية تجارية في الرياض. ابحث: بيت، الإبداع، Home، hoc.agency.",
  },
  pricingTitle: {
    en: "Pricing",
    ar: "الأسعار",
  },
  pricingDescription: {
    en: "Home of Creativity packages in USD. Confirm payment details on WhatsApp before checkout.",
    ar: "باقات بيت الإبداع بالدولار. تفاصيل الدفع تُؤكَّد عبر واتساب قبل الاشتراك.",
  },
  locationsTitle: {
    en: "Locations",
    ar: "المواقع",
  },
  locationsDescription: {
    en: "Home of Creativity on the map — Damascus, Al Hamra.",
    ar: "بيت الإبداع على الخريطة — دمشق، الحمراء.",
  },
  socialTitle: {
    en: "Social media",
    ar: "السوشال ميديا",
  },
  socialDescription: {
    en: "Follow Home of Creativity on Instagram and Facebook — brand work from Damascus and Riyadh.",
    ar: "تابعوا بيت الإبداع على إنستغرام وفيسبوك — أعمال الهوية من دمشق والرياض.",
  },
  articlesTitle: {
    en: "Articles",
    ar: "المقالات",
  },
  articlesDescription: {
    en: "Articles on branding, social media, and creative direction from Home of Creativity.",
    ar: "مقالات عن الهوية البصرية والسوشال والإخراج الإبداعي من بيت الإبداع.",
  },
  articleTitle: {
    en: "Article",
    ar: "مقال",
  },
  articleDescription: {
    en: "Read the full article from Home of Creativity.",
    ar: "اقرأ المقال كاملاً من بيت الإبداع.",
  },
  projectTitle: {
    en: "Project",
    ar: "مشروع",
  },
  projectDescription: {
    en: "Selected Home of Creativity work — identity, campaigns, and brand architecture.",
    ar: "أعمال مختارة من بيت الإبداع — هوية، حملات، وهندسة العلامة.",
  },
  privacyTitle: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
  privacyDescription: {
    en: "How Home of Creativity collects, uses, and protects personal information on hoc.agency, Telegram, and WhatsApp.",
    ar: "كيف يجمع بيت الإبداع المعلومات الشخصية ويستخدمها ويحميها على hoc.agency وتيليجرام وواتساب.",
  },
  termsTitle: {
    en: "Terms of Use",
    ar: "شروط الاستخدام",
  },
  termsDescription: {
    en: "Terms for using Home of Creativity services, quotations, payments, and the Telegram client bot.",
    ar: "شروط استخدام خدمات بيت الإبداع والعروض والدفع وبوت تيليجرام.",
  },
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return normalized;
}
