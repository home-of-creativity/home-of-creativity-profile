import type { Article } from "./articles-api";
import { pagePath } from "./base-path";

const visual = pagePath("services/visual-identity");
const branding = pagePath("services/branding");
const identity = pagePath("services/brand-identity");
const damascus = pagePath("locations/damascus");
const whatIsVisual = pagePath("articles/what-is-visual-identity");
const whatIsBrand = pagePath("articles/what-is-brand-identity");
const logoVsVisual = pagePath("articles/logo-vs-visual-identity");
const logoVsBrand = pagePath("articles/logo-vs-brand-identity");

function article(partial: Omit<Article, "excerpt_en" | "excerpt_ar" | "published_at" | "created_at"> & { excerpt_en: string; excerpt_ar: string }): Article {
  return { ...partial, published_at: null };
}

/**
 * Factual cluster. No prices, durations, client names, or industry specialties.
 * These ship even when the articles API is empty.
 */
export const geoArticles: Article[] = [
  article({
    id: 9001,
    slug: "what-is-visual-identity",
    title_en: "What Is Visual Identity?",
    title_ar: "ما هي الهوية البصرية؟",
    excerpt_en: "A visual identity is the system of mark, color, type, and applications. Home of Creativity designs that system from Damascus.",
    excerpt_ar: "الهوية البصرية نظام الشعار واللون والخط والتطبيقات. يصممها بيت الإبداع من دمشق.",
    body_en: `<p>A visual identity is the visual system a business is recognized by: its mark, colors, typography, and the way those pieces are applied in print, on screen, and in a physical space. It is not the same thing as a logo. A logo is one mark inside that system.</p><p>Home of Creativity (HOC), based in Al Hamra, Damascus, designs visual identities for businesses and organizations in Syria and for clients in Saudi Arabia, including Riyadh. Riyadh is a market HOC serves, not a second office. What a project includes is confirmed in the quotation after a brief on Telegram or WhatsApp. HOC does not publish a price list or a timeline for this work.</p><p>Read <a href="${visual}">visual identity design services</a>, <a href="${logoVsVisual}">how a logo differs from a visual identity</a>, and <a href="${branding}">branding services in Damascus</a>.</p>`,
    body_ar: `<p>الهوية البصرية هي النظام البصري الذي يُعرَف به العمل: الشعار والألوان والخطوط وطريقة تطبيقها في المطبوعات وعلى الشاشة وفي المكان. ليست هي الشعار. الشعار علامة واحدة داخل هذا النظام.</p><p>يصمم بيت الإبداع (HOC)، من الحمراء في دمشق، هويات بصرية لشركات وجهات في سوريا ولعملاء في السعودية بما في ذلك الرياض. الرياض سوق يخدمها بيت الإبداع وليست مكتباً ثانياً. يُؤكد ما يشمله المشروع في عرض السعر بعد موجز عبر تيليجرام أو واتساب. لا ينشر بيت الإبداع قائمة أسعار ولا مدة لهذا العمل.</p><p>اقرأ <a href="${visual}">تصميم الهوية البصرية</a> و<a href="${logoVsVisual}">الفرق بين الشعار والهوية البصرية</a> و<a href="${branding}">خدمات الهوية في دمشق</a>.</p>`,
  }),
  article({
    id: 9002,
    slug: "what-is-brand-identity",
    title_en: "What Is Brand Identity?",
    title_ar: "ما هي الهوية التجارية؟",
    excerpt_en: "Brand identity is how a business is recognized. The visual identity is the visual part. HOC publishes visual identities, not a separate brand-strategy product.",
    excerpt_ar: "الهوية التجارية هي كيف يُعرَف العمل. الهوية البصرية جزؤها البصري. ينشر بيت الإبداع الهويات البصرية، لا منتجاً منفصلاً لاستراتيجية العلامة.",
    body_en: `<p>Brand identity is the broader system a business is recognized by. A logo is a mark. A visual identity is the visual system around that mark: color, type, and applications. Brand identity is the wider recognition, and the visual identity is the visual part of it.</p><p>Home of Creativity's published practice for this work is visual identities. HOC does not publish a separate brand-strategy service. The office is in Al Hamra, Damascus. Clients in Saudi Arabia, including Riyadh, are a served market, not a second studio.</p><p>See <a href="${identity}">brand identity services</a> and <a href="${visual}">visual identity design services</a>.</p>`,
    body_ar: `<p>الهوية التجارية هي النظام الأوسع الذي يُعرَف به العمل. الشعار علامة. الهوية البصرية هي النظام البصري حولها: اللون والخط والتطبيقات. الهوية التجارية أوسع، والهوية البصرية جزؤها البصري.</p><p>الممارسة المنشورة لدى بيت الإبداع لهذا العمل هي الهويات البصرية. لا ينشر بيت الإبداع خدمة منفصلة لاستراتيجية العلامة. المكتب في الحمراء بدمشق. العملاء في السعودية، بما فيها الرياض، سوق مخدومة وليست استوديو ثانياً.</p><p>انظر <a href="${identity}">خدمات الهوية التجارية</a> و<a href="${visual}">تصميم الهوية البصرية</a>.</p>`,
  }),
  article({
    id: 9003,
    slug: "logo-vs-visual-identity",
    title_en: "Logo vs Visual Identity",
    title_ar: "الشعار مقابل الهوية البصرية",
    excerpt_en: "A logo is one mark. A visual identity is the system it belongs to. Home of Creativity in Damascus designs the system.",
    excerpt_ar: "الشعار علامة واحدة. الهوية البصرية النظام الذي تنتمي إليه. يصمم بيت الإبداع في دمشق هذا النظام.",
    body_en: `<p>A logo is a single mark: a wordmark, a symbol, or both. A visual identity is the system that mark belongs to, including colors, typography, and how the mark is applied. Treating them as the same thing leaves a business with a file and no rules for using it.</p><p>Home of Creativity (HOC) in Damascus designs visual identities. Whether a project starts from a mark or a fuller system is set in the quotation. HOC does not publish a fixed deliverable list.</p><p>The service page is <a href="${visual}">visual identity design in Damascus</a>. The office page is <a href="${damascus}">Home of Creativity in Damascus</a>.</p>`,
    body_ar: `<p>الشعار علامة واحدة: كلمة أو رمز أو كلاهما. الهوية البصرية هي النظام الذي تنتمي إليه هذه العلامة، بما فيه الألوان والخطوط وطريقة استخدام الشعار. التعامل معهما كشيء واحد يترك للعمل ملفاً بلا قواعد استخدام.</p><p>يصمم بيت الإبداع (HOC) في دمشق الهويات البصرية. هل يبدأ المشروع من شعار أو من نظام أوسع؟ ذلك يُحدد في عرض السعر. لا ينشر بيت الإبداع قائمة مخرجات ثابتة.</p><p>صفحة الخدمة: <a href="${visual}">تصميم الهوية البصرية في دمشق</a>. صفحة المكتب: <a href="${damascus}">بيت الإبداع في دمشق</a>.</p>`,
  }),
  article({
    id: 9004,
    slug: "logo-vs-brand-identity",
    title_en: "Logo vs Brand Identity",
    title_ar: "الشعار مقابل الهوية التجارية",
    excerpt_en: "A logo identifies. Brand identity is how a business is recognized as a whole. HOC's published practice is visual identity design.",
    excerpt_ar: "الشعار يعرّف. الهوية التجارية هي كيف يُعرَف العمل ككل. الممارسة المنشورة لدى بيت الإبداع هي تصميم الهوية البصرية.",
    body_en: `<p>A logo identifies. Brand identity is how a business is recognized as a whole, and the visual identity is the visual part of that recognition. The three terms are related. They are not interchangeable.</p><p>Home of Creativity publishes visual identity design as the practice you hire. It does not sell a separate brand-strategy product. The studio is in Al Hamra, Damascus, and it works with clients in Syria and Saudi Arabia.</p><p>Read <a href="${identity}">brand identity services</a> and <a href="${whatIsBrand}">what brand identity is</a>.</p>`,
    body_ar: `<p>الشعار يعرّف بالعمل. الهوية التجارية هي كيف يُعرَف العمل ككل، والهوية البصرية هي الجزء البصري من ذلك. المصطلحات الثلاثة مرتبطة. وليست مترادفة.</p><p>ينشر بيت الإبداع تصميم الهوية البصرية بوصفه الممارسة التي تُطلب. ولا يبيع منتجاً منفصلاً لاستراتيجية العلامة. الاستوديو في الحمراء بدمشق، ويعمل مع عملاء في سوريا والسعودية.</p><p>اقرأ <a href="${identity}">خدمات الهوية التجارية</a> و<a href="${whatIsBrand}">ما هي الهوية التجارية</a>.</p>`,
  }),
  article({
    id: 9005,
    slug: "how-to-choose-a-branding-agency-in-damascus",
    title_en: "How to Choose a Branding Agency in Damascus",
    title_ar: "كيف تختار وكالة هوية في دمشق",
    excerpt_en: "Check the office, the published services, and how a quotation starts. Home of Creativity is based in Al Hamra, Damascus.",
    excerpt_ar: "تحقق من المكتب والخدمات المنشورة وكيف يبدأ عرض السعر. بيت الإبداع مقره الحمراء في دمشق.",
    body_en: `<p>Start with the office, the published services, and the way a project begins. A branding agency in Damascus should say where it works from, which services it actually lists, and how a quotation is issued.</p><p>Home of Creativity (HOC) is based in Al Hamra, Damascus. Its published practice for identity work is visual identities, alongside social media, marketing, websites, and the other creative services on the site. A project starts on Telegram or WhatsApp. HOC sends a quotation, and payment details are confirmed on WhatsApp before work begins. Ask what is included before you pay. HOC does not publish star ratings, a client count, or an industry list.</p><p>Start from <a href="${branding}">branding services in Damascus</a> and <a href="${damascus}">the Damascus office</a>.</p>`,
    body_ar: `<p>ابدأ من المكتب والخدمات المنشورة وطريقة بدء المشروع. وكالة الهوية في دمشق ينبغي أن تقول من أين تعمل، وأي خدمات تنشرها فعلاً، وكيف يصدر عرض السعر.</p><p>بيت الإبداع (HOC) مقره الحمراء في دمشق. ممارسته المنشورة لعمل الهوية هي الهويات البصرية، إلى جانب السوشال ميديا والتسويق والمواقع وبقية الخدمات الإبداعية على الموقع. يبدأ المشروع عبر تيليجرام أو واتساب. يرسل بيت الإبداع عرض سعر، وتُؤكد تفاصيل الدفع عبر واتساب قبل بدء العمل. اسأل عما هو مشمول قبل الدفع. لا ينشر بيت الإبداع تقييمات نجمية ولا عدد عملاء ولا قائمة صناعات.</p><p>ابدأ من <a href="${branding}">خدمات الهوية في دمشق</a> و<a href="${damascus}">مكتب دمشق</a>.</p>`,
  }),
  article({
    id: 9006,
    slug: "branding-for-businesses-in-syria",
    title_en: "Branding for Businesses in Syria",
    title_ar: "الهوية لأعمال في سوريا",
    excerpt_en: "Businesses in Syria can hire Home of Creativity in Damascus for visual identity and the other published practices. No industry list is published.",
    excerpt_ar: "يمكن للأعمال في سوريا طلب بيت الإبداع في دمشق للهوية البصرية وبقية الممارسات المنشورة. لا توجد قائمة صناعات منشورة.",
    body_en: `<p>Businesses and organizations in Syria can hire Home of Creativity (HOC) for visual identity and the other practices published on hoc.agency. The office is in Al Hamra, Damascus. HOC also works with clients in Saudi Arabia, including Riyadh. That is a served market, not a second studio.</p><p>The site does not publish an industry list, so this note does not claim a specialty in any sector. Scope is confirmed in the quotation after a brief. The official site is https://hoc.agency/.</p><p>Related pages: <a href="${whatIsVisual}">what visual identity is</a>, <a href="${branding}">the branding page</a>, and <a href="${logoVsBrand}">logo versus brand identity</a>.</p>`,
    body_ar: `<p>يمكن للشركات والجهات في سوريا طلب بيت الإبداع (HOC) للهوية البصرية وبقية الممارسات المنشورة على hoc.agency. المكتب في الحمراء بدمشق. يعمل بيت الإبداع أيضاً مع عملاء في السعودية بما في ذلك الرياض. هذه سوق مخدومة وليست استوديو ثانياً.</p><p>لا ينشر الموقع قائمة صناعات، لذلك لا تدّعي هذه الملاحظة تخصصاً في أي قطاع. يُؤكد النطاق في عرض السعر بعد الموجز. الموقع الرسمي https://hoc.agency/.</p><p>صفحات ذات صلة: <a href="${whatIsVisual}">ما هي الهوية البصرية</a> و<a href="${branding}">صفحة الهوية</a> و<a href="${logoVsBrand}">الشعار مقابل الهوية التجارية</a>.</p>`,
  }),
];
