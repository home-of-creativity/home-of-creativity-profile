import type { Metadata } from "next";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "./site";

/** Brand suffix for Arabic titles: `[page] | بيت الإبداع HOC`. */
export const TITLE_BRAND = "بيت الإبداع HOC";

export type PageSeo = {
  /** Arabic `<title>`, at most 65 characters, one language. */
  title: string;
  /** Arabic meta description, 120–160 characters, one language. */
  description: string;
};

/**
 * Titles and descriptions for the fixed pages (T16/T17). Arabic only: the documents are
 * `lang="ar"`. New sentences are built from facts already on the site and listed in
 * CHANGELOG-SEO.md for HOC review.
 */
export const pageSeo = {
  home: {
    title: "بيت الإبداع HOC | وكالة هوية وتسويق في دمشق والرياض",
    description:
      "بيت الإبداع HOC وكالة هوية بصرية وتسويق وسوشال ميديا بمكاتب في دمشق والرياض والإمارات. تصفّح خدماتنا وباقاتنا، وابدأ مشروعك عبر واتساب أو تيليجرام.",
  },
  about: {
    title: "عن بيت الإبداع HOC: وكالة إبداعية في دمشق والرياض",
    description:
      "تعرّف على بيت الإبداع HOC: وكالة إبداع وهوية بمكاتب في دمشق (الحمراء) والرياض (المربّع) والإمارات، تقدّم أربع عشرة ممارسة من الهوية إلى التسويق والمواقع.",
  },
  services: {
    title: `خدمات التسويق والهوية في دمشق والرياض | ${TITLE_BRAND}`,
    description:
      "أربع عشرة خدمة من بيت الإبداع HOC: الهوية البصرية والتسويق والسوشال ميديا والمواقع والفعاليات والتحليل المالي. لكل خدمة صفحتها، وابدأ مشروعك عبر واتساب.",
  },
  branding: {
    title: `وكالة هوية تجارية وبراندينغ في دمشق والرياض | ${TITLE_BRAND}`,
    description:
      "ماذا تعني الهوية التجارية عند بيت الإبداع HOC، وما الذي يمكن طلبه، ولمن هي. مكاتبنا في دمشق والرياض والإمارات، وأسعار الباقات منشورة. ابدأ عبر واتساب.",
  },
  brandIdentity: {
    title: `خدمات الهوية التجارية في دمشق والرياض | ${TITLE_BRAND}`,
    description:
      "الفرق بين الشعار والهوية البصرية والهوية التجارية، وكيف يصمم بيت الإبداع HOC نظام هويتك من مكاتبه في دمشق والرياض والإمارات. ابدأ مشروعك عبر واتساب.",
  },
  pricing: {
    title: `باقات وأسعار التسويق والسوشال ميديا | ${TITLE_BRAND}`,
    description:
      "باقات بيت الإبداع HOC الشهرية بالدولار للسوشال ميديا والتسويق والحملات الممولة، مع خصم يصل إلى 20% على الاشتراك السنوي. اختر باقتك وتواصل معنا عبر واتساب.",
  },
  social: {
    title: "حسابات بيت الإبداع HOC الرسمية على السوشال ميديا",
    description:
      "روابط حسابات بيت الإبداع HOC الرسمية على إنستغرام وفيسبوك وتيليجرام، مع آخر المنشورات والريلز. تابعنا وتواصل معنا من مكاتبنا في دمشق والرياض والإمارات.",
  },
  locations: {
    title: "مكاتب بيت الإبداع في دمشق والرياض والإمارات | HOC",
    description:
      "مكاتب بيت الإبداع HOC: دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة. العناوين وأرقام الجوال والواتساب والهاتف الأرضي لكل مكتب في صفحة واحدة.",
  },
  damascus: {
    title: "مكتب بيت الإبداع في دمشق، الحمراء | HOC",
    description:
      "مكتب بيت الإبداع HOC في الحمراء بدمشق: الخريطة وأرقام الجوال والواتساب والهاتف الأرضي، وخدمات الهوية البصرية والتسويق التي تبدأ من هنا. تواصل معنا الآن.",
  },
  riyadh: {
    title: "مكتب بيت الإبداع في الرياض، المربّع | HOC",
    description:
      "مكتب بيت الإبداع HOC في المربّع بالرياض: أرقام الجوال والواتساب والهاتف الأرضي، وخدمات الهوية البصرية والتسويق والسوشال ميديا لعملائنا في السعودية.",
  },
  clientStory: {
    title: `قصة عميل: أبو شاكر وجدو شاكر | ${TITLE_BRAND}`,
    description:
      "قصة شراكة بين بيت الإبداع HOC وعلامتي أبو شاكر وجدو شاكر، من الهوية إلى الحضور على السوشال ميديا. اقرأ القصة وتعرّف على طريقة عملنا مع عملائنا.",
  },
  articles: {
    title: `مقالات عن الهوية والتسويق | ${TITLE_BRAND}`,
    description:
      "مقالات من بيت الإبداع HOC عن الهوية البصرية والبراندينغ والسوشال ميديا والتسويق، تساعدك على اختيار الوكالة المناسبة وبناء علامة واضحة في دمشق والرياض.",
  },
  privacy: {
    title: `سياسة الخصوصية | ${TITLE_BRAND}`,
    description:
      "سياسة الخصوصية لدى بيت الإبداع HOC: كيف نتعامل مع المعلومات التي تشاركها عبر الموقع وواتساب وتيليجرام. للاستفسار راسلنا على info@hoc.agency.",
  },
  terms: {
    title: `شروط الاستخدام | ${TITLE_BRAND}`,
    description:
      "شروط استخدام موقع بيت الإبداع HOC وخدماته، بما فيها عروض الأسعار والدفع والتواصل عبر واتساب وتيليجرام. للاستفسار راسلنا على info@hoc.agency.",
  },
  notFound: {
    title: `الصفحة غير موجودة | ${TITLE_BRAND}`,
    description:
      "هذه الصفحة غير موجودة على موقع بيت الإبداع HOC. تصفّح خدماتنا في الهوية البصرية والتسويق والسوشال ميديا، أو تواصل معنا عبر واتساب أو تيليجرام.",
  },
} satisfies Record<string, PageSeo>;

