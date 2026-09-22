"use client";

import { Footer, Nav } from "@/components/chrome";
import { AboutPage } from "@/components/sections/AboutPage";

export default function AboutRoutePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
