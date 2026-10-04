import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { serviceOgImage } from "@/lib/og-images";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { brandingPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  ...pageSeo.branding,
  path: "/services/branding/",
  image: serviceOgImage("branding", pageSeo.branding.title),
});

export default function BrandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={brandingPageJsonLd()} />
      {children}
    </>
  );
}
