import { publicApiUrl } from "./public-api";

export type ProfilePdfPayload = {
  url: string | null;
  name: string | null;
  updated_at: string | null;
};

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
