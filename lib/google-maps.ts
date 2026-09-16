export function googleMapsApiKey(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY?.trim() ||
    ""
  );
}

export function googleMapsEmbedSrc(query: string, locale: "ar" | "en", zoom = 15): string | null {
  const key = googleMapsApiKey();
  const q = query.trim();
  if (!key || !q) return null;

  const params = new URLSearchParams({
    key,
    q,
    zoom: String(zoom),
    language: locale === "ar" ? "ar" : "en",
  });

  return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
}

export function googleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
}
