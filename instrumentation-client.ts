import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const FOREIGN_HOST = /navrix\.art|selnor\.fun|cloudfront\.net/i;

function isStaleBundle(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message;
  return (
    error.name === "ChunkLoadError" ||
    message.includes("Loading chunk") ||
    message.includes("Failed to fetch dynamically imported module") ||
    (message.includes("reading 'call'") && /_next\/static\/chunks|webpack/.test(error.stack ?? ""))
  );
}

function reloadOnceForStaleBundle() {
  const key = "hoc-stale-bundle";
  try {
    if (sessionStorage.getItem(key) === "1") return;
    sessionStorage.setItem(key, "1");
  } catch {
    return;
  }
  window.location.reload();
}

if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    if (isStaleBundle(event.reason)) reloadOnceForStaleBundle();
  });
}

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0,
    ignoreErrors: [/navrix\.art/i, /selnor\.fun/i, /cloudfront\.net/i, /CacheStorage/i],
    beforeSend(event, hint) {
      const original = hint?.originalException;
      if (typeof Event !== "undefined" && original instanceof Event) return null;
      if (isStaleBundle(original)) return null;
      const text = original instanceof Error ? `${original.message}\n${original.stack ?? ""}` : "";
      const value = event.exception?.values?.[0]?.value ?? "";
      if (FOREIGN_HOST.test(text) || FOREIGN_HOST.test(value)) return null;
      if (/CacheStorage|security policy of the user agent/i.test(value)) return null;
      return event;
    },
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
