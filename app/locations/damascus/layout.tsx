import type { Metadata } from "next";
import type { ReactNode } from "react";
import { damascusPage } from "@/lib/content";
import { damascusPageJsonLd } from "@/lib/seo";
import { pageDescription } from "@/lib/site";

const title = damascusPage.metaTitle;
const description = pageDescription(damascusPage.metaDescription.en, damascusPage.metaDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/locations/damascus/" },
  openGraph: { title, description, url: "/locations/damascus/" },
};

export default function DamascusLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(damascusPageJsonLd()) }} />
      {children}
    </>
  );
}
