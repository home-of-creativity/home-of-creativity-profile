import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoAboutJsonLd } from "@/components/SeoAboutJsonLd";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.aboutTitle.en, seoCopy.aboutTitle.ar);
const description = pageDescription(seoCopy.aboutDescription.en, seoCopy.aboutDescription.ar);

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
