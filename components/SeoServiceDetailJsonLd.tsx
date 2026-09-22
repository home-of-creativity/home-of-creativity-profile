import { serviceDetailJsonLd } from "@/lib/seo";

export function SeoServiceDetailJsonLd({ slug }: { slug: string }) {
  const data = serviceDetailJsonLd(slug);
  if (!data) return null;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
