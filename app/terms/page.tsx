import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { LegalStatic } from "@/components/sections/LegalStatic";
import { legalFallback } from "@/lib/legal-fallback";
import { fetchLegalPage } from "@/lib/legal-api";
import { pageMetadata, pageSeo } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({ ...pageSeo.terms, path: "/terms/" });

export default async function TermsPage() {
  const page = (await fetchLegalPage("terms")) ?? legalFallback.terms;

  return (
    <>
      <Nav />
      <main id="top">
        <LegalStatic page={page} />
      </main>
      <Footer />
    </>
  );
}
