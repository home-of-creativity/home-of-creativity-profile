import type { Metadata } from "next";
import type { ReactNode } from "react";
import { seoCopy } from "@/lib/site";

export const metadata: Metadata = {
  title: seoCopy.pricingTitle.en,
  description: seoCopy.pricingDescription.en,
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title: `${seoCopy.pricingTitle.en} — Home of Creativity`,
    description: seoCopy.pricingDescription.en,
    url: "/pricing/",
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children;
}
