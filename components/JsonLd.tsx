import { jsonLdScript } from "@/lib/seo";

/** One `<script type="application/ld+json">` block, server-rendered into the static HTML. */
export function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />;
}
