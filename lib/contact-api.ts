
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
  | { ok: false; reason: "unavailable" | "config" | "send" }
  | { ok: false; reason: "validation"; fields: Record<string, string[]> };

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
    if (response.status === 422) {
      const body = (await response.json()) as { errors?: Record<string, string[]> };
      return { ok: false, reason: "validation", fields: body.errors ?? {} };
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
