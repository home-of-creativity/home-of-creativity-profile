import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { JsonLd } from "@/components/JsonLd";
import { ServicesPage } from "@/components/sections/ServicesPage";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { servicesPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...pageSeo.services, path: "/services/" });

export default function ServicesRoutePage() {
  return (
    <>
      <JsonLd data={servicesPageJsonLd(pageSeo.services.title, pageSeo.services.description)} />
      <Nav />
      <main id="top">
        <ServicesPage />
      </main>
      <Footer />
    </>
  );
}
