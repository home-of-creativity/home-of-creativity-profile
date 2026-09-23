import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoAboutJsonLd } from "@/components/SeoAboutJsonLd";
import { seoCopy, seoMetaDescription, seoMetaTitle } from "@/lib/site";

const title = seoMetaTitle(seoCopy.aboutTitle);
const description = seoMetaDescription(seoCopy.aboutDescription);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about/" },
  openGraph: {
    title,
    description,
    url: "/about/",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SeoAboutJsonLd />
      {children}
    </>
  );
}
