import type { Copy } from "./i18n";
import { emails, officesSentence, whatsappDigits } from "./offices";
import { portfolioDriveUrl } from "./portfolio-drive-images";

export const brand = {
  name: "Home of Creativity",
  of: "of",
  mark: "S",
};

export const nav = {
  home: { en: "Home", ar: "الرئيسية" },
  about: { en: "About", ar: "من نحن" },
  services: { en: "Services", ar: "خدماتنا" },
  clientLogos: { en: "Partners", ar: "شركاء النجاح" },
  voices: { en: "Selected work", ar: "من أعمالنا" },
  clients: { en: "Strategic partnership", ar: "رحلة الشراكة" },
  clientStory: { en: "A client story", ar: "قصة عميل" },
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
  kicker: { en: "Strategy. Invention. Leadership.", ar: "استراتيجية. ابتكار. ريادة." },
  accentLead: { en: "Ideas you can see.", ar: "أفكار تُرى." },
  accentWord: { en: "Identities you live.", ar: "هويات تُعاش." },
  titleLead: { en: "We architect", ar: "نُهندس" },
  titleAccent: { en: "commercial brands", ar: "العلامات التجارية" },
  line: {
    en: "We translate your ambitious goals into a distinctive reality. We blend art with marketing intelligence to invent identities that live, express your distinction, and lift your work toward the world's horizons.",
    ar: "نترجم أهدافك الطموحة إلى واقع مُتميز .. نمزج الفن بالذكاء التسويقي لنبتكر هويات تنبض بالحياة، تعبر عن تميزك، وتحلق بأعمالك نحو آفاق العالم.",
  },
  primary: { en: "Explore our work", ar: "اكتشف أعمالنا" },
  scroll: { en: "Scroll to explore", ar: "مرّر لاستكشاف المزيد" },
};

