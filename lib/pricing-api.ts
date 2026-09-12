import { demoPricingCategories } from "./demo-data";
import { isDemoDataEnabled } from "./demo-mode";
import type {
  BillingPeriod,
  PricingCategory,
  PricingPlan,
  PricingReach,
  PricingSubcategory,
} from "./pricing-catalog";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000/api";

type ApiCopy = { en: string; ar: string };

type ApiReach = {
  adBudgetUsd: number;
  adCreditUsd: number;
  estimatedReach: ApiCopy;
  goal: ApiCopy;
};

type ApiPricingPackage = {
  slug: string;
  name_en: string;
  name_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  price_usd: number | null;
  prices: Partial<Record<BillingPeriod, number>> | null;
  features: ApiCopy[];
  reach: ApiReach | null;
  featured: boolean;
  badge_en: string | null;
  badge_ar: string | null;
};

type ApiPricingSubcategory = {
  slug: string;
  name_en: string;
  name_ar: string;
  lead_en: string | null;
  lead_ar: string | null;
  one_time: boolean;
  lead_in_box: boolean;
  lead_note_en: string | null;
  lead_note_ar: string | null;
  packages: ApiPricingPackage[];
};

type ApiPricingCategory = {
  slug: string;
  name_en: string;
  name_ar: string;
  lead_en: string;
  lead_ar: string;
  subcategories: ApiPricingSubcategory[];
};

function mapReach(reach: ApiReach): PricingReach {
  return {
    adBudgetUsd: reach.adBudgetUsd,
    adCreditUsd: reach.adCreditUsd,
    estimatedReach: reach.estimatedReach,
    goal: reach.goal,
  };
}

function mapPackage(pkg: ApiPricingPackage): PricingPlan {
  const plan: PricingPlan = {
    id: pkg.slug,
    name: { en: pkg.name_en, ar: pkg.name_ar },
    subtitle: { en: pkg.subtitle_en, ar: pkg.subtitle_ar },
    features: pkg.features ?? [],
    featured: pkg.featured,
  };

  if (pkg.badge_en || pkg.badge_ar) {
    plan.badge = { en: pkg.badge_en ?? "", ar: pkg.badge_ar ?? "" };
  }

  if (pkg.price_usd != null) {
    plan.priceUsd = pkg.price_usd;
  }

  if (pkg.prices) {
    plan.prices = {
      monthly: pkg.prices.monthly ?? 0,
      quarterly: pkg.prices.quarterly ?? 0,
      semiannual: pkg.prices.semiannual ?? 0,
      yearly: pkg.prices.yearly ?? 0,
    };
  }

  if (pkg.reach) {
    plan.reach = mapReach(pkg.reach);
  }

  return plan;
}

function mapSubcategory(sub: ApiPricingSubcategory): PricingSubcategory {
  const entry: PricingSubcategory = {
    id: sub.slug,
    name: { en: sub.name_en, ar: sub.name_ar },
    oneTime: sub.one_time,
    leadInBox: sub.lead_in_box,
    plans: (sub.packages ?? []).map(mapPackage),
  };

  if (sub.lead_en || sub.lead_ar) {
    entry.lead = { en: sub.lead_en ?? "", ar: sub.lead_ar ?? "" };
  }

  if (sub.lead_note_en || sub.lead_note_ar) {
    entry.leadNote = { en: sub.lead_note_en ?? "", ar: sub.lead_note_ar ?? "" };
  }

  return entry;
}

function mapCategory(category: ApiPricingCategory): PricingCategory {
  return {
    id: category.slug,
    name: { en: category.name_en, ar: category.name_ar },
    lead: { en: category.lead_en, ar: category.lead_ar },
    subcategories: (category.subcategories ?? []).map(mapSubcategory),
  };
}

export async function fetchPricingCategories(): Promise<PricingCategory[]> {
  try {
    const response = await fetch(`${API_BASE}/pricing`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (response.ok) {
      const payload = (await response.json()) as { data?: ApiPricingCategory[] };
      const rows = Array.isArray(payload.data) ? payload.data : [];
      const mapped = rows.map(mapCategory).filter((category) => category.subcategories.length > 0);
      if (mapped.length > 0) return mapped;
    }
  } catch {
    // Static deploy without the VPS API.
  }

  return isDemoDataEnabled() ? demoPricingCategories : [];
}
