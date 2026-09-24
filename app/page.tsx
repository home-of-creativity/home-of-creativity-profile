"use client";

import dynamic from "next/dynamic";
import { Footer, Nav } from "@/components/chrome";
import { SeoCrawlerCopy } from "@/components/SeoCrawlerCopy";
import { SeoHomeJsonLd } from "@/components/SeoHomeJsonLd";
import { About } from "@/components/sections/About";
import { ClientJourney } from "@/components/sections/ClientJourney";
import { ClientVoices } from "@/components/sections/ClientVoices";
import { ShowcaseClients } from "@/components/sections/ShowcaseClients";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Finance } from "@/components/sections/Finance";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

const Reels = dynamic(() => import("@/components/sections/Reels").then((mod) => mod.Reels));
const SocialPhones = dynamic(() => import("@/components/sections/SocialPhones").then((mod) => mod.SocialPhones));

export default function HomePage() {
  return (
    <>
      <SeoHomeJsonLd />
      <SeoCrawlerCopy />
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
        <ClientVoices />
        <ClientJourney />
        <Reels />
        <SocialPhones />
        <Projects />
        <Finance />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
