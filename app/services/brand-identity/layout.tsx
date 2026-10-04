import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { serviceOgImage } from "@/lib/og-images";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { brandIdentityPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  ...pageSeo.brandIdentity,
  path: "/services/brand-identity/",
  image: serviceOgImage("brand-identity", pageSeo.brandIdentity.title),
});

export default function BrandIdentityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={brandIdentityPageJsonLd()} />
      {children}
    </>
  );
}
