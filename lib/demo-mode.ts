/**
 * Dummy landing data for deploys that are not yet pointed at the VPS API.
 *
 * Keep ON for a static / preview deploy with no backend.
 * Turn OFF when NEXT_PUBLIC_API_URL points at the live VPS:
 *   NEXT_PUBLIC_USE_DEMO_DATA=false
 */
export function isDemoDataEnabled() {
  const value = process.env.NEXT_PUBLIC_USE_DEMO_DATA;
  if (value == null || value === "") return true;
  return !["0", "false", "off", "no"].includes(value.toLowerCase());
}
