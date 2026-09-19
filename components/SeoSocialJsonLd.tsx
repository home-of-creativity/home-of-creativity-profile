import { socialPageJsonLd } from "@/lib/seo";

export function SeoSocialJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(socialPageJsonLd()) }}
    />
  );
}
