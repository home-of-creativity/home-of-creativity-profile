"use client";

import { useRef } from "react";
import { Hummingbird } from "./brand";
import { useGsapScope } from "@/lib/gsap-client";
import { cn } from "@/lib/cn";

/**
 * Approximate position of the hummingbird's beak tip inside its own
 * bounding box, expressed as a fraction of the rendered width/height.
 * The mark is drawn beak-to-the-right, so the tip sits near the top-right.
 *
 * This point is also used as the element's `transformOrigin` while typing,
 * so every rotation (the bend + strike of a peck) pivots around the beak
 * itself — the tip's on-screen position depends only on x/y, never on the
 * rotation value, however steep the bend gets.
 */
const BEAK_X_RATIO = 0.9;
const BEAK_Y_RATIO = 0.24;
const BEAK_ORIGIN = `${BEAK_X_RATIO * 100}% ${BEAK_Y_RATIO * 100}%`;

/** Wider ratio used when centering the whole silhouette (not just the beak
 * tip) above a word, so the visual mass of the mark — not only its point —
 * lands above the target. */
const REST_CENTER_RATIO = 0.56;

/** Timing for the beak-peck typing mechanic (seconds unless noted). */
const PECK = {
  bend: 0.16, // swoop in from above and lean over the first letter
  move: 0.08, // horizontal hop to the next letter (stays bent)
  down: 0.09, // the strike itself — quick downward + rotational drop
  up: 0.11, // rise back to the hover height (with a tiny recoil overshoot)
  lift: 0.2, // raise the head and unbend once a whole word is finished
};

const REST_ROTATE = 0; // natural, upright angle — start, between words, and final rest
const BEND_ROTATE = 78; // steep forward lean while hovering between letters ("from above")
const STRIKE_ROTATE = 92; // extra dip at the exact moment the beak makes contact
const RECOIL_ROTATE = 66; // small rise right after contact — stays mostly bent

const HOVER_GAP = 24; // px above the letter the beak hovers at while bent, before striking
const RECOIL_LIFT = 4; // px — tiny overshoot above the hover height right after contact
const WORD_LIFT = 12; // px — extra head-raise once a whole word is complete

function AnimatedWord({
  word,
  wordKey,
  className,
}: {
  word: string;
  wordKey: string;
  className?: string;
}) {
  return (
    <span className={cn("hero-brand-word inline-flex", className)} data-word={wordKey}>
      {word.split("").map((ch, i) => (
        <span key={i} className="hero-letter inline-block">
          {ch}
        </span>
      ))}
    </span>
  );
}

/**
 * A one-time, choreographed intro for the Hero section: the hummingbird
 * mark starts alone on the left, flaps its wings, then "writes" the brand
 * name — Home, then of, then Creativity, in that reading order — by
 * pecking each letter into place with its beak, before settling to rest
 * above the word "of".
 *
 * Positions are measured live from the rendered DOM so the whole sequence
 * stays correct across breakpoints without hard-coded pixel paths.
 */
