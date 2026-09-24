import { contact } from "./content";
import { isDemoDataEnabled } from "./demo-mode";
import { publicApiUrl } from "./public-api";
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

export type ContactSendInput = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  interestLabel: string;
  message: string;
  locale: "ar" | "en";
};

export type ContactSendResult =
  | { ok: true; to: "support" | "sales" }
  | { ok: false; reason: "unavailable" | "config" | "send" };

function contactApiBase(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "") ?? "";
  return raw.length > 0 ? raw : null;
}

export async function sendContactMessage(input: ContactSendInput): Promise<ContactSendResult> {
  const api = contactApiBase();
  if (!api) {
    return { ok: false, reason: "unavailable" };
  }

  try {
    const response = await fetch(`${api}/contact/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        phone: input.phone,
        interest: input.interest,
        interest_label: input.interestLabel,
        message: input.message,
        locale: input.locale,
      }),
    });

    if (response.status === 503) {
      return { ok: false, reason: "config" };
    }
    if (!response.ok) {
      return { ok: false, reason: "send" };
    }

    const payload = (await response.json()) as { data?: { to?: string } };
    return { ok: true, to: payload.data?.to === "support" ? "support" : "sales" };
  } catch {
    return { ok: false, reason: "send" };
  }
}

function emptyContactPayload(): ContactApiPayload {
  return { mobile: [], whatsapp: [], social: [], location: [] };
}

function contactPayloadHasItems(data: ContactApiPayload | null) {
  if (!data) return false;
  return data.mobile.length + data.whatsapp.length + data.social.length + data.location.length > 0;
}

export async function fetchContactChannels(): Promise<ContactApiPayload | null> {
  const api = publicApiUrl();
  if (!api) {
    return isDemoDataEnabled() ? null : emptyContactPayload();
  }

  try {
    const response = await fetch(`${api}/contact`, {
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
