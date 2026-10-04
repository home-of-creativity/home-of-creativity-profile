import type { Copy } from "./i18n";
import { officesSentence } from "./offices";

type ServiceFaq = { q: Copy; a: Copy };

export type ServiceDetail = {
  id: string;
  slug: string;
  title: Copy;
  metaTitle: Copy;
  metaDescription: Copy;
  tagline: Copy;
  definition: Copy;
  covers: Copy[];
  audience: Copy;
  faqs: ServiceFaq[];
  related: string[];
};

export const serviceDetailLabels = {
  covers: { en: "What the service covers", ar: "ماذا تشمل الخدمة" },
  coversNote: {
    en: "The exact scope for your project is confirmed in the quotation.",
    ar: "يُحدَّد النطاق الدقيق لمشروعك في عرض السعر.",
  },
  audience: { en: "Who it's for", ar: "لمن هذه الخدمة" },
  process: { en: "How it works", ar: "طريقة العمل" },
  faq: { en: "FAQ", ar: "أسئلة شائعة" },
  related: { en: "Related services", ar: "خدمات ذات صلة" },
  articles: { en: "Related articles", ar: "مقالات ذات صلة" },
  allServices: { en: "All services", ar: "كل الخدمات" },
  cta: { en: "Start on WhatsApp", ar: "ابدأ عبر واتساب" },
  ctaSyria: { en: "WhatsApp Syria", ar: "واتساب سوريا" },
  ctaSaudi: { en: "WhatsApp Saudi Arabia", ar: "واتساب السعودية" },
  offices: { en: "Our offices", ar: "مكاتبنا" },
  pricing: { en: "Packages and prices", ar: "الباقات والأسعار" },
  breadcrumb: { en: "Breadcrumb", ar: "مسار التصفح" },
};

export const serviceProcess: Copy = {
  en: "Share your project on Telegram or WhatsApp — text or a file. Home of Creativity reviews the requirements and sends a clear PDF quotation. Once you approve it and payment is confirmed in the same conversation, our marketing, content, and design teams start work, and the final outputs are delivered on Telegram with revisions handled flexibly.",
  ar: "شاركنا مشروعك عبر تيليجرام أو واتساب — نصاً أو ملفاً. يراجع فريق بيت الإبداع المتطلبات ويرسل عرض سعر واضحاً بصيغة PDF. بعد اعتمادك للعرض وتأكيد الدفع في نفس المحادثة، تبدأ فرق التسويق والمحتوى والتصميم العمل، وتُسلَّم المخرجات النهائية عبر تيليجرام مع إدارة التعديلات بمرونة.",
};

/** Names the service so the answer is not the same sentence on every page. */
function scopeFaq(service: Copy): ServiceFaq {
  return {
    q: {
      en: `What is included in ${service.en.toLowerCase()} and how long does it take?`,
      ar: `ماذا تشمل خدمة ${service.ar} وكم تستغرق؟`,
    },
    a: {
      en: `The scope and timeline of ${service.en.toLowerCase()} for your project are set in the quotation before payment. Monthly subscription package prices are published at hoc.agency/pricing/.`,
      ar: `يُحدَّد نطاق خدمة ${service.ar} ومدتها لمشروعك في عرض السعر قبل الدفع. أسعار باقات الاشتراك الشهرية منشورة في hoc.agency/pricing/.`,
    },
  };
}

function ksaFaq(service: Copy): ServiceFaq {
  return {
    q: {
      en: `Do you provide ${service.en.toLowerCase()} for clients in Saudi Arabia?`,
      ar: `هل تقدمون خدمة ${service.ar} لعملاء في السعودية؟`,
    },
    a: {
      en: `Yes. We provide ${service.en.toLowerCase()} for clients in Syria and Saudi Arabia from our offices in ${officesSentence("en")}.`,
      ar: `نعم. نقدّم خدمة ${service.ar} لعملائنا في سوريا والسعودية من مكاتبنا في ${officesSentence("ar")}.`,
    },
  };
}

/** Full titles: `[service] | بيت الإبداع HOC` and `[service] | Home of Creativity`, at most 65 characters. */
function metaTitle(ar: string, en: string): Copy {
  return { ar: `${ar} | بيت الإبداع HOC`, en: `${en} | Home of Creativity` };
}

const marketing: Copy = { en: "Marketing", ar: "التسويق" };
const ads: Copy = { en: "Paid Ads", ar: "الحملات الممولة" };
const social: Copy = { en: "Social Media", ar: "السوشال ميديا" };
const accounts: Copy = { en: "Account Management", ar: "إدارة الحسابات" };
const outdoor: Copy = { en: "Roadside Ads", ar: "الإعلانات الطرقية" };
const gifts: Copy = { en: "Promo Gifts", ar: "الهدايا الدعائية" };
const film: Copy = { en: "Filming & Editing", ar: "التصوير والمونتاج" };
const identity: Copy = { en: "Visual Identity Design in Damascus", ar: "تصميم الهوية البصرية في دمشق" };
const exhibitions: Copy = { en: "Exhibitions & Conferences", ar: "تنظيم المعارض والمؤتمرات" };
const events: Copy = { en: "Event Management", ar: "إدارة الفعاليات" };
const booths: Copy = { en: "Booth Design", ar: "تصميم البوثات" };
const web: Copy = { en: "Websites & Ecommerce", ar: "المواقع والمتاجر الإلكترونية" };
const apps: Copy = { en: "App Design", ar: "تصميم التطبيقات" };
const finance: Copy = { en: "Financial Analysis", ar: "التحليل المالي" };

