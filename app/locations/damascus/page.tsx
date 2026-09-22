import { Footer, Nav } from "@/components/chrome";
import { DamascusPlace } from "@/components/sections/DamascusPlace";

export default function DamascusLocationPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <DamascusPlace />
      </main>
      <Footer />
    </>
  );
}
