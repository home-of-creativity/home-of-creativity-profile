import { publicApiUrl } from "./public-api";

export type ProfilePdfPayload = {
  url: string | null;
  name: string | null;
  updated_at: string | null;
  /** The file's last-modified time (UTC, YmdHis). Older APIs leave it out. */
  version?: string | null;
};

/**
 * Link to the PDF. `?v=` changes only when the file itself changes; the settings date in
 * `updated_at` can be older than the file (it gave `?t=2026-09-21` for a file from 29 Sep).
 */
export function profilePdfHref(pdf: ProfilePdfPayload): string | null {
  if (!pdf.url) return null;
  const version = pdf.version ?? pdf.updated_at?.replace(/\D/g, "");
  return version ? `${pdf.url}?v=${encodeURIComponent(version)}` : pdf.url;
}

export async function fetchProfilePdf(): Promise<ProfilePdfPayload | null> {
  const api = publicApiUrl();
  if (!api) {
    return null;
  }

  try {
    const response = await fetch(`${api}/profile-pdf`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    const payload = (await response.json()) as { data?: ProfilePdfPayload };
    const data = payload.data;
    if (!data?.url) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