/** One page per practice in `services.items`, same order. */
export const serviceDetails: ServiceDetail[] = [
  {
    id: "marketing",
    slug: "marketing",
    title: marketing,
    metaTitle: metaTitle("خدمات التسويق في دمشق والرياض", "Marketing Services in Damascus & Riyadh"),
    metaDescription: {
      ar: "خدمات تسويق من بيت الإبداع HOC تبدأ بدراسة سوقك وجمهورك وتنتهي بخطة ورسائل واضحة لحملاتك، لعملائنا في دمشق والرياض. اطلب عرض سعر عبر واتساب.",
      en: "Marketing services from Home of Creativity (HOC): market and audience research, a clear plan and campaign messaging for clients in Damascus and Riyadh.",
    },
    tagline: {
      ar: "تسويق يبدأ من الفهم، وينتهي بأثر يمكن قياسه.",
      en: "Marketing that starts with understanding and ends with measurable impact.",
    },
    definition: {
      ar: "التسويق في بيت الإبداع ليس نشراً عشوائياً ولا ضجيجاً مؤقتاً. نبدأ بتحليل مشروعك ومنافسيك وجمهورك، ثم نحدد الرسالة المناسبة والقنوات الأقرب للوصول إليه، ونحوّل ذلك إلى خطة عملية يربط فيها الإبداع بالأهداف التجارية.",
      en: "Marketing at Home of Creativity is not random posting or temporary noise. We start by analyzing your project, competitors, and audience, then define the right message and the channels closest to that audience, and turn it into a practical plan that ties creativity to business goals.",
    },
    covers: [
      { ar: "دراسة السوق والمنافسين والجمهور المستهدف", en: "Market, competitor, and target audience research" },
      { ar: "بناء الاستراتيجية والخطة التسويقية", en: "Marketing strategy and plan" },
      { ar: "صياغة الرسائل والأفكار الإبداعية للحملات", en: "Campaign messaging and creative concepts" },
      { ar: "متابعة الأداء وتطوير الخطة", en: "Performance follow-up and plan refinement" },
    ],
    audience: {
      ar: "مشاريع جديدة تحتاج انطلاقة مدروسة، وعلامات قائمة تريد إعادة ترتيب حضورها وتوجيه ميزانيتها التسويقية بشكل أذكى.",
      en: "New projects that need a considered launch, and established brands that want to reorganize their presence and direct their marketing budget more intelligently.",
    },
    faqs: [
      {
        q: { ar: "ما الفرق بين التسويق والحملات الممولة؟", en: "How is marketing different from paid ads?" },
        a: {
          ar: "التسويق هو الخطة والرسالة والاتجاه العام، أما الحملات الممولة فهي إحدى أدوات التنفيذ. يمكن طلب كل خدمة منفصلة أو دمجهما في عرض سعر واحد.",
          en: "Marketing is the plan, the message, and the overall direction; paid ads are one of the execution tools. You can request each separately or combine them in one quotation.",
        },
      },
      scopeFaq(marketing),
      ksaFaq(marketing),
    ],
    related: ["paid-ads", "social-media", "roadside-ads", "financial-analysis"],
  },
  {
    id: "ads",
    slug: "paid-ads",
    title: ads,
    metaTitle: metaTitle("الحملات الإعلانية الممولة في دمشق والرياض", "Paid Social Ads in Damascus & Riyadh"),
    metaDescription: {
      ar: "حملات ممولة على منصات التواصل من بيت الإبداع HOC: هدف واضح واستهداف مدروس وتصميم إعلانات ومتابعة للأداء، لعملائنا في دمشق والرياض. ابدأ عبر واتساب.",
      en: "Paid social campaigns from Home of Creativity (HOC): a clear goal, considered targeting, ad design and performance follow-up for clients in Damascus and Riyadh.",
    },
    tagline: {
      ar: "ميزانية إعلانية تعمل بذكاء، لا بصوت عالٍ.",
      en: "An ad budget that works smart, not loud.",
    },
    definition: {
      ar: "الحملات الممولة تضع علامتك أمام الجمهور الأقرب لها في الوقت المناسب. نصمم الإعلان ونكتب نصه ونحدد الاستهداف ونتابع النتائج خلال فترة الحملة، ليكون كل إنفاق إعلاني جزءاً من هدف واضح.",
      en: "Paid ads put your brand in front of the audience closest to it at the right time. We design the ad, write the copy, set the targeting, and follow results during the campaign, so every ad spend serves a clear goal.",
    },
    covers: [
      { ar: "تحديد هدف الحملة والجمهور المستهدف", en: "Campaign goal and target audience" },
      { ar: "تصميم الإعلانات وكتابة النصوص", en: "Ad design and copywriting" },
      { ar: "إعداد الحملات على منصات التواصل", en: "Campaign setup on social platforms" },
      { ar: "متابعة الأداء وتحسين الحملة", en: "Performance tracking and optimization" },
    ],
    audience: {
      ar: "مشاريع تريد نتائج أسرع: إطلاق منتج، افتتاح فرع، عرض موسمي، أو زيادة الوصول لجمهور محدد.",
      en: "Projects that want faster results: a product launch, a new branch opening, a seasonal offer, or wider reach to a specific audience.",
    },
    faqs: [
      {
        q: { ar: "هل ميزانية الإعلان مشمولة في عرض السعر؟", en: "Is the ad budget included in the quotation?" },
        a: {
          ar: "يوضّح عرض السعر أتعاب إدارة الحملة وميزانية الإعلان بشكل منفصل، حتى تعرف تماماً أين يُنفق كل مبلغ.",
          en: "The quotation lists campaign management fees and ad budget separately, so you know exactly where every amount is spent.",
        },
      },
      scopeFaq(ads),
      ksaFaq(ads),
    ],
    related: ["marketing", "social-media", "filming-editing", "roadside-ads"],
  },
  {
    id: "social",
    slug: "social-media",
    title: social,
    metaTitle: metaTitle("إدارة السوشال ميديا في دمشق والرياض", "Social Media Management in Damascus & Riyadh"),
    metaDescription: {
      ar: "إدارة السوشال ميديا من بيت الإبداع HOC: خطة محتوى شهرية وتصميم منشورات وقصص وريلز ونشر منتظم، لعلامات في دمشق والرياض. الباقات والأسعار منشورة.",
      en: "Social media management from Home of Creativity (HOC): a monthly content plan, posts, stories, reels and steady publishing for brands in Damascus and Riyadh.",
    },
    tagline: {
      ar: "صفحات تعبّر عن مشروعك، وتبني علاقة حقيقية مع جمهورك.",
      en: "Pages that express your project and build a real relationship with your audience.",
    },
    definition: {
      ar: "نصنع حضورًا متكاملًا لعلامتك على منصات التواصل الاجتماعي، بدءًا من التخطيط وصناعة الأفكار وكتابة المحتوى، وصولًا إلى النشر وإدارة الحسابات. هدفنا أن تتحول صفحاتك إلى مساحة تعبّر عن مشروعك، تجذب جمهورك وتبني معه علاقة حقيقية.",
      en: "We build an integrated presence for your brand on social platforms — from planning and ideation to copywriting, publishing, and account management. Our goal is to make your pages a space that expresses your project, attracts your audience, and builds a real relationship with it.",
    },
    covers: [
      { ar: "خطة محتوى شهرية وأفكار إبداعية", en: "Monthly content plan and creative ideas" },
      { ar: "تصميم المنشورات والقصص وكتابة المحتوى", en: "Post and story design, plus copywriting" },
      { ar: "ريلز وفيديوهات قصيرة", en: "Reels and short videos" },
      { ar: "النشر المنتظم ومتابعة التفاعل", en: "Consistent publishing and engagement follow-up" },
    ],
    audience: {
      ar: "علامات تريد حضوراً ثابتاً ومتسقاً على السوشال ميديا دون أن تنشغل بتفاصيل الإنتاج اليومية.",
      en: "Brands that want a steady, consistent social presence without getting caught up in day-to-day production.",
    },
    faqs: [
      {
        q: { ar: "هل توجد باقات جاهزة للسوشال ميديا؟", en: "Are there ready-made social media packages?" },
        a: {
          ar: "نعم، الباقات المنشورة موجودة في صفحة الأسعار hoc.agency/pricing/، ويمكن تخصيص عرض سعر حسب احتياجك.",
          en: "Yes. Published packages are on hoc.agency/pricing/, and the quotation can be tailored to your needs.",
        },
      },
      {
        q: { ar: "ما الفرق بين السوشال ميديا وإدارة الحسابات؟", en: "How is social media different from account management?" },
        a: {
          ar: "السوشال ميديا تركز على صناعة المحتوى وتصميمه، وإدارة الحسابات تركز على التشغيل اليومي والرد والمتابعة. يمكن دمجهما في عرض واحد.",
          en: "Social media focuses on creating and designing content; account management focuses on daily operation, replies, and follow-up. Both can be combined in one quotation.",
        },
      },
      ksaFaq(social),
    ],
    related: ["account-management", "filming-editing", "paid-ads", "visual-identity"],
  },
  {
    id: "accounts",
    slug: "account-management",
    title: accounts,
    metaTitle: metaTitle("إدارة حسابات السوشال ميديا في دمشق والرياض", "Account Management in Damascus & Riyadh"),
    metaDescription: {
      ar: "إدارة يومية لحسابات علامتك من بيت الإبداع HOC: جدولة النشر والرد على الرسائل والتعليقات ومتابعة التفاعل وتقارير دورية، لعملائنا في دمشق والرياض.",
      en: "Daily account management from Home of Creativity (HOC): scheduled publishing, replies to messages and comments, engagement monitoring and periodic reports.",
    },
    tagline: {
      ar: "نتابع حساباتك كأنها حساباتنا.",
      en: "We look after your accounts as if they were our own.",
    },
    definition: {
      ar: "إدارة الحسابات هي التشغيل اليومي لحضور علامتك: جدولة النشر، الرد على الرسائل والتعليقات بلغة موحدة، ومراقبة التفاعل وتقديم ملاحظات تساعد على تحسين المحتوى. هكذا تبقى علامتك حاضرة ومتجاوبة دون أن تنشغل بالتفاصيل.",
      en: "Account management is the daily operation of your brand's presence: scheduling posts, replying to messages and comments in one consistent voice, and monitoring engagement with notes that help improve content. Your brand stays present and responsive without you getting lost in the details.",
    },
    covers: [
      { ar: "جدولة ونشر المحتوى", en: "Content scheduling and publishing" },
      { ar: "الرد على الرسائل والتعليقات", en: "Replies to messages and comments" },
      { ar: "مراقبة التفاعل ونمو الحسابات", en: "Engagement and account growth monitoring" },
      { ar: "تقارير دورية وملاحظات للتطوير", en: "Periodic reports and improvement notes" },
    ],
    audience: {
      ar: "مشاريع لديها محتوى أو تريد محتوى، لكنها تحتاج فريقاً يتابع الحسابات يومياً ويحافظ على استمرارية الحضور.",
      en: "Projects that have content, or want it, but need a team to follow accounts daily and keep the presence continuous.",
    },
    faqs: [
      {
        q: { ar: "هل تديرون حسابات أنشأناها بأنفسنا؟", en: "Can you manage accounts we created ourselves?" },
        a: {
          ar: "نعم. تبقى ملكية الحسابات لك، ونعمل عليها بصلاحيات تحددها أنت.",
          en: "Yes. The accounts stay yours, and we work on them with the permissions you set.",
        },
      },
      scopeFaq(accounts),
      ksaFaq(accounts),
    ],
    related: ["social-media", "marketing", "paid-ads", "filming-editing"],
  },
  {
    id: "outdoor",
    slug: "roadside-ads",
    title: outdoor,
    metaTitle: metaTitle("الإعلانات الطرقية في دمشق والرياض", "Billboard Ads in Damascus & Riyadh"),
    metaDescription: {
      ar: "تصميم الإعلانات الطرقية واللوحات الخارجية من بيت الإبداع HOC: رسالة قصيرة تُقرأ من بعيد وملفات جاهزة للطباعة، لعملائنا في دمشق والرياض. اطلب عرض سعر.",
      en: "Roadside and billboard advertising from Home of Creativity (HOC): a short message that reads from a distance and print-ready files, for Damascus and Riyadh.",
    },
    tagline: {
      ar: "ثوانٍ قليلة تكفي، إذا كانت الرسالة صحيحة.",
      en: "A few seconds are enough when the message is right.",
    },
    definition: {
      ar: "الإعلان الطرقي يُقرأ في ثوانٍ وهو يمر أمام الناس. لذلك نصمم رسالة مختصرة وبصرية قوية تُفهم من بعيد، ونحافظ على اتساقها مع هويتك وحملاتك الرقمية، ثم نتابع تجهيز الملفات للطباعة والتنفيذ.",
      en: "A roadside ad is read in seconds as people pass by. So we design a short message with strong visuals that reads from a distance, keep it consistent with your identity and digital campaigns, and prepare the files for printing and installation.",
    },
    covers: [
      { ar: "فكرة الإعلان والرسالة المختصرة", en: "Ad concept and short message" },
      { ar: "تصميم اللوحات بمقاسات التنفيذ", en: "Billboard design at production sizes" },
      { ar: "تجهيز الملفات للطباعة", en: "Print-ready files" },
      { ar: "التنسيق مع جهات التنفيذ", en: "Coordination with production partners" },
    ],
    audience: {
      ar: "مشاريع تريد حضوراً محلياً قوياً: افتتاحات، فروع جديدة، حملات موسمية، أو علامات تستهدف مدينة ومنطقة محددة.",
      en: "Projects that want a strong local presence: openings, new branches, seasonal campaigns, or brands targeting a specific city and area.",
    },
    faqs: [
      {
        q: { ar: "هل تشمل الخدمة حجز المواقع الإعلانية؟", en: "Does the service include booking billboard locations?" },
        a: {
          ar: "يُوضَّح ذلك في عرض السعر حسب المدينة ونوع اللوحة؛ التصميم وتجهيز الملفات جزء أساسي من الخدمة.",
          en: "That is clarified in the quotation by city and billboard type; design and file preparation are a core part of the service.",
        },
      },
      scopeFaq(outdoor),
      ksaFaq(outdoor),
    ],
    related: ["marketing", "promo-gifts", "visual-identity", "paid-ads"],
  },
  {
    id: "gifts",
    slug: "promo-gifts",
    title: gifts,
    metaTitle: metaTitle("الهدايا الدعائية في دمشق والرياض", "Promotional Gifts in Damascus & Riyadh"),
    metaDescription: {
      ar: "هدايا دعائية تحمل هويتك من بيت الإبداع HOC: اختيار القطع وتصميم تطبيق الهوية والتغليف ومتابعة التنفيذ، للشركات في دمشق والرياض. اطلب عرض سعر عبر واتساب.",
      en: "Branded promotional gifts from Home of Creativity (HOC): choosing pieces, applying your identity, packaging and production follow-up, in Damascus and Riyadh.",
    },
    tagline: {
      ar: "هدية صغيرة، وأثر طويل.",
      en: "A small gift with a long-lasting impact.",
    },
    definition: {
      ar: "الهدايا الدعائية تنقل علامتك من الشاشة إلى يد عميلك. نختار القطع المناسبة لطبيعة مشروعك ومناسبتك، ونصمم تطبيق الهوية عليها بعناية، لتكون الهدية امتداداً لهويتك لا مجرد شعار مطبوع.",
      en: "Promo gifts carry your brand from the screen into your client's hands. We choose pieces that suit your project and occasion, and carefully apply your identity to them, so each gift is an extension of your brand, not just a printed logo.",
    },
    covers: [
      { ar: "اقتراح القطع المناسبة للمناسبة والجمهور", en: "Suggesting pieces suited to the occasion and audience" },
      { ar: "تصميم تطبيق الهوية على الهدايا", en: "Designing identity applications on the gifts" },
      { ar: "التغليف والبطاقات المرافقة", en: "Packaging and accompanying cards" },
      { ar: "متابعة التنفيذ والتسليم", en: "Production follow-up and delivery" },
    ],
    audience: {
      ar: "شركات تجهز لفعاليات ومعارض، أو هدايا موسمية للعملاء والشركاء، أو مجموعات ترحيبية لفريق العمل.",
      en: "Companies preparing for events and exhibitions, seasonal gifts for clients and partners, or welcome kits for their team.",
    },
    faqs: [
      {
        q: { ar: "هل يمكن طلب كميات صغيرة؟", en: "Can we order small quantities?" },
        a: {
          ar: "تختلف الكميات حسب نوع القطعة وطريقة التنفيذ، ونوضّح الخيارات المتاحة في عرض السعر.",
          en: "Quantities depend on the item and production method; the available options are set out in the quotation.",
        },
      },
      scopeFaq(gifts),
      ksaFaq(gifts),
    ],
    related: ["event-management", "exhibitions-conferences", "booth-design", "roadside-ads"],
  },
  {
    id: "film",
    slug: "filming-editing",
    title: film,
    metaTitle: metaTitle("التصوير والمونتاج في دمشق والرياض", "Filming & Video Editing in Damascus & Riyadh"),
    metaDescription: {
      ar: "تصوير فوتوغرافي وفيديو ومونتاج ريلز وإعلانات من بيت الإبداع HOC، من كتابة الفكرة حتى تجهيز المقاسات لكل منصة، لعلامات في دمشق والرياض. ابدأ عبر واتساب.",
      en: "Photo, video and reel editing from Home of Creativity (HOC), from the concept and script to formats for each platform, for brands in Damascus and Riyadh.",
    },
    tagline: {
      ar: "لقطة واحدة صحيحة تختصر ألف كلمة.",
      en: "One right shot says more than a thousand words.",
    },
    definition: {
      ar: "نؤمن أن قوة العلامة في استمرارية ظهورها، والفيديو القصير اليوم هو واجهتها الأولى. نخطط للفكرة، نصور المنتج أو المكان أو الفريق، ثم نمونتج المحتوى بإيقاع يناسب المنصة التي سيُنشر عليها.",
      en: "We believe a brand's strength is in how continuously it appears, and short video is its front window today. We plan the idea, film the product, space, or team, then edit the content with a rhythm that fits the platform it will be published on.",
    },
    covers: [
      { ar: "كتابة الفكرة والسيناريو", en: "Concept and script" },
      { ar: "تصوير فوتوغرافي وفيديو", en: "Photo and video shoots" },
      { ar: "مونتاج الريلز والإعلانات", en: "Editing reels and ads" },
      { ar: "تجهيز المقاسات لكل منصة", en: "Formatting for each platform" },
    ],
    audience: {
      ar: "مطاعم ومتاجر وعلامات منتجات وخدمات تحتاج محتوى بصرياً أصيلاً بدل الصور الجاهزة.",
      en: "Restaurants, stores, and product or service brands that need original visual content instead of stock imagery.",
    },
    faqs: [
      {
        q: { ar: "هل يمكن طلب المونتاج فقط لمواد مصورة مسبقاً؟", en: "Can we request editing only, for footage we already have?" },
        a: {
          ar: "نعم، يمكن طلب المونتاج بشكل منفصل بعد مراجعة المواد المتوفرة.",
          en: "Yes. Editing can be requested on its own after we review the available footage.",
        },
      },
      scopeFaq(film),
      ksaFaq(film),
    ],
    related: ["social-media", "paid-ads", "event-management", "exhibitions-conferences"],
  },
  {
    id: "identity",
    slug: "visual-identity",
    title: identity,
    metaTitle: metaTitle("تصميم الهوية البصرية في دمشق والرياض", "Visual Identity Design in Damascus & Riyadh"),
    metaDescription: {
      ar: "تصميم الهوية البصرية من بيت الإبداع HOC: الشعار ولوحة الألوان والخطوط وتطبيقات الهوية ودليل الاستخدام، لعلامات في دمشق والرياض. ابدأ مشروعك عبر واتساب.",
      en: "Visual identity design from Home of Creativity (HOC): logo, color palette, typography, applications and brand guidelines for brands in Damascus and Riyadh.",
    },
    tagline: {
      ar: "هوية تُعرّف بك قبل أن تتكلم.",
      en: "An identity that introduces you before you speak.",
    },
    definition: {
      ar: "الهوية البصرية هي النظام الذي يحمل علامتك في كل مكان: الشعار والألوان والخطوط وطريقة تطبيقها على المطبوعات والمنصات الرقمية والمساحات الفعلية. نصممها في بيت الإبداع من فهم عميق لقصة مشروعك، لتكون متسقة وقابلة للنمو معه.",
      en: "Visual identity is the system that carries your brand everywhere: the logo, colors, typography, and how they apply to print, digital platforms, and physical spaces. At Home of Creativity we design it from a deep understanding of your project's story, so it stays consistent and grows with you.",
    },
    covers: [
      { ar: "تصميم الشعار ونظامه", en: "Logo and logo system" },
      { ar: "لوحة الألوان والخطوط", en: "Color palette and typography" },
      { ar: "تطبيقات الهوية على المطبوعات والسوشال ميديا", en: "Identity applications for print and social media" },
      { ar: "دليل استخدام الهوية", en: "Brand usage guidelines" },
    ],
    audience: {
      ar: "مشاريع جديدة تبحث عن أول هوية، وعلامات قائمة تحتاج تحديثاً يعكس مرحلتها الحالية.",
      en: "New projects looking for a first identity, and established brands that need a refresh reflecting where they are now.",
    },
    faqs: [
      {
        q: { ar: "ما الفرق بين الشعار والهوية البصرية؟", en: "What is the difference between a logo and a visual identity?" },
        a: {
          ar: "الشعار جزء من الهوية. الهوية البصرية هي النظام الكامل من ألوان وخطوط وتطبيقات يجعل العلامة متسقة في كل مكان. التفاصيل في hoc.agency/services/brand-identity/.",
          en: "A logo is one part of the identity. Visual identity is the full system of colors, type, and applications that keeps the brand consistent everywhere. More at hoc.agency/services/brand-identity/.",
        },
      },
      scopeFaq({ en: "Visual identity", ar: "الهوية البصرية" }),
      ksaFaq({ en: "Visual identity design", ar: "تصميم الهوية البصرية" }),
    ],
    related: ["websites-ecommerce", "social-media", "booth-design", "promo-gifts"],
  },
  {
    id: "exhibitions",
    slug: "exhibitions-conferences",
    title: exhibitions,
    metaTitle: metaTitle("تنظيم المعارض والمؤتمرات في دمشق والرياض", "Exhibition Organizing in Damascus & Riyadh"),
    metaDescription: {
      ar: "تنظيم المعارض والمؤتمرات من بيت الإبداع HOC: التخطيط وهوية الحدث والمطبوعات وتجهيز المكان والتنسيق في يوم الحدث، في دمشق والرياض. اطلب عرض سعر.",
      en: "Exhibition and conference organizing from Home of Creativity (HOC): planning, event branding, printed materials, venue setup and on-the-day coordination.",
    },
    tagline: {
      ar: "حدث منظم يترك انطباعاً احترافياً من اللحظة الأولى.",
      en: "An organized event that leaves a professional impression from the first moment.",
    },
    definition: {
      ar: "المعرض أو المؤتمر فرصة لتلتقي علامتك بجمهورها وجهاً لوجه. ننظم الحدث من التخطيط والهوية البصرية للحدث إلى تجهيز المكان والمطبوعات وتنسيق فرق العمل، لتكون التجربة منظمة ومتسقة من الدعوة حتى الختام.",
      en: "An exhibition or conference is a chance for your brand to meet its audience face to face. We organize the event from planning and event branding to venue setup, printed materials, and team coordination, so the experience is organized and consistent from invitation to close.",
    },
    covers: [
      { ar: "التخطيط والجدول العام للحدث", en: "Planning and overall event schedule" },
      { ar: "الهوية البصرية للحدث والمطبوعات", en: "Event branding and printed materials" },
      { ar: "تجهيز المكان والمنصات", en: "Venue and stage setup" },
      { ar: "التنسيق في يوم الحدث", en: "On-the-day coordination" },
    ],
    audience: {
      ar: "شركات وجهات تنظم معرضاً أو مؤتمراً أو ملتقى، أو تشارك في معرض وتحتاج حضوراً احترافياً متكاملاً.",
      en: "Companies and organizations hosting an exhibition, conference, or forum, or taking part in an exhibition and needing a complete professional presence.",
    },
    faqs: [
      {
        q: { ar: "هل تصممون البوث أيضاً؟", en: "Do you also design the booth?" },
        a: {
          ar: "نعم، تصميم البوثات خدمة منفصلة يمكن دمجها مع تنظيم المعرض في عرض سعر واحد.",
          en: "Yes. Booth design is a separate service that can be combined with exhibition organization in one quotation.",
        },
      },
      scopeFaq(exhibitions),
      ksaFaq(exhibitions),
    ],
    related: ["booth-design", "event-management", "promo-gifts", "filming-editing"],
  },
  {
    id: "events",
    slug: "event-management",
    title: events,
    metaTitle: metaTitle("إدارة الفعاليات في دمشق والرياض", "Event Management in Damascus & Riyadh"),
    metaDescription: {
      ar: "إدارة الفعاليات من بيت الإبداع HOC: إطلاق المنتجات والافتتاحات والفعاليات الخاصة، من الفكرة والبرنامج إلى إدارة يوم الحدث وتغطيته، في دمشق والرياض.",
      en: "Event management from Home of Creativity (HOC): product launches, openings and private events, from concept and program to running and covering the day.",
    },
    tagline: {
      ar: "نهتم بالتفاصيل، لتستمتع أنت بالحدث.",
      en: "We handle the details so you can enjoy the event.",
    },
    definition: {
      ar: "الفعالية الناجحة تبدو سهلة لأن خلفها تخطيطاً دقيقاً. ندير الفعالية من الفكرة والجدول الزمني إلى التنسيق مع الموردين والإخراج البصري للمكان وإدارة يوم الحدث، ليعيش ضيوفك تجربة تعكس علامتك.",
      en: "A successful event looks effortless because careful planning sits behind it. We manage the event from concept and timeline to supplier coordination, the visual staging of the venue, and running the day itself, so your guests live an experience that reflects your brand.",
    },
    covers: [
      { ar: "فكرة الفعالية وبرنامجها", en: "Event concept and program" },
      { ar: "التنسيق مع الموردين والمكان", en: "Supplier and venue coordination" },
      { ar: "الإخراج البصري والديكور", en: "Visual staging and décor" },
      { ar: "إدارة يوم الفعالية والتغطية", en: "Running the day and coverage" },
    ],
    audience: {
      ar: "علامات تطلق منتجاً أو تفتتح فرعاً، وشركات تنظم فعاليات داخلية أو احتفالات لعملائها.",
      en: "Brands launching a product or opening a branch, and companies hosting internal events or celebrations for their clients.",
    },
    faqs: [
      {
        q: { ar: "هل تشمل الخدمة تصوير الفعالية؟", en: "Does the service include event coverage?" },
        a: {
          ar: "يمكن إضافة التصوير والمونتاج إلى عرض السعر لتغطية الفعالية ونشرها على حساباتك.",
          en: "Filming and editing can be added to the quotation to cover the event and publish it on your accounts.",
        },
      },
      scopeFaq(events),
      ksaFaq(events),
    ],
    related: ["exhibitions-conferences", "filming-editing", "promo-gifts", "booth-design"],
  },
  {
    id: "booths",
    slug: "booth-design",
    title: booths,
    metaTitle: metaTitle("تصميم البوثات وأجنحة المعارض في دمشق والرياض", "Exhibition Booth Design in Damascus & Riyadh"),
    metaDescription: {
      ar: "تصميم بوثات وأجنحة المعارض من بيت الإبداع HOC: توزيع المساحة وتصميم ثلاثي الأبعاد وتطبيق الهوية وملفات التنفيذ، للشركات في دمشق والرياض. اطلب عرض سعر.",
      en: "Exhibition booth and stand design from Home of Creativity (HOC): space planning, 3D design, identity graphics and production files, in Damascus and Riyadh.",
    },
    tagline: {
      ar: "مساحة صغيرة، وحضور كبير.",
      en: "A small space with a big presence.",
    },
    definition: {
      ar: "البوث هو واجهة علامتك وسط عشرات المنافسين في المعرض. نصممه بتصور ثلاثي الأبعاد يوزع المساحة بذكاء بين العرض والاستقبال والحوار، ويطبق هويتك بطريقة تلفت الانتباه من بعيد وتدعو الزائر للاقتراب.",
      en: "A booth is your brand's storefront among dozens of competitors at an exhibition. We design it in 3D, splitting the space smartly between display, reception, and conversation, and applying your identity in a way that catches attention from afar and invites visitors closer.",
    },
    covers: [
      { ar: "فكرة البوث وتوزيع المساحة", en: "Booth concept and space planning" },
      { ar: "تصميم ثلاثي الأبعاد", en: "3D design" },
      { ar: "تطبيق الهوية والجرافيك", en: "Identity and graphics application" },
      { ar: "ملفات التنفيذ والتنسيق مع المنفذين", en: "Production files and builder coordination" },
    ],
    audience: {
      ar: "شركات تشارك في معارض محلية أو إقليمية وتريد جناحاً احترافياً يمثلها.",
      en: "Companies taking part in local or regional exhibitions that want a professional stand representing them.",
    },
    faqs: [
      {
        q: { ar: "هل ترسلون تصوراً قبل التنفيذ؟", en: "Do you share a visualization before production?" },
        a: {
          ar: "نعم، يُعتمد التصميم ثلاثي الأبعاد معك قبل تجهيز ملفات التنفيذ.",
          en: "Yes. The 3D design is approved with you before production files are prepared.",
        },
      },
      scopeFaq(booths),
      ksaFaq(booths),
    ],
    related: ["exhibitions-conferences", "event-management", "promo-gifts", "visual-identity"],
  },
  {
    id: "web",
    slug: "websites-ecommerce",
    title: web,
    metaTitle: metaTitle("مواقع ومتاجر إلكترونية في دمشق والرياض", "Websites & Ecommerce in Damascus & Riyadh"),
    metaDescription: {
      ar: "تصميم وتطوير المواقع والمتاجر الإلكترونية من بيت الإبداع HOC: تخطيط الصفحات وتصميم الواجهات بهويتك وتطوير سريع على الجوال، في دمشق والرياض.",
      en: "Website and online store design and development from Home of Creativity (HOC): page planning, on-brand interfaces and fast mobile builds, Damascus and Riyadh.",
    },
    tagline: {
      ar: "موقعك هو فرعك المفتوح على مدار الساعة.",
      en: "Your website is your branch that never closes.",
    },
    definition: {
      ar: "الموقع أو المتجر الإلكتروني هو أول مكان يزوره عميلك ليتأكد من جديتك. نصمم تجربة استخدام واضحة تناسب هويتك، ونطوّر الموقع ليكون سريعاً على الجوال وسهل الإدارة، سواء كان موقعاً تعريفياً أو متجراً للبيع.",
      en: "A website or online store is the first place a client visits to confirm you are serious. We design a clear user experience that fits your identity and build the site to be fast on mobile and easy to manage, whether it is a company site or a store that sells.",
    },
    covers: [
      { ar: "تخطيط الصفحات وتجربة المستخدم", en: "Page planning and user experience" },
      { ar: "تصميم الواجهات بهوية علامتك", en: "Interface design in your brand identity" },
      { ar: "التطوير والتوافق مع الجوال", en: "Development and mobile responsiveness" },
      { ar: "إعداد المتجر والمنتجات عند الحاجة", en: "Store and product setup when needed" },
    ],
    audience: {
      ar: "شركات تحتاج موقعاً تعريفياً احترافياً، ومتاجر تريد البيع عبر الإنترنت.",
      en: "Companies that need a professional company website, and stores that want to sell online.",
    },
    faqs: [
      {
        q: { ar: "هل تبنون متاجر إلكترونية إضافة للمواقع؟", en: "Do you build online stores as well as websites?" },
        a: {
          ar: "نعم، المواقع والمتاجر الإلكترونية خدمة واحدة، ويُحدد نوع المشروع ونطاقه في عرض السعر.",
          en: "Yes. Websites and ecommerce are one service; the project type and scope are set in the quotation.",
        },
      },
      scopeFaq(web),
      ksaFaq(web),
    ],
    related: ["app-design", "visual-identity", "social-media", "financial-analysis"],
  },
  {
    id: "apps",
    slug: "app-design",
    title: apps,
    metaTitle: metaTitle("تصميم التطبيقات في دمشق والرياض", "App UI & UX Design in Damascus & Riyadh"),
    metaDescription: {
      ar: "تصميم واجهات التطبيقات وتجربة استخدامها من بيت الإبداع HOC: رحلة المستخدم وتصميم الواجهات ونموذج تفاعلي وملفات التسليم، لمشاريع في دمشق والرياض.",
      en: "App UI and UX design from Home of Creativity (HOC): user journeys, interface design, an interactive prototype and handoff files, in Damascus and Riyadh.",
    },
    tagline: {
      ar: "تطبيق يفهمه المستخدم دون شرح.",
      en: "An app users understand without explanation.",
    },
    definition: {
      ar: "التطبيق الناجح يُستخدم بسهولة من أول لمسة. نرسم رحلة المستخدم ونبني هيكل الشاشات، ثم نصمم الواجهات بهوية علامتك ونجهز نموذجاً تفاعلياً يمكن تجربته قبل البدء بالتطوير.",
      en: "A successful app is easy to use from the first tap. We map the user journey and structure the screens, then design the interfaces in your brand identity and prepare an interactive prototype you can try before development starts.",
    },
    covers: [
      { ar: "رحلة المستخدم وهيكل الشاشات", en: "User journey and screen structure" },
      { ar: "تصميم الواجهات UI", en: "UI design" },
      { ar: "نموذج تفاعلي Prototype", en: "Interactive prototype" },
      { ar: "ملفات التسليم لفريق التطوير", en: "Handoff files for the development team" },
    ],
    audience: {
      ar: "مشاريع ناشئة تطلق تطبيقاً جديداً، وشركات تريد تحسين تجربة تطبيق قائم.",
      en: "Startups launching a new app, and companies that want to improve the experience of an existing one.",
    },
    faqs: [
      {
        q: { ar: "هل تشمل الخدمة برمجة التطبيق؟", en: "Does the service include app development?" },
        a: {
          ar: "تصميم التطبيقات خدمة مستقلة؛ يُوضَّح في عرض السعر إن كان المشروع يشمل التطوير أيضاً.",
          en: "App design is its own service; the quotation states whether the project also includes development.",
        },
      },
      scopeFaq(apps),
      ksaFaq(apps),
    ],
    related: ["websites-ecommerce", "visual-identity", "marketing", "account-management"],
  },
  {
    id: "finance",
    slug: "financial-analysis",
    title: finance,
    metaTitle: metaTitle("التحليل المالي ولوحات التحكم في دمشق والرياض", "Financial Analysis in Damascus & Riyadh"),
    metaDescription: {
      ar: "التحليل المالي من بيت الإبداع HOC: تنظيم السجلات واستخراج قصة السيولة والأرباح ولوحات تحكم تفاعلية تدعم قراراتك، لشركات في دمشق والرياض.",
      en: "Financial analysis from Home of Creativity (HOC): organized records, a clear story of liquidity and profit, and interactive dashboards for decisions.",
    },
    tagline: {
      ar: "الإبداع الحقيقي لا يكتمل دون أساس مالي واضح.",
      en: "True creativity is incomplete without a clear financial foundation.",
    },
    definition: {
      ar: "في HOC لا نرى الأرقام كمجرد حسابات، بل كخريطة طريق تقود الكيان نحو الريادة. نترجم فوضى البيانات إلى مشهد بصري تفاعلي بواجهات أداء تضع الحقيقة المالية بين يديك، لتكون القرارات الاستراتيجية مبنية على لغة الأرقام.",
      en: "At HOC we do not see numbers as mere accounts, but as a roadmap that leads the entity toward leadership. We translate data chaos into an interactive visual scene — performance interfaces that place the financial truth in your hands, so strategic decisions are built on the language of numbers.",
    },
    covers: [
      { ar: "هندسة اليقين المالي: تنظيم السجلات واستخراج قصة السيولة والأرباح", en: "Engineering financial certainty: organizing records into a clear story of liquidity and profit" },
      { ar: "شاشات القيادة الاستراتيجية: لوحات تحكم مرئية وديناميكية", en: "Strategic command screens: visual, dynamic dashboards" },
      { ar: "الحصانة المالية: رقابة تضمن الاستقرار في وجه تقلبات السوق", en: "Financial immunity: oversight that keeps you stable against market swings" },
    ],
    audience: {
      ar: "شركات ومشاريع تريد رؤية أوضح لأدائها المالي واتخاذ قرارات مبنية على بيانات حقيقية.",
      en: "Companies and projects that want a clearer view of their financial performance and decisions built on real data.",
    },
    faqs: [
      {
        q: { ar: "ما الذي نحتاج تجهيزه للبدء؟", en: "What do we need to prepare to start?" },
        a: {
          ar: "السجلات والبيانات المالية المتوفرة لديك بأي صيغة؛ نراجعها ونوضح ما يمكن بناؤه منها في عرض السعر.",
          en: "Whatever financial records and data you have, in any format; we review them and set out in the quotation what can be built from them.",
        },
      },
      scopeFaq(finance),
      ksaFaq(finance),
    ],
    related: ["marketing", "websites-ecommerce", "app-design", "account-management"],
  },
];

export function findServiceDetail(slug: string) {
  return serviceDetails.find((entry) => entry.slug === slug);
}

export function serviceDetailById(id: string) {
  return serviceDetails.find((entry) => entry.id === id);
}
