import type { Metadata } from "next";
import type { ReactNode } from "react";
import { seoCopy, seoMetaDescription, seoMetaTitle } from "@/lib/site";

const title = seoMetaTitle(seoCopy.servicesTitle);
const description = seoMetaDescription(seoCopy.servicesDescription);

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
  return children;
}
