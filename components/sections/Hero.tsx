"use client";

import Image from "next/image";
import { useRef } from "react";
import { Hummingbird } from "../brand";
import { HeroBrandWriter } from "../HeroBrandWriter";
import { hero } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";
import { useGsapScope } from "@/lib/gsap-client";
import { shouldSkipMotion } from "@/lib/visit-cache";

export function Hero() {
  const { t, locale, ready } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);

  useGsapScope(
    ({ gsap }) => {
      if (!ready) return;

      const mm = gsap.matchMedia();

        mm.add(
          {
            reduceMotion: "(prefers-reduced-motion: reduce)",
            allowMotion: "(prefers-reduced-motion: no-preference)",
            isDesktop: "(min-width: 800px)",
          },
          (context) => {
            const { reduceMotion, isDesktop } = context.conditions ?? {};

            if (reduceMotion || shouldSkipMotion()) {
              gsap.set(
                [".hero-kicker", ".hero-accent", ".hero-title", ".hero-line", ".hero-cta", ".hero-scroll"],
                { autoAlpha: 1, y: 0, x: 0 },
              );
              return;
            }

            const tl = gsap.timeline({
              defaults: { ease: "power3.out", duration: 0.85 },
            });

            tl.from(".hero-kicker", { autoAlpha: 0, y: 16, immediateRender: false })
              .from(".hero-accent", { autoAlpha: 0, y: 16, immediateRender: false }, "<0.08")
              .from(".hero-title", { autoAlpha: 0, y: 22, immediateRender: false }, "<0.1")
              .from(".hero-line", { autoAlpha: 0, y: 16, immediateRender: false }, "<0.14")
              .from(".hero-cta", { autoAlpha: 0, y: 12, immediateRender: false }, "<0.12")
              .from(".hero-scroll", { autoAlpha: 0, immediateRender: false }, "-=0.25");

            if (isDesktop) {
              gsap.to(".hero-bg", {
                scale: 1.1,
                duration: 28,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            }

            gsap.to(".hero-scroll-mark", {
              y: 6,
              duration: 1.15,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          },
        );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale, ready] },
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[var(--brand-purple-deep)] text-[var(--brand-cream)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-bg absolute inset-[-8%] h-[116%] w-[116%] will-change-transform">
          <Image
            src={withBasePath("/photo/hero-section-background.webp")}
            alt=""
            fill
            priority
            sizes="100vw"
            className={cn(
              "object-cover",
              locale === "ar"
                ? "object-[24%_64%] md:object-[22%_72%]"
                : "object-[76%_64%] md:object-[78%_68%]",
            )}
          />
        </div>
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          locale === "ar"
            ? "bg-[linear-gradient(270deg,rgb(10_6_24/0.78)_0%,rgb(10_6_24/0.32)_46%,rgb(10_6_24/0.12)_100%)]"
            : "bg-[linear-gradient(90deg,rgb(10_6_24/0.78)_0%,rgb(10_6_24/0.32)_46%,rgb(10_6_24/0.12)_100%)]",
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgb(10_6_24/0.55))]"
      />

      <Hummingbird
        float
        stationary
        surface="solid"
        className="hero-bird pointer-events-none absolute top-[20%] end-[2%] z-[1] hidden h-[min(26rem,52vw)] w-[min(36rem,68vw)] opacity-100 mix-blend-normal [filter:drop-shadow(0_12px_22px_rgb(10_6_24/0.5))] md:block"
      />

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-center ps-[clamp(1rem,4.6vw,3rem)] pe-[var(--page-pad)] pt-[calc(var(--nav-height)+1.15rem)] pb-24">
        <div className="max-w-3xl text-start">
          <HeroBrandWriter />
          <p
            className={cn(
              "hero-kicker uppercase text-white/85",
              locale === "ar"
                ? "text-[1.08rem] tracking-normal md:text-[1.18rem]"
                : "text-[0.72rem] tracking-[0.28em]",
            )}
          >
            {t(hero.kicker)}
          </p>
          <p
            className={cn(
              "hero-accent mt-2 uppercase text-white/85",
              locale === "ar"
                ? "text-[1.08rem] tracking-normal md:text-[1.18rem]"
                : "text-[0.72rem] tracking-[0.28em]",
            )}
          >
            {t(hero.accentLead)}{" "}
            <span className="text-[var(--brand-orange)]">{t(hero.accentWord)}</span>
          </p>

          <h1
            className={cn(
              "hero-title font-display mt-5 uppercase md:mt-8",
              locale === "ar" ? "leading-[1.05]" : "leading-[0.86]",
            )}
          >
            <span
              className={cn(
                "block text-[clamp(2.35rem,11vw,6.8rem)] font-semibold text-white",
                locale === "ar" ? "tracking-normal" : "tracking-[-0.03em]",
              )}
            >
              {t(hero.titleLead)}
            </span>
            <span
              className={cn(
                "block text-[clamp(2.7rem,12vw,7.6rem)] font-semibold text-[var(--brand-orange)]",
                locale === "ar" ? "mt-4 tracking-normal md:mt-6" : "mt-2 tracking-[-0.04em] md:mt-3",
              )}
            >
              {t(hero.titleAccent)}
            </span>
          </h1>

          <p
            className={cn(
              "hero-line mt-5 max-w-lg leading-relaxed text-white/80 md:mt-7",
              locale === "ar"
                ? "max-w-xl text-[1.22rem] leading-[1.9] md:text-[1.32rem]"
                : "text-[1.02rem] md:text-[1.05rem]",
            )}
          >
            {t(hero.line)}
          </p>

          <a
            href="#projects"
            className={cn(
              "hero-cta mt-7 inline-flex items-center gap-3 rounded-full p-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] md:mt-10",
              "bg-[linear-gradient(90deg,var(--brand-orange),rgb(255_255_255/0.85),var(--brand-teal))]",
            )}
          >
            <span
              className={cn(
                "inline-flex items-center gap-3 rounded-full bg-[rgb(12_8_28/0.72)] px-6 py-3 font-semibold uppercase text-[var(--brand-cream)] transition-colors hover:bg-[rgb(12_8_28/0.88)]",
                locale === "ar"
                  ? "px-7 py-3.5 text-[1.05rem] tracking-normal"
                  : "text-[0.82rem] tracking-[0.16em]",
              )}
            >
              {t(hero.primary)}
              <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
            </span>
          </a>
        </div>

        <a
          href="#about"
          className={cn(
            "hero-scroll absolute inset-x-0 bottom-8 mx-auto inline-flex w-fit items-center gap-3 uppercase text-white/70 transition-colors hover:text-[var(--brand-orange)]",
            locale === "ar"
              ? "text-[0.95rem] tracking-normal"
              : "text-[0.68rem] tracking-[0.22em]",
          )}
        >
          <span
            aria-hidden
            className="hero-scroll-mark grid h-9 w-9 place-items-center rounded-full border border-white/35"
          >
            ↓
          </span>
          {t(hero.scroll)}
        </a>
      </div>
    </section>
  );
}
