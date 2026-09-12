export const BASE_PATH = "/home-of-creativity-profile";

export const CLIENT_TELEGRAM_URL = `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT ?? "pro_design_perfect_bot"}`;

export const DASHBOARD_STAFF_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://127.0.0.1:5173/staff";

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
  return withBasePath(`/${page.replace(/^\//, "")}`);
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
