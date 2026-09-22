import type { Copy } from "./i18n";
import { portfolioDriveUrl } from "./portfolio-drive-images";

export const brand = {
  name: "Home of Creativity",
  of: "of",
  secondary: "Creativation Source",
  mark: "S",
};

export const nav = {
  home: { en: "Home", ar: "الرئيسية" },
  about: { en: "About", ar: "من نحن" },
  services: { en: "Services", ar: "خدماتنا" },
  clientLogos: { en: "Clients", ar: "العملاء" },
  clients: { en: "Client journey", ar: "مراحل العمل" },
  reels: { en: "Reels", ar: "الريلز" },
  social: { en: "Social", ar: "السوشال" },
  projects: { en: "Projects", ar: "المشاريع" },
  finance: { en: "Finance", ar: "التحليل المالي" },
  faq: { en: "Questions", ar: "أسئلة شائعة" },
  articles: { en: "Articles", ar: "المقالات" },
  pricing: { en: "Pricing", ar: "الأسعار" },
  locations: { en: "Locations", ar: "المواقع" },
  privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  terms: { en: "Terms of Use", ar: "شروط الاستخدام" },
  contact: { en: "Contact us", ar: "تواصل معنا" },
  profilePdf: { en: "Profile", ar: "الملف التعريفي" },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  whatsappStart: { en: "Start on WhatsApp", ar: "ابدأ عبر واتساب" },
  language: { en: "Language", ar: "اللغة" },
  theme: { en: "Color theme", ar: "مظهر الألوان" },
  darkMode: { en: "Dark mode", ar: "الوضع الداكن" },
  lightMode: { en: "Light mode", ar: "الوضع الفاتح" },
  cta: { en: "Start a project", ar: "ابدأ مشروعاً" },
  telegram: { en: "Start on Telegram", ar: "ابدأ عبر تيليجرام" },
  menu: { en: "Main menu", ar: "القائمة الرئيسية" },
} satisfies Record<string, Copy>;

export const hero = {
  kicker: { en: "Ideas. People. Places.", ar: "أفكار. بشر. أماكن." },
  accentLead: { en: "A brighter", ar: "غدٌ أشدّ" },
  accentWord: { en: "tomorrow.", ar: "إشراقًا." },
  titleLead: { en: "We architect", ar: "نُهندس" },
  titleAccent: { en: "brands.", ar: "العلامات." },
  line: {
    en: "We turn bold ideas into meaningful brands that shape people, places and a brighter tomorrow.",
    ar: "نحوّل الأفكار الجريئة إلى علاماتٍ ذات هيبة، تُقيم الناس والأماكن وتصنع غدًا أكثر إشراقًا.",
  },
  primary: { en: "Explore our work", ar: "اكتشف أعمالنا" },
  scroll: { en: "Scroll to explore", ar: "مرّر لاستكشاف المزيد" },
};

export const about = {
  kicker: { en: "Home of Creativity", ar: "بيت الإبداع" },
  title: { en: "About us", ar: "من نحن" },
  body: {
    en: "Home of Creativity (HOC) is a branding and creative agency in Al Hamra, Damascus, specializing in visual identity, for clients in Syria and Saudi Arabia. We provide visual identity, marketing, social media, websites, events, and other creative services, and we work with clients in Syria and Saudi Arabia, including Riyadh — a market we serve, not a second studio. We dissect your business, eliminate the clutter, and rebuild it into a powerhouse driven by hard numbers and defined by visual prestige. We do not yell to be seen. We strategically position your brand so the industry leans in and listens.",
    ar: "بيت الإبداع (HOC) وكالة هوية وإبداع في الحمراء بدمشق، متخصصة في الهوية البصرية، وتخدم عملاء في سوريا والسعودية. نقدّم الهوية البصرية والتسويق والسوشال ميديا والمواقع والفعاليات وخدمات إبداعية أخرى، ونعمل مع عملاء في سوريا والسعودية بما في ذلك الرياض — وهي سوق نخدمه، لا مكتباً ثانياً. نأخذ عملك لنجرّده من العشوائية ونعيده إلى السوق كعلامة تجارية رائدة ذات هيبة بصرية مبنية على أرقام وحقائق صلبة لا تقبل الجدل. لا نصرخ لجذب الانتباه، بل نصنع لعملائنا تموضعاً ذكياً يجعل السوق ينصت إليهم باحترام.",
  },
  imageAlt: {
    en: "A lone figure at the far end of a vast, geometrically lit hall",
    ar: "شخص وحيد في نهاية قاعة هندسية واسعة مضاءة",
  },
  vision: {
    label: { en: "Vision", ar: "الرؤية" },
    title: { en: "Our Vision", ar: "رؤيتنا" },
    image: "/photo/vision-hummingbird.webp",
    imageAlt: {
      en: "Home of Creativity hummingbird mark hovering like a compass over a dark horizon",
      ar: "شعار طائر بيت الإبداع كبوصلة فوق أفق داكن",
    },
    body: {
      en: "Together with our partners, to be the global compass for non-conformist creativity—pioneering a new marketing era where a brand’s true worth is defined by profound impact and authentic ideas, not just digital noise.",
      ar: "أن نكون مع شركائنا البوصلة العالمية للإبداع الذي يكسر النمطية والتقليد، مؤسسين لعصر تسويقي مُختلف تُرسم فيه قيمة العلامة التجارية بعمق التأثير وأصالة الأفكار لا بضجيج الظهور.",
    },
    accents: {
      en: ["global compass", "profound impact", "authentic ideas"],
      ar: ["البوصلة العالمية", "عمق التأثير", "أصالة الأفكار"],
    },
  },
  mission: {
    label: { en: "Mission", ar: "الرسالة" },
    title: { en: "Our Mission", ar: "رسالتنا" },
    image: "/photo/mission-hummingbird.webp",
    imageAlt: {
      en: "Home of Creativity hummingbird mark weaving bridges of light between distant cities",
      ar: "شعار طائر بيت الإبداع ينسج جسور ضوء بين مدن بعيدة",
    },
    body: {
      en: "We craft digital concepts that defy the ordinary. We architect world-class ideas that elevate our partners’ global positioning, forging enduring bridges of trust and belonging that cross borders and markets. Together, we shape a more imaginative tomorrow.",
      ar: "نصمم المفاهيم الرقمية التي تتحدى المألوف؛ نُهيكل الأفكار بحرفية عالمية تعزز تموضع شركائنا عالمياً، وتخلق جسوراً متينة من الثقة والانتماء العابر للحدود والأسواق، نعمل معاً من أجل غدٍ أكثر إبداعاً.",
    },
    accents: {
      en: ["defy the ordinary", "world-class", "bridges of trust"],
      ar: ["تتحدى المألوف", "حرفية عالمية", "جسوراً متينة"],
    },
  },
};

/**
 * Canonical, factual "about" content for the dedicated `/about/` page —
 * distinct from `about` above, which keeps the homepage's narrative voice.
 * No invented offices, awards, client counts, or years of experience.
 */
export const aboutPage = {
  kicker: { en: "Home of Creativity", ar: "بيت الإبداع" },
  title: { en: "About Home of Creativity", ar: "عن بيت الإبداع" },
  lead: {
    en: "Home of Creativity (HOC) — بيت الإبداع — is a creative and branding agency based in Al Hamra, Damascus, Syria. It provides visual identity, marketing, social media, websites, events, and related creative services. It works with clients in Syria and Saudi Arabia, including Riyadh.",
    ar: "بيت الإبداع (Home of Creativity — HOC) وكالة إبداع وهوية مقرها الحمراء في دمشق. تقدم الهوية البصرية والتسويق والسوشال ميديا والمواقع والفعاليات وخدمات إبداعية مرتبطة بها، وتعمل مع عملاء في سوريا والسعودية بما في ذلك الرياض.",
  },
  body: {
    en: "Home of Creativity (HOC) — بيت الإبداع — is a creative and branding agency with its office in Al Hamra, Damascus, Syria. The published practices are visual identities, social media, account management, marketing, paid ads, exhibitions and conferences, event management, booth design, filming and editing, promotional gifts, roadside ads, websites and ecommerce, app design, and financial analysis. HOC works with organizations in Syria and with clients in Saudi Arabia, including Riyadh. Riyadh is a market served, not a second office on the public map. A project starts on Telegram or WhatsApp. HOC sends a quotation, and payment details are confirmed on WhatsApp before work begins. There is no self-serve checkout.",
    ar: "بيت الإبداع (Home of Creativity — HOC) وكالة إبداع وهوية، مكتبها في الحمراء بدمشق. الممارسات المنشورة: الهويات البصرية، السوشال ميديا، إدارة الحسابات، التسويق، الحملات الممولة، المعارض والمؤتمرات، إدارة الفعاليات، تصميم البوثات، التصوير والمونتاج، الهدايا الدعائية، الإعلانات الطرقية، المواقع والمتاجر، تصميم التطبيقات، والتحليل المالي. تعمل مع جهات في سوريا ومع عملاء في السعودية بما فيها الرياض. الرياض سوق نخدمه وليست مكتباً ثانياً على الخريطة. يبدأ المشروع عبر تيليجرام أو واتساب، ويُرسل عرض سعر وتُؤكد تفاصيل الدفع قبل بدء العمل. لا يوجد دفع ذاتي على الموقع.",
  },
  officeLabel: { en: "Office", ar: "المكتب" },
  officeValue: { en: "Al Hamra, Damascus, Syria", ar: "الحمراء، دمشق، سوريا" },
  marketLabel: { en: "Market served", ar: "السوق المخدوم" },
  marketValue: { en: "Syria and Saudi Arabia, including Riyadh", ar: "سوريا والسعودية، بما في ذلك الرياض" },
  notPublishedLabel: { en: "Not published", ar: "غير منشور" },
  notPublishedValue: {
    en: "Founding year, team roster, awards, and an industries-served list",
    ar: "سنة التأسيس، فريق العمل، الجوائز، وقائمة الصناعات المخدومة",
  },
};

