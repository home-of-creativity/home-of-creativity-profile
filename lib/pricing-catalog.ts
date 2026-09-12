import type { Copy } from "./i18n";

export type BillingPeriod = "monthly" | "quarterly" | "semiannual" | "yearly";

export type PricingReach = {
  adBudgetUsd: number;
  adCreditUsd: number;
  estimatedReach: Copy;
  goal: Copy;
};

export type PricingPlan = {
  id: string;
  name: Copy;
  subtitle: Copy;
  featured?: boolean;
  badge?: Copy;
  features: Copy[];
  prices?: Record<BillingPeriod, number>;
  priceUsd?: number;
  reach?: PricingReach;
};

export type PricingSubcategory = {
  id: string;
  name: Copy;
  lead?: Copy;
  oneTime?: boolean;
  leadInBox?: boolean;
  leadNote?: Copy;
  plans: PricingPlan[];
};

export type PricingCategory = {
  id: string;
  name: Copy;
  lead: Copy;
  subcategories: PricingSubcategory[];
};

export function planPrices(monthly: number): Record<BillingPeriod, number> {
  return {
    monthly,
    quarterly: Math.round(monthly * 3 * 0.95),
    semiannual: Math.round(monthly * 6 * 0.9),
    yearly: Math.round(monthly * 12 * 0.8),
  };
}

