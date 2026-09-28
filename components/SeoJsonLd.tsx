import { siteJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/** Site-wide graph (Organization, WebSite, offices). Rendered on every page from the root layout. */
export function SeoJsonLd() {
  return <JsonLd data={siteJsonLd()} />;
}
