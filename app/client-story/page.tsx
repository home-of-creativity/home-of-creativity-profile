"use client";

import { Footer, Nav } from "@/components/chrome";
import { ClientStory } from "@/components/sections/ClientStory";

export default function ClientStoryPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ClientStory />
      </main>
      <Footer />
    </>
  );
}