export const services = {
  kicker: { en: "Practices", ar: "ممارساتنا" },
  title: { en: "Our services", ar: "خدماتنا" },
  lead: {
    en: "Fourteen practices. One architectural standard.",
    ar: "أربع عشرة ممارسة. معيار معماري واحد.",
  },
  items: [
    {
      id: "social",
      en: "Social Media",
      ar: "السوشال ميديا",
      tone: "orange" as const,
    },
    {
      id: "accounts",
      en: "Account Management",
      ar: "إدارة الحسابات",
      tone: "purple" as const,
    },
    {
      id: "marketing",
      en: "Marketing",
      ar: "التسويق",
      tone: "teal" as const,
    },
    {
      id: "ads",
      en: "Paid Ads",
      ar: "حملات ممولة",
      tone: "orange" as const,
    },
    {
      id: "exhibitions",
      en: "Exhibitions & Conferences",
      ar: "تنظيم المعارض والمؤتمرات",
      tone: "blue" as const,
    },
    {
      id: "events",
      en: "Event Management",
      ar: "إدارة الفعاليات",
      tone: "blue" as const,
    },
    {
      id: "booths",
      en: "Booth Design",
      ar: "تصميم البوثات",
      tone: "peach" as const,
    },
    {
      id: "identity",
      en: "Visual Identities",
      ar: "الهويات البصرية",
      tone: "blue" as const,
    },
    {
      id: "film",
      en: "Filming & Editing",
      ar: "تصوير ومونتاج",
      tone: "orange" as const,
    },
    {
      id: "gifts",
      en: "Promo Gifts",
      ar: "الهدايا الدعائية",
      tone: "orange" as const,
    },
    {
      id: "outdoor",
      en: "Roadside Ads",
      ar: "إعلانات طرقية",
      tone: "blue" as const,
    },
    {
      id: "web",
      en: "Websites & Ecommerce",
      ar: "المواقع والمتاجر الإلكترونية",
      tone: "teal" as const,
    },
    {
      id: "apps",
      en: "App Design",
      ar: "تصميم التطبيقات",
      tone: "orange" as const,
    },
    {
      id: "finance",
      en: "Financial Analysis",
      ar: "التحليل المالي",
      tone: "purple" as const,
    },
  ],
};

type ServiceFaq = { q: Copy; a: Copy };

export type ServiceDetail = {
  id: string;
  slug: string;
  title: Copy;
  metaDescription: Copy;
  definition: Copy;
  audienceLabel: Copy;
  audience: Copy;
  processLabel: Copy;
  process: Copy;
  faqs: ServiceFaq[];
};

/**
 * Dedicated pages for the first three published practices (per the GEO
 * audit roadmap). The other eleven practices stay on `/services/` only,
 * until their own definitions are confirmed — do not invent deliverables,
 * pricing, or timelines beyond what `services.items` and the public
 * quotation flow already state.
 */
