import { isDemoDataEnabled } from "./demo-mode";

/**
 * Live Laravel API base for this workspace.
 * GitHub Pages builds with demo data and an empty URL so the static site
 * never points browsers at localhost or a private backend.
 */
export function publicApiUrl(): string | null {
  if (isDemoDataEnabled()) {
    return null;
  }

  const raw = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "") ?? "";
  return raw.length > 0 ? raw : null;
}
