import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoServiceDetailJsonLd } from "@/components/SeoServiceDetailJsonLd";
import { serviceDetails } from "@/lib/content";
import { pageDescription } from "@/lib/site";

const SLUG = "visual-identity";
const detail = serviceDetails.find((entry) => entry.slug === SLUG)!;

const title = "Visual Identity Design in Damascus | HOC";
const description = pageDescription(detail.metaDescription.en, detail.metaDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `/services/${SLUG}/` },
  openGraph: {
    title,
    description,
    url: `/services/${SLUG}/`,
  },
};

export default function VisualIdentityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SeoServiceDetailJsonLd slug={SLUG} />
      {children}
    </>
  );
}
