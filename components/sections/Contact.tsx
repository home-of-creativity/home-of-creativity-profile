"use client";

import { Great_Vibes } from "next/font/google";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { contact, services } from "@/lib/content";
import { fetchContactChannels, mergeContactChannels } from "@/lib/contact-api";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-great-vibes",
});
import { useLanguage, type Copy } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";
import { Hummingbird } from "../brand";
import { SocialBrandIcon } from "../SocialBrandIcon";
import { Reveal } from "../motion";
import { Shell } from "../ui";
import { cn } from "@/lib/cn";

function telHref(digits: string) {
  return `tel:+${digits.replace(/\D/g, "")}`;
}

function lineText(text: string | Copy, t: (copy: Copy) => string) {
  return typeof text === "string" ? text : t(text);
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

function ChannelIcon({ id }: { id: (typeof contact.channels)[number]["id"] }) {
  if (id === "mobile") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none">
        <rect x="7" y="2.5" width="10" height="19" rx="2.2" stroke="#3d6cb9" strokeWidth="1.7" />
        <path d="M11 18.5h2" stroke="#3d6cb9" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="#25D366">
        <path d="M12 3.2c-4.7 0-8.5 3.7-8.5 8.4 0 1.5.4 2.9 1.1 4.1L3.4 20.6l5-1.3c1.2.6 2.5 1 3.6 1 4.7 0 8.5-3.7 8.5-8.4S16.7 3.2 12 3.2Zm4.7 11.8c-.2.5-1.1 1-1.6 1.1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.8-.3h.6c.2 0 .4 0 .6.5.2.6.8 2 .8 2.1.1.1.1.3 0 .4l-.4.5c-.1.1-.2.3-.1.5.1.2.5 1 .1.2 1.7.8 1.5.4 1.8.3.2-.1.5-.4.7-.6.2-.2.4-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3 0 .2 0 .8-.3 1.3Z" />
      </svg>
    );
  }

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
  const { t, locale } = useLanguage();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [channels, setChannels] = useState(contact.channels);

  useEffect(() => {
    let active = true;
    fetchContactChannels().then((data) => {
      if (active) setChannels(mergeContactChannels(data));
    });
    return () => {
      active = false;
    };
  }, [locale]);

  const fieldClass =
    "w-full rounded-none border border-[var(--brand-line)] bg-white/80 px-4 py-3 text-[1rem] text-[var(--brand-ink)] outline-none transition-colors placeholder:text-[var(--brand-muted)] focus-visible:border-[var(--brand-orange)] focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]/30";

  const template = t(contact.form.whatsappTemplate);

  const preview = useMemo(
    () =>
      template
        .replace("{{name}}", form.name.trim() || "—")
        .replace("{{email}}", form.email.trim() || "—")
        .replace("{{phone}}", form.phone.trim() || "—")
        .replace("{{interest}}", form.interest.trim() || "—")
        .replace("{{message}}", form.message.trim()),
    [form, template],
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = form.name.trim() && form.email.trim() && form.message.trim();
    if (!valid) {
      setError(true);
      setSent(false);
      return;
    }
    setError(false);
    setSent(true);
    window.open(whatsappHref(preview), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className={cn(greatVibes.variable, "bg-[var(--brand-charcoal)] pt-20 pb-8 md:pt-28 md:pb-10")}>
      <Shell>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 inset-x-0 z-20 flex justify-center gap-16 sm:gap-28 md:gap-40"
          >
            <BinderClip className="h-[4.4rem] w-12" />
            <BinderClip className="h-[4.4rem] w-12" />
          </div>

          <div className="relative overflow-hidden bg-[var(--brand-cream)] px-4 py-14 text-[var(--brand-ink)] shadow-[0_24px_60px_rgb(0_0_0/0.35)] sm:px-6 md:px-14 md:py-20">
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

            <Reveal>
              <ul className="relative mx-auto grid max-w-3xl list-none gap-5 p-0 sm:grid-cols-2">
                {channels.filter((channel) => channel.lines.length > 0).map((channel) => (
                  <li key={channel.id} className="list-none">
                    <article className="relative flex items-center">
                      <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--brand-ink)]/12 bg-white shadow-[0_8px_20px_rgb(10_6_24/0.08)]">
                        <span className="sr-only">{t(channel.label)}</span>
                        <ChannelIcon id={channel.id} />
                      </span>
                      <div className="relative -ms-7 min-w-0 flex-1 rounded-2xl border border-[var(--brand-ink)]/12 bg-white py-3.5 ps-10 pe-4 shadow-[0_10px_24px_rgb(10_6_24/0.05)]">
                        <span
                          aria-hidden
                          className="absolute end-3 bottom-0 h-1 w-14 rounded-full bg-[linear-gradient(90deg,var(--brand-teal),var(--brand-purple))]"
                        />
                        <div className="grid gap-1.5 text-start">
                          {channel.lines.map((line) => {
                            const text = lineText("text" in line ? line.text : "", t);
                            const platform = "platform" in line ? line.platform : undefined;
                            const label = `${platform ?? ("region" in line ? line.region : "")} ${text}`;
                            if (channel.kind === "whatsapp" && "digits" in line && line.digits) {
                              return (
                                <a
                                  key={label}
                                  href={whatsappHref(t(contact.greeting), line.digits)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[0.95rem] font-medium transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                                >
                                  <span className="text-[var(--brand-muted)]">{line.region}</span>{" "}
                                  <span dir="ltr">{text}</span>
                                </a>
                              );
                            }

                            if (channel.kind === "tel" && "digits" in line && line.digits) {
                              return (
                                <a
                                  key={label}
                                  href={telHref(line.digits)}
                                  className="text-[0.95rem] font-medium transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                                >
                                  <span className="text-[var(--brand-muted)]">{line.region}</span>{" "}
                                  <span dir="ltr">{text}</span>
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
                                  className="inline-flex items-center gap-2 text-[0.95rem] font-medium transition-colors hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                                >
                                  {platform ? <SocialBrandIcon platform={platform} className="h-4 w-4 shrink-0" /> : null}
                                  <span>{text}</span>
                                </a>
                              );
                            }

                            return (
                              <p key={label} className="m-0 text-[0.95rem] font-medium">
                                {"region" in line && line.region ? (
                                  <span className="text-[var(--brand-muted)]">{line.region} </span>
                                ) : null}
                                {text}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
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
                      className={cn(fieldClass, "text-start")}
                    />
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
                      className={cn(fieldClass, "text-start")}
                    />
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
                      {services.items.map((item) => (
                        <option key={item.id} value={locale === "ar" ? item.ar : item.en}>
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
                    className={cn(fieldClass, "min-h-[8.5rem] resize-y text-start")}
                  />
                </label>

                {error ? (
                  <p role="alert" className="m-0 text-[0.9rem] text-[#9a2b2b]">
                    {t(contact.form.error)}
                  </p>
                ) : null}
                {sent ? (
                  <p role="status" className="m-0 text-[0.9rem] text-[var(--brand-teal-deep)]">
                    {t(contact.form.success)}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className={cn(
                    "mt-2 inline-flex w-fit justify-self-center rounded-full bg-[var(--brand-purple)] px-6 py-3 text-[0.82rem] font-semibold uppercase text-[var(--brand-cream)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                    locale === "ar" ? "tracking-normal" : "tracking-[0.14em]",
                  )}
                >
                  {t(contact.form.submit)}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
