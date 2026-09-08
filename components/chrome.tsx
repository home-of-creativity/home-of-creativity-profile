"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LogoLockup } from "./brand";
import { CLIENT_TELEGRAM_URL } from "@/lib/base-path";
import { contact, footer, nav } from "@/lib/content";
import { useLanguage, type Copy } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { gsap, useGSAP } from "@/lib/gsap-client";

const navLinks = [
  { href: "#about", label: nav.about },
  { href: "#services", label: nav.services },
  { href: "#projects", label: nav.projects },
  { href: "#contact", label: nav.contact },
];

const footerLinks = [
  { href: "#about", label: nav.about },
  { href: "#philosophy", label: nav.philosophy },
  { href: "#services", label: nav.services },
  { href: "#clients", label: nav.clients },
  { href: "#projects", label: nav.projects },
  { href: "#finance", label: nav.finance },
  { href: "#contact", label: nav.contact },
];

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t(nav.language)}
      dir="ltr"
      className={cn(
        "relative isolate grid shrink-0 grid-cols-2 rounded-full border border-white/35 bg-black/30 p-1 text-[0.7rem] font-semibold uppercase text-[var(--brand-cream)]",
        compact ? "min-w-[5.4rem]" : "min-w-[6.2rem]",
      )}
    >
      {(["en", "ar"] as const).map((code) => {
        const selected = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={selected}
            aria-label={code === "en" ? "English" : "العربية"}
            onPointerDown={() => setLocale(code)}
            onClick={() => setLocale(code)}
            className={cn(
              "cursor-pointer rounded-full px-2.5 py-1.5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
              selected
                ? "bg-[var(--brand-orange)] text-[var(--brand-purple-deep)]"
                : "text-white/70 hover:text-[var(--brand-cream)]",
            )}
          >
            {code === "en" ? "EN" : "AR"}
          </button>
        );
      })}
    </div>
  );
}