export const about = {
  kicker: { en: "Home of Creativity", ar: "بيت الإبداع" },
  title: { en: "About us", ar: "من نحن" },
  readMore: { en: "More about Home of Creativity", ar: "المزيد عن بيت الإبداع" },
  body: {
    en: "Behind every distinctive brand is an ally who refuses the superficial. Some shout in the market to be heard; others arrive and everyone listens. At Home of Creativity (HOC), we build the second kind. Our aim is not to sell you images to post or view-counts without value. We take your brand out of the crowd, distinguish it by what already sets it apart, and strengthen your commercial identity with advanced marketing intelligence. From our offices in Damascus (Al Hamra), Riyadh (Al Murabba) and the UAE, we came to be part of your entity — together we turn the language of numbers and facts into a distinctive reality. Our mission is not to find your brand a seat among competitors, but to build it a distinctive entity that becomes the reference that sets the rules.",
    ar: "وراء كل علامة تجارية مُميزة، حليف لا يقبل بالسطحية. هناك من يصرخ في السوق ليُسمع، وهناك من يحضُر فيُنصت له الجميع.. في بيت الإبداع HOC، نتقن صناعة النوع الثاني. ليس هدفنا أن نبيعكم صوراً تُنشر أو أرقام مشاهدات بلا فائدة، نأخذ علامتكم من زحام السوق، نُميزها بما تمتاز به، ونعزز هويتكم التجارية بذكاء تسويقي مُتطور. من مكاتبنا في دمشق (الحمراء) والرياض (المربّع) والإمارات، أتينا لنكون جزءاً من كيانكم، لنحوّل معاً لغة الأرقام والحقائق إلى واقع مميز. مهمتنا أن لا نبحث لعلامتك عن مقعد بين المنافسين، بل نبني لها كياناً مميزاً يجعلها المرجع الذي يُملي قواعد اللعبة.",
  },
  imageAlt: {
    en: "A lone figure at the far end of a vast, geometrically lit hall",
    ar: "شخص وحيد في نهاية قاعة هندسية واسعة مضاءة",
  },
  vision: {
    label: { en: "Vision", ar: "الرؤية" },
    title: { en: "Our Vision", ar: "رؤيتنا" },
    image: "/photo/vision-hummingbird.webp?v=20260930",
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
    image: "/photo/mission-hummingbird.webp?v=20260930",
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
    en: `Home of Creativity (HOC) — بيت الإبداع — is a creative and branding agency with offices in ${officesSentence("en")}. It provides visual identity, marketing, social media, websites, events, and related creative services.`,
    ar: `بيت الإبداع (Home of Creativity — HOC) وكالة إبداع وهوية بمكاتبها في ${officesSentence("ar")}. تقدم الهوية البصرية والتسويق والسوشال ميديا والمواقع والفعاليات وخدمات إبداعية مرتبطة بها.`,
  },
  body: {
    en: `Home of Creativity (HOC) — بيت الإبداع — is a creative and branding agency with offices in ${officesSentence("en")}. The published practices are visual identities, social media, account management, marketing, paid ads, exhibitions and conferences, event management, booth design, filming and editing, promotional gifts, roadside ads, websites and ecommerce, app design, and financial analysis. A project starts on Telegram or WhatsApp. HOC sends a quotation, and payment details are confirmed on WhatsApp before work begins. Subscription packages and their monthly prices are published on the pricing page. There is no self-serve checkout. The United Arab Emirates office is named; its city and street address are not published yet.`,
    ar: `بيت الإبداع (Home of Creativity — HOC) وكالة إبداع وهوية، مكاتبها في ${officesSentence("ar")}. الممارسات المنشورة: الهويات البصرية، السوشال ميديا، إدارة الحسابات، التسويق، الحملات الممولة، المعارض والمؤتمرات، إدارة الفعاليات، تصميم البوثات، التصوير والمونتاج، الهدايا الدعائية، الإعلانات الطرقية، المواقع والمتاجر، تصميم التطبيقات، والتحليل المالي. يبدأ المشروع عبر تيليجرام أو واتساب، ويُرسل عرض سعر وتُؤكد تفاصيل الدفع قبل بدء العمل. باقات الاشتراك وأسعارها الشهرية منشورة في صفحة الأسعار. لا يوجد دفع ذاتي على الموقع. مكتب الإمارات مذكور بالاسم، ومدينته وعنوانه غير منشورين بعد.`,
  },
  officeLabel: { en: "Offices", ar: "المكاتب" },
  officeValue: {
    en: officesSentence("en"),
    ar: officesSentence("ar"),
  },
  marketLabel: { en: "Markets served", ar: "الأسواق المخدومة" },
  marketValue: { en: "Syria, Saudi Arabia and the United Arab Emirates", ar: "سوريا والسعودية والإمارات العربية المتحدة" },
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
    en: "Several creative arms. One strategic mind.",
    ar: "أذرع إبداعية متعددة.. وعقل استراتيجي واحد.",
  },
  brandingLink: {
    en: "Marketing, advertising, and publicity services",
    ar: "خدمات التسويق والدعاية والإعلان",
  },
  items: [
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
      id: "outdoor",
      en: "Roadside Ads",
      ar: "إعلانات طرقية",
      tone: "blue" as const,
    },
    {
      id: "gifts",
      en: "Promo Gifts",
      ar: "الهدايا الدعائية",
      tone: "orange" as const,
    },
    {
      id: "film",
      en: "Filming & Editing",
      ar: "تصوير ومونتاج",
      tone: "orange" as const,
    },
    {
      id: "identity",
      en: "Visual Identities",
      ar: "الهويات البصرية",
      tone: "blue" as const,
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

export { serviceDetails, type ServiceDetail } from "./service-details";

export const servicesPage = {
  kicker: { en: "Practices", ar: "ممارساتنا" },
  title: { en: "Our services", ar: "خدماتنا" },
  lead: {
    en: "Fourteen practices under one strategic mind. Each has its own page: what it covers, who it is for, and how to start.",
    ar: "أربع عشرة ممارسة يجمعها عقل استراتيجي واحد. لكل ممارسة صفحتها: ماذا تشمل، لمن هي، وكيف تبدأ.",
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
  title: { en: "Branding Agency in Damascus and Riyadh", ar: "وكالة هوية في دمشق والرياض" },
  metaTitle: "Branding Agency in Damascus & Riyadh | Home of Creativity",
  metaDescription: {
    en: "What branding means at Home of Creativity (HOC), what you can hire and who it is for. Offices in Damascus, Riyadh and the UAE; package prices are published.",
    ar: "ماذا تعني الهوية التجارية عند بيت الإبداع HOC، وما الذي يمكن طلبه، ولمن هي. مكاتبنا في دمشق والرياض والإمارات، وأسعار الباقات منشورة. ابدأ عبر واتساب.",
  },
  lead: {
    en: "Home of Creativity (HOC) is a branding and visual identity agency with offices in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.",
    ar: "بيت الإبداع (Home of Creativity — HOC) وكالة هوية بصرية بمكاتب في دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة.",
  },
  sections: [
    {
      heading: { en: "What branding means here", ar: "ماذا تعني الهوية هنا" },
      body: {
        en: "On this site, branding means the published creative practices that make a business recognizable, starting with visual identity: a mark, colors, typography, and applications. Brand strategy is not a separate practice in the catalog; what each subscription package includes is published on the pricing page. The offices are in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.",
        ar: "في هذا الموقع، الهوية تعني الممارسات الإبداعية المنشورة التي تجعل العمل قابلاً للتعرّف، وتبدأ بالهوية البصرية: الشعار والألوان والخطوط والتطبيقات. استراتيجية العلامة ليست ممارسة منفصلة في الفهرس، وما تشمله كل باقة اشتراك منشور في صفحة الأسعار. مكاتبنا في دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة.",
      },
    },
    {
      heading: { en: "What you can hire", ar: "ما الذي يمكن طلبه" },
      body: {
        en: "The identity practice you hire is visual identities. Each of the fourteen practices has its own page, including social media, websites and ecommerce, marketing, paid ads, event management, and filming and editing — linked below. Subscription packages and their monthly prices are published on the pricing page; the scope of a one-off project is confirmed in the quotation.",
        ar: "الممارسة التي تُطلب للهوية هي الهويات البصرية. لكل ممارسة من الممارسات الأربع عشرة صفحتها، ومنها السوشال ميديا والمواقع والمتاجر والتسويق والحملات الممولة وإدارة الفعاليات والتصوير والمونتاج، والروابط أدناه. باقات الاشتراك وأسعارها الشهرية منشورة في صفحة الأسعار، ويُؤكَّد نطاق المشروع المنفرد في عرض السعر.",
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
        en: "At Home of Creativity, it means designing the visual identity and the other creative practices published on hoc.agency, from our offices in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.",
        ar: "عند بيت الإبداع، تعني تصميم الهوية البصرية وبقية الممارسات الإبداعية المنشورة على hoc.agency، من مكاتبنا في دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة.",
      },
    },
    {
      q: { en: "Does HOC provide branding in Damascus?", ar: "هل يقدّم بيت الإبداع الهوية في دمشق؟" },
      a: {
        en: "Yes. HOC has an office in Al Hamra, Damascus, alongside its offices in Riyadh (Al Murabaa) and the United Arab Emirates.",
        ar: "نعم. لبيت الإبداع مكتب في الحمراء بدمشق، إلى جانب مكتبيه في الرياض (المربّع) والإمارات العربية المتحدة.",
      },
    },
    {
      q: { en: "Can HOC work with clients outside Syria?", ar: "هل يعمل بيت الإبداع مع عملاء خارج سوريا؟" },
      a: {
        en: "Yes. HOC works with clients in Saudi Arabia and has an office in Riyadh (Al Murabaa).",
        ar: "نعم. يعمل بيت الإبداع مع عملاء في السعودية، وله مكتب في الرياض (المربّع).",
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
    { href: "services/social-media", label: { en: "social media", ar: "السوشال ميديا" } },
    { href: "services/websites-ecommerce", label: { en: "websites and ecommerce", ar: "المواقع والمتاجر" } },
    { href: "services/marketing", label: { en: "marketing", ar: "التسويق" } },
    { href: "services/paid-ads", label: { en: "paid ads", ar: "الحملات الممولة" } },
    { href: "services/event-management", label: { en: "event management", ar: "إدارة الفعاليات" } },
    { href: "services/filming-editing", label: { en: "filming and editing", ar: "التصوير والمونتاج" } },
    { href: "pricing", label: { en: "packages and prices", ar: "الباقات والأسعار" } },
    { href: "locations/damascus", label: { en: "the Damascus office", ar: "مكتب دمشق" } },
    { href: "locations/riyadh", label: { en: "the Riyadh office", ar: "مكتب الرياض" } },
  ],
};

/** Explains logo, visual identity, and brand identity without adding a new practice. */
export const brandIdentityPage: TopicPageCopy = {
  title: { en: "Brand Identity Services in Damascus and Riyadh", ar: "خدمات الهوية التجارية في دمشق والرياض" },
  metaTitle: "Brand Identity Services in Damascus & Riyadh | Home of Creativity",
  metaDescription: {
    en: "A logo, a visual identity and a brand identity are not the same thing. How Home of Creativity (HOC) designs the system, from Damascus, Riyadh and the UAE.",
    ar: "الفرق بين الشعار والهوية البصرية والهوية التجارية، وكيف يصمم بيت الإبداع HOC نظام هويتك من مكاتبه في دمشق والرياض والإمارات. ابدأ مشروعك عبر واتساب.",
  },
  lead: {
    en: "A logo, a visual identity, and a brand identity are related, and they are not the same thing. Home of Creativity (HOC), with offices in Damascus, Riyadh and the United Arab Emirates, publishes visual identities as the practice you hire for this work.",
    ar: "الشعار والهوية البصرية والهوية التجارية مفاهيم مرتبطة، وليست شيئاً واحداً. ينشر بيت الإبداع (HOC)، بمكاتبه في دمشق والرياض والإمارات العربية المتحدة، الهويات البصرية بوصفها الممارسة التي تُطلب لهذا العمل.",
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
        en: "Brand identity is the broader way a business is recognized. The visual identity is the visual part of that recognition. Brand strategy is not a separate practice in the catalog; what each subscription package includes, with its monthly price, is published on the pricing page. The offices are in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.",
        ar: "الهوية التجارية هي الصورة الأوسع التي يُعرَف بها العمل. الهوية البصرية هي الجزء البصري من ذلك التعرّف. استراتيجية العلامة ليست ممارسة منفصلة في الفهرس، وما تشمله كل باقة اشتراك مع سعرها الشهري منشور في صفحة الأسعار. مكاتبنا في دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة.",
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
        en: "Not as a separate practice: brand strategy is not one of the fourteen published practices, and the published identity practice is visual identities. What each subscription package includes is listed on the pricing page.",
        ar: "ليس كممارسة منفصلة: استراتيجية العلامة ليست من الممارسات الأربع عشرة المنشورة، وممارسة الهوية المنشورة هي الهويات البصرية. ما تشمله كل باقة اشتراك مذكور في صفحة الأسعار.",
      },
    },
    {
      q: { en: "Where is this work based?", ar: "من أين يُدار هذا العمل؟" },
      a: {
        en: "From our offices in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.",
        ar: "من مكاتبنا في دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة.",
      },
    },
  ],
  links: [
    { href: "services/branding", label: { en: "branding services in Damascus", ar: "خدمات الهوية في دمشق" } },
    { href: "services/visual-identity", label: { en: "visual identity design services", ar: "تصميم الهوية البصرية" } },
    { href: "pricing", label: { en: "packages and prices", ar: "الباقات والأسعار" } },
    { href: "locations/damascus", label: { en: "the Damascus office", ar: "مكتب دمشق" } },
    { href: "locations/riyadh", label: { en: "the Riyadh office", ar: "مكتب الرياض" } },
  ],
};

/** Copy for `/locations/{slug}/`, one entry per published office in `lib/offices.ts`. */
export const officePages = {
  damascus: {
    title: { en: "Home of Creativity in Damascus", ar: "بيت الإبداع في دمشق" },
    metaTitle: "Home of Creativity in Damascus, Al Hamra | HOC",
    metaDescription: {
      en: "The Home of Creativity (HOC) office in Al Hamra, Damascus: map, mobile, WhatsApp and landline numbers, and the identity and marketing services that start here.",
      ar: "مكتب بيت الإبداع HOC في الحمراء بدمشق: الخريطة وأرقام الجوال والواتساب والهاتف الأرضي، وخدمات الهوية البصرية والتسويق التي تبدأ من هنا. تواصل معنا الآن.",
    },
    lead: {
      en: "Home of Creativity (HOC) — بيت الإبداع — has an office in Al Hamra, Damascus, Syria. Branding and visual identity work starts from this office, alongside our offices in Riyadh (Al Murabaa) and the United Arab Emirates.",
      ar: "لبيت الإبداع (Home of Creativity — HOC) مكتب في الحمراء بدمشق، سوريا. ينطلق من هذا المكتب عمل الهوية والهوية البصرية، إلى جانب مكتبينا في الرياض (المربّع) والإمارات العربية المتحدة.",
    },
    servicesLabel: { en: "Services from Damascus", ar: "خدمات من دمشق" },
  },
  riyadh: {
    title: { en: "Home of Creativity in Riyadh", ar: "بيت الإبداع في الرياض" },
    metaTitle: "Home of Creativity in Riyadh, Al Murabaa | HOC",
    metaDescription: {
      en: "The Home of Creativity (HOC) office in Al Murabaa, Riyadh: mobile, WhatsApp and landline numbers, plus identity, marketing and social media services in Saudi Arabia.",
      ar: "مكتب بيت الإبداع HOC في المربّع بالرياض: أرقام الجوال والواتساب والهاتف الأرضي، وخدمات الهوية البصرية والتسويق والسوشال ميديا لعملائنا في السعودية.",
    },
    // TODO(riyadh-copy): an optional line on what work runs from Riyadh — NEEDS CONTENT from HOC.
    lead: {
      en: "Home of Creativity (HOC) — بيت الإبداع — has an office in Al Murabaa, Riyadh, Saudi Arabia, alongside our offices in Damascus (Al Hamra) and the United Arab Emirates. Clients in Saudi Arabia can reach the office on the numbers below.",
      ar: "لبيت الإبداع (Home of Creativity — HOC) مكتب في المربّع بالرياض، السعودية، إلى جانب مكتبينا في دمشق (الحمراء) والإمارات العربية المتحدة. يمكن لعملائنا في السعودية التواصل مع المكتب على الأرقام أدناه.",
    },
    servicesLabel: { en: "Our services", ar: "خدماتنا" },
  },
  labels: {
    contact: { en: "Contact", ar: "التواصل" },
    address: { en: "Address", ar: "العنوان" },
    offices: { en: "All offices", ar: "كل المكاتب" },
    map: { en: "Open in Google Maps", ar: "فتح في Google Maps" },
  },
};

export const showcaseClients = {
  kicker: { en: "Who we serve", ar: "من نخدم" },
  title: { en: "Partners in success", ar: "شركاء النجاح" },
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

export const clientVoices = {
  kicker: { en: "Selected work", ar: "من أعمالنا" },
  title: { en: "Brands we worked with", ar: "علامات عملنا معها" },
  lead: {
    en: "A few brands Home of Creativity has worked with.",
    ar: "علامات عمل معها بيت الإبداع.",
  },
  role: { en: "Partner", ar: "شريك" },
  items: [
    {
      id: "abu-shaker",
      /** `id` in `GET /portfolio/clients` — the logo comes from the dashboard. */
      clientId: 1,
      aliases: ["abo shakir", "abu shaker", "أبو شاكر"],
      name: { en: "Abu Shaker", ar: "أبو شاكر" },
      quote: {
        en: "From the first brief to the final files, the path was clear. The identity Home of Creativity drew is now the face we introduce ourselves with.",
        ar: "من أول موجز حتى الملفات النهائية، كان المسار واضحاً. الهوية التي رسمها بيت الإبداع صارت الوجه الذي نعرّف به أنفسنا.",
      },
    },
    {
      id: "jaddu-shaker",
      clientId: 8,
      aliases: ["جدو شاكر", "jaddu shaker"],
      name: { en: "Jaddu Shaker", ar: "جدو شاكر" },
      quote: {
        en: "We wanted a presence that feels like home: warm and familiar, without noise. Home of Creativity understood that from the first session.",
        ar: "أردنا حضوراً يشبه البيت: دافئاً ومألوفاً، بلا ضجيج. بيت الإبداع فهم ذلك من الجلسة الأولى.",
      },
    },
    {
      id: "raheel-roaa",
      clientId: 2,
      aliases: ["raheel", "roaa", "رحيل", "رؤى"],
      name: { en: "Raheel & Roaa", ar: "رحيل ورؤى" },
      quote: {
        en: "The name carries a meaning, and the design carried it as it is. The work stayed consistent across social and print.",
        ar: "الاسم يحمل معنى، والتصميم حمله كما هو. العمل جاء متّسقاً على السوشال وعلى المواد المطبوعة.",
      },
    },
  ],
};

export const clientStory = {
  kicker: { en: "A client story", ar: "قصة عميل" },
  title: { en: "Abu Shaker and Jaddu Shaker", ar: "أبو شاكر وجدو شاكر" },
  lead: {
    en: "A partnership that lasts.",
    ar: "شراكة تدوم.",
  },
  body: {
    en: "Abu Shaker and Jaddu Shaker are two of the voices that stay with Home of Creativity. This page keeps that relationship in view — not as a campaign, but as a partnership that holds.",
    ar: "أبو شاكر وجدو شاكر صوتان يبقيان مع بيت الإبداع، وهذه الصفحة تُبقي علاقتهما ظاهرة: ليست حملة عابرة، بل شراكة تصمد.",
  },
};

export const clientJourney = {
  kicker: { en: "Process", ar: "العملية" },
  title: { en: "The strategic partnership journey", ar: "رحلة الشراكة الاستراتيجية" },
  lead: {
    en: "From your first message until the vision is complete, your team stays informed — without chaos.",
    ar: "من رسالتك الأولى وحتى اكتمال الرؤية، فريقك على اطلاع دائم بلا عشوائية",
  },
  steps: [
    {
      id: "start",
      image: "/photo/journey-launch.webp?v=20261004b",
      imageAlt: {
        en: "Two people reviewing a storyboard together at the studio table",
        ar: "شخصان يراجعان لوحة القصة معاً على طاولة الاستوديو",
      },
      title: { en: "Launch and agreement", ar: "الانطلاق والاتفاق" },
      body: {
        en: "Share your project on Telegram or WhatsApp in one step. As soon as we receive your vision — text or a file — our team analyzes the requirements at once, and you receive a clear PDF quotation: no chaos, no wasted time.",
        ar: "شاركنا مشروعك عبر تيليجرام أو واتساب بخطوة واحدة .. بمجرد استلامنا لرؤيتك (نصاً أو ملفاً)، يحلل فريقنا المتطلبات فوراً، تستلم عرض سعر واضح بصيغة PDF؛ بلا عشوائية أو وقت مهدور.",
      },
    },
    {
      id: "build",
      image: "/photo/journey-build.webp?v=20261004b",
      imageAlt: {
        en: "A camera operator filming a product shot in the studio",
        ar: "مصوّر يتابع لقطة منتج داخل الاستوديو",
      },
      title: { en: "Approval and engineering the work", ar: "الاعتماد وهندسة العمل" },
      body: {
        en: "Once you approve the quotation and complete payment securely in the same conversation, the task moves at once to the internal workshops. Marketing, content, and design teams work through our systems to engineer your entity with care.",
        ar: "فور اعتمادك للعرض وإتمام الإجراءات المالية بأمان في نفس المحادثة، تنتقل المهمة فوراً إلى ورشات العمل الداخلية. هنا، تتضافر جهود فرق التسويق، المحتوى والتصميم عبر أنظمتنا الخاصة لهندسة كيانك بدقة وعناية.",
      },
    },
    {
      id: "handoff",
      image: "/photo/journey-handoff.webp?v=20261004b",
      imageAlt: {
        en: "The team watching the finished film together",
        ar: "الفريق يشاهد العمل النهائي معاً",
      },
      title: { en: "Delivery and the start of the journey", ar: "التسليم وبداية الرحلة" },
      body: {
        en: "You receive the final outputs on Telegram, ready to launch. We handle any requested revisions with full flexibility so the work matches the standard we aim for. We also welcome direct contact through our phone numbers.",
        ar: "تتلقى المخرجات النهائية عبر تيليجرام لتكون جاهزة للانطلاق. وندير أي تعديلات مطلوبة بمرونة تامة لضمان مطابقة العمل لمعايير الصدارة التي نهدف لها.. كما أننا نرحب بتواصلكم المباشر عبر أرقام التواصل.",
      },
    },
  ],
};

export const reels = {
  kicker: { en: "In motion", ar: "بالحركة" },
  title: { en: "Digital presence and the power of a moving brand", ar: "الظهور الرقمي.. وقوة العلامة المتحركة" },
  lead: {
    en: "We believe a brand's strength is in how continuously it appears. We focused on reels and short videos as a media front — and we put that craft in your hands so you can build your brand's entity and take the scene yourself.",
    ar: "إيماناً منا بأن قوة العلامة تكمن في استمرارية ظهورها، ركزنا على الريلز والفيديوهات القصيرة كواجهة إعلامية .. وضعنا خبراتنا بين يديك لنبني كيان علامتك التجارية وتتصدر المشهد بنفسك.",
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
  kicker: { en: "HOC community", ar: "مجتمع HOC" },
  title: { en: "The pulse of creativity, and brand architecture up close", ar: "نبض الإبداع.. وهندسة العلامات عن قرب" },
  lead: {
    en: "Browse our accounts and see how we strip ideas of chaos to make content that holds the eye and builds distinction.",
    ar: "تصفح حساباتنا واستكشف كيف نجرّد الأفكار من العشوائية لنصنع محتوى يخطف الأنظار ويصنع التميز...",
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
  kicker: { en: "Impact on the ground", ar: "الأثر على أرض الواقع" },
  title: { en: "Our projects beyond the scene", ar: "مشاريعنا ما وراء المشهد" },
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
  items: [] as {
    id: string;
    filter: Copy;
    title: Copy;
    body: Copy;
    images: { src: string; alt: Copy; featured?: boolean }[];
  }[],
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
  back: { en: "Back to projects", ar: "العودة للمشاريع" },
  visitWebsite: { en: "Visit website", ar: "زيارة الموقع" },
  gallery: { en: "Gallery", ar: "معرض الصور" },
  close: { en: "Close", ar: "إغلاق" },
  previous: { en: "Previous", ar: "السابق" },
  next: { en: "Next", ar: "التالي" },
  related: { en: "Related projects", ar: "مشاريع مرتبطة" },
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
  salesEmail: {
    label: { en: "Sales", ar: "المبيعات" },
    address: "sales@hoc.agency",
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
  kicker: { en: "The deeper dimension of the commercial brand", ar: "البُعد العميق للعلامة التجارية" },
  title: { en: "Financial analysis for smart, decisive leadership", ar: "التحليل المالي .. لقيادة ذكية وحاسمة" },
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
    en: "Smart solutions for strategic and financial decisions",
    ar: "حلول ذكية لدعم القرارات الاستراتيجية والمالية",
  },
  body: {
    en: "True creativity is incomplete without a clear financial foundation. At HOC we do not see numbers as mere accounts, but as a roadmap that leads the entity toward leadership. We translate data chaos into an interactive visual scene — performance interfaces that place the financial truth in your hands, so strategic decisions are built on the language of numbers.",
    ar: "الإبداع الحقيقي لا يكتمل دون أساس مالي واضح. في (HOC)، لا نرى الأرقام كمجرد حسابات، بل كخريطة طريق تقود الكيان نحو الريادة. نترجم فوضى البيانات إلى مشهد بصري تفاعلي بواجهات أداء تفاعلية تضع الحقيقة المالية بين يديك، لتكون القرارات الاستراتيجية مبنية على لغة الأرقام.",
  },
  offerings: [
    {
      id: "data",
      title: { en: "Engineering financial certainty", ar: "هندسة اليقين المالي" },
      body: {
        en: "We recast raw records and data, strip them of complexity, and draw from them a clear story of liquidity and profit on which the next steps are built.",
        ar: "نعيد صياغة السجلات والبيانات الخام، لنجردها من التعقيد ونستخرج منها قصة واضحة للسيولة والأرباح يؤسس عليها للخطوات القادمة.",
      },
    },
    {
      id: "dashboards",
      title: { en: "Strategic command screens", ar: "شاشات القيادة الاستراتيجية" },
      body: {
        en: "We design and invent visual, dynamic dashboards that put the analysis on a single screen.",
        ar: "نصمم ونبتكر لوحات تحكم مرئية وديناميكية (Dashboards) تضع التحليل في شاشة واحدة.",
      },
    },
    {
      id: "control",
      title: { en: "Financial immunity", ar: "الحصانة المالية" },
      body: {
        en: "Strict oversight that gives your entity operational and financial stability and integrated protection against market swings.",
        ar: "رقابة صارمة تضمن لكيانك استقراراً عملياً ومالياً وحماية متكاملة في وجه تقلبات السوق.",
      },
    },
  ],
};

export const faq = {
  kicker: { en: "Facts", ar: "حقائق" },
  title: { en: "Questions", ar: "أسئلة شائعة" },
  lead: {
    en: "Visual identity and marketing from our offices in Damascus, Riyadh and the United Arab Emirates.",
    ar: "هوية بصرية وتسويق من مكاتبنا في دمشق والرياض والإمارات العربية المتحدة.",
  },
  items: [
    {
      id: "who",
      q: {
        en: "What does Home of Creativity do?",
        ar: "ماذا يفعل بيت الإبداع؟",
      },
      a: {
        en: "Home of Creativity is a visual-identity and brand-architecture agency with offices in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates.",
        ar: "بيت الإبداع وكالة هوية بصرية وهندسة علامات، مكاتبها في دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة.",
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
        en: "Our offices are in Damascus (Al Hamra), Riyadh (Al Murabaa) and the United Arab Emirates. The office pages are at hoc.agency/locations/.",
        ar: "مكاتبنا في دمشق (الحمراء) والرياض (المربّع) والإمارات العربية المتحدة. صفحات المكاتب في hoc.agency/locations/.",
      },
    },
    {
      id: "ksa-market",
      q: {
        en: "Does Home of Creativity work with clients in Saudi Arabia?",
        ar: "هل يعمل بيت الإبداع مع عملاء في السعودية؟",
      },
      a: {
        en: "Yes. We have an office in Riyadh (Al Murabaa) and work with clients in Syria and Saudi Arabia.",
        ar: "نعم. لدينا مكتب في الرياض (المربّع)، ونعمل مع عملاء في سوريا والسعودية.",
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
        en: "Start on Telegram or WhatsApp. Home of Creativity sends a quotation; payment details are confirmed on WhatsApp before work begins. Subscription package prices are published at hoc.agency/pricing/. There is no self-serve web checkout.",
        ar: "ابدأ عبر تيليجرام أو واتساب. يرسل بيت الإبداع عرض السعر، وتُؤكَّد تفاصيل الدفع عبر واتساب قبل بدء العمل. أسعار باقات الاشتراك منشورة في hoc.agency/pricing/. لا توجد بوابة دفع ذاتية على الموقع.",
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
  region: { en: "SYR — KSA — UAE", ar: "سوريا — السعودية — الإمارات" },
  lead: {
    en: "This is where we begin engineering the impact. Share the details of your project.",
    ar: "من هنا نبدأ هندسة الأثر.. شاركنا تفاصيل مشروعك.",
  },
  greeting: {
    en: "Hello Home of Creativity",
    ar: "مرحباً هوم أوف كريتيفيتي",
  },
  map: {
    title: { en: "Our location", ar: "موقعنا" },
    open: { en: "Open in Google Maps", ar: "فتح في Google Maps" },
    pageTitle: { en: "Damascus, Al Hamra", ar: "دمشق، الحمراء" },
  },
  /** Offices, phone numbers and emails live in `lib/offices.ts` (one source of truth). */
  emails,
  form: {
    name: { en: "Name", ar: "الاسم" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    phone: { en: "Phone", ar: "الهاتف" },
    interest: { en: "Interest", ar: "الاهتمام" },
    interestPlaceholder: { en: "Choose a practice", ar: "اختر ممارسة" },
    supportInterest: { en: "Technical issue or support", ar: "مشكلة تقنية أو دعم" },
    message: { en: "Message", ar: "الرسالة" },
    submit: { en: "Send", ar: "إرسال" },
    sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
    successSupport: {
      en: "Your message was sent.",
      ar: "تم إرسال الرسالة بنجاح.",
    },
    successSales: {
      en: "Your message was sent.",
      ar: "تم إرسال الرسالة بنجاح.",
    },
    error: {
      en: "Please complete the required fields before sending.",
      ar: "أكمل الحقول المطلوبة قبل الإرسال.",
    },
    nameRequired: { en: "Enter your name.", ar: "أدخل الاسم." },
    emailRequired: { en: "Enter your email.", ar: "أدخل البريد الإلكتروني." },
    emailInvalid: { en: "Enter a valid email address.", ar: "البريد الإلكتروني غير صالح" },
    messageRequired: { en: "Enter a message.", ar: "أدخل الرسالة." },
    errorSend: {
      en: "The message could not be sent. Try again in a moment.",
      ar: "تعذر إرسال الرسالة. حاول مرة أخرى بعد لحظات.",
    },
    errorConfig: {
      en: "Email sending is not ready on the server yet.",
      ar: "إرسال البريد غير جاهز على السيرفر بعد.",
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
  services: { en: "Our services", ar: "خدماتنا" },
  contact: { en: "Contact us", ar: "تواصل معنا" },
};

export const footer = {
  tagline: {
    en: "Brand architects with offices in Damascus, Riyadh and the United Arab Emirates.",
    ar: "مهندسو هوية بمكاتب في دمشق والرياض والإمارات العربية المتحدة.",
  },
  explore: { en: "Explore", ar: "استكشف" },
  reach: { en: "Reach us", ar: "تواصل معنا" },
  rights: {
    en: "© 2026",
    ar: "© 2026",
  },
};

/** The Syrian WhatsApp number, the default for `whatsappHref`. */
export const WHATSAPP_NUMBER = whatsappDigits("syr");
