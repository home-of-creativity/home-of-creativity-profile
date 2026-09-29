"use client";

import { Great_Vibes } from "next/font/google";
import { FormEvent, useRef, useState } from "react";
import { contact, nav, services } from "@/lib/content";
import { sendContactMessage } from "@/lib/contact-api";
import { officeHeading, offices, phoneLabels } from "@/lib/offices";
import { officialSocialProfiles } from "@/lib/social-embeds";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-great-vibes",
});
import { useLanguage } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";
import { ContactMap } from "@/components/ContactMap";
import { Hummingbird } from "../brand";
import { SocialBrandIcon } from "../SocialBrandIcon";
import { Reveal } from "../motion";
import { Shell } from "../ui";
import { cn } from "@/lib/cn";
import { useGsapScope } from "@/lib/gsap-client";

function telHref(digits: string) {
  return `tel:+${digits.replace(/\D/g, "")}`;
}

function BinderClip({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 70"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 18c0-8 5-14 8-14s8 6 8 14"
        stroke="#2a2433"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M14 18c0-10 6.2-16 10-16s10 6 10 16"
        stroke="#1a1224"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="10" y="16" width="28" height="42" rx="4" fill="#1a1224" />
      <rect x="14" y="22" width="20" height="28" rx="2" fill="#3d3648" />
      <path d="M16 22h16v6H16z" fill="#2a2433" />
    </svg>
  );
}

function ChannelIcon({ id }: { id: "social" | "location" }) {
  if (id === "social") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none">
        <circle cx="6.5" cy="12" r="2.2" stroke="#e07a5f" strokeWidth="1.7" />
        <circle cx="17.5" cy="6.5" r="2.2" stroke="#e07a5f" strokeWidth="1.7" />
        <circle cx="17.5" cy="17.5" r="2.2" stroke="#e07a5f" strokeWidth="1.7" />
        <path d="M8.5 11.2 15.4 7.4M8.5 12.8 15.4 16.6" stroke="#e07a5f" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none">
      <path
        d="M12 21s6.2-5.4 6.2-10.1A6.2 6.2 0 0 0 12 4.7a6.2 6.2 0 0 0-6.2 6.2C5.8 15.6 12 21 12 21Z"
        stroke="var(--brand-orange)"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10.7" r="2.1" stroke="var(--brand-orange)" strokeWidth="1.7" />
    </svg>
  );
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

