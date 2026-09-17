import type { Locale } from "./i18n";

export function formatStat(value: number, locale: Locale): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 10_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return new Intl.NumberFormat(locale === "ar" ? "ar" : "en").format(value);
}
