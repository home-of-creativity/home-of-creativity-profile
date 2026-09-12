"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { pricing, WHATSAPP_NUMBER } from "@/lib/content";
import { fetchPricingCategories } from "@/lib/pricing-api";
import {
  isOneTimePlan,
  resolvePlanPrice,
  type BillingPeriod,
  type PricingCategory,
  type PricingPlan,
  type PricingSubcategory,
} from "@/lib/pricing-catalog";
import { withBasePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { InternationalPhoneField } from "../InternationalPhoneField";
import { LoadingLottie } from "../LoadingLottie";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";
import { formatInternationalPhoneDisplay, isValidInternationalPhone } from "@/lib/phone";

const billingPeriods: BillingPeriod[] = ["monthly", "quarterly", "semiannual", "yearly"];

function billingDiscount(period: BillingPeriod) {
  const entry = pricing.billing[period] as { label: { en: string; ar: string }; discount?: { en: string; ar: string } };
  return entry.discount;
}

function DiscountBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-[var(--brand-teal-deep)] px-2.5 py-0.5 text-[0.72rem] font-semibold leading-none text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

function formatAmount(value: number, locale: "en" | "ar") {
  const localeTag = locale === "ar" ? "ar-SY-u-nu-latn" : "en-US";
  const grouped = new Intl.NumberFormat(localeTag, { maximumFractionDigits: 0 }).format(value);
  return `$${grouped}`;
}

function periodLabel(
  billing: BillingPeriod,
  oneTime: boolean,
  t: (copy: { en: string; ar: string }) => string,
) {
  if (oneTime) return t(pricing.oneTime);
  if (billing === "monthly") return t(pricing.perMonth);
  if (billing === "quarterly") return t(pricing.perThreeMonths);
  if (billing === "semiannual") return t(pricing.perSixMonths);
  return t(pricing.perYear);
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
  billing,
  oneTime,
  locale,
  t,
  onChoose,
}: {
  plan: PricingPlan;
  billing: BillingPeriod;
  oneTime: boolean;
  locale: "en" | "ar";
  t: (copy: { en: string; ar: string }) => string;
  onChoose: () => void;
}) {
  const price = resolvePlanPrice(plan, billing);
  const period = periodLabel(billing, oneTime, t);
  const reach = plan.reach ?? null;

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
            {formatAmount(price, locale)}
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

        <button
          type="button"
          onClick={onChoose}
          className={cn(
            "mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-full px-5 py-3 text-[0.82rem] font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
            plan.featured
              ? "bg-[var(--brand-orange)] text-[var(--brand-purple-deep)]"
              : "border border-[var(--brand-purple-deep)] bg-transparent text-[var(--brand-purple-deep)] hover:bg-[var(--brand-purple-deep)] hover:text-[var(--brand-cream)]",
            locale === "ar" ? "tracking-normal" : "tracking-[0.1em] uppercase",
          )}
        >
          {t(pricing.ctaDefault)}
        </button>
      </article>
    </PricingTiltCard>
  );
}

type InquiryForm = {
  name: string;
  phone: string | undefined;
  company: string;
};

type InquirySelection = {
  plan: PricingPlan;
  billing: BillingPeriod;
  oneTime: boolean;
};

const emptyInquiry: InquiryForm = { name: "", phone: undefined, company: "" };

function inquiryMessage(
  selection: InquirySelection,
  form: InquiryForm,
  t: (copy: { en: string; ar: string }) => string,
) {
  const period = periodLabel(selection.billing, selection.oneTime, t);
  return t(pricing.inquiry.whatsappTemplate)
    .replace("{{name}}", form.name.trim())
    .replace("{{company}}", form.company.trim())
    .replace("{{package}}", t(selection.plan.subtitle))
    .replace("{{period}}", period)
    .replace("{{phone}}", formatInternationalPhoneDisplay(form.phone));
}

