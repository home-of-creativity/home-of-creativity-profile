import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { pageDescription, seoCopy } from "@/lib/site";

export const metadata: Metadata = {
  title: `${seoCopy.privacyTitle.ar} | ${seoCopy.privacyTitle.en}`,
  description: pageDescription(seoCopy.privacyDescription.en, seoCopy.privacyDescription.ar),
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <LegalDocument slug="privacy" />
      </main>
      <Footer />
    </>
  );
}
