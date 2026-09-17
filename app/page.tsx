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
import { SocialPhones } from "@/components/sections/SocialPhones";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <div className="relative isolate overflow-hidden bg-[var(--brand-purple)] text-[var(--brand-ivory)]">
          <div
            aria-hidden
            className="radial-burst pointer-events-none absolute inset-0 opacity-30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(231_153_58/0.16),transparent_42%)]"
          />
          <Services />
          <ShowcaseClients />
        </div>
        <ClientJourney />
        <Reels />
        <SocialPhones />
        <Projects />
        <Finance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
