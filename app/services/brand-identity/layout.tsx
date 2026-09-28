import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { brandIdentityPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageSeo.brandIdentity, path: "/services/brand-identity/" });

export default function BrandIdentityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={brandIdentityPageJsonLd()} />
      {children}
    </>
  );
}
