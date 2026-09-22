"use client";

import { Footer, Nav } from "@/components/chrome";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";

export default function WebsitesEcommercePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ServiceDetailPage slug="websites-ecommerce" />
      </main>
      <Footer />
    </>
  );
}