export const serviceDetails: ServiceDetail[] = [
  {
    id: "identity",
    slug: "visual-identity",
    title: { en: "Visual Identity Design in Damascus", ar: "تصميم الهوية البصرية في دمشق" },
    metaDescription: {
      en: "Visual identity design from Home of Creativity (HOC) in Al Hamra, Damascus: mark, colors, typography, and applications, for clients in Syria and Saudi Arabia.",
      ar: "تصميم الهوية البصرية من بيت الإبداع (HOC) في الحمراء بدمشق: الشعار والألوان والخطوط والتطبيقات، لعملاء في سوريا والسعودية.",
    },
    definition: {
      en: "Visual identity is the design of a brand's mark, colors, typography, and applications — the visual system that carries a business across print, digital, and physical spaces. Home of Creativity (HOC), in Al Hamra, Damascus, designs that system for clients in Syria and Saudi Arabia, including Riyadh. What a project includes is confirmed in the quotation, not as a fixed public list.",
      ar: "الهوية البصرية هي تصميم شعار العلامة وألوانها وخطوطها وتطبيقاتها — النظام البصري الذي يحمل العمل عبر المطبوعات والمنصات الرقمية والمساحات الفعلية. يصمم بيت الإبداع (HOC) في الحمراء بدمشق هذا النظام لعملاء في سوريا والسعودية بما في ذلك الرياض. يُؤكد ما يشمله المشروع في عرض السعر، وليس كقائمة عامة ثابتة.",
    },
    audienceLabel: { en: "Who it's for", ar: "لمن هذه الخدمة" },
    audience: {
      en: "Businesses and organizations that need a defined visual identity, from a first logo system to a brand refresh. No industries-served list is published; clients are in Syria and Saudi Arabia.",
      ar: "شركات وجهات تحتاج إلى هوية بصرية محددة، من أول نظام شعار إلى تحديث للعلامة. لا توجد قائمة صناعات منشورة؛ العملاء في سوريا والسعودية.",
    },
    processLabel: { en: "How it works", ar: "طريقة العمل" },
    process: {
      en: "Start on Telegram or WhatsApp with your brief. Home of Creativity sends a quotation; payment details are confirmed on WhatsApp before design work begins, and files are delivered on Telegram.",
      ar: "ابدأ عبر تيليجرام أو واتساب بموجز مشروعك. يرسل بيت الإبداع عرض سعر، وتُؤكَّد تفاصيل الدفع عبر واتساب قبل بدء التصميم، وتُسلَّم الملفات عبر تيليجرام.",
    },
    faqs: [
      {
        q: {
          en: "What is included in a visual identity project?",
          ar: "ما الذي تشمله مشاريع الهوية البصرية؟",
        },
        a: {
          en: "Scope depends on the quotation Home of Creativity sends after reviewing your brief. Deliverables are confirmed before payment; they are not published as a fixed list here.",
          ar: "يعتمد النطاق على عرض السعر الذي يرسله بيت الإبداع بعد مراجعة موجزك. تُؤكَّد المخرجات قبل الدفع، ولا تُنشر كقائمة ثابتة هنا.",
        },
      },
      {
        q: {
          en: "Does Home of Creativity design identities for clients in Saudi Arabia?",
          ar: "هل يصمم بيت الإبداع هويات لعملاء في السعودية؟",
        },
        a: {
          en: "Yes. Home of Creativity designs visual identities for clients in Saudi Arabia, including Riyadh, as a served market — there is no physical HOC office in Riyadh.",
          ar: "نعم. يصمم بيت الإبداع هويات بصرية لعملاء في السعودية بما في ذلك الرياض، وهي سوق نخدمها — لا يوجد مكتب مادي لبيت الإبداع في الرياض.",
        },
      },
      {
        q: {
          en: "How long does a visual identity project take?",
          ar: "كم تستغرق مشاريع الهوية البصرية؟",
        },
        a: {
          en: "Timelines are not published in advance; they are confirmed in the quotation after Home of Creativity reviews your brief.",
          ar: "لا تُنشر المواعيد مسبقاً؛ تُؤكَّد في عرض السعر بعد مراجعة بيت الإبداع لموجزك.",
        },
      },
    ],
  },
  {
    id: "social",
    slug: "social-media",
    title: { en: "Social media", ar: "السوشال ميديا" },
    metaDescription: {
      en: "Social media design and account management from Home of Creativity (HOC), for clients in Syria and Saudi Arabia.",
      ar: "تصميم السوشال ميديا وإدارة الحسابات من بيت الإبداع (HOC)، لعملاء في سوريا والسعودية.",
    },
    definition: {
      en: "Social media is the ongoing design and publishing of content for a brand's channels — posts, stories, and campaigns that keep a visual identity consistent across platforms. Home of Creativity provides social media as a published service, alongside account management.",
      ar: "السوشال ميديا هي التصميم والنشر المستمر لمحتوى قنوات العلامة — منشورات وقصص وحملات تحافظ على اتساق الهوية البصرية عبر المنصات. يقدّم بيت الإبداع خدمة السوشال ميديا، إلى جانب إدارة الحسابات.",
    },
    audienceLabel: { en: "Who it's for", ar: "لمن هذه الخدمة" },
    audience: {
      en: "Businesses and organizations in Syria and Saudi Arabia that need consistent social content and account management. No industries-served list is published.",
      ar: "شركات وجهات في سوريا والسعودية تحتاج إلى محتوى سوشال ميديا متسق وإدارة حسابات. لا توجد قائمة صناعات منشورة.",
    },
    processLabel: { en: "How it works", ar: "طريقة العمل" },
    process: {
      en: "Start on Telegram or WhatsApp with your brief. Home of Creativity sends a quotation; payment details are confirmed on WhatsApp before production begins, and content is delivered on Telegram.",
      ar: "ابدأ عبر تيليجرام أو واتساب بموجز مشروعك. يرسل بيت الإبداع عرض سعر، وتُؤكَّد تفاصيل الدفع عبر واتساب قبل بدء الإنتاج، ويُسلَّم المحتوى عبر تيليجرام.",
    },
    faqs: [
      {
        q: {
          en: "What is included in a social media package?",
          ar: "ما الذي تشمله باقات السوشال ميديا؟",
        },
        a: {
          en: "Scope depends on the quotation Home of Creativity sends after reviewing your brief; published package tiers are listed at hoc.agency/pricing/.",
          ar: "يعتمد النطاق على عرض السعر الذي يرسله بيت الإبداع بعد مراجعة موجزك؛ باقات الاشتراك المنشورة مذكورة في hoc.agency/pricing/.",
        },
      },
      {
        q: {
          en: "Does Home of Creativity manage accounts for clients in Saudi Arabia?",
          ar: "هل يدير بيت الإبداع حسابات لعملاء في السعودية؟",
        },
        a: {
          en: "Yes. Home of Creativity works with clients in Saudi Arabia, including Riyadh, as a served market — there is no physical HOC office in Riyadh.",
          ar: "نعم. يعمل بيت الإبداع مع عملاء في السعودية بما في ذلك الرياض، وهي سوق نخدمها — لا يوجد مكتب مادي لبيت الإبداع في الرياض.",
        },
      },
      {
        q: {
          en: "How does account management differ from social media design?",
          ar: "ما الفرق بين إدارة الحسابات وتصميم السوشال ميديا؟",
        },
        a: {
          en: "Both are published as separate services; the exact split of responsibilities is confirmed in the quotation for your project.",
          ar: "كلاهما خدمة منشورة منفصلة؛ يتم تحديد توزيع المسؤوليات بدقة في عرض السعر الخاص بمشروعك.",
        },
      },
    ],
  },
  {
    id: "web",
    slug: "websites-ecommerce",
    title: { en: "Websites & ecommerce", ar: "المواقع والمتاجر الإلكترونية" },
    metaDescription: {
      en: "Website and ecommerce design from Home of Creativity (HOC), for clients in Syria and Saudi Arabia.",
      ar: "تصميم المواقع والمتاجر الإلكترونية من بيت الإبداع (HOC)، لعملاء في سوريا والسعودية.",
    },
    definition: {
      en: "Websites and ecommerce covers designing and building sites and online stores — one of Home of Creativity's published services, alongside app design.",
      ar: "المواقع والمتاجر الإلكترونية تشمل تصميم وبناء المواقع والمتاجر عبر الإنترنت — من خدمات بيت الإبداع المنشورة، إلى جانب تصميم التطبيقات.",
    },
    audienceLabel: { en: "Who it's for", ar: "لمن هذه الخدمة" },
    audience: {
      en: "Businesses and organizations in Syria and Saudi Arabia that need a website or online store. No industries-served list is published.",
      ar: "شركات وجهات في سوريا والسعودية تحتاج إلى موقع أو متجر عبر الإنترنت. لا توجد قائمة صناعات منشورة.",
    },
    processLabel: { en: "How it works", ar: "طريقة العمل" },
    process: {
      en: "Start on Telegram or WhatsApp with your brief. Home of Creativity sends a quotation; payment details are confirmed on WhatsApp before development begins, and access is delivered on Telegram.",
      ar: "ابدأ عبر تيليجرام أو واتساب بموجز مشروعك. يرسل بيت الإبداع عرض سعر، وتُؤكَّد تفاصيل الدفع عبر واتساب قبل بدء التطوير، ويُسلَّم الوصول عبر تيليجرام.",
    },
    faqs: [
      {
        q: {
          en: "Does Home of Creativity build online stores as well as websites?",
          ar: "هل يبني بيت الإبداع متاجر إلكترونية إضافة للمواقع؟",
        },
        a: {
          en: "Yes. Websites and ecommerce are published together as one service; scope is confirmed in the quotation.",
          ar: "نعم. المواقع والمتاجر الإلكترونية منشورة معاً كخدمة واحدة؛ يُؤكَّد النطاق في عرض السعر.",
        },
      },
      {
        q: {
          en: "Does Home of Creativity build websites for clients in Saudi Arabia?",
          ar: "هل يبني بيت الإبداع مواقع لعملاء في السعودية؟",
        },
        a: {
          en: "Yes. Home of Creativity works with clients in Saudi Arabia, including Riyadh, as a served market — there is no physical HOC office in Riyadh.",
          ar: "نعم. يعمل بيت الإبداع مع عملاء في السعودية بما في ذلك الرياض، وهي سوق نخدمها — لا يوجد مكتب مادي لبيت الإبداع في الرياض.",
        },
      },
      {
        q: {
          en: "Is app design part of this service?",
          ar: "هل تصميم التطبيقات جزء من هذه الخدمة؟",
        },
        a: {
          en: "App design is a separate published service alongside websites and ecommerce; see hoc.agency/services/.",
          ar: "تصميم التطبيقات خدمة منشورة منفصلة إلى جانب المواقع والمتاجر الإلكترونية؛ راجع hoc.agency/services/.",
        },
      },
    ],
  },
];

export const servicesPage = {
  kicker: { en: "Practices", ar: "ممارساتنا" },
  title: { en: "Our services", ar: "خدماتنا" },
  lead: {
    en: "Fourteen published practices. Definitions and dedicated pages are added as they are confirmed — three are published so far.",
    ar: "أربع عشرة ممارسة منشورة. تُضاف التعريفات والصفحات المخصصة كلما تم تأكيدها — ثلاث منشورة حتى الآن.",
  },
  comingSoon: {
    en: "A dedicated page for this practice is not published yet.",
    ar: "لم تُنشر صفحة مخصصة لهذه الممارسة بعد.",
  },
  viewPage: { en: "View service page", ar: "عرض صفحة الخدمة" },
  hubNote: {
    en: "Looking for identity work in Damascus? Read the branding page, then visual identity design.",
    ar: "تبحث عن عمل هوية في دمشق؟ اقرأ صفحة الهوية، ثم تصميم الهوية البصرية.",
  },
};

type TopicFaq = { q: Copy; a: Copy };
type TopicLink = { href: string; label: Copy };
type TopicSection = { heading: Copy; body: Copy };

export type TopicPageCopy = {
  title: Copy;
  metaTitle: string;
  metaDescription: Copy;
  lead: Copy;
  sections: TopicSection[];
  faqs: TopicFaq[];
  links: TopicLink[];
};

/**
 * Category page for non-branded queries. It explains branding and points at
 * the published visual-identity practice. It is not a new sold service, and
 * it does not add brand strategy to the catalog.
 */
