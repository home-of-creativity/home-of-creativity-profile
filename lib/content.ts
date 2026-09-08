import type { Copy } from "./i18n";

export const brand = {
  name: "Home of Creativity",
  of: "of",
  secondary: "Creativation Source",
  mark: "S",
};

export const nav = {
  about: { en: "About", ar: "من نحن" },
  philosophy: { en: "Philosophy", ar: "فلسفتنا" },
  services: { en: "Services", ar: "خدماتنا" },
  clients: { en: "Client journey", ar: "مراحل العمل" },
  projects: { en: "Projects", ar: "المشاريع" },
  finance: { en: "Finance", ar: "التحليل المالي" },
  contact: { en: "Contact", ar: "تواصل" },
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
  kicker: { en: "The house", ar: "البيت" },
  title: { en: "About us", ar: "من نحن" },
  body: {
    en: "Forget aesthetic fluff and sweet talk. We are not your typical agency; we are brand architects. We dissect your business, eliminate the clutter, and rebuild it into a powerhouse driven by hard numbers and defined by visual prestige. In an era of endless noise and generic content, we stand for Premium Minimalism and direct, human-centric marketing. We do not yell to be seen. We strategically position your brand so the industry leans in and listens.",
    ar: "نحن لسنا وكالة إعلانات أخرى تبيعك تصاميم جميلة ومنمّقة وكلاماً معسولاً. نحن مهندسو هوية تجارية. نأخذ عملك لنجرّده من العشوائية ونعيده إلى السوق كعلامة تجارية رائدة ذات هيبة بصرية مبنية على أرقام وحقائق صلبة لا تقبل الجدل. في عالم مليء بالضجيج والمحتوى المعلّب، نحن نؤمن بالفخامة البسيطة Premium Minimalism والتسويق الإنساني المباشر. لا نصرخ لجذب الانتباه، بل نصنع لعملائنا تموضعاً ذكياً يجعل السوق ينصت إليهم باحترام.",
  },
  imageAlt: {
    en: "A lone figure at the far end of a vast, geometrically lit hall",
    ar: "شخص وحيد في نهاية قاعة هندسية واسعة مضاءة",
  },
};

