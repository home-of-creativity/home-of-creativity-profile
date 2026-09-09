"use client";

import { useRef } from "react";
import { brand } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useGsapScope } from "@/lib/gsap-client";
import { shouldSkipMotion } from "@/lib/visit-cache";

type MarkProps = {
  className?: string;
  title?: string;
  surface?: "dark" | "light" | "solid";
  float?: boolean;
};

export function Hummingbird({ className, title, surface = "dark", float = false }: MarkProps) {
  const ref = useRef<SVGSVGElement>(null);
  const wingLight =
    surface === "light"
      ? "var(--brand-purple)"
      : surface === "solid"
        ? "#fffdf0"
        : "var(--brand-cream)";
  const teal = "#08af9b";
  const orange = "#f35c27";

  useGsapScope(
    ({ gsap }) => {
      if (!float || shouldSkipMotion()) return;

      const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.set("[data-wing]", { svgOrigin: "392 302", rotate: 7 });

          gsap.to("[data-wing]", {
            rotate: -11,
            scaleY: 0.86,
            duration: 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.055,
          });

          gsap.to("[data-body]", {
            y: 5,
            duration: 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          gsap
            .timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
            .to(ref.current, { yPercent: -3.2, rotate: -1.6, duration: 1.8 })
            .to(ref.current, { yPercent: -1.2, rotate: 1.1, duration: 2.1 })
            .to(ref.current, { yPercent: 0, rotate: 0, duration: 1.6 });

          gsap.to(ref.current, {
            xPercent: 1.8,
            duration: 4.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [float] },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 740.62 522.79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("overflow-visible", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
    >
      <path
        data-wing
        d="M377.65,312.32l65.22-111.35L99.74,0h0c52.31,225.4,277.91,312.32,277.91,312.32Z"
        fill={wingLight}
      />
      <path
        data-wing
        d="M397.64,303.52v-129.05H0s0,0,0,0c159.06,168.06,397.64,129.05,397.64,129.05Z"
        fill={teal}
      />
      <path
        data-body
        d="M542.55,117.28s-17.77-18.34-63.51-24.39c-43.43-5.74-56.82,37.69-56.82,37.69l-223.4,392.21c110.59-37.16,294.28-199.74,297.71-313.91.39-12.97,3.24-25.78,8.7-37.55,15.61-33.61,40.9-37.9,40.9-37.9,11.91-2.55,194.48,4.82,194.48,4.82-23.81-11.34-198.08-20.98-198.08-20.98Z"
        fill={orange}
      />
    </svg>
  );
}

export function Wordmark({
  className,
  invert = false,
  size = "md",
}: {
  className?: string;
  invert?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-[0.82rem] tracking-[0.16em]",
    md: "text-[1.05rem] tracking-[0.22em]",
    lg: "text-[clamp(1.4rem,3vw,2.2rem)] tracking-[0.28em]",
  };

  return (
    <span
      className={cn(
        "font-display block font-semibold uppercase",
        invert ? "text-[var(--brand-cream)]" : "text-[var(--brand-ink)]",
        sizes[size],
        className,
      )}
    >
      Home{" "}
      <span className="text-[var(--brand-orange)] lowercase tracking-normal">
        {brand.of}
      </span>{" "}
      Creativity
    </span>
  );
}

export function LogoLockup({
  className,
  invert = false,
  compact = false,
}: {
  className?: string;
  invert?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} dir="ltr">
      <Hummingbird
        className={cn(compact ? "h-8 w-11" : "h-11 w-16")}
        title={brand.name}
        surface={invert ? "dark" : "light"}
      />
      <Wordmark
        invert={invert}
        size={compact ? "sm" : "md"}
        className={compact ? "max-md:hidden" : undefined}
      />
    </span>
  );
}
