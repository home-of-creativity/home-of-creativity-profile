"use client";

import { Footer, Nav } from "@/components/chrome";
import { Pricing } from "@/components/sections/Pricing";

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
