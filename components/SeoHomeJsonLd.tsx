import { homeJsonLd } from "@/lib/seo";

/**
 * Home-only graph (LocalBusiness + FAQPage). Rendered only on `/`, which is
 * the only page with a visible `#faq` section matching this FAQPage markup.
 */
export function SeoHomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
    />
  );
}