export const brandingPage: TopicPageCopy = {
  title: { en: "Branding Agency in Damascus", ar: "وكالة هوية في دمشق" },
  metaTitle: "Branding Agency in Damascus, Syria | HOC",
  metaDescription: {
    en: "Home of Creativity (HOC) is a branding and visual identity agency based in Damascus, Syria, working with clients in Syria and Saudi Arabia.",
    ar: "بيت الإبداع (HOC) وكالة هوية بصرية مقرها دمشق، سوريا، وتعمل مع عملاء في سوريا والسعودية.",
  },
  lead: {
    en: "Home of Creativity (HOC) is a branding and visual identity agency based in Damascus, Syria.",
    ar: "بيت الإبداع (Home of Creativity — HOC) وكالة هوية بصرية مقرها دمشق، سوريا.",
  },
  sections: [
    {
      heading: { en: "What branding means here", ar: "ماذا تعني الهوية هنا" },
      body: {
        en: "On this site, branding means the published creative practices that make a business recognizable, starting with visual identity: a mark, colors, typography, and applications. Home of Creativity does not publish a separate brand-strategy product. The office is in Al Hamra, Damascus. Saudi Arabia, including Riyadh, is a market HOC serves, not a second office.",
        ar: "في هذا الموقع، الهوية تعني الممارسات الإبداعية المنشورة التي تجعل العمل قابلاً للتعرّف، وتبدأ بالهوية البصرية: الشعار والألوان والخطوط والتطبيقات. لا ينشر بيت الإبداع منتجاً منفصلاً لاستراتيجية العلامة. المكتب في الحمراء بدمشق. السعودية، بما فيها الرياض، سوق يخدمه بيت الإبداع وليست مكتباً ثانياً.",
      },
    },
    {
      heading: { en: "What you can hire", ar: "ما الذي يمكن طلبه" },
      body: {
        en: "The identity practice you hire is visual identities. Related practices that already have their own pages are social media and websites and ecommerce. The other published practices — marketing, paid ads, events, filming, and the rest of the catalog — stay listed on the services index until their own pages exist. Scope is confirmed in a quotation. There is no public price and no published timeline.",
        ar: "الممارسة التي تُطلب للهوية هي الهويات البصرية. الممارسات المرتبطة التي لها صفحاتها: السوشال ميديا، والمواقع والمتاجر. بقية الممارسات المنشورة — التسويق والحملات الممولة والفعاليات والتصوير وباقي القائمة — تبقى في فهرس الخدمات إلى أن تُنشر صفحاتها. يُؤكد النطاق في عرض السعر. لا يوجد سعر عام ولا مدة منشورة.",
      },
    },
    {
      heading: { en: "Who it is for", ar: "لمن هذه الصفحة" },
      body: {
        en: "Businesses and organizations in Syria, and clients in Saudi Arabia. Home of Creativity does not publish an industries-served list, so this page does not name sectors.",
        ar: "شركات وجهات في سوريا، وعملاء في السعودية. لا ينشر بيت الإبداع قائمة صناعات، لذلك لا تسمّي هذه الصفحة قطاعات.",
      },
    },
    {
      heading: { en: "How a project starts", ar: "كيف يبدأ المشروع" },
      body: {
        en: "Message Home of Creativity on Telegram or WhatsApp with the brief. HOC sends a quotation. Payment details are confirmed on WhatsApp before work begins. There is no self-serve checkout.",
        ar: "راسل بيت الإبداع عبر تيليجرام أو واتساب بالموجز. يُرسل عرض سعر. تُؤكد تفاصيل الدفع عبر واتساب قبل بدء العمل. لا يوجد دفع ذاتي على الموقع.",
      },
    },
  ],
  faqs: [
    {
      q: { en: "What does a branding agency do?", ar: "ماذا تفعل وكالة الهوية؟" },
      a: {
        en: "At Home of Creativity, it means designing the visual identity and the other creative practices published on hoc.agency, from a studio in Al Hamra, Damascus. It does not mean a separate brand-strategy engagement.",
        ar: "عند بيت الإبداع، تعني تصميم الهوية البصرية وبقية الممارسات الإبداعية المنشورة على hoc.agency، من مكتب في الحمراء بدمشق. ولا تعني تعاقداً منفصلاً لاستراتيجية العلامة.",
      },
    },
    {
      q: { en: "Does HOC provide branding in Damascus?", ar: "هل يقدّم بيت الإبداع الهوية في دمشق؟" },
      a: {
        en: "Yes. The only published office is in Al Hamra, Damascus, Syria. That is where the work is based.",
        ar: "نعم. المكتب المنشور الوحيد في الحمراء بدمشق، سوريا. ومن هناك يُدار العمل.",
      },
    },
    {
      q: { en: "Can HOC work with clients outside Syria?", ar: "هل يعمل بيت الإبداع مع عملاء خارج سوريا؟" },
      a: {
        en: "Yes. HOC works with clients in Saudi Arabia, including Riyadh. That is a served market. There is no HOC office in Riyadh.",
        ar: "نعم. يعمل بيت الإبداع مع عملاء في السعودية بما في ذلك الرياض. هذه سوق مخدومة. لا يوجد مكتب لبيت الإبداع في الرياض.",
      },
    },
    {
      q: { en: "What should a client prepare?", ar: "ماذا يجهّز العميل؟" },
      a: {
        en: "A short brief on Telegram or WhatsApp: what the business is, and what you need designed. Home of Creativity confirms scope in the quotation before payment.",
        ar: "موجز قصير عبر تيليجرام أو واتساب: ما هو العمل، وما الذي يحتاج إلى تصميم. يؤكد بيت الإبداع النطاق في عرض السعر قبل الدفع.",
      },
    },
  ],
  links: [
    { href: "services/brand-identity", label: { en: "brand identity services", ar: "خدمات الهوية التجارية" } },
    { href: "services/visual-identity", label: { en: "visual identity design services", ar: "تصميم الهوية البصرية" } },
    { href: "locations/damascus", label: { en: "the Damascus office", ar: "مكتب دمشق" } },
    { href: "articles/what-is-visual-identity", label: { en: "what visual identity is", ar: "ما هي الهوية البصرية" } },
    { href: "services/social-media", label: { en: "social media", ar: "السوشال ميديا" } },
    { href: "services/websites-ecommerce", label: { en: "websites and ecommerce", ar: "المواقع والمتاجر" } },
  ],
};

/** Explains logo, visual identity, and brand identity without adding a new practice. */
export const brandIdentityPage: TopicPageCopy = {
  title: { en: "Brand Identity Services", ar: "خدمات الهوية التجارية" },
  metaTitle: "Brand Identity Services | HOC Damascus",
  metaDescription: {
    en: "Brand identity, visual identity, and a logo are not the same thing. Home of Creativity (HOC) in Damascus publishes visual identity design as the practice you hire.",
    ar: "الهوية التجارية والهوية البصرية والشعار ليست شيئاً واحداً. ينشر بيت الإبداع (HOC) في دمشق تصميم الهوية البصرية بوصفها الممارسة التي تُطلب.",
  },
  lead: {
    en: "A logo, a visual identity, and a brand identity are related, and they are not the same thing. Home of Creativity (HOC) in Damascus publishes visual identities as the practice you hire for this work.",
    ar: "الشعار والهوية البصرية والهوية التجارية مفاهيم مرتبطة، وليست شيئاً واحداً. ينشر بيت الإبداع (HOC) في دمشق الهويات البصرية بوصفها الممارسة التي تُطلب لهذا العمل.",
  },
  sections: [
    {
      heading: { en: "Logo", ar: "الشعار" },
      body: {
        en: "A logo is a mark: a wordmark, a symbol, or both. It identifies. On its own it is not a visual system.",
        ar: "الشعار علامة: كلمة أو رمز أو كلاهما. يعرّف بالعمل. وحده ليس نظاماً بصرياً.",
      },
    },
    {
      heading: { en: "Visual identity", ar: "الهوية البصرية" },
      body: {
        en: "Visual identity is the system around that mark: colors, typography, and applications across print, digital, and physical spaces. That is the published Home of Creativity practice.",
        ar: "الهوية البصرية هي النظام حول تلك العلامة: الألوان والخطوط والتطبيقات عبر المطبوعات والرقمي والمساحات الفعلية. هذه هي ممارسة بيت الإبداع المنشورة.",
      },
    },
    {
      heading: { en: "Brand identity", ar: "الهوية التجارية" },
      body: {
        en: "Brand identity is the broader way a business is recognized. The visual identity is the visual part of that recognition. Home of Creativity does not publish a separate brand-strategy service, a price, or a timeline for this work. The office is in Al Hamra, Damascus. Clients in Saudi Arabia, including Riyadh, are a served market.",
        ar: "الهوية التجارية هي الصورة الأوسع التي يُعرَف بها العمل. الهوية البصرية هي الجزء البصري من ذلك التعرّف. لا ينشر بيت الإبداع خدمة منفصلة لاستراتيجية العلامة، ولا سعراً، ولا مدة لهذا العمل. المكتب في الحمراء بدمشق. العملاء في السعودية، بما فيها الرياض، سوق مخدومة.",
      },
    },
  ],
  faqs: [
    {
      q: {
        en: "What is the difference between a logo and a visual identity?",
        ar: "ما الفرق بين الشعار والهوية البصرية؟",
      },
      a: {
        en: "A logo is one mark. A visual identity is the system of mark, color, type, and applications. Home of Creativity designs the system.",
        ar: "الشعار علامة واحدة. الهوية البصرية نظام الشعار واللون والخط والتطبيقات. يصمم بيت الإبداع هذا النظام.",
      },
    },
    {
      q: {
        en: "Does Home of Creativity sell brand strategy?",
        ar: "هل يبيع بيت الإبداع استراتيجية علامة؟",
      },
      a: {
        en: "No. Brand strategy is not one of the fourteen published practices. The published identity practice is visual identities.",
        ar: "لا. استراتيجية العلامة ليست من الممارسات الأربع عشرة المنشورة. ممارسة الهوية المنشورة هي الهويات البصرية.",
      },
    },
    {
      q: { en: "Where is this work based?", ar: "من أين يُدار هذا العمل؟" },
      a: {
        en: "From the office in Al Hamra, Damascus, Syria. Saudi Arabia is a market served, not a second studio.",
        ar: "من المكتب في الحمراء بدمشق، سوريا. السعودية سوق مخدومة وليست استوديو ثانياً.",
      },
    },
  ],
  links: [
    { href: "services/branding", label: { en: "branding services in Damascus", ar: "خدمات الهوية في دمشق" } },
    { href: "services/visual-identity", label: { en: "visual identity design services", ar: "تصميم الهوية البصرية" } },
    { href: "articles/logo-vs-brand-identity", label: { en: "logo versus brand identity", ar: "الشعار مقابل الهوية التجارية" } },
    { href: "locations/damascus", label: { en: "the Damascus office", ar: "مكتب دمشق" } },
  ],
};