export const pricingCategories: PricingCategory[] = [
  {
    id: "strategic",
    name: { en: "Strategic solutions", ar: "باقات الحلول الاستراتيجية" },
    lead: {
      en: "Full-service retainers for startups, growing businesses, and established brands building long-term authority.",
      ar: "اشتراكات متكاملة للمنشآت الصغيرة والمتوسطة والكبيرة التي تبني حضوراً طويل الأمد.",
    },
    subcategories: [
      {
        id: "strategic-retainers",
        name: { en: "Integrated strategic packages", ar: "باقات استراتيجية متكاملة" },
        lead: {
          en: "Monthly, 3-month, 6-month, or yearly billing — longer commitments unlock bigger savings.",
          ar: "اشتراك شهري أو 3 شهور أو 6 شهور أو سنوي — كلما طالت المدة زاد التوفير.",
        },
        plans: [
          {
            id: "startup-build",
            name: { en: "Startup Build", ar: "Startup Build" },
            subtitle: { en: "Small business package", ar: "باقة المنشآت الصغيرة" },
            prices: planPrices(399),
            features: [
              { en: "7 graphic posts", ar: "7 بوست غرافيك" },
              { en: "2 reels (filming & editing)", ar: "2 ريلز (تصوير ومونتاج)" },
              { en: "9 stories", ar: "9 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "2 social platforms managed", ar: "إدارة منصتين تواصل اجتماعي" },
              { en: "Performance report", ar: "تقرير الأداء" },
              { en: "2 paid ad campaigns managed", ar: "إدارة حملتين إعلان ممولة" },
              {
                en: "Advanced QR code for contact & services",
                ar: "كيو آر كود متطور لعرض معلومات التواصل والخدمات",
              },
            ],
          },
          {
            id: "business-growth",
            name: { en: "Business Growth", ar: "Business Growth" },
            subtitle: { en: "Mid-size business package", ar: "باقة المنشآت المتوسطة" },
            prices: planPrices(899),
            featured: true,
            badge: { en: "Popular", ar: "الأكثر طلباً" },
            features: [
              { en: "11 graphic posts", ar: "11 بوست غرافيك" },
              { en: "4 reels (filming & editing)", ar: "4 ريلز (تصوير ومونتاج)" },
              { en: "15 stories", ar: "15 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "3 social platforms managed", ar: "إدارة 3 منصات تواصل اجتماعي" },
              { en: "Advanced reports", ar: "تقارير متقدمة" },
              { en: "5 paid ad campaigns managed", ar: "إدارة 5 حملات إعلان ممولة" },
              { en: "Google Maps business listing", ar: "إنشاء موقع على جوجل ماب" },
              {
                en: "Advanced QR code for contact & services",
                ar: "كيو آر كود متطور لعرض معلومات التواصل والخدمات",
              },
              { en: "Periodic competitor study", ar: "دراسة دورية للمنافسين" },
              { en: "Dedicated brand advisory team", ar: "فريق استشاري مخصص للعلامة" },
            ],
          },
          {
            id: "elite-authority",
            name: { en: "Elite Authority", ar: "Elite Authority" },
            subtitle: { en: "Enterprise package", ar: "باقة المنشآت الكبيرة" },
            prices: planPrices(1499),
            features: [
              { en: "22 graphic posts", ar: "22 بوست غرافيك" },
              { en: "8 reels (filming, editing & CGI)", ar: "8 ريلز (تصوير ومونتاج وCGI)" },
              { en: "30 stories", ar: "30 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "5 social platforms managed", ar: "إدارة 5 منصات تواصل اجتماعي" },
              { en: "Unlimited paid ad campaigns", ar: "إدارة عدد مفتوح من الإعلانات الممولة" },
              { en: "Periodic competitor study", ar: "دراسة دورية للمنافسين" },
              { en: "Website or e-store development & management", ar: "تطوير وإدارة موقع أو متجر إلكتروني" },
              { en: "Product photo sessions (limited)", ar: "جلسات تصوير للمنتجات (عدد محدود)" },
              { en: "Dedicated brand advisory team", ar: "فريق استشاري مخصص للعلامة" },
              { en: "Advanced analytics reports", ar: "تقارير تحليلية متقدمة" },
              { en: "Advanced ROI reports", ar: "تقارير ROI متقدمة" },
              {
                en: "Full brand strategy incl. visual identity development",
                ar: "استراتيجية براند كاملة تشمل تطوير الهوية البصرية",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "production",
    name: { en: "Flexible production", ar: "باقات الإنتاج المرن" },
    lead: {
      en: "Integrated content packs and reels-only plans for brands that need focused output without the full strategic layer.",
      ar: "باقات محتوى متكاملة وباقات ريلز مخصصة للعلامات التي تحتاج إنتاجاً مركزاً دون طبقة استراتيجية كاملة.",
    },
    subcategories: [
      {
        id: "integrated-packs",
        name: { en: "Integrated content packs", ar: "باقات محتوى متكاملة" },
        lead: {
          en: "Posts, reels, and stories in one subscription — pick monthly or save with 3, 6, or 12-month plans.",
          ar: "بوستات وريلز وستوري في اشتراك واحد — شهرياً أو وفّر مع خطط 3 و6 و12 شهراً.",
        },
        plans: [
          {
            id: "premium-pack",
            name: { en: "Premium Pack", ar: "Premium Pack" },
            subtitle: { en: "Premium package", ar: "باقة بريميوم" },
            prices: planPrices(399),
            features: [
              { en: "7 graphic posts", ar: "7 بوست غرافيك" },
              { en: "2 reels (filming & editing)", ar: "2 ريلز (تصوير ومونتاج)" },
              { en: "9 stories", ar: "9 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "2 social platforms managed", ar: "إدارة منصتين تواصل اجتماعي" },
              { en: "Performance report", ar: "تقرير الأداء" },
              { en: "2 paid ad campaigns managed", ar: "إدارة حملتين إعلان ممولة" },
            ],
          },
          {
            id: "growth-pack",
            name: { en: "Growth Pack", ar: "Growth Pack" },
            subtitle: { en: "Growth package", ar: "باقة النمو" },
            prices: planPrices(599),
            featured: true,
            badge: { en: "Best value", ar: "الأوفر" },
            features: [
              { en: "11 graphic posts", ar: "11 بوست غرافيك" },
              { en: "4 reels (filming & editing)", ar: "4 ريلز (تصوير ومونتاج)" },
              { en: "15 stories", ar: "15 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "2 social platforms managed", ar: "إدارة منصتين تواصل اجتماعي" },
              { en: "Advanced reports", ar: "تقارير متقدمة" },
              { en: "5 paid ad campaigns managed", ar: "إدارة 5 حملات إعلان ممولة" },
            ],
          },
          {
            id: "infinity-pack",
            name: { en: "Infinity Pack", ar: "Infinity Pack" },
            subtitle: { en: "Infinity package", ar: "باقة إنفنتي" },
            prices: planPrices(899),
            features: [
              { en: "22 graphic posts", ar: "22 بوست غرافيك" },
              { en: "8 reels (filming, editing & CGI)", ar: "8 ريلز (تصوير ومونتاج وCGI)" },
              { en: "30 stories", ar: "30 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "3 social platforms managed", ar: "إدارة 3 منصات تواصل اجتماعي" },
              { en: "Advanced analytics reports", ar: "تقارير تحليلية متقدمة" },
              { en: "Unlimited paid ad campaigns", ar: "إدارة عدد مفتوح من الإعلانات الممولة" },
            ],
          },
        ],
      },
      {
        id: "reels-packs",
        name: { en: "Reels-focused packs", ar: "باقات مخصصة للريلز" },
        lead: {
          en: "Video-first plans for brands that want reach without the full content mix.",
          ar: "باقات تركز على الفيديو للعلامات التي تريد انتشاراً دون مزيج محتوى كامل.",
        },
        plans: [
          {
            id: "reels-premium",
            name: { en: "Reels Premium", ar: "Reels Premium" },
            subtitle: { en: "Reels premium", ar: "ريلز بريميوم" },
            prices: planPrices(399),
            features: [
              {
                en: "4 reels videos (filming & editing only, no graphic posts)",
                ar: "4 فيديوهات ريلز (تصوير ومونتاج فقط) دون بوستات غرافيك",
              },
              { en: "4 stories", ar: "4 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "2 social platforms managed", ar: "إدارة منصتين تواصل اجتماعي" },
              { en: "Performance report", ar: "تقرير الأداء" },
              { en: "2 paid ad campaigns managed", ar: "إدارة حملتين إعلان ممولة" },
            ],
          },
          {
            id: "reels-pro",
            name: { en: "Reels Pro", ar: "Reels Pro" },
            subtitle: { en: "Reels pro", ar: "ريلز برو" },
            prices: planPrices(699),
            features: [
              {
                en: "8 reels videos (filming & editing only, no graphic posts)",
                ar: "8 فيديوهات ريلز (تصوير ومونتاج فقط) دون بوستات غرافيك",
              },
              { en: "8 stories", ar: "8 ستوري" },
              { en: "Highlights", ar: "هايلايت" },
              { en: "Social platform management", ar: "إدارة منصات تواصل اجتماعي" },
              { en: "Advanced analytics reports", ar: "تقارير تحليلية متقدمة" },
              { en: "Unlimited paid ad campaigns", ar: "إدارة عدد مفتوح من الحملات الممولة" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "reach",
    name: { en: "Paid ads & reach", ar: "باقات الإعلانات الممولة والانتشار" },
    lead: {
      en: "One-time campaigns for seasonal offers and multi-region targeting (e.g. Syria and Gulf together).",
      ar: "حملات تستخدم لمرة واحدة للعروض الموسمية واستهداف مناطق متعددة (مثل سوريا ودول الخليج معاً).",
    },
    subcategories: [
      {
        id: "reach-campaigns",
        name: { en: "One-time reach campaigns", ar: "حملات انتشار لمرة واحدة" },
        oneTime: true,
        leadInBox: true,
        leadNote: {
          en: "For clients not on a subscription plan.",
          ar: "مخصصة للعملاء غير المشتركين بالباقات.",
        },
        plans: [
          {
            id: "reach-package",
            name: { en: "Reach Package", ar: "Reach Package" },
            subtitle: { en: "Reach package", ar: "باقة الانتشار" },
            priceUsd: 50,
            reach: {
              adBudgetUsd: 50,
              adCreditUsd: 40,
              estimatedReach: { en: "+1,200,000 people", ar: "+1,200,000 شخص" },
              goal: {
                en: "Make your brand a familiar name to millions.",
                ar: "الوصول بعلامتك التجارية إلى اسم مألوف لدى الملايين.",
              },
            },
            features: [],
          },
          {
            id: "gold-package",
            name: { en: "Gold Package", ar: "Gold Package" },
            subtitle: { en: "Gold package", ar: "الباقة الذهبية" },
            priceUsd: 100,
            featured: true,
            badge: { en: "Strong reach", ar: "انتشار قوي" },
            reach: {
              adBudgetUsd: 100,
              adCreditUsd: 80,
              estimatedReach: { en: "+2,200,000 people", ar: "+2,200,000 شخص" },
              goal: {
                en: "Clear ad dominance and million-scale visibility over competitors.",
                ar: "سيطرة إعلانية واضحة ووصول مليوني يضمن تفوقاً ملحوظاً على المنافسين.",
              },
            },
            features: [],
          },
          {
            id: "diamond-package",
            name: { en: "Diamond Package", ar: "Diamond Package" },
            subtitle: { en: "Diamond package", ar: "الباقة الماسية" },
            priceUsd: 200,
            reach: {
              adBudgetUsd: 200,
              adCreditUsd: 160,
              estimatedReach: { en: "+4,200,000 people", ar: "+4,200,000 شخص" },
              goal: {
                en: "Full dominance of the target market for an extended period.",
                ar: "الهيمنة الكاملة على السوق المستهدف لفترة طويلة.",
              },
            },
            features: [],
          },
        ],
      },
    ],
  },
];

export function resolvePlanPrice(plan: PricingPlan, billing: BillingPeriod) {
  if (plan.priceUsd != null) return plan.priceUsd;
  return plan.prices?.[billing] ?? 0;
}

export function isOneTimePlan(plan: PricingPlan) {
  return plan.priceUsd != null && !plan.prices;
}
