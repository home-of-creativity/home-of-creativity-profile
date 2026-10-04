function envBasePath() {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH;
  if (raw === "" || raw === "/" || raw === "none" || raw === "-" || raw === "off") return "";
  if (raw == null) return "/home-of-creativity-profile";
  return raw.replace(/\/+$/, "");
}

/** GitHub Pages keeps `/home-of-creativity-profile`. VPS (`hoc.agency`) sets `NEXT_PUBLIC_BASE_PATH=none`. */
export const BASE_PATH = envBasePath();

/**
 * Client Telegram bot, or null: the site shows no Telegram link until the handle is set with
 * NEXT_PUBLIC_TELEGRAM_BOT at build time. The deploy workflow does not set it.
 * TODO(HOC): confirm the correct Telegram handle. pro_design_perfect_bot was removed from the
 * site, schema and llms files (4 Oct 2026 audit).
 */
const telegramBot = process.env.NEXT_PUBLIC_TELEGRAM_BOT?.trim();
export const CLIENT_TELEGRAM_URL: string | null = telegramBot ? `https://t.me/${telegramBot}` : null;

export const DASHBOARD_STAFF_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://127.0.0.1:5173/dashboard";

export function withBasePath(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function homePath(onHome: boolean) {
  return onHome ? "#top" : withBasePath("/");
}

export function sectionPath(sectionId: string, onHome: boolean) {
  const id = sectionId.replace(/^#/, "");
  return onHome ? `#${id}` : withBasePath(`/#${id}`);
}

export function pagePath(page: string) {
  const slug = page.replace(/^\/+|\/+$/g, "");
  if (!slug) return withBasePath("/");
  return withBasePath(`/${slug}/`);
}

/** Next.js `usePathname()` omits `basePath`; normalize both shapes for comparisons. */
export function normalizePathname(pathname: string | null | undefined) {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  if (trimmed === BASE_PATH) return "/";
  if (trimmed.startsWith(`${BASE_PATH}/`)) {
    return trimmed.slice(BASE_PATH.length) || "/";
  }
  return trimmed;
}

export function isHomePathname(pathname: string | null | undefined) {
  return normalizePathname(pathname) === "/";
}

export function isPagePathname(pathname: string | null | undefined, page: string) {
  const slug = page.replace(/^\//, "").replace(/\/+$/, "");
  return normalizePathname(pathname) === `/${slug}`;
}