export const damascusPage = {
  title: { en: "Home of Creativity in Damascus", ar: "بيت الإبداع في دمشق" },
  metaTitle: "Home of Creativity — Damascus, Al Hamra | HOC",
  metaDescription: {
    en: "Home of Creativity (HOC) has one office, in Al Hamra, Damascus, Syria. Branding and visual identity work is based there. Saudi Arabia is a market served, not a second office.",
    ar: "لبيت الإبداع (HOC) مكتب واحد في الحمراء بدمشق، سوريا. عمل الهوية والهوية البصرية ينطلق من هناك. السعودية سوق مخدومة وليست مكتباً ثانياً.",
  },
  lead: {
    en: "Home of Creativity (HOC) — بيت الإبداع — is based in Al Hamra, Damascus, Syria. Branding and visual identity work starts from that office. Saudi Arabia, including Riyadh, is a market HOC serves. It is not a second studio, and this page is not a Riyadh address.",
    ar: "بيت الإبداع (Home of Creativity — HOC) مقره الحمراء في دمشق، سوريا. عمل الهوية والهوية البصرية ينطلق من هذا المكتب. السعودية، بما فيها الرياض، سوق يخدمها بيت الإبداع. ليست استوديو ثانياً، وهذه الصفحة ليست عنواناً في الرياض.",
  },
  servicesLabel: { en: "Services from Damascus", ar: "خدمات من دمشق" },
  contactLabel: { en: "Contact", ar: "التواصل" },
};

export const showcaseClients = {
  kicker: { en: "Who we serve", ar: "من نخدم" },
  title: { en: "Our clients", ar: "عملاؤنا" },
  lead: {
    en: "Brands and partners we have built with — from identity to campaigns and digital products.",
    ar: "علامات وشركاء بنينا معهم — من الهوية إلى الحملات والمنتجات الرقمية.",
  },
  gridLabel: { en: "Client logos", ar: "شعارات العملاء" },
  fallbackNames: [
    "IZORA",
    "Faiz Wahba",
    "Enginety",
    "Smart Vision",
    "Future Line",
    "Riva Boutique",
  ],
} satisfies Record<string, Copy | string[]>;

export const clientJourney = {
  kicker: { en: "Process", ar: "العملية" },
  title: { en: "Work stages", ar: "مراحل العمل" },
  lead: {
    en: "From first message to final delivery — a clear path through Telegram, with your team always in the loop.",
    ar: "من أول رسالة إلى التسليم النهائي — مسار واضح عبر تيليجرام، وفريقك على اطلاع في كل مرحلة.",
  },
  cta: { en: "Start on Telegram", ar: "ابدأ عبر تيليجرام" },
  steps: [
    {
      id: "submit",
      title: { en: "Submit your brief", ar: "تقديم الطلب" },
      body: {
        en: "Describe your project on Telegram — text, images, or PDFs — and send it in one flow.",
        ar: "صِف مشروعك على تيليجرام — نصاً أو صوراً أو PDF — وأرسله في خطوة واحدة.",
      },
    },
    {
      id: "review",
      title: { en: "Sales review", ar: "مراجعة المبيعات" },
      body: {
        en: "Our sales team receives your request instantly, reviews the brief, and opens your file on ClickUp.",
        ar: "يستلم فريق المبيعات طلبك فوراً، يراجع الموجز، ويفتح ملفك على كليك أب.",
      },
    },
    {
      id: "quote",
      title: { en: "Quotation", ar: "عرض السعر" },
      body: {
        en: "You receive a branded PDF quotation with approve or reject — no back-and-forth guessing.",
        ar: "يصلك عرض سعر بصيغة PDF مع خيار الموافقة أو الرفض — بلا تخمين أو مراسلات عشوائية.",
      },
    },
    {
      id: "payment",
      title: { en: "Payment & invoice", ar: "الدفع والفاتورة" },
      body: {
        en: "After approval, the invoice arrives on Telegram. Upload your receipt securely from the same chat.",
        ar: "بعد الموافقة، تصل الفاتورة على تيليجرام. ارفع وصل الدفع بأمان من نفس المحادثة.",
      },
    },
    {
      id: "production",
      title: { en: "Production", ar: "التنفيذ" },
      body: {
        en: "Design, content, and media teams take over — each department gets its own ClickUp task.",
        ar: "يتولى فريق التصميم والمحتوى والإعلام — ولكل قسم مهمة مستقلة على كليك أب.",
      },
    },
    {
      id: "delivery",
      title: { en: "Delivery & review", ar: "التسليم والمراجعة" },
      body: {
        en: "Final files land on Telegram. Request a revision or sign off when the work meets your standard.",
        ar: "الملفات النهائية تصل على تيليجرام. اطلب تعديلاً أو اعتماداً عندما يلبي العمل معيارك.",
      },
    },
  ],
};

export const reels = {
  kicker: { en: "In motion", ar: "بالحركة" },
  title: { en: "Reels & short films", ar: "ريلز وأفلام قصيرة" },
  lead: {
    en: "Recent vertical work — identity, events, and brand stories in motion.",
    ar: "أعمال عمودية حديثة — هوية وفعاليات وقصص علامات بالحركة.",
  },
  loading: { en: "Loading reels…", ar: "جارٍ تحميل الريلز…" },
  cardLoading: { en: "Loading…", ar: "جارٍ التحميل…" },
  cardError: { en: "Couldn't load this clip.", ar: "تعذر تحميل هذا المقطع." },
  empty: {
    en: "No published reels yet.",
    ar: "لا توجد ريلز منشورة بعد.",
  },
};

export const socialPhones = {
  kicker: { en: "Social media", ar: "قنواتنا على السوشال ميديا" },
  title: { en: "Browse our pages on social media", ar: "تصفح صفحاتنا على السوشال ميديا" },
  lead: {
    en: "Our designs are reflected in every marketing detail with creativity and professionalism",
    ar: "تصاميمنا تنعكس في كل تفاصيل التسويق بإبداع واحترافية",
  },
  facebook: { en: "Facebook", ar: "فيسبوك" },
  instagram: { en: "Instagram", ar: "إنستغرام" },
  openFacebook: { en: "Open Facebook page", ar: "فتح صفحة فيسبوك" },
  openInstagram: { en: "Open Instagram", ar: "فتح إنستغرام" },
  facebookTitle: { en: "Facebook page", ar: "صفحة فيسبوك" },
  instagramTitle: { en: "Instagram profile", ar: "حساب إنستغرام" },
  feedScroll: { en: "Scroll posts", ar: "تمرير المنشورات" },
  loading: { en: "Loading posts…", ar: "جارٍ تحميل المنشورات…" },
  postsStat: { en: "posts", ar: "منشورات" },
  followersStat: { en: "followers", ar: "متابعون" },
  followingStat: { en: "following", ar: "يتابع" },
  follow: { en: "Follow", ar: "متابعة" },
  likesStat: { en: "likes", ar: "إعجابات" },
  postsTab: { en: "Posts", ar: "المنشورات" },
  reelsTab: { en: "Reels", ar: "ريلز" },
  emptyReels: { en: "No Reels yet.", ar: "لا يوجد ريلز بعد." },
  emptyFacebook: {
    en: "See the latest posts on our Facebook page.",
    ar: "شاهد أحدث المنشورات على صفحتنا في فيسبوك.",
  },
};

