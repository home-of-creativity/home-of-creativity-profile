"use client";

import { cn } from "@/lib/cn";
import { useLanguage, type Copy } from "@/lib/i18n";

export function Shell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-[var(--content)]", className)}>{children}</div>
  );
}

export function SectionHeading({
  title,
  kicker,
  invert = false,
  align = "start",
}: {
  title: Copy;
  kicker?: Copy;
  invert?: boolean;
  align?: "start" | "center";
}) {
  const { t, locale } = useLanguage();

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "text-start",
      )}
    >
      <span aria-hidden className="block h-px w-9 bg-[var(--brand-orange)]" />
      {kicker ? (
        <p
          className={cn(
            "m-0 text-[0.78rem] uppercase",
            locale === "ar" ? "tracking-normal" : "tracking-[0.28em]",
            invert ? "text-white/55" : "text-[var(--brand-muted)]",
          )}
        >
          {t(kicker)}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display m-0 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05]",
          invert ? "text-[var(--brand-ivory)]" : "text-[var(--brand-ink)]",
        )}
      >
        {t(title)}
      </h2>
    </div>
  );
}
