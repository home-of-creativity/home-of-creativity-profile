"use client";

import dynamic from "next/dynamic";
import { Footer, Nav } from "@/components/chrome";
import { SeoCrawlerCopy } from "@/components/SeoCrawlerCopy";
import { SeoHomeJsonLd } from "@/components/SeoHomeJsonLd";
import { About } from "@/components/sections/About";
import { ClientVoices } from "@/components/sections/ClientVoices";
import { ShowcaseClients } from "@/components/sections/ShowcaseClients";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

const ClientJourney = dynamic(() => import("@/components/sections/ClientJourney").then((mod) => mod.ClientJourney));
const Reels = dynamic(() => import("@/components/sections/Reels").then((mod) => mod.Reels));
const SocialPhones = dynamic(() => import("@/components/sections/SocialPhones").then((mod) => mod.SocialPhones));
const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects));
const Finance = dynamic(() => import("@/components/sections/Finance").then((mod) => mod.Finance));
const Faq = dynamic(() => import("@/components/sections/Faq").then((mod) => mod.Faq));
const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => mod.Contact));

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
