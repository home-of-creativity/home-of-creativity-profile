"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { withBasePath } from "@/lib/base-path";
import { useLanguage, type Copy } from "@/lib/i18n";
import { publicApiUrl } from "@/lib/public-api";

const CONTACTS = [
  { local: "0968862822", digits: "963968862822" },
  { local: "0954187154", digits: "963954187154" },
] as const;

function contactDigits(raw: string): string | null {
  const digits = raw.replace(/\D/g, "").replace(/^00/, "");
  const normalized = digits.startsWith("963") ? digits : digits.replace(/^0/, "963");
  return CONTACTS.some((contact) => contact.digits === normalized) ? normalized : null;
}

const TOKEN =
  /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|(?:\+|00)?\d[\d\s().-]{7,}\d|[A-Za-z][A-Za-z0-9.&'’+\-/]*|\$?\d+(?:[.,]\d+)?%?\$?/g;

function safeHttp(raw: string): string | null {
  const href = raw.startsWith("www.") ? `https://${raw}` : raw;
  try {
    const url = new URL(href);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    return null;
  }
  return null;
}

function trimTrail(raw: string): { token: string; rest: string } {
  const match = raw.match(/^(.*?)([.,);:\]]+)$/);
  if (!match) return { token: raw, rest: "" };
  return { token: match[1] ?? raw, rest: match[2] ?? "" };
}

function ChatText({
  text,
  linkClass,
  callLabel,
  whatsappLabel,
}: {
  text: string;
  linkClass: string;
  callLabel: string;
  whatsappLabel: string;
}) {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => {
    if (line.trim() === "") {
      return <span key={lineIndex} className="block h-2" />;
    }
    const nodes: ReactNode[] = [];
    const re = new RegExp(TOKEN.source, "g");
    let last = 0;
    let match: RegExpExecArray | null;
    let part = 0;
    while ((match = re.exec(line))) {
      if (match.index > last) nodes.push(line.slice(last, match.index));
      const { token, rest } = trimTrail(match[0]);
      const digits = contactDigits(token);
      const href = digits ? null : safeHttp(token);
      if (digits) {
        nodes.push(
          <span key={`${lineIndex}-${part}`} className="inline-flex flex-wrap items-center gap-1">
            <bdi dir="ltr">{token}</bdi>
            <a href={`tel:+${digits}`} className={linkClass}>
              {callLabel}
            </a>
            <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {whatsappLabel}
            </a>
          </span>,
        );
      } else if (href) {
        nodes.push(
          <a
            key={`${lineIndex}-${part}`}
            href={href}
            dir="ltr"
            className={linkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            {token}
          </a>,
        );
      } else if (/[A-Za-z0-9$]/.test(token)) {
        nodes.push(
          <bdi key={`${lineIndex}-${part}`} dir="ltr">
            {token}
          </bdi>,
        );
      } else {
        nodes.push(token);
      }
      if (rest) nodes.push(rest);
      last = match.index + match[0].length;
      part += 1;
    }
    if (last < line.length) nodes.push(line.slice(last));
    return (
      <span key={lineIndex} className="block">
        {nodes}
      </span>
    );
  });
}

const copy = {
  open: { ar: "اسأل عن الموقع", en: "Ask about the site" } satisfies Copy,
  title: { ar: "اسأل بيت الإبداع", en: "Ask Home of Creativity" } satisfies Copy,
  hint: {
    ar: "اسأل عن الخدمات أو الأسعار أو الفرق بين الباقات أو المكاتب.",
    en: "Ask about services, prices, how the packages differ, or offices.",
  } satisfies Copy,
  placeholder: { ar: "اكتب سؤالك", en: "Type your question" } satisfies Copy,
  send: { ar: "إرسال", en: "Send" } satisfies Copy,
  close: { ar: "إغلاق", en: "Close" } satisfies Copy,
  busy: { ar: "لحظة…", en: "One moment…" } satisfies Copy,
  fail: {
    ar: "تعذر الجواب الآن. أعد المحاولة بعد قليل.",
    en: "The answer did not come through. Try again in a moment.",
  } satisfies Copy,
  offline: {
    ar: "المساعد يعمل على الموقع المنشور.",
    en: "The assistant is available on the published site.",
  } satisfies Copy,
  call: { ar: "اتصال", en: "Call" } satisfies Copy,
  whatsapp: { ar: "واتساب", en: "WhatsApp" } satisfies Copy,
};

type Turn = { role: "user" | "assistant"; text: string };