/** `[title] | بيت الإبداع HOC`, dropping the suffix when it would pass 65 characters. */
export function brandedTitle(title: string): string {
  const full = `${title} | ${TITLE_BRAND}`;
  return full.length <= 65 ? full : title.length <= 65 ? title : `${title.slice(0, 64)}…`;
}

/** Fit free text (CMS excerpts) into a 120–160 character description. */
export function clampDescription(text: string, fallback: string): string {
  const clean = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length >= 120 && clean.length <= 160) return clean;
  if (clean.length > 160) {
    const cut = clean.slice(0, 159);
    const space = cut.lastIndexOf(" ");
    return `${cut.slice(0, space > 120 ? space : 159)}…`;
  }
  const combined = clean ? `${clean} ${fallback}` : fallback;
  return combined.length <= 160 ? combined : clampDescription(combined, "");
}

export type MetaInput = {
  title: string;
  description: string;
  /** Site path with trailing slash, e.g. `/pricing/`. */
  path: string;
  type?: "website" | "article" | "profile";
  image?: { url: string; width: number; height: number; alt: string };
  noindex?: boolean;
  /** Per-language URLs for hreflang, e.g. `{ ar: "/pricing/", en: "/en/pricing/" }`. */
  languages?: Record<string, string>;
  locale?: "ar" | "en";
};

const DEFAULT_IMAGE = { url: OG_IMAGE_PATH, width: 1920, height: 1080, alt: "Home of Creativity — بيت الإبداع" };

/**
 * One metadata object per page: its own title, description, canonical, Open Graph and
 * Twitter tags (T20), so nothing inherits the homepage's tags.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
  noindex = false,
  languages,
  locale = "ar",
}: MetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const languageAlternates = languages
    ? { languages: Object.fromEntries(Object.entries(languages).map(([key, value]) => [key, `${SITE_URL}${value}`])) }
    : {};
  return {
    title: { absolute: title },
    description,
    ...(noindex
      ? {}
      : {
          alternates: {
            canonical: url,
            ...languageAlternates,
          },
        }),
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_AR" : "en_US",
      title,
      description,
      images: [{ ...image, url: image.url.startsWith("http") ? image.url : `${SITE_URL}${image.url}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
