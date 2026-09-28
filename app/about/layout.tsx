import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { aboutPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageSeo.about, path: "/about/" });

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={aboutPageJsonLd(pageSeo.about.title)} />
      {children}
    </>
  );
}