export const projects = {
  kicker: { en: "Our work", ar: "أعمالنا" },
  title: { en: "Selected projects", ar: "مشاريع مختارة" },
  lead: {
    en: "Spatial, visual, and digital systems built to hold a room — not just a slide.",
    ar: "أنظمة مكانية وبصرية ورقمية تُبنى لتملأ القاعة، لا الشريحة فقط.",
  },
  filterAll: { en: "All", ar: "الكل" },
  viewAll: { en: "View all projects", ar: "عرض كل المشاريع" },
  viewLess: { en: "Show less", ar: "عرض أقل" },
  close: { en: "Close", ar: "إغلاق" },
  previous: { en: "Previous", ar: "السابق" },
  next: { en: "Next", ar: "التالي" },
  viewDetails: { en: "View details", ar: "عرض التفاصيل" },
  loading: { en: "Loading projects…", ar: "جارٍ تحميل المشاريع…" },
  empty: {
    en: "Projects are not available right now. Please try again later.",
    ar: "المشاريع غير متاحة حالياً. يرجى المحاولة لاحقاً.",
  },
  items: [
    {
      id: "events",
      label: { en: "Live", ar: "الحدث" },
      filter: { en: "Events", ar: "الفعاليات" },
      tags: { en: "Events, exhibitions, booths", ar: "فعاليات، معارض، بوثات" },
      title: { en: "Events, exhibitions & booths", ar: "المعارض والمؤتمرات والبوثات" },
      body: {
        en: "Stages, halls, and conferences at architectural scale — brand systems that hold a room.",
        ar: "قاعات ومؤتمرات بمقياس معماري: أنظمة هوية تملأ القاعة.",
      },
      images: [
        {
          src: portfolioDriveUrl("p10_event_stage_01"),
          featured: true,
          span: "md" as const,
          alt: {
            en: "Conference hall with a curved LED stage for Home of Creativity",
            ar: "قاعة مؤتمرات بشاشة مسرح منحنية لهوم أوف كريتيفيتي",
          },
        },
        {
          src: portfolioDriveUrl("p12_exhibition_booth_design"),
          featured: true,
          span: "sm" as const,
          alt: {
            en: "Exhibition booth design",
            ar: "تصميم بوث معرض",
          },
        },
      ],
    },
    {
      id: "identity",
      label: { en: "Mark", ar: "العلامة" },
      filter: { en: "Identity", ar: "الهوية" },
      tags: { en: "Branding, identity, print", ar: "هوية، علامة، مطبوعات" },
      title: { en: "Visual identity & applications", ar: "الهوية البصرية وتطبيقاتها" },
      body: {
        en: "Marks, profiles, cards, and packaging for IZORA, Faiz Wahba, Enginety, Smart Vision, Future Line, and Riva.",
        ar: "علامات وملفات وبطاقات وتغليف لـ IZORA وفايز وهبة وإنجنيتي وسمارت فيجن وفيوتشر لاين وريفا.",
      },
      images: [
        {
          src: portfolioDriveUrl("p16_logos"),
          featured: true,
          span: "lg" as const,
          alt: {
            en: "Client logo collection",
            ar: "مجموعة شعارات العملاء",
          },
        },
        {
          src: portfolioDriveUrl("p21_visual_identity_application_01"),
          featured: true,
          span: "md" as const,
          alt: {
            en: "Visual identity applications, set one",
            ar: "تطبيقات الهوية البصرية، المجموعة الأولى",
          },
        },
      ],
    },
    {
      id: "media",
      label: { en: "Motion", ar: "الحركة" },
      filter: { en: "Media", ar: "المحتوى" },
      tags: { en: "Content, film, campaigns", ar: "محتوى، تصوير، حملات" },
      title: { en: "Social, film & campaigns", ar: "السوشال والمحتوى والحملات" },
      body: {
        en: "Disciplined grids, cinematic motion, photography, and paid campaigns — proof, not stock.",
        ar: "شبكات منضبطة وتحريك سينمائي وتصوير وحملات ممولة: برهان لا صور جاهزة.",
      },
      images: [
        {
          src: portfolioDriveUrl("p28_social_posts_01"),
          featured: true,
          span: "sm" as const,
          alt: {
            en: "Social media posts, set one",
            ar: "منشورات سوشل ميديا، المجموعة الأولى",
          },
        },
        {
          src: portfolioDriveUrl("p32_photography_montage"),
          featured: true,
          span: "lg" as const,
          alt: {
            en: "Photography montage",
            ar: "مونتاج تصوير",
          },
        },
      ],
    },
    {
      id: "promo",
      label: { en: "Field", ar: "الميدان" },
      filter: { en: "Outdoor", ar: "الإعلان" },
      tags: { en: "Gifts, outdoor, roadside", ar: "هدايا، إعلان، طرق" },
      title: { en: "Gifts & roadside ads", ar: "الهدايا والإعلانات الطرقية" },
      body: {
        en: "Promotional objects and roadside prestige that carry the mark into the street.",
        ar: "هدايا دعائية وهيبة طرقية تنقل العلامة إلى الشارع.",
      },
      images: [
        {
          src: portfolioDriveUrl("p39_promotional_gifts"),
          featured: true,
          span: "sm" as const,
          alt: {
            en: "Promotional gifts",
            ar: "هدايا دعائية",
          },
        },
        {
          src: portfolioDriveUrl("p41_roadside_advertisement"),
          alt: {
            en: "Roadside advertisements",
            ar: "إعلانات طرقية",
          },
        },
      ],
    },
    {
      id: "digital",
      label: { en: "Click", ar: "الرقمي" },
      filter: { en: "Web", ar: "المواقع" },
      tags: { en: "Web, stores, apps", ar: "مواقع، متاجر، تطبيقات" },
      title: { en: "Websites & stores", ar: "المواقع والمتاجر" },
      body: {
        en: "Sites and stores with the same editorial discipline as the mark.",
        ar: "مواقع ومتاجر بنفس انضباط العلامة.",
      },
      images: [
        {
          src: portfolioDriveUrl("p43_website_01"),
          featured: true,
          span: "lg" as const,
          alt: {
            en: "Website design, first project",
            ar: "تصميم موقع، المشروع الأول",
          },
        },
      ],
    },
    {
      id: "finance",
      label: { en: "Signal", ar: "الإشارة" },
      filter: { en: "Finance", ar: "المالي" },
      tags: { en: "Dashboards, Excel, Power BI", ar: "لوحات، إكسل، باور بي آي" },
      title: { en: "Financial dashboards", ar: "لوحات التحليل المالي" },
      body: {
        en: "Excel and Power BI boards that turn figures into readable performance.",
        ar: "لوحات إكسل وباور بي آي تحوّل الأرقام إلى أداء مقروء.",
      },
      images: [
        {
          src: portfolioDriveUrl("p47_dashboard_01"),
          featured: true,
          span: "md" as const,
          alt: {
            en: "Financial analysis dashboard, first board",
            ar: "لوحة تحليل مالي، اللوحة الأولى",
          },
        },
        {
          src: portfolioDriveUrl("p48_dashboard_02"),
          alt: {
            en: "Financial analysis dashboard, second board",
            ar: "لوحة تحليل مالي، اللوحة الثانية",
          },
        },
      ],
    },
  ],
};

export const articlesPage = {
  kicker: { en: "Insights", ar: "مقالات" },
  title: { en: "Articles & insights", ar: "مقالات ورؤى" },
  lead: {
    en: "Notes on branding, social, and creative direction from Home of Creativity.",
    ar: "مقالات عن الهوية والسوشال والإخراج الإبداعي من بيت الإبداع.",
  },
  loading: { en: "Loading…", ar: "جارٍ التحميل…" },
  empty: { en: "No published articles yet.", ar: "لا توجد مقالات منشورة بعد." },
  readMore: { en: "Read article", ar: "اقرأ المقال" },
  back: { en: "Back to articles", ar: "العودة للمقالات" },
  notFound: { en: "Article not found", ar: "المقال غير موجود" },
};

export const projectDetail = {
  loading: { en: "Loading…", ar: "جارٍ التحميل…" },
  back: { en: "Back to projects", ar: "العودة للمشاريع" },
  visitWebsite: { en: "Visit website", ar: "زيارة الموقع" },
  gallery: { en: "Gallery", ar: "معرض الصور" },
  notFound: { en: "Project not found", ar: "المشروع غير موجود" },
  social: {
    instagram: { en: "Instagram", ar: "إنستغرام" },
    facebook: { en: "Facebook", ar: "فيسبوك" },
    linkedin: { en: "LinkedIn", ar: "لينكدإن" },
    x: { en: "X", ar: "X" },
    tiktok: { en: "TikTok", ar: "تيك توك" },
    youtube: { en: "YouTube", ar: "يوتيوب" },
  },
};