export function HeroBrandWriter({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<SVGSVGElement>(null);
  const playedRef = useRef(false);

  useGsapScope(
    ({ gsap }) => {
      const wrap = wrapRef.current;
      const bird = birdRef.current;
      if (!wrap || !bird) return;

      const wings = bird.querySelector<SVGGElement>("[data-wings]");
      if (!wings) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const letters = wrap.querySelectorAll<HTMLElement>(".hero-letter");
          const homeEl = wrap.querySelector<HTMLElement>('[data-word="home"]');
          const ofEl = wrap.querySelector<HTMLElement>('[data-word="of"]');
          const creativityEl = wrap.querySelector<HTMLElement>('[data-word="creativity"]');
          if (!letters.length || !homeEl || !ofEl || !creativityEl) return;

          const homeLetters = [...homeEl.querySelectorAll<HTMLElement>(".hero-letter")];
          const ofLetters = [...ofEl.querySelectorAll<HTMLElement>(".hero-letter")];
          const creativityLetters = [...creativityEl.querySelectorAll<HTMLElement>(".hero-letter")];

          type Peck = { x: number; contactY: number };

          const readLayout = () => {
            const wrapRect = wrap.getBoundingClientRect();
            const birdBox = bird.getBoundingClientRect();
            const birdW = birdBox.width;
            const birdH = birdBox.height;
            const beakToX = (beakX: number) => beakX - birdW * BEAK_X_RATIO;
            const beakToY = (beakY: number) => beakY - birdH * BEAK_Y_RATIO;
            const boxOf = (el: Element) => {
              const r = el.getBoundingClientRect();
              return {
                left: r.left - wrapRect.left,
                top: r.top - wrapRect.top,
                width: r.width,
                height: r.height,
              };
            };
            const pecks = (nodes: HTMLElement[]): Peck[] =>
              nodes.map((el) => {
                const r = boxOf(el);
                return {
                  x: beakToX(r.left + r.width / 2),
                  contactY: beakToY(r.top + r.height / 2),
                };
              });
            return {
              birdW,
              birdH,
              home: boxOf(homeEl),
              of: boxOf(ofEl),
              homePecks: pecks(homeLetters),
              ofPecks: pecks(ofLetters),
              creativityPecks: pecks(creativityLetters),
              beakToY,
            };
          };

          if (context.conditions?.reduceMotion || playedRef.current) {
            const layout = readLayout();
            gsap.set(letters, { autoAlpha: 1, scale: 1 });
            gsap.set(bird, {
              autoAlpha: 1,
              x: layout.of.left + layout.of.width / 2 - layout.birdW * REST_CENTER_RATIO,
              y: layout.of.top - layout.birdH * 0.86,
              rotate: 0,
            });
            gsap.set(wings, { rotate: 4 });
            playedRef.current = true;
            return;
          }

          playedRef.current = true;

          const run = () => {
            const layout = readLayout();
            const { birdW, birdH, home, of } = layout;

            gsap.set(bird, {
              autoAlpha: 1,
              x: 0,
              y: layout.beakToY(home.top + home.height / 2),
              rotate: REST_ROTATE,
              transformOrigin: BEAK_ORIGIN,
            });
            gsap.set(wings, { transformOrigin: "388px 308px", rotate: 4 });

            const tl = gsap.timeline();

            const typeWord = (targets: Peck[], startTime: number) => {
              if (targets.length === 0) return startTime;

              let cursor = startTime;
              const first = targets[0];

              // Swoop in from above and bend over the first letter.
              tl.to(bird, {
                x: first.x,
                y: first.contactY - HOVER_GAP,
                rotate: BEND_ROTATE,
                duration: PECK.bend,
                ease: "power2.out",
              }, cursor);
              cursor += PECK.bend;

              targets.forEach((target, idx) => {
                if (idx > 0) {
                  tl.to(bird, {
                    x: target.x,
                    y: target.contactY - HOVER_GAP,
                    duration: PECK.move,
                    ease: "power1.inOut",
                  }, cursor);
                  cursor += PECK.move;
                }

                // Strike — the beak drops the rest of the way down and
                // rotates further into the dip; contact = tween end.
                tl.to(bird, {
                  y: target.contactY,
                  rotate: STRIKE_ROTATE,
                  duration: PECK.down,
                  ease: "power2.in",
                }, cursor);
                cursor += PECK.down;

                // Rise back to hover height with a tiny recoil overshoot.
                tl.to(bird, {
                  y: target.contactY - HOVER_GAP - RECOIL_LIFT,
                  rotate: RECOIL_ROTATE,
                  duration: PECK.up * 0.55,
                  ease: "power2.out",
                }, cursor);
                tl.to(bird, {
                  y: target.contactY - HOVER_GAP,
                  rotate: BEND_ROTATE,
                  duration: PECK.up * 0.45,
                  ease: "power1.inOut",
                }, cursor + PECK.up * 0.55);
                cursor += PECK.up;
              });

              // Word finished — raise the head and unbend to a natural angle.
              const last = targets[targets.length - 1];
              tl.to(bird, {
                y: last.contactY - HOVER_GAP - WORD_LIFT,
                rotate: REST_ROTATE,
                duration: PECK.lift,
                ease: "power2.out",
              }, cursor);
              cursor += PECK.lift;

              return cursor;
            };

            // 1) Takeoff — fast, clear wing flaps (~0.9s) with a light body bob.
            tl.to(wings, {
              rotate: -10,
              duration: 0.11,
              ease: "sine.inOut",
              repeat: 7,
              yoyo: true,
            }, 0);
            tl.to(bird, {
              y: "+=6",
              duration: 0.22,
              ease: "sine.inOut",
              repeat: 3,
              yoyo: true,
            }, 0);
            tl.set(wings, { rotate: 4 }, 0.88);
            // 0.88 – 1.03: brief settle before the first word.

            // 2) Write "Home", then "of", then "Creativity" — reading
            // order, each pecked one letter at a time.
            const homeEnd = typeWord(layout.homePecks, 1.03);
            const ofEnd = typeWord(layout.ofPecks, homeEnd);
            const creativityEnd = typeWord(layout.creativityPecks, ofEnd);

            // 3) Settle above "of", reset to a natural angle, and stop for good — no loop.
            tl.to(bird, {
              x: of.left + of.width / 2 - birdW * REST_CENTER_RATIO,
              y: of.top - birdH * 0.86,
              rotate: 0,
              duration: 0.7,
              ease: "power2.out",
            }, creativityEnd);
          };

          const fonts = typeof document !== "undefined" ? document.fonts : undefined;
          if (fonts?.ready) {
            fonts.ready.then(run).catch(run);
          } else {
            run();
          }
        },
      );

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [] },
  );

  return (
    <div
      ref={wrapRef}
      dir="ltr"
      className={cn(
        "hero-brand relative mb-5 flex h-[clamp(4.8rem,12vw,5rem)] items-center pt-[clamp(2rem,5.5vw,3.2rem)] md:mb-8 md:h-[clamp(3.2rem,8vw,5rem)]",
        className,
      )}
    >
      <span className="sr-only">Home of Creativity</span>
      <div aria-hidden className="hero-brand-row relative flex max-w-full flex-wrap items-baseline gap-x-[0.28em] gap-y-1">
        <AnimatedWord
          word="Home"
          wordKey="home"
          className="font-display text-[clamp(1.45rem,7.2vw,3.4rem)] font-black uppercase leading-none tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgb(0_0_0/0.42)] md:text-[clamp(1.9rem,6vw,3.4rem)]"
        />
        <AnimatedWord
          word="of"
          wordKey="of"
          className="font-display text-[clamp(1.45rem,7.2vw,3.4rem)] font-black lowercase leading-none tracking-[-0.02em] text-[var(--brand-orange)] [text-shadow:0_2px_18px_rgb(0_0_0/0.35)] md:text-[clamp(1.9rem,6vw,3.4rem)]"
        />
        <AnimatedWord
          word="Creativity"
          wordKey="creativity"
          className="font-display text-[clamp(1.45rem,7.2vw,3.4rem)] font-black uppercase leading-none tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgb(0_0_0/0.42)] md:text-[clamp(1.9rem,6vw,3.4rem)]"
        />
      </div>
      <Hummingbird
        ref={birdRef}
        surface="solid"
        title="Home of Creativity"
        className="hero-brand-bird pointer-events-none absolute left-0 top-0 z-[1] h-[clamp(2rem,5.4vw,3.7rem)] w-[clamp(2.75rem,7.5vw,5.1rem)] opacity-0 [filter:drop-shadow(0_10px_18px_rgb(10_6_24/0.5))] md:h-[clamp(2.4rem,6vw,3.7rem)] md:w-[clamp(3.3rem,8.4vw,5.1rem)]"
      />
    </div>
  );
}
