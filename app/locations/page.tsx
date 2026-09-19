"use client";

import { Footer, Nav } from "@/components/chrome";
import { Locations } from "@/components/sections/Locations";

export default function LocationsPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Locations />
      </main>
      <Footer />
    </>
  );
}