function PackageInquiryDialog({
  selection,
  locale,
  t,
  onClose,
}: {
  selection: InquirySelection;
  locale: "en" | "ar";
  t: (copy: { en: string; ar: string }) => string;
  onClose: () => void;
}) {
  const { plan } = selection;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState<InquiryForm>(emptyInquiry);
  const [error, setError] = useState(false);

  const fieldClass =
    "w-full rounded-md border border-[var(--brand-line)] bg-white px-4 py-3 text-[1rem] text-[var(--brand-ink)] outline-none transition-colors placeholder:text-[var(--brand-muted)] focus-visible:border-[var(--brand-orange)] focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]/30";

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [onClose]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = form.name.trim() && isValidInternationalPhone(form.phone) && form.company.trim();
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    window.open(whatsappHref(inquiryMessage(selection, form, t)), "_blank", "noopener,noreferrer");
    onClose();
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgb(10_6_24/0.82)] p-3 sm:p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[var(--brand-cream)] p-5 text-[var(--brand-ink)] shadow-[0_24px_60px_rgb(0_0_0/0.35)] sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0 text-start">
            <p
              className={cn(
                "m-0 text-[0.72rem] text-[var(--brand-orange)]",
                locale === "en" && "tracking-[0.28em] uppercase",
              )}
            >
              {t(plan.subtitle)} · {periodLabel(selection.billing, selection.oneTime, t)}
            </p>
            <h3 id={titleId} className="font-display mt-1 text-[1.25rem] font-semibold">
              {t(pricing.inquiry.title)}
            </h3>
            <p className="mt-2 m-0 text-[0.92rem] leading-relaxed text-[var(--brand-ink)]/70">
              {t(pricing.inquiry.lead)}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-[var(--brand-line)] px-4 py-2 text-[0.82rem] font-semibold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
          >
            {t(pricing.inquiry.close)}
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid gap-4" dir={locale === "ar" ? "rtl" : "ltr"}>
          <label className="grid gap-2 text-start text-[0.82rem]">
            <span>{t(pricing.inquiry.name)}</span>
            <input
              ref={nameRef}
              name="name"
              autoComplete="name"
              required
              dir={locale === "ar" ? "rtl" : "ltr"}
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className={cn(fieldClass, "text-start")}
            />
          </label>
          <InternationalPhoneField
            label={t(pricing.inquiry.phone)}
            value={form.phone}
            onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
            locale={locale}
            placeholder={pricing.inquiry.phonePlaceholder}
            required
          />
          <label className="grid gap-2 text-start text-[0.82rem]">
            <span>{t(pricing.inquiry.company)}</span>
            <input
              name="company"
              autoComplete="organization"
              required
              dir={locale === "ar" ? "rtl" : "ltr"}
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              className={cn(fieldClass, "text-start")}
            />
          </label>

          {error ? (
            <p role="alert" className="m-0 text-[0.9rem] text-[#9a2b2b]">
              {t(pricing.inquiry.error)}
            </p>
          ) : null}

          <button
            type="submit"
            className={cn(
              "mt-1 inline-flex w-full items-center justify-center rounded-full bg-[var(--brand-orange)] px-6 py-3 text-[0.82rem] font-semibold text-[var(--brand-purple-deep)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
              locale === "ar" ? "tracking-normal" : "tracking-[0.1em] uppercase",
            )}
          >
            {t(pricing.inquiry.submit)}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function SubcategoryLead({
  subcategory,
  locale,
  t,
}: {
  subcategory: PricingSubcategory;
  locale: "en" | "ar";
  t: (copy: { en: string; ar: string }) => string;
}) {
  if (subcategory.leadInBox) {
    return (
      <Reveal className="mx-auto mt-8 max-w-3xl">
        <div className="rounded-xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/6 px-5 py-5 text-center md:px-6 md:py-6">
          <h3 className="font-display m-0 text-[1.25rem] font-semibold text-[var(--brand-ink)]">
            {t(subcategory.name)}
          </h3>
          {subcategory.lead ? (
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--brand-ink)]/72">
              {t(subcategory.lead)}
            </p>
          ) : null}
          {subcategory.leadNote ? (
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
              {t(subcategory.leadNote)}
            </p>
          ) : null}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="mx-auto mt-8 max-w-3xl text-center">
      <h3 className="font-display m-0 text-[1.25rem] font-semibold text-[var(--brand-ink)]">
        {t(subcategory.name)}
      </h3>
      {subcategory.lead ? (
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--brand-ink)]/72">{t(subcategory.lead)}</p>
      ) : null}
    </Reveal>
  );
}

