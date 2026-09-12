import { contact } from "./content";
import { isDemoDataEnabled } from "./demo-mode";
import type { Copy } from "./i18n";

export type ContactApiItem = {
  id: number;
  kind: "mobile" | "whatsapp" | "social" | "location";
  region: string | null;
  platform: string | null;
  value: string;
  value_ar: string | null;
  digits: string | null;
  url: string | null;
  sort_order: number;
};

export type ContactApiPayload = {
  mobile: ContactApiItem[];
  whatsapp: ContactApiItem[];
  social: ContactApiItem[];
  location: ContactApiItem[];
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000/api";

function emptyContactPayload(): ContactApiPayload {
  return { mobile: [], whatsapp: [], social: [], location: [] };
}

function contactPayloadHasItems(data: ContactApiPayload | null) {
  if (!data) return false;
  return data.mobile.length + data.whatsapp.length + data.social.length + data.location.length > 0;
}

export async function fetchContactChannels(): Promise<ContactApiPayload | null> {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (response.ok) {
      const payload = (await response.json()) as { data?: ContactApiPayload };
      if (contactPayloadHasItems(payload.data ?? null)) {
        return payload.data ?? null;
      }
    }
  } catch {
    // Use demo numbers on a static deploy until the VPS API is wired.
  }

  return isDemoDataEnabled() ? null : emptyContactPayload();
}

type Channel = (typeof contact.channels)[number];

export function mergeContactChannels(data: ContactApiPayload | null): Channel[] {
  if (!data) {
    return isDemoDataEnabled() ? contact.channels : [];
  }

  const next: Channel[] = [];

  for (const channel of contact.channels) {
    if (channel.kind === "tel") {
      next.push({
        ...channel,
        lines: data.mobile.map((item) => ({
          region: item.region ?? "SYR",
          text: item.value,
          digits: item.digits ?? "",
        })),
      });
      continue;
    }

    if (channel.kind === "whatsapp") {
      next.push({
        ...channel,
        lines: data.whatsapp.map((item) => ({
          region: item.region ?? "SYR",
          text: item.value,
          digits: item.digits ?? "",
        })),
      });
      continue;
    }

    if (channel.kind === "link") {
      next.push({
        ...channel,
        lines: data.social.map((item) => ({
          platform: item.platform === "facebook" ? "facebook" as const : "instagram" as const,
          text: { en: item.value, ar: item.value_ar || item.value } satisfies Copy,
          href: item.url ?? "",
        })),
      });
      continue;
    }

    next.push({
      ...channel,
      lines: data.location.map((item) => ({
        region: item.region ?? "SYR",
        text: { en: item.value, ar: item.value_ar || item.value } satisfies Copy,
      })),
    });
  }

  return next;
}