export function Nav() {
  const { t, locale, ready } = useLanguage();
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".nav-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: locale === "ar" ? "100% 50%" : "0% 50%",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.35,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: headerRef, dependencies: [locale, ready] },
  );

  function goTo(href: string) {
    setActive(href);
    setOpen(false);
    const el = document.querySelector(href);
    window.setTimeout(() => {
      document.body.style.overflow = "";
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      window.history.replaceState(null, "", href);
    }, 40);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", "about", "philosophy", "services", "clients", "projects", "finance", "contact"];

    const updateActive = () => {
      const marker = (headerRef.current?.offsetHeight ?? 72) + 24;
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      if (atBottom) {
        setActive("#contact");
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - marker <= 0) {
          current = id;
        }
      }
      setActive(`#${current}`);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href: string, mobile = false) =>
    cn(
      mobile
        ? "border-b border-white/15 py-4 text-start text-[1.35rem] text-white"
        : "relative grid h-11 place-items-center rounded-full px-1.5 text-[0.82rem] font-semibold text-[var(--brand-cream)] transition-colors hover:bg-white/10 hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] xl:text-[0.9rem]",
      !mobile && locale === "ar" ? "tracking-normal" : !mobile && "tracking-[0.08em]",
      mobile && locale === "ar" ? "tracking-normal" : mobile && "tracking-[0.14em]",
      active === href &&
        (mobile
          ? "text-[var(--brand-orange)]"
          : "bg-white/12 text-[var(--brand-orange)]"),
    );

  return (
    <>
      <header
        ref={headerRef}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background,box-shadow,backdrop-filter] duration-500",
          scrolled && !open
            ? "bg-[color-mix(in_srgb,var(--brand-purple-deep)_90%,transparent)] shadow-[0_12px_40px_rgb(10_6_24/0.28)] backdrop-blur-xl"
            : open
              ? "bg-[var(--brand-purple-deep)]"
              : "bg-[linear-gradient(180deg,rgb(18_8_40/0.55),transparent)]",
        )}
      >
        <div className="mx-auto grid h-[var(--nav-height)] w-[min(1280px,calc(100%-1rem))] grid-cols-[auto_1fr_auto] items-center gap-2 sm:w-[min(1280px,calc(100%-1.5rem))] sm:gap-4">
          <a href="#top" className="shrink-0 justify-self-start" onClick={() => setOpen(false)}>
            <LogoLockup invert compact />
          </a>

          <nav
            className="mx-2 hidden min-w-0 grid-cols-4 items-center lg:grid"
            aria-label={t(nav.menu)}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                onClick={() => setActive(link.href)}
                className={linkClass(link.href)}
              >
                {t(link.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            <a
              href={CLIENT_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "hidden rounded-full border border-white/40 px-3 py-2 text-[0.72rem] font-semibold uppercase text-[var(--brand-cream)] transition-colors hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] min-[480px]:inline-flex lg:px-4 lg:text-[0.78rem]",
                locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
              )}
            >
              {t(nav.telegram)}
            </a>
            <a
              href="#contact"
              className={cn(
                "hidden rounded-full bg-[var(--brand-orange)] px-4 py-2 text-[0.78rem] font-semibold uppercase text-[var(--brand-purple-deep)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-cream)] lg:inline-flex",
                locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
              )}
            >
              {t(nav.cta)}
            </a>
            <LanguageToggle compact />
            <button
              type="button"
              className="grid h-11 w-11 place-items-center text-[var(--brand-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={t(nav.menu)}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{t(nav.menu)}</span>
              <span className="flex w-5 flex-col gap-1.5">
                <span
                  className={cn(
                    "h-px w-full bg-current transition",
                    open && "translate-y-[3.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-current transition",
                    open && "-translate-y-[3.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
        <span
          aria-hidden
          className="nav-progress pointer-events-none absolute inset-x-0 bottom-0 h-px origin-start scale-x-0 bg-[var(--brand-orange)]"
        />
      </header>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-40 bg-[var(--brand-purple-deep)] lg:hidden"
          >
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="mx-auto flex h-full w-[min(1280px,calc(100%-1.5rem))] flex-col justify-center gap-2"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(link.href);
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={linkClass(link.href, true)}
                >
                  {t(link.label)}
                </motion.a>
              ))}
              <motion.a
                href={CLIENT_TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="mt-4 inline-flex w-fit rounded-full border border-white/40 px-5 py-3 text-[1rem] font-semibold text-[var(--brand-cream)]"
              >
                {t(nav.telegram)}
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  goTo("#contact");
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-2 inline-flex w-fit rounded-full bg-[var(--brand-orange)] px-5 py-3 text-[1rem] font-semibold text-[var(--brand-purple-deep)]"
              >
                {t(nav.cta)}
              </motion.a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-[var(--brand-charcoal)] pb-10 text-[var(--brand-cream)]"
    >
      <div className="mx-auto grid w-[var(--content)] gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#top" className="inline-flex">
            <LogoLockup invert compact />
          </a>
          <p className="mt-4 max-w-xs text-[0.95rem] text-white/60">{t(footer.tagline)}</p>
          <p className="mt-2 text-[0.9rem] text-[var(--brand-orange)]">{t(contact.region)}</p>
        </div>

        <div>
          <p
            className={cn(
              "m-0 text-[0.78rem] text-white/45",
              locale === "en" && "tracking-[0.18em] uppercase",
            )}
          >
            {t(footer.reach)}
          </p>
          <ul className="mt-4 grid list-none gap-3 p-0">
            {contact.channels.map((channel) => (
              <li key={channel.id} className="list-none text-start">
                <p className="m-0 text-[0.78rem] text-[var(--brand-orange)]">{t(channel.label)}</p>
                <div className="mt-1 flex flex-col gap-1">
                  {channel.lines.map((line) => {
                    const value = typeof line.text === "string" ? line.text : t(line.text as Copy);
                    const label = `${t(channel.label)} ${line.region} ${value}`;
                    const body = (
                      <>
                        <span className="text-white/40">{line.region}</span>{" "}
                        <span dir={channel.kind === "text" ? undefined : "ltr"}>{value}</span>
                      </>
                    );
                    if (channel.kind === "whatsapp" && "digits" in line && line.digits) {
                      return (
                        <a
                          key={label}
                          href={whatsappHref(t(contact.greeting), line.digits)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.88rem] text-white/70 transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                        >
                          {body}
                        </a>
                      );
                    }
                    if (channel.kind === "tel" && "digits" in line && line.digits) {
                      return (
                        <a
                          key={label}
                          href={`tel:+${line.digits}`}
                          className="text-[0.88rem] text-white/70 transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                        >
                          {body}
                        </a>
                      );
                    }
                    return (
                      <p key={label} className="m-0 text-[0.88rem] text-white/70">
                        {body}
                      </p>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            className={cn(
              "m-0 text-[0.78rem] text-white/45",
              locale === "en" && "tracking-[0.18em] uppercase",
            )}
          >
            {t(footer.explore)}
          </p>
          <nav className="mt-4 grid gap-2" aria-label={t(nav.menu)}>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.95rem] text-white/70 transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
              >
                {t(link.label)}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <p className="mx-auto mt-10 w-[var(--content)] border-t border-white/10 pt-6 text-[0.72rem] text-white/40">
        {t(footer.rights)}
      </p>
    </footer>
  );
}
