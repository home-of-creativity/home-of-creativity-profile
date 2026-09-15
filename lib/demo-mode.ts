/**
 * Dummy landing data for GitHub Pages / static deploys (no backend).
 *
 * GitHub builds leave this ON. Production Docker in home_of_creativity
 * sets NEXT_PUBLIC_USE_DEMO_DATA=false and points at the local API.
 */
export function isDemoDataEnabled() {
  const value = process.env.NEXT_PUBLIC_USE_DEMO_DATA;
  if (value == null || value === "") return true;
  return !["0", "false", "off", "no"].includes(value.toLowerCase());
}
