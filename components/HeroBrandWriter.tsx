"use client";

import { Hummingbird } from "./brand";
import { cn } from "@/lib/cn";

export function HeroBrandWriter({ className }: { className?: string }) {
  return (
    <div
      dir="ltr"
      className={cn(
        "hero-brand relative mb-5 flex h-[clamp(4.8rem,12vw,5rem)] items-center pt-[clamp(2rem,5.5vw,3.2rem)] md:mb-8 md:h-[clamp(3.2rem,8vw,5rem)]",
        className,
      )}
    >
      <span className="sr-only">Home of Creativity</span>
      <div
        aria-hidden
        className="hero-brand-row relative flex max-w-full flex-wrap items-baseline gap-x-[0.28em] gap-y-1"
      >
        <span className="font-display text-[clamp(1.45rem,7.2vw,3.4rem)] font-black uppercase leading-none tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgb(0_0_0/0.42)] md:text-[clamp(1.9rem,6vw,3.4rem)]">
          Home
        </span>
        <span className="hero-brand-of relative inline-flex items-baseline">
          <Hummingbird
            float
            stationary
            surface="solid"
            title="Home of Creativity"
            className="hero-brand-bird pointer-events-none absolute bottom-full start-1/2 z-[1] mb-1 h-[clamp(2rem,5.4vw,3.7rem)] w-[clamp(2.75rem,7.5vw,5.1rem)] -translate-x-1/2 [filter:drop-shadow(0_10px_18px_rgb(10_6_24/0.5))] md:h-[clamp(2.4rem,6vw,3.7rem)] md:w-[clamp(3.3rem,8.4vw,5.1rem)]"
          />
          <span className="font-display text-[clamp(1.45rem,7.2vw,3.4rem)] font-black lowercase leading-none tracking-[-0.02em] text-[var(--brand-orange)] [text-shadow:0_2px_18px_rgb(0_0_0/0.35)] md:text-[clamp(1.9rem,6vw,3.4rem)]">
            of
          </span>
        </span>
        <span className="font-display text-[clamp(1.45rem,7.2vw,3.4rem)] font-black uppercase leading-none tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgb(0_0_0/0.42)] md:text-[clamp(1.9rem,6vw,3.4rem)]">
          Creativity
        </span>
      </div>
    </div>
  );
}
