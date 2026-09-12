"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LogoLockup } from "./brand";
import {
  CLIENT_TELEGRAM_URL,
  homePath,
  isHomePathname,
  isPagePathname,
  pagePath,
  sectionPath,
} from "@/lib/base-path";
import { contact, footer, nav } from "@/lib/content";
import { fetchContactChannels, mergeContactChannels } from "@/lib/contact-api";
import { useLanguage, type Copy } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { SocialBrandIcon } from "./SocialBrandIcon";
import { useGsapScope } from "@/lib/gsap-client";

type SiteLinkDef = {
  key: string;
  label: Copy;
  section?: string;
  page?: string;
};

const navLinkDefs: SiteLinkDef[] = [
  { key: "home", label: nav.home },
  { key: "services", section: "services", label: nav.services },
  { key: "pricing", page: "pricing", label: nav.pricing },
  { key: "contact", section: "contact", label: nav.contact },
];

const footerLinkDefs: SiteLinkDef[] = [
  { key: "about", section: "about", label: nav.about },
  { key: "services", section: "services", label: nav.services },
  { key: "clients", section: "clients", label: nav.clientLogos },
  { key: "journey", section: "journey", label: nav.clients },
  { key: "reels", section: "reels", label: nav.reels },
  { key: "projects", section: "projects", label: nav.projects },
  { key: "finance", section: "finance", label: nav.finance },
  { key: "pricing", page: "pricing", label: nav.pricing },
  { key: "contact", section: "contact", label: nav.contact },
];

