"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { Footer, Nav } from "@/components/chrome";
import { About } from "@/components/sections/About";
import { ClientVoices } from "@/components/sections/ClientVoices";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ShowcaseClients } from "@/components/sections/ShowcaseClients";
import type { PortfolioProject, ShowcaseClient } from "@/lib/portfolio-api";
import type { LandingReel } from "@/lib/reels-api";

// Split into their own chunks; `next/dynamic` still renders them into the static HTML.
const ClientJourney = dynamic(() => import("@/components/sections/ClientJourney").then((mod) => mod.ClientJourney));
const Reels = dynamic(() => import("@/components/sections/Reels").then((mod) => mod.Reels));
const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects));
const Finance = dynamic(() => import("@/components/sections/Finance").then((mod) => mod.Finance));
const SocialPhones = dynamic(() => import("@/components/sections/SocialPhones").then((mod) => mod.SocialPhones));
const Faq = dynamic(() => import("@/components/sections/Faq").then((mod) => mod.Faq));
const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => mod.Contact));

/** Mounts children once the page has loaded and the main thread is idle (the social feeds). */
function AfterPaint({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => setShow(true), { timeout: 1200 });
        return;
      }
      window.setTimeout(() => setShow(true), 1);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, []);

  return show ? children : null;
}

/**
 * The landing page. Journey, reels, projects and finance render into the static HTML
 * (with the client names and projects read at build time); only the social feeds wait
 * for idle time.
 */
export function HomeView({
  clients,
  projects,
  reels,
  facts,
}: {
  clients: ShowcaseClient[];
  projects: PortfolioProject[];
  reels: LandingReel[];
  facts?: ReactNode;
}) {
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
          <ShowcaseClients initialClients={clients} />
        </div>
        <ClientVoices initialClients={clients} />
        <ClientJourney />
        <Reels initialReels={reels} />
        <AfterPaint>
          <SocialPhones />
        </AfterPaint>
        <Projects initialProjects={projects} />
        <Finance />
        {facts}
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
