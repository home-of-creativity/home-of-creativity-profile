"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap-client";
import { useLanguage } from "@/lib/i18n";
import { shouldSkipMotion } from "@/lib/visit-cache";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, locale } = useLanguage();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !ready) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduceMotion || shouldSkipMotion()) {
            gsap.set(el, { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(el, {
            autoAlpha: 0,
            y,
            duration: 0.85,
            delay,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
              toggleActions: "play none none none",
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay, y, ready, locale] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, locale } = useLanguage();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || !ready) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const items = gsap.utils.toArray<HTMLElement>(".gsap-stagger-item");
          if (context.conditions?.reduceMotion || shouldSkipMotion()) {
            gsap.set(items, { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(items, {
            autoAlpha: 0,
            y: 22,
            duration: 0.7,
            delay,
            ease: "power3.out",
            stagger: 0.08,
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: "top 88%",
              once: true,
              toggleActions: "play none none none",
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay, ready, locale] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("gsap-stagger-item", className)}>{children}</div>;
}

export function ParallaxFrame({
  children,
  className,
  intensity = 40,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const inner = root?.querySelector<HTMLElement>(".gsap-parallax-inner");
      if (!root || !inner || shouldSkipMotion()) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          inner,
          { y: intensity },
          {
            y: -intensity,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [intensity] },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="gsap-parallax-inner relative h-[118%] w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
