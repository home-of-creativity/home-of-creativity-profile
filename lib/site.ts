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

export type SeoBilingual = { ar: string; en: string };

export function seoMetaTitle(copy: SeoBilingual): string {
  return `${copy.ar} | ${copy.en}`;
}

export function seoMetaDescription(copy: SeoBilingual): string {
  return `${copy.ar} ${copy.en}`;
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
    ar: "HOC Agency | أفكار تُرى، وحضور يُتذكر",
    en: "HOC Agency | Ideas seen, presence remembered",
  },
  homeDescription: {
    ar: "في HOC Agency نصنع حضورًا رقميًا يعكس شخصية مشروعك ويمنحه المساحة التي يستحقها. من إدارة السوشال ميديا وصناعة المحتوى إلى تنفيذ المشاريع الرقمية وتقديم الحلول الإبداعية، نعمل على تحويل الأفكار إلى نتائج واضحة، وتجارب تبقى في الذاكرة.",
    en: "At HOC Agency we build digital presence that reflects your project’s personality and gives it the space it deserves. From social media management and content creation to digital project delivery and creative solutions, we turn ideas into clear results and experiences that stay in memory.",
  },
  pricingTitle: {
    ar: "باقات HOC Agency | اختر ما يناسب طموحك",
    en: "HOC Agency Packages | Choose what fits your ambition",
  },
  pricingDescription: {
    ar: "اكتشف باقات وخدمات HOC Agency المصممة لتناسب المشاريع بمختلف أحجامها واحتياجاتها. خيارات واضحة ومرنة في إدارة السوشال ميديا، المحتوى والخدمات الرقمية، لتختار ما يناسب مشروعك وتبدأ بخطوات مدروسة نحو حضور أقوى.",
    en: "Discover HOC Agency packages and services designed for projects of every size and need. Clear, flexible options in social media management, content, and digital services — choose what fits your project and take measured steps toward a stronger presence.",
  },
  aboutTitle: {
    ar: "عن HOC Agency | نصنع أكثر من مجرد محتوى",
    en: "About HOC Agency | We create more than content",
  },
  aboutDescription: {
    ar: "HOC Agency وكالة إبداعية تؤمن بأن كل مشروع لديه قصة تستحق أن تُقدّم بطريقة مختلفة. نجمع بين الإبداع، التخطيط والتنفيذ لنساعد المشاريع على بناء حضور رقمي واضح، متناسق وقادر على الوصول إلى الجمهور بطريقة أقرب وأكثر تأثيرًا.",
    en: "HOC Agency is a creative agency that believes every project has a story worth presenting differently. We combine creativity, planning, and execution to help projects build a clear, consistent digital presence that reaches audiences in a closer, more impactful way.",
  },
  projectsTitle: {
    ar: "مشاريع HOC Agency | أفكار خرجت إلى الحياة",
    en: "HOC Agency Projects | Ideas brought to life",
  },
  projectsDescription: {
    ar: "تعرّف على مجموعة من المشاريع التي عمل عليها فريق HOC Agency وكيف تحولت الأفكار إلى تجارب رقمية حقيقية. كل مشروع بالنسبة لنا رحلة تبدأ بفهم الفكرة، ثم تطويرها بعناية حتى تصل إلى النتيجة التي تعبّر عن صاحبها وتحقق الهدف منها.",
    en: "Explore projects the HOC Agency team has worked on and how ideas became real digital experiences. Every project for us is a journey that starts with understanding the idea, then developing it carefully until it reflects its owner and achieves its goal.",
  },
  contactTitle: {
    ar: "تواصل مع HOC Agency | فكرتك قد تكون البداية",
    en: "Contact HOC Agency | Your idea could be the start",
  },
  contactDescription: {
    ar: "لديك مشروع جديد، فكرة تريد تطويرها أو تبحث عن طريقة أفضل لتقديم علامتك على الإنترنت؟ تحدث مع فريق HOC Agency وشاركنا ما تفكر به. سنساعدك على تحديد الخطوة المناسبة وتحويل الفكرة إلى خطة قابلة للتنفيذ.",
    en: "Have a new project, an idea you want to develop, or looking for a better way to present your brand online? Talk to the HOC Agency team and share what you're thinking. We'll help you define the right next step and turn the idea into an actionable plan.",
  },
  servicesTitle: {
    en: "Services",
    ar: "خدماتنا",
  },
  servicesDescription: {
    en: "The fourteen published practices at Home of Creativity (HOC) — visual identity, marketing, social media, websites, events, and more.",
    ar: "الممارسات الأربع عشرة المنشورة لدى بيت الإبداع (HOC) — الهوية البصرية، التسويق، السوشال ميديا، المواقع، الفعاليات، وغيرها.",
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
    ar: "إدارة السوشال ميديا | حضور يصنع فرقًا",
    en: "Social Media Management | Presence that makes a difference",
  },
  socialDescription: {
    ar: "نصنع حضورًا متكاملًا لعلامتك على منصات التواصل الاجتماعي، بدءًا من التخطيط وصناعة الأفكار وكتابة المحتوى، وصولًا إلى النشر وإدارة الحسابات. هدفنا أن تتحول صفحاتك إلى مساحة تعبّر عن مشروعك، تجذب جمهورك وتبني معه علاقة حقيقية.",
    en: "We build an integrated presence for your brand on social platforms — from planning and ideation to copywriting, publishing, and account management. Our goal is to make your pages a space that expresses your project, attracts your audience, and builds a real relationship.",
  },
  clientStoryTitle: {
    en: "A client story",
    ar: "قصة عميل",
  },
  clientStoryDescription: {
    en: "Abu Shaker and Jaddu Shaker — a Home of Creativity partnership. The average client relationship lasts two years.",
    ar: "أبو شاكر وجدو شاكر — شراكة مع بيت الإبداع. متوسط عمر علاقة العملاء معنا سنتان.",
  },
  articlesTitle: {
    ar: "مقالات HOC Agency | أفكار تستحق أن تُقرأ",
    en: "HOC Agency Articles | Ideas worth reading",
  },
  articlesDescription: {
    ar: "مساحة نشارك فيها خبراتنا وأفكارنا حول التسويق، السوشال ميديا، المحتوى، المشاريع الرقمية وكل ما يساعد العلامات والمشاريع على التطور. مقالات عملية، رؤى واضحة وأفكار يمكنك الاستفادة منها وتطبيقها في مشروعك.",
    en: "A space where we share expertise and ideas on marketing, social media, content, digital projects, and everything that helps brands grow. Practical articles, clear insights, and ideas you can apply in your project.",
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
