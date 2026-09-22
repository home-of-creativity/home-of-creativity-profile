"use client";

import { Footer, Nav } from "@/components/chrome";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";

export default function SocialMediaPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ServiceDetailPage slug="social-media" />
      </main>
      <Footer />
    </>
  );
}
