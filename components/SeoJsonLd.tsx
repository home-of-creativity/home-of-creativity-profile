import { siteJsonLd } from "@/lib/seo";

/** Site-wide graph (Organization + WebSite). Rendered on every page from the root layout. */
export function SeoJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
    />
  );
}
