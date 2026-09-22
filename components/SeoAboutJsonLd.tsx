import { aboutPageJsonLd } from "@/lib/seo";

export function SeoAboutJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd()) }}
    />
  );
}