export const pricing = {
  kicker: { en: "Packages", ar: "باقات الخدمة" },
  title: { en: "Choose your package", ar: "اختر الباقة المناسبة" },
  lead: {
    en: "Three package families — strategic retainers, flexible content production, and one-time reach campaigns. All subscription tiers include Telegram intake, ClickUp tracking, and PDF quotations.",
    ar: "ثلاث عائلات باقات — اشتراكات استراتيجية، إنتاج محتوى مرن، وحملات انتشار لمرة واحدة. كل باقات الاشتراك تشمل استقبال تيليجرام، متابعة كليك أب، وعروض أسعار PDF.",
  },
  footnote: {
    en: "All prices are in USD. Payment details are confirmed on WhatsApp before checkout.",
    ar: "جميع الأسعار بالدولار. تفاصيل الدفع تُؤكَّد عبر واتساب قبل إتمام الاشتراك.",
  },
  confirmNote: {
    en: "Not sure which package fits? Message us before payment — we will recommend the right scope.",
    ar: "غير متأكد من الباقة المناسبة؟ راسلنا قبل الدفع — نساعدك باختيار النطاق الصحيح.",
  },
  chooseCategory: { en: "Category", ar: "الفئة" },
  chooseSubcategory: { en: "Subcategory", ar: "الفئة الفرعية" },
  chooseBilling: { en: "Billing period", ar: "فترة الاشتراك" },
  billing: {
    monthly: { label: { en: "Monthly", ar: "شهري" } },
    quarterly: {
      label: { en: "3 months", ar: "3 شهور" },
      discount: { en: "5% off", ar: "خصم 5%" },
    },
    semiannual: {
      label: { en: "6 months", ar: "6 شهور" },
      discount: { en: "10% off", ar: "خصم 10%" },
    },
    yearly: {
      label: { en: "Yearly", ar: "سنوي" },
      discount: { en: "20% off", ar: "خصم 20%" },
    },
  },
  perMonth: { en: "per month", ar: "شهرياً" },
  perThreeMonths: { en: "for 3 months", ar: "لـ 3 شهور" },
  perSixMonths: { en: "for 6 months", ar: "لـ 6 شهور" },
  perYear: { en: "per year", ar: "سنوياً" },
  oneTime: { en: "one-time", ar: "لمرة واحدة" },
  billingSave: {
    en: "Save 5% on 3 months, 10% on 6 months, and 20% on yearly billing vs. paying month by month.",
    ar: "وفّر 5% على 3 شهور، 10% على 6 شهور، و20% على الاشتراك السنوي مقارنة بالدفع الشهري.",
  },
  ctaDefault: { en: "Choose package", ar: "اختر الباقة" },
  inquiry: {
    title: { en: "Request this package", ar: "طلب الاشتراك" },
    lead: {
      en: "Share your details and we will open WhatsApp with a ready message.",
      ar: "أدخل بياناتك وسنفتح واتساب برسالة جاهزة.",
    },
    name: { en: "Name", ar: "الاسم" },
    phone: { en: "Phone (international)", ar: "رقم الهاتف (دولي)" },
    phonePlaceholder: { en: "9XX XXX XXX", ar: "9XX XXX XXX" },
    company: {
      en: "Company name or social media page",
      ar: "اسم الشركة أو صفحة السوشال ميديا",
    },
    submit: { en: "Send via WhatsApp", ar: "إرسال عبر واتساب" },
    close: { en: "Close", ar: "إغلاق" },
    error: {
      en: "Please complete all fields before sending.",
      ar: "يرجى تعبئة جميع الحقول قبل الإرسال.",
    },
    whatsappTemplate: {
      en: "Hello Home of Creativity\nThis is Mr./Ms. {{name}} from {{company}}. We would like to subscribe to {{package}} ({{period}}).\nMy number: {{phone}}\nThank you",
      ar: "مرحبا home of creativity\nمعك أ. {{name}} من شركة {{company}} حابين نشترك معكم ب{{package}} ({{period}})\nرقمي: {{phone}}\nشكراً لكم",
    },
  },
  reachLabels: {
    adBudget: { en: "Ad budget", ar: "الميزانية الإعلانية" },
    adCredit: { en: "Ad credit", ar: "الرصيد الإعلاني" },
    estimatedReach: { en: "Estimated reach", ar: "الوصول المقدر" },
    goal: { en: "Goal", ar: "الهدف" },
  },
  loading: {
    en: "Loading packages…",
    ar: "جاري تحميل الباقات…",
  },
  empty: {
    en: "Packages are not available right now. Please try again later.",
    ar: "الباقات غير متاحة حالياً. يرجى المحاولة لاحقاً.",
  },
  payment: {
    kicker: { en: "Payment", ar: "الدفع" },
    title: { en: "Payment methods", ar: "طرق الدفع" },
    lead: {
      en: "After choosing a package, pay via Sham Cash or cash. We confirm details and activate your file before production starts.",
      ar: "بعد اختيار الباقة، يمكنك الدفع عبر شام كاش أو نقداً. نؤكد التفاصيل ونفعّل ملفك قبل بدء الإنتاج.",
    },
    note: {
      en: "Payment details are confirmed on WhatsApp before checkout.",
      ar: "تفاصيل الدفع تُؤكَّد عبر واتساب قبل إتمام الاشتراك.",
    },
    cta: {
      en: "Choose a package, then contact us to confirm payment",
      ar: "اختر الباقة ثم تواصل معنا لتأكيد طريقة الدفع",
    },
    methods: [
      {
        id: "sham",
        name: { en: "Sham Cash", ar: "شام كاش" },
        image: "/photo/payment-methods/sham-cash-clean.webp",
      },
      {
        id: "cash",
        name: { en: "Cash", ar: "نقدي" },
        image: "/photo/payment-methods/cash.webp",
      },
    ],
  },
};

export const finance = {
  kicker: { en: "Intelligence", ar: "الاستخبارات" },
  title: { en: "Financial analysis", ar: "التحليل المالي" },
  imageAlt: {
    en: "Financial analysis mark",
    ar: "شعار التحليل المالي",
  },
  images: [
    {
      src: portfolioDriveUrl("p47_dashboard_01"),
      alt: {
        en: "Financial analysis dashboard, first board",
        ar: "لوحة تحليل مالي، اللوحة الأولى",
      },
    },
    {
      src: portfolioDriveUrl("p48_dashboard_02"),
      alt: {
        en: "Financial analysis dashboard, second board",
        ar: "لوحة تحليل مالي، اللوحة الثانية",
      },
    },
  ],
  heading: {
    en: "Smart solutions for strategic and financial decision-making",
    ar: "حلولنا الذكية لدعم القرارات الاستراتيجية والمالية",
  },
  body: {
    en: "We are your strategic partner in transforming complex data into smart visual insights that drive your financial and investment decisions. Our primary focus is on data engineering, analysis, and designing interactive dashboards (Excel & Power BI) that turn raw numbers into clear key performance indicators to monitor profits and liquidity. Our services also encompass remote financial management, bookkeeping, and preparing certified balance sheets to ensure comprehensive financial control for your business.",
    ar: "نحن شريككم الاستراتيجي في تحويل البيانات المعقّدة إلى رؤى بصرية ذكية تدعم قراراتكم الاستثمارية والمالية، ونركّز بشكل أساسي على هندسة وتحليل البيانات، وتصميم لوحات المعلومات التفاعلية (Excel & Power BI) التي تحوّل الأرقام إلى مؤشرات أداء واضحة لرصد الأرباح والسيولة. كما تشمل خدماتنا أيضاً إدارة الشؤون المالية عن بُعد، ومسك الدفاتر، وإعداد الميزانيات العمومية المعتمدة لضمان رقابة مالية متكاملة لأعمالكم.",
  },
  offerings: [
    {
      id: "data",
      title: { en: "Data engineering", ar: "هندسة البيانات" },
      body: {
        en: "We structure raw financial records so the story of profit and liquidity is readable.",
        ar: "نُهندس السجلات المالية الخام كي تكون قصة الربح والسيولة مقروءة.",
      },
    },
    {
      id: "dashboards",
      title: { en: "Excel & Power BI", ar: "إكسل وباور بي آي" },
      body: {
        en: "Interactive dashboards that turn figures into clear performance indicators.",
        ar: "لوحات تفاعلية تحوّل الأرقام إلى مؤشرات أداء واضحة.",
      },
    },
    {
      id: "control",
      title: { en: "Remote control", ar: "رقابة عن بُعد" },
      body: {
        en: "Bookkeeping, certified balance sheets, and remote financial management.",
        ar: "مسك دفاتر وميزانيات معتمدة وإدارة مالية عن بُعد.",
      },
    },
  ],
};