export function Contact() {
  const { t, locale, ready } = useLanguage();
  const listRef = useRef<HTMLUListElement>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errorKind, setErrorKind] = useState<"send" | "config" | "empty" | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"name" | "email" | "message", string>>>({});
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<"support" | "sales" | null>(null);
  useGsapScope(
    ({ gsap }) => {
      const root = listRef.current;
      if (!root || !ready) return;

      const items = gsap.utils.toArray<HTMLElement>(".contact-channel", root);
      if (!items.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            gsap.set(items, { x: 0, rotate: 0 });
            return;
          }

          gsap.set(items, { transformOrigin: "50% 50%", force3D: true, x: 0, rotate: 0 });

          items.forEach((el, index) => {
            gsap
              .timeline({
                delay: index * 0.08,
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                  toggleActions: "play none none none",
                },
              })
              .to(el, { x: 22, rotate: 5.5, duration: 0.34, ease: "power2.out" })
              .to(el, { x: -20, rotate: -4.5, duration: 0.4, ease: "power2.inOut" })
              .to(el, { x: 0, rotate: 0, duration: 0.5, ease: "power3.out" });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: listRef, dependencies: [ready, locale] },
  );

  const fieldClass =
    "w-full rounded-none border border-[var(--brand-line)] bg-white/80 px-4 py-3 text-[1rem] text-[var(--brand-ink)] outline-none transition-colors placeholder:text-[var(--brand-muted)] focus-visible:border-[var(--brand-orange)] focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]/30";

  const supportSelected = form.interest === "support";
  const interestLabel = supportSelected
    ? t(contact.form.supportInterest)
    : (services.items.find((item) => item.id === form.interest)?.[locale] ?? "—");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name && !email && !message) {
      setFieldErrors({});
      setErrorKind("empty");
      setSentTo(null);
      return;
    }
    const nextErrors: Partial<Record<"name" | "email" | "message", string>> = {};
    if (!name) nextErrors.name = t(contact.form.nameRequired);
    if (!email) nextErrors.email = t(contact.form.emailRequired);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t(contact.form.emailInvalid);
    if (!message) nextErrors.message = t(contact.form.messageRequired);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setErrorKind(null);
      setSentTo(null);
      return;
    }
    setFieldErrors({});
    setErrorKind(null);
    setSending(true);
    const result = await sendContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      interest: form.interest,
      interestLabel,
      message: form.message.trim(),
      locale,
    });
    setSending(false);
    if (!result.ok) {
      if (result.reason === "validation") {
        setFieldErrors({
          name: result.fields.name?.[0],
          email: result.fields.email ? t(contact.form.emailInvalid) : undefined,
          message: result.fields.message?.[0],
        });
        setSentTo(null);
        return;
      }
      setErrorKind(result.reason === "config" || result.reason === "unavailable" ? "config" : "send");
      setSentTo(null);
      return;
    }
    setForm(emptyForm);
    setSentTo(result.to);
  }

  return (
    <section id="contact" className={cn(greatVibes.variable, "bg-[var(--brand-orange-hot)] pt-20 pb-8 md:pt-28 md:pb-10")}>
      <Shell>
        <div className="relative ">
          <div
            aria-hidden
            className="pointer-events-none absolute  -top-8 inset-x-0 z-20 flex justify-center gap-16 sm:gap-28 md:gap-40"
          >
            <BinderClip className="h-[4.4rem] w-12" />
            <BinderClip className="h-[4.4rem] w-12" />
          </div>

          <div className="relative overflow-visible bg-[var(--brand-cream)] px-4 py-14 text-[var(--brand-ink)] shadow-[0_24px_60px_rgb(0_0_0/0.35)] sm:px-6 md:px-14 md:py-20">
            <Hummingbird
              surface="light"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[min(28rem,70%)] w-[min(44rem,92%)] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]"
            />

            <Reveal className="relative mx-auto mb-12 max-w-2xl text-center">
              <h2
                className={cn(
                  "m-0 text-[clamp(2.6rem,7vw,4.8rem)] leading-none text-[var(--brand-purple-deep)]",
                  locale === "ar" ? "font-display font-semibold" : "font-script",
                )}
              >
                {t(contact.title)}
              </h2>
              <p
                className={cn(
                  "mt-3 text-[1.05rem] font-semibold text-[var(--brand-orange)]",
                  locale === "en" && "tracking-[0.18em] uppercase",
                )}
              >
                {t(contact.region)}
              </p>
            </Reveal>

            <ul
              ref={listRef}
              className="relative mx-auto grid max-w-3xl list-none gap-5 p-0 sm:grid-cols-2"
            >
                {offices.map((office) => (
                  <li key={office.id} className="contact-channel list-none">
                    <article className="relative flex items-center">
                      <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--brand-ink)]/12 bg-white shadow-[0_8px_20px_rgb(10_6_24/0.08)]">
                        <span className="sr-only">{t(contact.map.title)}</span>
                        <ChannelIcon id="location" />
                      </span>
                      <div className="relative -ms-7 min-w-0 flex-1 rounded-2xl border border-[var(--brand-ink)]/12 bg-white py-3.5 ps-10 pe-4 shadow-[0_10px_24px_rgb(10_6_24/0.05)]">
                        <span
                          aria-hidden
                          className="absolute end-3 bottom-0 h-1 w-14 rounded-full bg-[linear-gradient(90deg,var(--brand-teal),var(--brand-purple))]"
                        />
                        <div className="grid gap-1.5 text-start">
                          <p className="m-0 text-[0.95rem] font-semibold">
                            {officeHeading(office, locale)}
                          </p>
                          {office.address ? <p className="m-0 text-[0.95rem] font-medium">{t(office.address)}</p> : null}
                          {office.phones.map((phone) => (
                            <a
                              key={`${phone.kind}-${phone.digits}`}
                              href={phone.kind === "whatsapp" ? whatsappHref(t(contact.greeting), phone.digits) : telHref(phone.digits)}
                              {...(phone.kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              className="text-[0.95rem] font-medium transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                            >
                              <span className="text-[var(--brand-muted)]">{t(phoneLabels[phone.kind])}</span>{" "}
                              <span className="contact-number" dir="ltr">{phone.display}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
                <li className="contact-channel list-none">
                  <article className="relative flex items-center">
                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--brand-ink)]/12 bg-white shadow-[0_8px_20px_rgb(10_6_24/0.08)]">
                      <span className="sr-only">{t(nav.social)}</span>
                      <ChannelIcon id="social" />
                    </span>
                    <div className="relative -ms-7 min-w-0 flex-1 rounded-2xl border border-[var(--brand-ink)]/12 bg-white py-3.5 ps-10 pe-4 shadow-[0_10px_24px_rgb(10_6_24/0.05)]">
                      <span
                        aria-hidden
                        className="absolute end-3 bottom-0 h-1 w-14 rounded-full bg-[linear-gradient(90deg,var(--brand-teal),var(--brand-purple))]"
                      />
                      <div className="grid gap-1.5 text-start">
                        {officialSocialProfiles()
                          .filter((profile) => profile.platform !== "telegram")
                          .map((profile) => (
                            <a
                              key={profile.platform}
                              href={profile.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[0.95rem] font-medium transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                            >
                              <SocialBrandIcon platform={profile.platform} className="h-4 w-4 shrink-0" />
                              <span>{profile.name}</span>
                            </a>
                          ))}
                      </div>
                    </div>
                  </article>
                </li>
                {contact.emails
                  .filter((email) => email.id !== "sales")
                  .map((email) => (
                  <li key={email.id} className="contact-channel list-none">
                    <article className="relative flex items-center">
                      <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--brand-ink)]/12 bg-white shadow-[0_8px_20px_rgb(10_6_24/0.08)]">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none">
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--brand-orange)" strokeWidth="1.7" />
                          <path d="m4 7 8 6 8-6" stroke="var(--brand-orange)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="relative -ms-7 min-w-0 flex-1 rounded-2xl border border-[var(--brand-ink)]/12 bg-white py-3.5 ps-10 pe-4 shadow-[0_10px_24px_rgb(10_6_24/0.05)]">
                        <span
                          aria-hidden
                          className="absolute end-3 bottom-0 h-1 w-14 rounded-full bg-[linear-gradient(90deg,var(--brand-teal),var(--brand-purple))]"
                        />
                        <a
                          href={`mailto:${email.address}`}
                          dir="ltr"
                          className="text-[0.95rem] font-medium transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                        >
                          <span className="text-[var(--brand-muted)]">{t(email.label)}</span>{" "}
                          {email.address}
                        </a>
                      </div>
                    </article>
                  </li>
                ))}
            </ul>

            <Reveal>
              <ContactMap />
            </Reveal>

            <Reveal className="relative mx-auto mt-14 max-w-3xl border-t border-[var(--brand-line)] pt-10">
              <p className="mb-8 text-center text-[1.02rem] leading-relaxed text-[var(--brand-ink)]/80">
                {t(contact.lead)}
              </p>
              <form
                onSubmit={onSubmit}
                noValidate
                className="grid gap-4"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-start text-[0.82rem]">
                    <span>{t(contact.form.name)}</span>
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      className={cn(fieldClass, "text-start", fieldErrors.name && "border-[#9a2b2b]")}
                    />
                    {fieldErrors.name ? <span className="text-[#9a2b2b]">{fieldErrors.name}</span> : null}
                  </label>
                  <label className="grid gap-2 text-start text-[0.82rem]">
                    <span>{t(contact.form.email)}</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      className={cn(fieldClass, "text-start", fieldErrors.email && "border-[#9a2b2b]")}
                    />
                    {fieldErrors.email ? <span className="text-[#9a2b2b]">{fieldErrors.email}</span> : null}
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-start text-[0.82rem]">
                    <span>{t(contact.form.phone)}</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      dir="ltr"
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className={cn(fieldClass, "text-start")}
                    />
                  </label>
                  <label className="grid gap-2 text-start text-[0.82rem]">
                    <span>{t(contact.form.interest)}</span>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={(e) => setForm((prev) => ({ ...prev, interest: e.target.value }))}
                      className={cn(fieldClass, "text-start")}
                    >
                      <option value="">{t(contact.form.interestPlaceholder)}</option>
                      <option value="support">{t(contact.form.supportInterest)}</option>
                      {services.items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {locale === "ar" ? item.ar : item.en}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-start text-[0.82rem]">
                  <span>{t(contact.form.message)}</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className={cn(fieldClass, "min-h-[8.5rem] resize-y text-start", fieldErrors.message && "border-[#9a2b2b]")}
                  />
                  {fieldErrors.message ? <span className="text-[#9a2b2b]">{fieldErrors.message}</span> : null}
                </label>

                {errorKind ? (
                  <p role="alert" className="m-0 text-[0.9rem] text-[#9a2b2b]">
                    {t(
                      errorKind === "empty"
                        ? contact.form.error
                        : errorKind === "config"
                          ? contact.form.errorConfig
                          : contact.form.errorSend,
                    )}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={sending}
                  className={cn(
                    "mt-2 inline-flex w-fit justify-self-center rounded-full bg-[var(--brand-purple)] px-6 py-3 text-[0.82rem] font-semibold uppercase text-[var(--brand-ivory)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] disabled:cursor-wait disabled:opacity-70",
                    locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
                  )}
                >
                  {sending ? t(contact.form.sending) : t(contact.form.submit)}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </Shell>
      {sentTo ? (
        <p role="status" className="mx-auto mt-6 w-[var(--content)] text-center text-[1.05rem] font-semibold text-[var(--brand-ivory)]">
          {t(contact.form.successSupport)}
        </p>
      ) : null}
    </section>
  );
}
