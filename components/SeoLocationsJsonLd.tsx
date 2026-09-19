import { locationsPageJsonLd } from "@/lib/seo";

export function SeoLocationsJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsPageJsonLd()) }}
    />
  );
}