export function Pricing() {
  const { t, locale } = useLanguage();
  const [categories, setCategories] = useState<PricingCategory[]>([]);
  const [ready, setReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [activeBilling, setActiveBilling] = useState<BillingPeriod>("monthly");
  const [inquirySelection, setInquirySelection] = useState<InquirySelection | null>(null);
  const closeInquiry = useCallback(() => setInquirySelection(null), []);

  useEffect(() => {
    let active = true;

    fetchPricingCategories()
      .then((items) => {
        if (!active) return;
        setCategories(items);
        setActiveCategory(items[0]?.id ?? "");
        setActiveSubcategory(items[0]?.subcategories[0]?.id ?? "");
      })
      .catch(() => {
        if (!active) return;
        setCategories([]);
        setActiveCategory("");
        setActiveSubcategory("");
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const category = useMemo(
    () => categories.find((entry) => entry.id === activeCategory) ?? categories[0],
    [categories, activeCategory],
  );

  const subcategory = useMemo(() => {
    if (!category) return undefined;
    return (
      category.subcategories.find((entry) => entry.id === activeSubcategory) ??
      category.subcategories[0]
    );
  }, [category, activeSubcategory]);

  const oneTime = subcategory?.oneTime ?? false;

  const sortedPlans = useMemo(() => {
    if (!subcategory) return [];
    return [...subcategory.plans].sort(
      (a, b) => resolvePlanPrice(a, activeBilling) - resolvePlanPrice(b, activeBilling),
    );
  }, [subcategory, activeBilling]);

  function onCategoryChange(id: string) {
    setActiveCategory(id);
    const next = categories.find((entry) => entry.id === id);
    if (next?.subcategories[0]) setActiveSubcategory(next.subcategories[0].id);
  }

  return (
    <section
      id="pricing"
      className={cn(
        "relative overflow-hidden bg-[var(--brand-paper)] py-16 md:py-24 lg:py-32",
        !ready && "min-h-[24rem]",
      )}
      aria-busy={!ready}
    >
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

        {!ready ? <LoadingLottie className="mt-10" label={t(pricing.loading)} /> : null}

        {ready && categories.length === 0 ? (
          <p className="mt-10 text-center text-[0.95rem] text-[var(--brand-muted)]">{t(pricing.empty)}</p>
        ) : null}

        {ready && category && subcategory ? (
          <>
        <Reveal className="mt-10">
          <p
            className={cn(
              "mb-3 text-center text-[0.72rem] text-[var(--brand-muted)]",
              locale === "en" && "tracking-[0.18em] uppercase",
            )}
          >
            {t(pricing.chooseCategory)}
          </p>
          <div
            role="tablist"
            aria-label={t(pricing.chooseCategory)}
            className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
          >
            {categories.map((entry) => {
              const selected = entry.id === activeCategory;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => onCategoryChange(entry.id)}
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

        <Reveal className="mt-8 mx-auto max-w-3xl text-center">
          <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--brand-ink)]/72">{t(category.lead)}</p>
        </Reveal>

        {category.subcategories.length > 1 ? (
          <Reveal className="mt-8">
            <p
              className={cn(
                "mb-3 text-center text-[0.72rem] text-[var(--brand-muted)]",
                locale === "en" && "tracking-[0.18em] uppercase",
              )}
            >
              {t(pricing.chooseSubcategory)}
            </p>
            <div
              role="tablist"
              aria-label={t(pricing.chooseSubcategory)}
              className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
            >
              {category.subcategories.map((entry) => {
                const selected = entry.id === activeSubcategory;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveSubcategory(entry.id)}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)] sm:px-5",
                      selected
                        ? "border-[var(--brand-teal-deep)] bg-[var(--brand-teal-deep)] text-white"
                        : "border-[var(--brand-line)] bg-white/80 text-[var(--brand-ink)] hover:border-[var(--brand-teal)]/50",
                    )}
                  >
                    {t(entry.name)}
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        {!oneTime ? (
          <Reveal className="mt-8">
            <p
              className={cn(
                "mb-3 text-center text-[0.72rem] text-[var(--brand-muted)]",
                locale === "en" && "tracking-[0.18em] uppercase",
              )}
            >
              {t(pricing.chooseBilling)}
            </p>
            <div
              role="tablist"
              aria-label={t(pricing.chooseBilling)}
              className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
            >
              {billingPeriods.map((period) => {
                const selected = period === activeBilling;
                return (
                  <button
                    key={period}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveBilling(period)}
                    className={cn(
                      "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]",
                      selected
                        ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-[var(--brand-purple-deep)]"
                        : "border-[var(--brand-line)] bg-white/80 text-[var(--brand-ink)] hover:border-[var(--brand-orange)]/50",
                    )}
                  >
                    <span>{t(pricing.billing[period].label)}</span>
                    {billingDiscount(period) ? (
                      <DiscountBadge>{t(billingDiscount(period)!)}</DiscountBadge>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div className="mx-auto mt-4 max-w-xl rounded-xl bg-[var(--brand-teal-deep)] px-5 py-3 text-center shadow-[0_8px_24px_rgb(26_127_120/0.22)]">
              <p className="m-0 text-[0.84rem] leading-relaxed text-white">{t(pricing.billingSave)}</p>
            </div>
          </Reveal>
        ) : null}

        <SubcategoryLead subcategory={subcategory} locale={locale} t={t} />

        <Stagger
          key={`${category.id}-${subcategory.id}-${activeBilling}`}
          className={cn(
            "pricing-cards mt-10",
            sortedPlans.length === 5 && "pricing-cards-5",
            sortedPlans.length <= 3 && "pricing-cards-3",
            sortedPlans.length > 3 && sortedPlans.length !== 5 && "pricing-cards-many",
          )}
        >
          {sortedPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PlanCard
                plan={plan}
                billing={activeBilling}
                oneTime={oneTime || isOneTimePlan(plan)}
                locale={locale}
                t={t}
                onChoose={() =>
                  setInquirySelection({
                    plan,
                    billing: activeBilling,
                    oneTime: oneTime || isOneTimePlan(plan),
                  })
                }
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 space-y-3 text-center">
          <p className="m-0 text-[0.88rem] leading-relaxed text-[var(--brand-muted)]">
            {t(pricing.footnote)}
          </p>
          <p className="m-0 text-[0.92rem] text-[var(--brand-ink)]/72">{t(pricing.confirmNote)}</p>
        </Reveal>
          </>
        ) : null}

        <Reveal className="pricing-payment relative mt-16 overflow-hidden rounded-[2rem] bg-[var(--brand-purple-deep)] px-5 py-10 shadow-[0_24px_70px_rgb(26_8_56/0.18)] sm:px-8 md:mt-20 md:px-12 md:py-14">
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
                className="group relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[var(--brand-charcoal)] shadow-[0_18px_38px_rgb(0_0_0/0.35)] sm:rounded-[1.75rem]"
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
                <div className="absolute inset-x-0 bottom-0 flex h-[32%] flex-col items-center justify-center bg-[var(--brand-charcoal)] px-3 text-center">
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

      {inquirySelection ? (
        <PackageInquiryDialog
          selection={inquirySelection}
          locale={locale}
          t={t}
          onClose={closeInquiry}
        />
      ) : null}
    </section>
  );
}
