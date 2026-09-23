import { Footer, Nav } from "@/components/chrome";
import { SeoServicesJsonLd } from "@/components/SeoServicesJsonLd";
import { ServicesPage } from "@/components/sections/ServicesPage";

export default function ServicesRoutePage() {
  return (
    <>
      <SeoServicesJsonLd />
      <Nav />
      <main id="top">
        <ServicesPage />
      </main>
      <Footer />
    </>
  );
}
