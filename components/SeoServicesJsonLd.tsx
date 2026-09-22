import { servicesPageJsonLd } from "@/lib/seo";

export function SeoServicesJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageJsonLd()) }}
    />
  );
}
