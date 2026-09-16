import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.pricingTitle.en, seoCopy.pricingTitle.ar);
const description = pageDescription(seoCopy.pricingDescription.en, seoCopy.pricingDescription.ar);

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
