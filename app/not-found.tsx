"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { LanguageToggle } from "@/components/chrome";
import { LogoLockup } from "@/components/brand";
import { notFound } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";
import { useGsapScope } from "@/lib/gsap-client";

export default function NotFoundPage() {
  const { t, locale } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);

  useGsapScope(
    ({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            gsap.set(".nf-copy", { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(".nf-copy", {
            autoAlpha: 0,
            y: 18,
            duration: 0.85,
            ease: "power3.out",
          });

          gsap.to(".nf-bg", {
            scale: 1.06,
            duration: 28,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--brand-purple-deep)] text-[var(--brand-cream)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="nf-bg absolute inset-[-6%] h-[112%] w-[112%] will-change-transform">
          <Image
            src={withBasePath("/photo/not-found-404.webp")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgb(10_6_24/0.62),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgb(10_6_24/0.78))]"
      />

      <header className="relative z-10 mx-auto flex h-[var(--nav-height)] w-[min(1280px,calc(100%-1.5rem))] items-center justify-between">
        <Link href="/" className="shrink-0">
          <LogoLockup invert compact />
        </Link>
        <LanguageToggle compact />
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--nav-height))] w-[var(--content)] flex-col justify-end pb-16 md:pb-20">
        <div className="nf-copy max-w-xl text-start">
          <p
            className={cn(
              "text-[0.72rem] uppercase text-[var(--brand-orange)]",
              locale === "ar" ? "tracking-normal" : "tracking-[0.28em]",
            )}
          >
            {t(notFound.kicker)}
          </p>
          <h1 className="font-display mt-4 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.08]">
            {t(notFound.title)}
          </h1>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/78">
            {t(notFound.line)}
          </p>
          <Link
            href="/"
            className={cn(
              "mt-8 inline-flex rounded-full bg-[var(--brand-orange)] px-6 py-3 text-[0.82rem] font-semibold uppercase text-[var(--brand-purple-deep)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cream)]",
              locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
            )}
          >
            {t(notFound.home)}
          </Link>
        </div>
      </div>
    </main>
  );
}
