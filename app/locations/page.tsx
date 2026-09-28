import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { JsonLd } from "@/components/JsonLd";
import { Locations } from "@/components/sections/Locations";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { locationsPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageSeo.locations, path: "/locations/" });

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={locationsPageJsonLd(pageSeo.locations.title, pageSeo.locations.description)} />
      <Nav />
      <main id="top">
        <Locations />
      </main>
      <Footer />
    </>
  );
}
