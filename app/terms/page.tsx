import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { pageDescription, seoCopy } from "@/lib/site";

export const metadata: Metadata = {
  title: `${seoCopy.termsTitle.ar} | ${seoCopy.termsTitle.en}`,
  description: pageDescription(seoCopy.termsDescription.en, seoCopy.termsDescription.ar),
  alternates: { canonical: "/terms/" },
};

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
