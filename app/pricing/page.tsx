import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { JsonLd } from "@/components/JsonLd";
import { Pricing } from "@/components/sections/Pricing";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { fetchPricingCategories } from "@/lib/pricing-api";
import type { PricingCategory } from "@/lib/pricing-catalog";
import { pricingPageJsonLd } from "@/lib/seo";

/** "Startup Build بـ399$ وBusiness Growth بـ899$…", from the same data the page renders. */
function pricingDescription(categories: PricingCategory[]): string {
  const plans = categories
    .flatMap((category) => category.subcategories.filter((sub) => !sub.oneTime).flatMap((sub) => sub.plans))
    .filter((plan) => plan.prices?.monthly)
    .slice(0, 3);
  if (plans.length === 0) return pageSeo.pricing.description;
  const list = plans.map((plan) => `${plan.name.en} بـ${plan.prices!.monthly.toLocaleString("en-US")}$`).join(" و");
  const text = `أسعار باقات بيت الإبداع HOC بالدولار: ${list} شهرياً، مع خصم يصل إلى 20% على الاشتراك السنوي.`;
  return text.length >= 120 && text.length <= 160 ? text : pageSeo.pricing.description;
}

export async function generateMetadata(): Promise<Metadata> {
  const categories = await fetchPricingCategories();
  return pageMetadata({ title: pageSeo.pricing.title, titleEn: pageSeo.pricing.titleEn, description: pricingDescription(categories), path: "/pricing/" });
}

export default async function PricingPage() {
  const categories = await fetchPricingCategories();
  return (
    <>
      <JsonLd data={pricingPageJsonLd(categories, pageSeo.pricing.title, pricingDescription(categories))} />
      <Nav />
      <main id="top">
        <Pricing initialCategories={categories} />
      </main>
      <Footer />
    </>
  );
}
