"use client";

import { useRef } from "react";
import { clientJourney } from "@/lib/content";
import { withBasePath } from "@/lib/base-path";
import { useGsapScope } from "@/lib/gsap-client";
import { useLanguage } from "@/lib/i18n";
import { SectionHeading, Shell } from "../ui";

/** Short rest so the picture does not sit still. */
const HOLD = 0.16;
/** Viewports spent on the sideways move and the image entrance. */
const TRAVEL = 0.72;

/**
 * Nivx: the title is read first. Vertical scroll pins a full-viewport frame
 * and slides the next image in. Each image scales into place as it arrives.
 */
export function ClientJourney() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const frames = useRef<(HTMLElement | null)[]>([]);
  const steps = clientJourney.steps;

  useGsapScope(
    ({ gsap }) => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const count = steps.length;
      if (count < 2) return;

      const units = (count - 1) * (HOLD + TRAVEL) + HOLD;
      const segment = HOLD + TRAVEL;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * units}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const time = self.progress * units;
            const index = Math.min(count - 1, Math.floor((time + TRAVEL / 2) / segment));
            panels.current.forEach((panel, i) => {
              panel?.setAttribute("aria-hidden", i === index ? "false" : "true");
            });
          },
        },
      });

      const reveal = (index: number, at: number) => {
        const frame = frames.current[index];
        const panel = panels.current[index];
        if (frame) {
          timeline.fromTo(
            frame,
            { scale: 1.07, xPercent: index === 0 ? 0 : 4 },
            { scale: 1, xPercent: 0, duration: TRAVEL, ease: "power3.out", force3D: true },
            at,
          );
        }
        if (!panel) return;
        timeline.fromTo(
          panel.querySelectorAll("[data-nivx-part]"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: TRAVEL * 0.65, stagger: 0.04, ease: "power3.out", force3D: true },
          at + TRAVEL * 0.2,
        );
      };

      reveal(0, 0);

      let at = HOLD;
      for (let index = 0; index < count - 1; index += 1) {
        const step = index + 1;
        timeline.to(
          track,
          {
            x: () => -(step * pin.offsetWidth),
            duration: TRAVEL,
            ease: "power3.inOut",
            force3D: true,
          },
          at,
        );
        reveal(step, at);
        at += TRAVEL + HOLD;
      }
    },
    { scope: sectionRef, dependencies: [locale, steps.length] },
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="journey-nivx relative bg-[var(--brand-purple-deep)] text-[var(--brand-ivory)]"
      aria-labelledby="journey-heading"
    >
      <header className="px-5 py-20 md:px-12 md:py-28">
        <Shell>
          <SectionHeading id="journey-heading" kicker={clientJourney.kicker} title={clientJourney.title} align="center" invert />
          <p className="mx-auto mt-5 max-w-2xl text-center text-[1.02rem] leading-relaxed text-white/75">
            {t(clientJourney.lead)}
          </p>
        </Shell>
      </header>

      <div ref={pinRef} dir="ltr" className="journey-nivx-pin relative h-[100dvh] min-h-[100svh] w-full overflow-hidden">
        <div ref={trackRef} className="journey-nivx-track flex h-full w-max will-change-transform">
          {steps.map((step, index) => (
            <article
              key={step.id}
              ref={(node) => {
                panels.current[index] = node;
              }}
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="journey-nivx-slide relative h-[100dvh] w-screen shrink-0 overflow-hidden"
              aria-hidden={index !== 0}
            >
              <div
                ref={(node) => {
                  frames.current[index] = node;
                }}
                className="absolute inset-0 will-change-transform"
              >
                <img
                  src={withBasePath(step.image)}
                  alt={t(step.imageAlt)}
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover object-[center_42%]"
                  draggable={false}
                />
              </div>
              <div aria-hidden className="journey-slide-veil" />
              <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 md:px-12 md:pb-16">
                <div className="mx-auto max-w-3xl">
                  <h3 data-nivx-part className="font-display m-0 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.12]">
                    {t(step.title)}
                  </h3>
                  <span data-nivx-part aria-hidden className="mt-4 block h-px w-16 bg-[var(--brand-orange)]" />
                  <p data-nivx-part className="m-0 mt-4 max-w-2xl text-[1.02rem] leading-[1.85] text-white/82">
                    {t(step.body)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
