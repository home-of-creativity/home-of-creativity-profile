import type { Metadata } from "next";
import type { ReactNode } from "react";
import { seoCopy, seoMetaDescription, seoMetaTitle } from "@/lib/site";

const title = seoMetaTitle(seoCopy.pricingTitle);
const description = seoMetaDescription(seoCopy.pricingDescription);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title,
    description,
    url: "/pricing/",
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children;
}
