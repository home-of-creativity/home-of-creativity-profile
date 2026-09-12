"use client";

import { Footer, Nav } from "@/components/chrome";
import { About } from "@/components/sections/About";
import { ClientJourney } from "@/components/sections/ClientJourney";
import { ShowcaseClients } from "@/components/sections/ShowcaseClients";
import { Contact } from "@/components/sections/Contact";
import { Finance } from "@/components/sections/Finance";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Reels } from "@/components/sections/Reels";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <ShowcaseClients />
        <ClientJourney />
        <Reels />
        <Projects />
        <Finance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
