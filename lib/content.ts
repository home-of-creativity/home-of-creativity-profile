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
  projects: { en: "Projects", ar: "المشاريع" },
  finance: { en: "Finance", ar: "التحليل المالي" },
  pricing: { en: "Pricing", ar: "الأسعار" },
  contact: { en: "Contact us", ar: "تواصل معنا" },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  language: { en: "Language", ar: "اللغة" },
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
  kicker: { en: "House of Creativity", ar: "بيت الإبداع" },
  title: { en: "About us", ar: "من نحن" },
  body: {
    en: "Forget aesthetic fluff and sweet talk. We are not your typical agency; we are brand architects. We dissect your business, eliminate the clutter, and rebuild it into a powerhouse driven by hard numbers and defined by visual prestige. In an era of endless noise and generic content, we stand for Premium Minimalism and direct, human-centric marketing. We do not yell to be seen. We strategically position your brand so the industry leans in and listens.",
    ar: "نحن لسنا وكالة إعلانات أخرى تبيعك تصاميم جميلة ومنمّقة وكلاماً معسولاً. نحن مهندسو هوية تجارية. نأخذ عملك لنجرّده من العشوائية ونعيده إلى السوق كعلامة تجارية رائدة ذات هيبة بصرية مبنية على أرقام وحقائق صلبة لا تقبل الجدل. في عالم مليء بالضجيج والمحتوى المعلّب، نحن نؤمن بالفخامة البسيطة Premium Minimalism والتسويق الإنساني المباشر. لا نصرخ لجذب الانتباه، بل نصنع لعملائنا تموضعاً ذكياً يجعل السوق ينصت إليهم باحترام.",
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
      en: "At Home of Creativity, we craft digital concepts that defy the ordinary. We architect world-class ideas that elevate our partners’ global positioning, forging enduring bridges of trust and belonging that cross borders and markets. Together, we shape a more imaginative tomorrow.",
      ar: "في بيت الإبداع، نصمم المفاهيم الرقمية التي تتحدى المألوف؛ نُهيكل الأفكار بحرفية عالمية تعزز تموضع شركائنا عالمياً، وتخلق جسوراً متينة من الثقة والانتماء العابر للحدود والأسواق، نعمل معاً من أجل غدٍ أكثر إبداعاً.",
    },
    accents: {
      en: ["defy the ordinary", "world-class", "bridges of trust"],
      ar: ["تتحدى المألوف", "حرفية عالمية", "جسوراً متينة"],
    },
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
      ar: "السوشل ميديا",
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
        ar: "تصلك عرض سعر بصيغة PDF مع خيار الموافقة أو الرفض — بلا تخمين أو مراسلات عشوائية.",
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
      title: { en: "Social, film & campaigns", ar: "السوشل والمحتوى والحملات" },
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

export const projectDetail = {
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
      ar: "اسم الشركة أو صفحة السوشيال ميديا",
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
    en: "Financial growth dashboard, analysis papers, and Earth at night",
    ar: "لوحة نمو مالي وأوراق تحليل والأرض ليلاً",
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
        { platform: "instagram" as const, text: { en: "Instagram", ar: "إنستغرام" }, href: "https://www.instagram.com/homeofcreativity/" },
        { platform: "facebook" as const, text: { en: "Facebook", ar: "فيسبوك" }, href: "https://www.facebook.com/homeofcreativity" },
      ],
    },
    {
      id: "location",
      kind: "text" as const,
      label: { en: "Location", ar: "العنوان" },
      lines: [
        { region: "SYR", text: { en: "Damascus, Al Hamra", ar: "دمشق، الحمراء" } },
        { region: "KSA", text: { en: "Riyadh, Al Murabaa", ar: "الرياض، المربّع" } },
      ],
    },
  ],
  offices: [
    {
      id: "syr",
      country: { en: "Syria", ar: "سوريا" },
      city: { en: "Damascus, Al Hamra", ar: "دمشق، الحمراء" },
      phones: ["+963 968 862 822", "+963 954 187 154"],
    },
    {
      id: "ksa",
      country: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
      city: { en: "Riyadh, Al Murabaa", ar: "الرياض، المربّع" },
      phones: ["+966 55 035 0295"],
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
  tagline: { en: "Creativation Source", ar: "مصدر الإبداع" },
  explore: { en: "Explore", ar: "استكشف" },
  reach: { en: "Reach us", ar: "تواصل معنا" },
  rights: {
    en: "© 2026 Home of Creativity — Creativation Source",
    ar: "© 2026 هوم أوف كريتيفيتي — مصدر الإبداع",
  },
};

export const WHATSAPP_NUMBER = "963954187154";
