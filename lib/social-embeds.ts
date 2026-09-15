const DEFAULT_FACEBOOK_PAGE = "https://www.facebook.com/profile.php?id=61584616932975";
const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/homeofcreativity.sy/";

export function facebookPageUrl() {
  return (process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || DEFAULT_FACEBOOK_PAGE).replace(/\/$/, "");
}

export function instagramProfileUrl() {
  const raw = process.env.NEXT_PUBLIC_INSTAGRAM_URL || DEFAULT_INSTAGRAM_URL;
  const trimmed = raw.replace(/\/$/, "");
  if (trimmed.startsWith("http")) return trimmed;
  return `https://www.instagram.com/${trimmed.replace(/^@/, "")}`;
}

export function instagramHandle() {
  try {
    const path = new URL(instagramProfileUrl()).pathname.replace(/\//g, "");
    return path || "instagram";
  } catch {
    return "instagram";
  }
}

export function facebookPluginSrc(width = 430, height = 980, locale = "en_US") {
  const href = facebookPageUrl();
  const params = new URLSearchParams({
    href,
    tabs: "timeline",
    width: String(width),
    height: String(height),
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "false",
    locale,
  });

  return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
}

export function instagramEmbedSrc() {
  return `${instagramProfileUrl()}/embed`;
}
