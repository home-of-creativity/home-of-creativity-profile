import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { pageMetadata, pageSeo } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({ ...pageSeo.terms, path: "/terms/" });

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <LegalDocument slug="terms" />
      </main>
      <Footer />
    </>
  );
}
