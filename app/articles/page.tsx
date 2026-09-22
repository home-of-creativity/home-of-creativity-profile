"use client";

import { Footer, Nav } from "@/components/chrome";
import { ArticlesIndex } from "@/components/sections/ArticlesIndex";

export default function ArticlesPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ArticlesIndex />
      </main>
      <Footer />
    </>
  );
}
