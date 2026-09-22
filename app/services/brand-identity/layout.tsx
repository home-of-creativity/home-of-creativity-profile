import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brandIdentityPage } from "@/lib/content";
import { brandIdentityPageJsonLd } from "@/lib/seo";
import { pageDescription } from "@/lib/site";

const title = brandIdentityPage.metaTitle;
const description = pageDescription(brandIdentityPage.metaDescription.en, brandIdentityPage.metaDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services/brand-identity/" },
  openGraph: { title, description, url: "/services/brand-identity/" },
};

export default function BrandIdentityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandIdentityPageJsonLd()) }}
      />
      {children}
    </>
  );
}