export const faq = {
  kicker: { en: "Facts", ar: "حقائق" },
  title: { en: "Questions", ar: "أسئلة شائعة" },
  lead: {
    en: "Visual identity from Damascus, and brand identity for clients in Riyadh.",
    ar: "هوية بصرية من دمشق، وتصميم هوية تجارية لعملاء الرياض.",
  },
  items: [
    {
      id: "who",
      q: {
        en: "What does Home of Creativity do?",
        ar: "ماذا يفعل بيت الإبداع؟",
      },
      a: {
        en: "Home of Creativity is a visual-identity and brand-architecture agency in Al Hamra, Damascus. We also design brand identity for clients in Riyadh.",
        ar: "بيت الإبداع وكالة هوية بصرية وهندسة علامات في الحمراء بدمشق. نصمّم الهوية التجارية لعملاء الرياض أيضاً.",
      },
    },
    {
      id: "services",
      q: {
        en: "What services do you offer?",
        ar: "ما الخدمات التي تقدمونها؟",
      },
      a: {
        en: "Visual identities, social media, account management, marketing, paid ads, exhibitions and conferences, event management, booth design, filming and editing, promo gifts, roadside ads, websites and ecommerce, app design, and financial analysis.",
        ar: "الهويات البصرية، السوشال ميديا، إدارة الحسابات، التسويق، الحملات الممولة، المعارض والمؤتمرات، إدارة الفعاليات، تصميم البوثات، التصوير والمونتاج، الهدايا الدعائية، الإعلانات الطرقية، المواقع والمتاجر الإلكترونية، تصميم التطبيقات، والتحليل المالي.",
      },
    },
    {
      id: "location",
      q: {
        en: "Where is Home of Creativity located?",
        ar: "أين يقع بيت الإبداع؟",
      },
      a: {
        en: "Our office is in Al Hamra, Damascus, Syria — the only physical location, at hoc.agency/locations/damascus/.",
        ar: "مكتبنا في الحمراء، دمشق، سوريا — وهو الموقع المادي الوحيد، في hoc.agency/locations/damascus/.",
      },
    },
    {
      id: "ksa-market",
      q: {
        en: "Does Home of Creativity work with clients in Saudi Arabia?",
        ar: "هل يعمل بيت الإبداع مع عملاء في السعودية؟",
      },
      a: {
        en: "Yes. We work with clients in Saudi Arabia, including Riyadh, as a market we serve; we do not have a physical office in Riyadh.",
        ar: "نعم. نعمل مع عملاء في السعودية بما في ذلك الرياض، وهي سوق نخدمها؛ لا يوجد لدينا مكتب مادي في الرياض.",
      },
    },
    {
      id: "brand-identity",
      q: {
        en: "Does Home of Creativity provide brand identity design?",
        ar: "هل يقدم بيت الإبداع تصميم الهوية التجارية؟",
      },
      a: {
        en: "Yes, as part of the visual identities service. We do not publish a separate brand-strategy product.",
        ar: "نعم، كجزء من خدمة الهويات البصرية. لا نقدّم منتجاً منفصلاً باسم استراتيجية العلامة.",
      },
    },
    {
      id: "websites",
      q: {
        en: "Does Home of Creativity design websites?",
        ar: "هل يصمم بيت الإبداع المواقع؟",
      },
      a: {
        en: "Yes. Websites and ecommerce is one of the published services, alongside app design.",
        ar: "نعم. المواقع والمتاجر الإلكترونية من الخدمات المنشورة، إلى جانب تصميم التطبيقات.",
      },
    },
    {
      id: "social-media",
      q: {
        en: "Does Home of Creativity manage social media?",
        ar: "هل يدير بيت الإبداع حسابات السوشال ميديا؟",
      },
      a: {
        en: "Yes. Social media and account management are both published services.",
        ar: "نعم. السوشال ميديا وإدارة الحسابات من الخدمات المنشورة.",
      },
    },
    {
      id: "start",
      q: {
        en: "How do I start a project?",
        ar: "كيف أبدأ مشروعاً؟",
      },
      a: {
        en: "Start on Telegram or WhatsApp. Home of Creativity sends a quotation; payment details are confirmed on WhatsApp before work begins. There is no self-serve web checkout.",
        ar: "ابدأ عبر تيليجرام أو واتساب. يرسل بيت الإبداع عرض السعر، وتُؤكَّد تفاصيل الدفع عبر واتساب قبل بدء العمل. لا توجد بوابة دفع ذاتية على الموقع.",
      },
    },
    {
      id: "industries",
      q: {
        en: "What industries does Home of Creativity work with?",
        ar: "ما الصناعات التي يعمل معها بيت الإبداع؟",
      },
      a: {
        en: "There is no published industries list. Clients are businesses and organizations in Syria and Saudi Arabia.",
        ar: "لا توجد قائمة صناعات منشورة. العملاء شركات وجهات في سوريا والسعودية.",
      },
    },
  ],
};

export const contact = {
  kicker: { en: "Begin", ar: "ابدأ" },
  title: { en: "Contact us", ar: "تواصل معنا" },
  region: { en: "SYR — KSA", ar: "سوريا — السعودية" },
  lead: {
    en: "Tell us what you are building. We will reply with a precise next step.",
    ar: "أخبرنا بما تبنونه. نرد بخطوة تالية دقيقة.",
  },
  greeting: {
    en: "Hello Home of Creativity",
    ar: "مرحباً هوم أوف كريتيفيتي",
  },
  channels: [
    {
      id: "mobile",
      kind: "tel" as const,
      label: { en: "Mobile", ar: "الجوال" },
      lines: [
        { region: "SYR", text: "+963 968 862 822", digits: "963968862822" },
        { region: "KSA", text: "+966 55 035 0295", digits: "966550350295" },
      ],
    },
    {
      id: "whatsapp",
      kind: "whatsapp" as const,
      label: { en: "WhatsApp", ar: "واتساب" },
      lines: [
        { region: "SYR", text: "+963 954 187 154", digits: "963954187154" },
        { region: "KSA", text: "+966 55 035 0295", digits: "966550350295" },
      ],
    },
    {
      id: "social",
      kind: "link" as const,
      label: { en: "Social media", ar: "السوشال ميديا" },
      lines: [
        { platform: "instagram" as const, text: { en: "Instagram", ar: "إنستغرام" }, href: "https://www.instagram.com/homeofcreativity.sy/" },
        { platform: "facebook" as const, text: { en: "Facebook", ar: "فيسبوك" }, href: "https://www.facebook.com/profile.php?id=61584616932975" },
      ],
    },
    {
      id: "location",
      kind: "text" as const,
      label: { en: "Location", ar: "العنوان" },
      lines: [{ region: "SYR", text: { en: "Damascus, Al Hamra", ar: "دمشق، الحمراء" } }],
    },
  ],
  map: {
    title: { en: "Our location", ar: "موقعنا" },
    open: { en: "Open in Google Maps", ar: "فتح في Google Maps" },
    pageTitle: { en: "Damascus, Al Hamra", ar: "دمشق، الحمراء" },
  },
  offices: [
    {
      id: "syr",
      country: { en: "Syria", ar: "سوريا" },
      city: { en: "Damascus, Al Hamra", ar: "دمشق، الحمراء" },
      phones: ["+963 968 862 822", "+963 954 187 154"],
    },
  ],
  form: {
    name: { en: "Name", ar: "الاسم" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    phone: { en: "Phone", ar: "الهاتف" },
    interest: { en: "Interest", ar: "الاهتمام" },
    interestPlaceholder: { en: "Choose a practice", ar: "اختر ممارسة" },
    message: { en: "Message", ar: "الرسالة" },
    submit: { en: "Send via WhatsApp", ar: "إرسال عبر واتساب" },
    sending: { en: "Opening WhatsApp…", ar: "جارٍ فتح واتساب…" },
    success: {
      en: "WhatsApp is ready with your message. Send it to start the conversation.",
      ar: "واتساب جاهز برسالتك. أرسلها لتبدأ الحوار.",
    },
    error: {
      en: "Please complete the required fields before sending.",
      ar: "أكمل الحقول المطلوبة قبل الإرسال.",
    },
    whatsappTemplate: {
      en: "Hello Home of Creativity, my name is {{name}}. Email: {{email}}. Phone: {{phone}}. Interest: {{interest}}.\n\n{{message}}",
      ar: "مرحباً هوم أوف كريتيفيتي، أنا {{name}}. البريد: {{email}}. الهاتف: {{phone}}. الاهتمام: {{interest}}.\n\n{{message}}",
    },
  },
};

export const notFound = {
  kicker: { en: "Lost path", ar: "مسار ضائع" },
  title: { en: "This page drifted off the map.", ar: "هذه الصفحة خرجت عن الخريطة." },
  line: {
    en: "The road still leads home.",
    ar: "الطريق ما زال يؤدي إلى البيت.",
  },
  home: { en: "Back to home", ar: "العودة إلى الرئيسية" },
};

export const footer = {
  tagline: {
    en: "Brand architects in Damascus — serving clients across Saudi Arabia.",
    ar: "مهندسو هوية في دمشق، نخدم عملاء في السعودية.",
  },
  explore: { en: "Explore", ar: "استكشف" },
  reach: { en: "Reach us", ar: "تواصل معنا" },
  rights: {
    en: "© 2026",
    ar: "© 2026",
  },
};

export const WHATSAPP_NUMBER = "963954187154";
