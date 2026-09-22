import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brandingPage } from "@/lib/content";
import { brandingPageJsonLd } from "@/lib/seo";
import { pageDescription } from "@/lib/site";

const title = brandingPage.metaTitle;
const description = pageDescription(brandingPage.metaDescription.en, brandingPage.metaDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services/branding/" },
  openGraph: { title, description, url: "/services/branding/" },
};

export default function BrandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandingPageJsonLd()) }} />
      {children}
    </>
  );
}
