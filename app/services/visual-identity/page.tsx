"use client";

import { Footer, Nav } from "@/components/chrome";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";

export default function VisualIdentityPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ServiceDetailPage slug="visual-identity" />
      </main>
      <Footer />
    </>
  );
}