export function SiteAssistant() {
  const { locale, t } = useLanguage();
  const panelId = useId();
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [turns, busy, open]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || busy) return;

    const api = publicApiUrl();
    if (!api) {
      setError(t(copy.offline));
      return;
    }

    setBusy(true);
    setError(null);
    setDraft("");
    try {
      const response = await fetch(`${api}/site/ask`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          locale,
          history: turns.slice(-6).map((turn) => ({ role: turn.role, text: turn.text })),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(25000),
      });
      const payload = (await response.json().catch(() => null)) as { data?: { answer?: string } } | null;
      const answer = payload?.data?.answer?.trim() ?? "";
      if (!response.ok || answer === "") {
        setDraft(question);
        setError(t(copy.fail));
        return;
      }
      setTurns((current) => [...current, { role: "user", text: question }, { role: "assistant", text: answer }]);
    } catch {
      setDraft(question);
      setError(t(copy.fail));
    } finally {
      setBusy(false);
    }
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div
      className="fixed z-40 flex w-[min(22rem,calc(100vw-2rem))] flex-col items-stretch gap-3"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        insetInlineEnd: "1rem",
      }}
    >
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          dir={dir}
          className="flex max-h-[min(32rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-3xl bg-[var(--brand-purple-deep)] text-[var(--brand-ivory)] shadow-[0_18px_50px_rgb(10_6_24/0.35)]"
        >
          <header className="flex items-center justify-between gap-3 px-4 py-3">
            <h2 id={titleId} className="text-[0.95rem] font-semibold">
              {t(copy.title)}
            </h2>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--brand-ivory)] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">{t(copy.close)}</span>
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>
          </header>
          <div ref={listRef} className="flex min-h-36 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-2">
            {turns.length === 0 ? (
              <p className="text-[0.85rem] leading-6 text-white/75">{t(copy.hint)}</p>
            ) : null}
            {turns.map((turn, index) => (
              <div
                key={`${turn.role}-${index}`}
                dir={turn.role === "user" ? "auto" : dir}
                className={
                  turn.role === "user"
                    ? "max-w-[90%] self-end rounded-2xl bg-[var(--brand-orange)] px-3 py-2 text-[0.9rem] leading-6 text-white"
                    : "max-w-full self-start rounded-2xl bg-white/10 px-3 py-2 text-[0.9rem] leading-7"
                }
              >
                <ChatText
                  text={turn.text}
                  callLabel={t(copy.call)}
                  whatsappLabel={t(copy.whatsapp)}
                  linkClass="underline underline-offset-2 [unicode-bidi:isolate] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                />
              </div>
            ))}
            {busy ? <p className="text-[0.85rem] text-white/70">{t(copy.busy)}</p> : null}
          </div>
          <div className="grid gap-2 border-t border-white/10 px-3 pt-3">
            {CONTACTS.map((contact) => (
              <div key={contact.digits} className="flex items-center gap-2">
                <bdi dir="ltr" className="min-w-0 flex-1 text-[0.85rem] font-semibold">
                  {contact.local}
                </bdi>
                <a
                  href={`tel:+${contact.digits}`}
                  className="inline-flex min-h-9 items-center rounded-full bg-white/10 px-3 text-[0.75rem] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
                >
                  {t(copy.call)}
                </a>
                <a
                  href={`https://wa.me/${contact.digits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center rounded-full bg-[#25D366] px-3 text-[0.75rem] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t(copy.whatsapp)}
                </a>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="flex items-center gap-2 p-3">
            <input
              ref={inputRef}
              value={draft}
              maxLength={500}
              placeholder={t(copy.placeholder)}
              aria-label={t(copy.placeholder)}
              disabled={busy}
              onChange={(event) => setDraft(event.target.value)}
              className="min-h-11 min-w-0 flex-1 rounded-full bg-white/10 px-4 text-[0.9rem] text-[var(--brand-ivory)] outline-none placeholder:text-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand-orange)]"
            />
            <button
              type="submit"
              disabled={busy || draft.trim() === ""}
              className="min-h-11 shrink-0 rounded-full bg-[var(--brand-orange)] px-4 text-[0.85rem] font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t(copy.send)}
            </button>
          </form>
          {error ? <p className="px-4 pb-3 text-[0.8rem] leading-5 text-[var(--brand-orange)]">{error}</p> : null}
        </section>
      ) : null}
      <button
        type="button"
        className="grid h-14 w-14 self-end place-items-center rounded-full bg-[var(--brand-purple)] shadow-[0_12px_30px_rgb(10_6_24/0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-orange)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t(copy.open)}
        onClick={() => setOpen((value) => !value)}
      >
        <img
          src={withBasePath("/hummingbird.svg")}
          alt=""
          width={40}
          height={28}
          className="h-7 w-10"
        />
      </button>
    </div>
  );
}
