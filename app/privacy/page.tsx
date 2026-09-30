import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { LegalStatic } from "@/components/sections/LegalStatic";
import { legalFallback } from "@/lib/legal-fallback";
import { fetchLegalPage } from "@/lib/legal-api";
import { pageMetadata, pageSeo } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({ ...pageSeo.privacy, path: "/privacy/" });

export default async function PrivacyPage() {
  const page = (await fetchLegalPage("privacy")) ?? legalFallback.privacy;

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
