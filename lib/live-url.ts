/**
 * Drop links that no longer resolve. aboshaker.sa returns Cloudflare 1014; baytlawha.com has a
 * lame DNS delegation (SERVFAIL since October 2026).
 */
const DEAD_HOSTS = new Set(["aboshaker.sa", "baytlawha.com"]);

export function liveWebsiteUrl(url: string | null | undefined): string | null {
  const value = url?.trim();
  if (!value) return null;
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    if (DEAD_HOSTS.has(host)) return null;
  } catch {
    return null;
  }
  return value;
}