export const philosophy = {
  kicker: { en: "How we think", ar: "كيف نفكّر" },
  title: { en: "Our philosophy", ar: "فلسفتنا" },
  pillars: [
    {
      id: "complex",
      label: { en: "Complexity", ar: "التعقيد" },
      image: "/photo/mastering_the_complex.webp",
      imageAlt: {
        en: "A figure facing a glowing cube of data and systems",
        ar: "شخص يواجه مكعباً مضيئاً من البيانات والأنظمة",
      },
      title: { en: "Mastering the Complex", ar: "إتقان التعقيد" },
      body: {
        en: "We thrive where others struggle. From sophisticated cloud infrastructures to rigid engineering materials, we comprehend your deepest technical nuances. We distill this complexity into powerful, strategic messaging that drives investor confidence and consumer conversion.",
        ar: "سواء كان عملك نظاماً سحابياً معقّداً، أو تقنيات دقيقة، أو منتجات إنشائية وهندسية جافّة؛ نحن لا نعتبرها تحدياً لأننا ببساطة نفهم لغتك التقنية المعقّدة ونترجمها إلى رسائل تجارية ذكية يفهمها المستثمر ويشتريها المستهلك.",
      },
    },
    {
      id: "visual",
      label: { en: "Vision", ar: "الرؤية" },
      image: "/photo/visual_innovation_3D.webp",
      imageAlt: {
        en: "A figure looking through a circular window at a 3D city vision",
        ar: "شخص ينظر من نافذة دائرية إلى رؤية مدينة ثلاثية الأبعاد",
      },
      title: { en: "Visual Innovation 3D", ar: "ابتكار بصري ثلاثي الأبعاد" },
      body: {
        en: "We do not depend on existing reality; we construct the ideal one. Leveraging advanced tech and hyper-realistic 3D simulations, we deliver cinematic visual equity that positions your brand as a futuristic industry leader.",
        ar: "لا ننتظر الواقع لكي نُصوّر؛ نحن نصنع الواقع. ندمج أدوات الجيل القادم والمحاكاة ثلاثية الأبعاد فائقة الواقعية لإنتاج مواد بصرية سينمائية تضع علامتك التجارية في المستقبل قبل منافسيك.",
      },
    },
    {
      id: "precision",
      label: { en: "Precision", ar: "الدقة" },
      image: "/photo/precision_over_presumption.webp",
      imageAlt: {
        en: "A dart striking the exact center of a target",
        ar: "سهم يصيب مركز الهدف بدقة",
      },
      title: { en: "Precision Over Presumption", ar: "الدقة بدل التخمين" },
      body: {
        en: "We do not gamble on campaigns. We tear down industry standards, forensically analyze competitors, and root our positioning in undeniable facts. By identifying unexploited market gaps, we guarantee our clients distinct competitive and commercial supremacy.",
        ar: "لا نبني حملاتنا على التخمين، لأننا نفكّك معايير السوق ونحلّل المنافسين، ونعتمد على الحقائق الصلبة لنكشف الفجوات التسويقية لعملائنا ونمنحهم تفوّقاً فنياً وتجارياً واضحاً.",
      },
    },
  ],
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

export const clientJourney = {
  kicker: { en: "Clients", ar: "العملاء" },
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
          src: "/photo/projects/p10_event_stage_01.webp",
          featured: true,
          span: "md" as const,
          alt: {
            en: "Conference hall with a curved LED stage for Home of Creativity",
            ar: "قاعة مؤتمرات بشاشة مسرح منحنية لهوم أوف كريتيفيتي",
          },
        },
        {
          src: "/photo/projects/p11_event_stage_02.webp",
          alt: {
            en: "Second event stage and seating arrangement",
            ar: "منصة فعالية ثانية وتنظيم المقاعد",
          },
        },
        {
          src: "/photo/projects/p12_exhibition_booth_design.webp",
          featured: true,
          span: "sm" as const,
          alt: {
            en: "Exhibition booth design",
            ar: "تصميم بوث معرض",
          },
        },
        {
          src: "/photo/projects/p13_booth_projects_01.webp",
          alt: {
            en: "Exhibition booth projects",
            ar: "مشاريع بوثات المعارض",
          },
        },
        {
          src: "/photo/projects/p14_booth_projects_02.webp",
          alt: {
            en: "Further exhibition booth work",
            ar: "أعمال بوثات إضافية",
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
          src: "/photo/projects/p16_logos.webp",
          featured: true,
          span: "lg" as const,
          alt: {
            en: "Client logo collection",
            ar: "مجموعة شعارات العملاء",
          },
        },
        {
          src: "/photo/projects/p17_company_profile_01.webp",
          alt: {
            en: "Company profile spread",
            ar: "صفحات ملف تعريفي",
          },
        },
        {
          src: "/photo/projects/p18_company_profile_02.webp",
          alt: {
            en: "Company profile interior pages",
            ar: "صفحات داخلية من الملف التعريفي",
          },
        },
        {
          src: "/photo/projects/p19_menu_design.webp",
          alt: {
            en: "Menu design",
            ar: "تصميم قائمة",
          },
        },
        {
          src: "/photo/projects/p20_business_cards.webp",
          alt: {
            en: "Business card designs",
            ar: "تصاميم بطاقات أعمال",
          },
        },
        {
          src: "/photo/projects/p21_visual_identity_application_01.webp",
          featured: true,
          span: "md" as const,
          alt: {
            en: "Visual identity applications, set one",
            ar: "تطبيقات الهوية البصرية، المجموعة الأولى",
          },
        },
        {
          src: "/photo/projects/p22_visual_identity_application_02.webp",
          alt: {
            en: "Visual identity applications, set two",
            ar: "تطبيقات الهوية البصرية، المجموعة الثانية",
          },
        },
        {
          src: "/photo/projects/p23_visual_identity_application_03.webp",
          alt: {
            en: "Visual identity applications, set three",
            ar: "تطبيقات الهوية البصرية، المجموعة الثالثة",
          },
        },
        {
          src: "/photo/projects/p24_visual_identity_application_04.webp",
          alt: {
            en: "Visual identity applications, set four",
            ar: "تطبيقات الهوية البصرية، المجموعة الرابعة",
          },
        },
        {
          src: "/photo/projects/p25_packaging_01.webp",
          alt: {
            en: "Packaging design, set one",
            ar: "تصميم تغليف، المجموعة الأولى",
          },
        },
        {
          src: "/photo/projects/p26_packaging_02.webp",
          alt: {
            en: "Packaging design, set two",
            ar: "تصميم تغليف، المجموعة الثانية",
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
          src: "/photo/projects/p28_social_posts_01.webp",
          featured: true,
          span: "sm" as const,
          alt: {
            en: "Social media posts, set one",
            ar: "منشورات سوشل ميديا، المجموعة الأولى",
          },
        },
        {
          src: "/photo/projects/p29_social_posts_02.webp",
          alt: {
            en: "Social media posts, set two",
            ar: "منشورات سوشل ميديا، المجموعة الثانية",
          },
        },
        {
          src: "/photo/projects/p30_social_posts_03.webp",
          alt: {
            en: "Social media posts, set three",
            ar: "منشورات سوشل ميديا، المجموعة الثالثة",
          },
        },
        {
          src: "/photo/projects/p31_motion_examples.webp",
          alt: {
            en: "Motion design examples",
            ar: "أمثلة تحريك",
          },
        },
        {
          src: "/photo/projects/p32_photography_montage.webp",
          featured: true,
          span: "lg" as const,
          alt: {
            en: "Photography montage",
            ar: "مونتاج تصوير",
          },
        },
        {
          src: "/photo/projects/p33_photography_examples.webp",
          alt: {
            en: "Photography examples",
            ar: "أمثلة تصوير",
          },
        },
        {
          src: "/photo/projects/p35_social_media_high_views.webp",
          alt: {
            en: "High-reach social media work",
            ar: "أعمال سوشل عالية المشاهدة",
          },
        },
        {
          src: "/photo/projects/p36_paid_campaigns_tiktok_meta.webp",
          alt: {
            en: "TikTok and Meta paid campaigns",
            ar: "حملات ممولة على تيك توك وميتا",
          },
        },
        {
          src: "/photo/projects/p37_google_ads.webp",
          alt: {
            en: "Google Ads work",
            ar: "أعمال إعلانات جوجل",
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
          src: "/photo/projects/p39_promotional_gifts.webp",
          featured: true,
          span: "sm" as const,
          alt: {
            en: "Promotional gifts",
            ar: "هدايا دعائية",
          },
        },
        {
          src: "/photo/projects/p41_roadside_advertisement.webp",
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
          src: "/photo/projects/p43_website_01.webp",
          featured: true,
          span: "lg" as const,
          alt: {
            en: "Website design, first project",
            ar: "تصميم موقع، المشروع الأول",
          },
        },
        {
          src: "/photo/projects/p44_website_02.webp",
          alt: {
            en: "Website design, second project",
            ar: "تصميم موقع، المشروع الثاني",
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
          src: "/photo/projects/p47_dashboard_01.webp",
          featured: true,
          span: "md" as const,
          alt: {
            en: "Financial analysis dashboard, first board",
            ar: "لوحة تحليل مالي، اللوحة الأولى",
          },
        },
        {
          src: "/photo/projects/p48_dashboard_02.webp",
          alt: {
            en: "Financial analysis dashboard, second board",
            ar: "لوحة تحليل مالي، اللوحة الثانية",
          },
        },
      ],
    },
  ],
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
      src: "/photo/projects/p47_dashboard_01.webp",
      alt: {
        en: "Financial analysis dashboard, first board",
        ar: "لوحة تحليل مالي، اللوحة الأولى",
      },
    },
    {
      src: "/photo/projects/p48_dashboard_02.webp",
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
      id: "landline",
      kind: "tel" as const,
      label: { en: "Landline", ar: "الهاتف الأرضي" },
      lines: [
        { region: "SYR", text: "+963 11 323 6255", digits: "963113236255" },
        { region: "KSA", text: "+966 11 422 2528", digits: "966114222528" },
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
      phones: ["+963 968 862 822", "+963 954 187 154", "+963 11 323 6255"],
    },
    {
      id: "ksa",
      country: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
      city: { en: "Riyadh, Al Murabaa", ar: "الرياض، المربّع" },
      phones: ["+966 55 035 0295", "+966 11 422 2528"],
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
  tagline: { en: "Creativation Source", ar: "كريتيفيشن سورس" },
  explore: { en: "Explore", ar: "استكشف" },
  reach: { en: "Reach us", ar: "تواصل معنا" },
  rights: {
    en: "© 2026 Home of Creativity — Creativation Source",
    ar: "© 2026 هوم أوف كريتيفيتي — كريتيفيشن سورس",
  },
};

export const WHATSAPP_NUMBER = "963954187154";
