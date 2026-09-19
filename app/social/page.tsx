"use client";

import { Footer, Nav } from "@/components/chrome";
import { SocialPhones } from "@/components/sections/SocialPhones";

export default function SocialPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <SocialPhones />
      </main>
      <Footer />
    </>
  );
}
