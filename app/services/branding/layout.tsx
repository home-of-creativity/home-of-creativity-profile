import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { brandingPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageSeo.branding, path: "/services/branding/" });

export default function BrandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={brandingPageJsonLd()} />
      {children}
    </>
  );
}
