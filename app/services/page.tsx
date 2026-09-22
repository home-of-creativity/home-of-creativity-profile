"use client";

import { Footer, Nav } from "@/components/chrome";
import { ServicesPage } from "@/components/sections/ServicesPage";

export default function ServicesRoutePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ServicesPage />
      </main>
      <Footer />
    </>
  );
}
