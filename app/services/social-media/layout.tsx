import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoServiceDetailJsonLd } from "@/components/SeoServiceDetailJsonLd";
import { serviceDetails } from "@/lib/content";
import { pageDescription, pageTitle } from "@/lib/site";

const SLUG = "social-media";
const detail = serviceDetails.find((entry) => entry.slug === SLUG)!;

const title = pageTitle(detail.title.en, detail.title.ar);
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

export default function SocialMediaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SeoServiceDetailJsonLd slug={SLUG} />
      {children}
    </>
  );
}