function resolveHref(def: SiteLinkDef, onHome: boolean) {
  if (def.key === "home") return homePath(onHome);
  if (def.page) return pagePath(def.page);
  return sectionPath(def.section!, onHome);
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 3.2c-4.7 0-8.5 3.7-8.5 8.4 0 1.5.4 2.9 1.1 4.1L3.4 20.6l5-1.3c1.2.6 2.5 1 3.6 1 4.7 0 8.5-3.7 8.5-8.4S16.7 3.2 12 3.2Zm4.7 11.8c-.2.5-1.1 1-1.6 1.1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.8-.3h.6c.2 0 .4 0 .6.5.2.6.8 2 .8 2.1.1.1.1.3 0 .4l-.4.5c-.1.1-.2.3-.1.5.1.2.5 1 .1.2 1.7.8 1.5.4 1.8.3.2-.1.5-.4.7-.6.2-.2.4-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3 0 .2 0 .8-.3 1.3Z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M21.93 4.13a1.2 1.2 0 0 0-1.24-.17L2.82 11.09a1.01 1.01 0 0 0 .08 1.88l4.57 1.67 1.76 5.58a1.01 1.01 0 0 0 1.66.38l2.52-2.58 4.96 3.66a1.2 1.2 0 0 0 1.88-.75l3.2-15.3ZM8.53 13.78l9.62-5.96-7.28 7.01-.28 2.92-1.55-4.88 7.28-7.01-9.62 5.96 1.83-.04Z" />
    </svg>
  );
}

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
  const pathname = usePathname();
  const onHome = isHomePathname(pathname);
  const onPricing = isPagePathname(pathname, "pricing");
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const lockRef = useRef<string | null>(null);
  const unlockTimer = useRef(0);
  const navLinks = useMemo(
    () => navLinkDefs.map((def) => ({ ...def, href: resolveHref(def, onHome) })),
    [onHome],
  );
  const pricingHref = pagePath("pricing");
  const whatsappUrl = whatsappHref(t(contact.greeting));

  useGsapScope(
    ({ gsap }) => {
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

  function readActiveFromScroll() {
    const header = headerRef.current?.offsetHeight ?? 72;
    const line = header + 96;
    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 8) {
      return "#contact";
    }

    let current = "top";
    for (const id of ["top", "services", "contact"]) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= line) current = id;
    }
    return `#${current}`;
  }

  function goTo(href: string) {
    setOpen(false);
    if (!href.startsWith("#")) return;
    lockRef.current = href;
    setActive(href);
    window.clearTimeout(unlockTimer.current);
    const behavior = reduce ? "auto" : "smooth";
    window.setTimeout(() => {
      document.body.style.overflow = "";
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior });
      }
      const base = window.location.pathname.replace(/\/$/, "") || "/";
      window.history.replaceState(null, "", `${base}${href}`);

      const unlock = () => {
        window.removeEventListener("scrollend", unlock);
        window.clearTimeout(unlockTimer.current);
        lockRef.current = null;
      };
      if (behavior === "auto") {
        unlock();
        return;
      }
      window.addEventListener("scrollend", unlock, { once: true });
      unlockTimer.current = window.setTimeout(unlock, 2000);
    }, 40);
  }

  function handleNavLinkClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (onHome && href.startsWith("#")) {
      event.preventDefault();
      goTo(href);
      return;
    }
    setOpen(false);
  }

  function isLinkActive(key: string, href: string) {
    if (key === "pricing" && onPricing) return true;
    if (!onHome) return false;
    if (key === "home") return active === "#top";
    if (key === "services") return active === "#services";
    if (key === "contact") return active === "#contact";
    return href.startsWith("#") && active === href;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;

    const hash = window.location.hash;
    if (hash === "#services" || hash === "#contact" || hash === "#top") {
      setActive(hash);
    }

    const updateActive = () => {
      if (lockRef.current) return;
      setActive(readActiveFromScroll());
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.clearTimeout(unlockTimer.current);
    };
  }, [onHome]);

  useEffect(() => {
    setOpen(false);
  }, [locale, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (key: string, href: string, mobile = false) =>
    cn(
      mobile
        ? "border-b border-white/15 py-4 text-start text-[1.35rem] text-white"
        : "relative grid h-11 place-items-center rounded-full px-1.5 text-[0.82rem] font-semibold text-[var(--brand-cream)] transition-colors hover:bg-white/10 hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] xl:text-[0.9rem]",
      !mobile && locale === "ar" ? "tracking-normal" : !mobile && "tracking-[0.08em]",
      mobile && locale === "ar" ? "tracking-normal" : mobile && "tracking-[0.14em]",
      isLinkActive(key, href) &&
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
          <a
            href={homePath(onHome)}
            className="shrink-0 justify-self-start"
            onClick={(event) => handleNavLinkClick(event, homePath(onHome))}
          >
            <LogoLockup invert compact />
          </a>

          <nav
            className="mx-2 hidden min-w-0 grid-cols-4 items-center lg:grid"
            aria-label={t(nav.menu)}
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                aria-current={isLinkActive(link.key, link.href) ? "page" : undefined}
                onClick={(event) => handleNavLinkClick(event, link.href)}
                className={linkClass(link.key, link.href)}
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
                "hidden items-center gap-2 rounded-full bg-[#229ED9] px-3 py-2 text-[0.72rem] font-semibold uppercase text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:inline-flex lg:px-4 lg:text-[0.78rem]",
                locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
              )}
            >
              <TelegramIcon className="h-4 w-4 shrink-0" />
              {t(nav.telegram)}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden items-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-[0.72rem] font-semibold uppercase text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:inline-flex lg:px-4 lg:text-[0.78rem]",
                locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
              )}
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              {t(nav.whatsapp)}
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
                  key={link.key}
                  href={link.href}
                  aria-current={isLinkActive(link.key, link.href) ? "page" : undefined}
                  onClick={(event) => handleNavLinkClick(event, link.href)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={linkClass(link.key, link.href, true)}
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
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#229ED9] px-5 py-3 text-[1rem] font-semibold text-white"
              >
                <TelegramIcon className="h-5 w-5 shrink-0" />
                {t(nav.telegram)}
              </motion.a>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[1rem] font-semibold text-white"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                {t(nav.whatsapp)}
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
  const pathname = usePathname();
  const onHome = isHomePathname(pathname);
  const [channels, setChannels] = useState(contact.channels);
  const footerLinks = useMemo(
    () => footerLinkDefs.map((def) => ({ ...def, href: resolveHref(def, onHome) })),
    [onHome],
  );

  useEffect(() => {
    let active = true;
    fetchContactChannels().then((data) => {
      if (active) setChannels(mergeContactChannels(data, locale));
    });
    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-[var(--brand-charcoal)] pb-10 text-[var(--brand-cream)]"
    >
      <div className="mx-auto grid w-[var(--content)] gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href={homePath(onHome)} className="inline-flex">
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
            {channels.map((channel) => (
              <li key={channel.id} className="list-none text-start">
                <p className="m-0 text-[0.78rem] text-[var(--brand-orange)]">{t(channel.label)}</p>
                <div className="mt-1 flex flex-col gap-1">
                  {channel.lines.map((line) => {
                    const value = typeof line.text === "string" ? line.text : t(line.text as Copy);
                    const platform = "platform" in line ? line.platform : undefined;
                    const label = `${t(channel.label)} ${platform ?? ("region" in line ? line.region : "")} ${value}`;
                    const body = platform ? (
                      <span className="inline-flex items-center gap-2">
                        <SocialBrandIcon platform={platform} className="h-4 w-4 shrink-0" />
                        <span>{value}</span>
                      </span>
                    ) : (
                      <>
                        {"region" in line && line.region ? <span className="text-white/40">{line.region} </span> : null}
                        <span dir={channel.kind === "tel" || channel.kind === "whatsapp" ? "ltr" : undefined}>{value}</span>
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
                    if (channel.kind === "link" && "href" in line && line.href) {
                      return (
                        <a
                          key={label}
                          href={line.href}
                          target="_blank"
                          rel="noopener noreferrer"
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
                key={link.key}
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
