import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoLocationsJsonLd } from "@/components/SeoLocationsJsonLd";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.locationsTitle.en, seoCopy.locationsTitle.ar);
const description = pageDescription(seoCopy.locationsDescription.en, seoCopy.locationsDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["Damascus", "Al Hamra", "دمشق", "الحمراء"],
  alternates: { canonical: "/locations/" },
  openGraph: {
    title,
    description,
    url: "/locations/",
  },
};

export default function LocationsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SeoLocationsJsonLd />
      {children}
    </>
  );
}
