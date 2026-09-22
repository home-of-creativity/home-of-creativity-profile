import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoServicesJsonLd } from "@/components/SeoServicesJsonLd";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.servicesTitle.en, seoCopy.servicesTitle.ar);
const description = pageDescription(seoCopy.servicesDescription.en, seoCopy.servicesDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services/" },
  openGraph: {
    title,
    description,
    url: "/services/",
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SeoServicesJsonLd />
      {children}
    </>
  );
}
