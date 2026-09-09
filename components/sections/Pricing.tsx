"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { pricing, WHATSAPP_NUMBER } from "@/lib/content";
import { withBasePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

type PricingPlan = (typeof pricing.groups)[number]["plans"][number];
type PricingGroup = (typeof pricing.groups)[number];

function formatAmount(value: number, locale: "en" | "ar") {
  const localeTag = locale === "ar" ? "ar-SY-u-nu-latn" : "en-US";
  const grouped = new Intl.NumberFormat(localeTag, { maximumFractionDigits: 0 }).format(value);
  return `$${grouped}`;
}

function PricingTiltCard({
  children,
  featured = false,
}: {
  children: ReactNode;
  featured?: boolean;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const inner = innerRef.current;
      if (!inner || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = inner.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -14;
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
      const lift = featured ? 14 : 8;

      inner.style.setProperty("--tilt-x", `${x}%`);
      inner.style.setProperty("--tilt-y", `${y}%`);
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px)`;
    },
    [featured],
  );

  const handleLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform = "";
    inner.style.removeProperty("--tilt-x");
    inner.style.removeProperty("--tilt-y");
  }, []);

  return (
    <div className="pricing-tilt">
      <div
        ref={innerRef}
        className="pricing-tilt-inner"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <span aria-hidden className="pricing-tilt-shine" />
        {children}
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  group,
  locale,
  t,
}: {
  plan: PricingPlan;
  group: PricingGroup;
  locale: "en" | "ar";
  t: (copy: { en: string; ar: string }) => string;
}) {
  const planLabel = `${t(plan.name)} — ${t(plan.subtitle)}`;
  const period = "oneTime" in group && group.oneTime ? t(pricing.oneTime) : t(pricing.perMonth);
  const reach = "reach" in plan ? plan.reach : null;

  return (
    <PricingTiltCard featured={plan.featured}>
      <article
        className={cn(
          "lux-card relative flex h-full flex-col border bg-white/85 p-6 backdrop-blur-sm md:p-7",
          plan.featured
            ? "border-[var(--brand-orange)] shadow-[0_22px_50px_rgb(26_18_36/0.12)] ring-1 ring-[var(--brand-orange)]/35"
            : "border-[var(--brand-line)]",
        )}
      >
        {plan.featured && plan.badge ? (
          <span className="absolute -top-3 inset-x-0 mx-auto w-fit rounded-full bg-[var(--brand-orange)] px-4 py-1 text-[0.72rem] font-semibold text-[var(--brand-purple-deep)]">
            {t(plan.badge)}
          </span>
        ) : null}

        <div className="flex flex-col gap-1">
          <h3 className="font-display m-0 text-[1.35rem] font-semibold leading-snug text-[var(--brand-ink)]">
            {t(plan.name)}
          </h3>
          <p className="m-0 text-[0.88rem] text-[var(--brand-muted)]">{t(plan.subtitle)}</p>
        </div>

        <div className="mt-5 flex items-end gap-2">
          <p
            className="font-display m-0 text-[clamp(1.85rem,3.5vw,2.35rem)] font-semibold leading-none text-[var(--brand-purple-deep)]"
            suppressHydrationWarning
          >
            {formatAmount(plan.priceUsd, locale)}
          </p>
          <p className="m-0 pb-1 text-[0.82rem] text-[var(--brand-muted)]">{period}</p>
        </div>

        {reach ? (
          <dl className="mt-5 grid gap-2.5 rounded-xl border border-[var(--brand-line)] bg-[var(--brand-off-white)]/60 p-4">
            <div className="flex items-start justify-between gap-3 text-[0.84rem]">
              <dt className="text-[var(--brand-muted)]">{t(pricing.reachLabels.adBudget)}</dt>
              <dd className="m-0 font-semibold text-[var(--brand-ink)]" suppressHydrationWarning>
                {formatAmount(reach.adBudgetUsd, locale)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3 text-[0.84rem]">
              <dt className="text-[var(--brand-muted)]">{t(pricing.reachLabels.adCredit)}</dt>
              <dd className="m-0 font-semibold text-[var(--brand-ink)]" suppressHydrationWarning>
                {formatAmount(reach.adCreditUsd, locale)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3 text-[0.84rem]">
              <dt className="text-[var(--brand-muted)]">{t(pricing.reachLabels.estimatedReach)}</dt>
              <dd className="m-0 font-semibold text-[var(--brand-teal-deep)]">{t(reach.estimatedReach)}</dd>
            </div>
            <div className="border-t border-[var(--brand-line)] pt-2.5 text-[0.84rem] leading-relaxed">
              <dt className="mb-1 text-[var(--brand-muted)]">{t(pricing.reachLabels.goal)}</dt>
              <dd className="m-0 text-[var(--brand-ink)]/82">{t(reach.goal)}</dd>
            </div>
          </dl>
        ) : null}

        {plan.features.length > 0 ? (
          <ul className="mt-5 flex flex-1 list-none flex-col gap-2.5 p-0">
            {plan.features.map((feature) => (
              <li
                key={feature.en}
                className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-[var(--brand-ink)]/78"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-teal)]"
                />
                {t(feature)}
              </li>
            ))}
          </ul>
        ) : null}

        <a
          href={whatsappHref(
            locale === "ar"
              ? `مرحباً هوم أوف كريتيفيتي، أريد الاشتراك في ${planLabel}.`
              : `Hello Home of Creativity, I would like the ${planLabel} package.`,
            WHATSAPP_NUMBER,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[0.82rem] font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
            plan.featured
              ? "bg-[var(--brand-orange)] text-[var(--brand-purple-deep)]"
              : "border border-[var(--brand-purple-deep)] bg-transparent text-[var(--brand-purple-deep)] hover:bg-[var(--brand-purple-deep)] hover:text-[var(--brand-cream)]",
            locale === "ar" ? "tracking-normal" : "tracking-[0.1em] uppercase",
          )}
        >
          {t(pricing.ctaDefault)}
        </a>
      </article>
    </PricingTiltCard>
  );
}

export function Pricing() {
  const { t, locale } = useLanguage();
  const [activeGroup, setActiveGroup] = useState(pricing.groups[0].id);

  const group = useMemo(
    () => pricing.groups.find((entry) => entry.id === activeGroup) ?? pricing.groups[0],
    [activeGroup],
  );

  const sortedPlans = useMemo(
    () => [...group.plans].sort((a, b) => a.priceUsd - b.priceUsd),
    [group.plans],
  );

  return (
    <section id="pricing" className="relative overflow-hidden bg-[var(--brand-paper)] py-16 md:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgb(46_14_92/0.07),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_82%,rgb(231_153_58/0.08),transparent_38%)]"
      />

      <Shell className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading kicker={pricing.kicker} title={pricing.title} align="center" />
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--brand-ink)]/75">
            {t(pricing.lead)}
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <p
            className={cn(
              "mb-3 text-center text-[0.72rem] text-[var(--brand-muted)]",
              locale === "en" && "tracking-[0.18em] uppercase",
            )}
          >
            {t(pricing.chooseGroup)}
          </p>
          <div
            role="tablist"
            aria-label={t(pricing.chooseGroup)}
            className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
          >
            {pricing.groups.map((entry) => {
              const selected = entry.id === activeGroup;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveGroup(entry.id)}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] sm:px-5",
                    selected
                      ? "border-[var(--brand-purple-deep)] bg-[var(--brand-purple-deep)] text-[var(--brand-cream)]"
                      : "border-[var(--brand-line)] bg-white/80 text-[var(--brand-ink)] hover:border-[var(--brand-orange)]/50",
                  )}
                >
                  {t(entry.name)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {"leadInBox" in group && group.leadInBox ? (
          <Reveal className="mx-auto mt-8 max-w-3xl">
            <div className="rounded-xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/6 px-5 py-5 text-center md:px-6 md:py-6">
              <h3 className="font-display m-0 text-[1.25rem] font-semibold text-[var(--brand-ink)]">
                {t(group.name)}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--brand-ink)]/72">{t(group.lead)}</p>
              {"leadNote" in group && group.leadNote ? (
                <p className="mt-3 flex items-center justify-center gap-2 text-[0.95rem] font-extrabold text-[var(--brand-ink)]">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-[var(--brand-orange)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                  {t(group.leadNote)}
                </p>
              ) : null}
            </div>
          </Reveal>
        ) : (
          <Reveal className="mt-8 mx-auto max-w-3xl text-center">
            <h3 className="font-display m-0 text-[1.25rem] font-semibold text-[var(--brand-ink)]">
              {t(group.name)}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--brand-ink)]/72">{t(group.lead)}</p>
          </Reveal>
        )}

        <Stagger
          key={group.id}
          className={cn(
            "pricing-cards mt-10",
            group.plans.length === 5 && "pricing-cards-5",
            group.plans.length <= 3 && "pricing-cards-3",
            group.plans.length > 3 && group.plans.length !== 5 && "pricing-cards-many",
          )}
        >
          {sortedPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PlanCard plan={plan} group={group} locale={locale} t={t} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 space-y-3 text-center">
          <p className="m-0 text-[0.88rem] leading-relaxed text-[var(--brand-muted)]">
            {t(pricing.footnote)}
          </p>
          <p className="m-0 text-[0.92rem] text-[var(--brand-ink)]/72">{t(pricing.confirmNote)}</p>
        </Reveal>

        <Reveal className="pricing-payment relative mt-16 overflow-hidden rounded-[2rem] border border-[var(--brand-orange)]/20 bg-[var(--brand-purple-deep)] px-5 py-10 shadow-[0_24px_70px_rgb(26_8_56/0.18)] sm:px-8 md:mt-20 md:px-12 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgb(231_153_58/0.12),transparent_42%),radial-gradient(circle_at_80%_75%,rgb(43_181_168/0.08),transparent_35%)]"
          />
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              kicker={pricing.payment.kicker}
              title={pricing.payment.title}
              invert
              align="center"
            />
            <p className="mt-5 text-[1rem] leading-relaxed text-white/70">
              {t(pricing.payment.lead)}
            </p>
          </div>

          <ul className="relative mx-auto mt-10 grid max-w-2xl list-none grid-cols-2 gap-3 p-0 sm:gap-5">
            {pricing.payment.methods.map((method) => (
              <li
                key={method.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-[var(--brand-orange)]/35 bg-[var(--brand-charcoal)] shadow-[0_18px_38px_rgb(0_0_0/0.35)] sm:rounded-[1.75rem]"
              >
                <div className="relative h-[72%] overflow-hidden">
                  <Image
                    src={withBasePath(method.image)}
                    alt=""
                    width={760}
                    height={560}
                    sizes="(max-width: 640px) 44vw, 304px"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,var(--brand-charcoal))]"
                  />
                </div>
                <svg
                  aria-hidden
                  viewBox="0 0 48 48"
                  className="absolute end-4 top-4 h-7 w-7 fill-none stroke-[var(--brand-orange)] opacity-80 drop-shadow-[0_0_8px_rgb(231_153_58/0.55)] sm:end-5 sm:top-5 sm:h-8 sm:w-8"
                >
                  <path d="M8 15h27a5 5 0 0 1 5 5v18H13a7 7 0 0 1-7-7V12a6 6 0 0 1 6-6h20" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M31 25h11v8H31a4 4 0 0 1 0-8Z" strokeWidth="2.4" strokeLinejoin="round" />
                  <circle cx="32" cy="29" r="1.4" className="fill-[var(--brand-orange)] stroke-none" />
                </svg>
                <div className="absolute inset-x-0 bottom-0 flex h-[32%] flex-col items-center justify-center border-t border-[var(--brand-orange)]/20 bg-[var(--brand-charcoal)] px-3 text-center">
                  <p className="m-0 font-display text-[clamp(1rem,3vw,1.35rem)] font-semibold text-[var(--brand-cream)]">
                    {t(method.name)}
                  </p>
                  <p className="mt-1 m-0 text-[0.72rem] text-white/40 sm:text-[0.82rem]" dir={locale === "ar" ? "ltr" : "rtl"}>
                    {locale === "ar" ? method.name.en : method.name.ar}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="relative mt-8 text-center text-[0.88rem] text-white/55">
            {t(pricing.payment.note)}
          </p>
          <div className="relative mt-6 flex justify-center">
            <a
              href={whatsappHref(
                locale === "ar"
                  ? "مرحباً هوم أوف كريتيفيتي، اخترت باقة وأريد تأكيد طريقة الدفع."
                  : "Hello Home of Creativity, I chose a package and need to confirm payment details.",
                WHATSAPP_NUMBER,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-[var(--brand-orange)] px-6 py-3 text-[0.82rem] font-semibold text-[var(--brand-purple-deep)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                locale === "ar" ? "tracking-normal" : "tracking-[0.1em] uppercase",
              )}
            >
              {t(pricing.payment.cta)}
            </a>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
