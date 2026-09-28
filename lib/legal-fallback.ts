import type { LegalPage } from "./legal-api";

/** Shown when the legal API is missing or errors. Matches the stored defaults. */
export const legalFallback: Record<"privacy" | "terms", LegalPage> = {
  privacy: {
    slug: "privacy",
    title_ar: "سياسة الخصوصية",
    title_en: "Privacy Policy",
    sections: [
      {
        id: "about",
        heading_ar: "من نحن",
        heading_en: "Who we are",
        html_ar:
          "<p>بيت الإبداع (Home of Creativity / HOC) وكالة هوية بصرية تعمل من دمشق. تشرح هذه السياسة كيف نجمع المعلومات الشخصية ونستخدمها ونحميها عند زيارة الموقع أو التواصل معنا.</p>",
        html_en:
          "<p>Home of Creativity (HOC / بيت الإبداع) is a brand studio based in Damascus. This policy explains how we collect, use, and protect personal information when you visit the site or contact us.</p>",
      },
      {
        id: "information-you-give",
        heading_ar: "معلومات تقدّمها أنت",
        heading_en: "Information you provide",
        html_ar:
          "<p>قد نطلب الاسم ورقم الهاتف والبريد واسم الشركة، ومحتوى الرسائل والملفات التي ترسلها، وتفاصيل الباقة التي تختارها.</p>",
        html_en:
          "<p>We may collect your name, phone, email, and company, the messages and files you send, and the package you choose.</p>",
      },
    ],
  },
  terms: {
    slug: "terms",
    title_ar: "شروط الاستخدام",
    title_en: "Terms of Use",
    sections: [
      {
        id: "agreement",
        heading_ar: "الاتفاق",
        heading_en: "The agreement",
        html_ar:
          "<p>باستخدامك الموقع أو البوت أو أي خدمة نقدمها فإنك توافق على هذه الشروط وعلى سياسة الخصوصية. إن لم توافق، لا تستخدم الخدمة.</p>",
        html_en:
          "<p>By using the website, Telegram bot, or any service we offer, you agree to these terms and to the Privacy Policy. If you do not agree, do not use the service.</p>",
      },
      {
        id: "payments",
        heading_ar: "الأسعار والدفع",
        heading_en: "Pricing and payment",
        html_ar:
          "<p>الأسعار بالدولار الأمريكي. الدفع قد يكون كاملاً أو جزئياً حسب الباقة. لا نبدأ التنفيذ قبل تأكيد المبلغ المستلم.</p>",
        html_en:
          "<p>Fees are in US dollars. Payment may be full or partial depending on the package. Work starts after we confirm the amount received.</p>",
      },
    ],
  },
};
