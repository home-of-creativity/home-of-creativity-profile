const ORIGIN = "http://localhost:3000";
const raw = process.env.NEXT_PUBLIC_BASE_PATH;
const BASE = !raw || raw === "none" || raw === "/" ? "" : raw.replace(/\/+$/, "");

export const LANDING = `${ORIGIN}${BASE}/`;
export const PRICING = `${ORIGIN}${BASE}/pricing/`;
export const SOCIAL = `${ORIGIN}${BASE}/social/`;
export const LOCATIONS = `${ORIGIN}${BASE}/locations/`;
export const DAMASCUS = `${ORIGIN}${BASE}/locations/damascus/`;
export const PRIVACY = `${ORIGIN}${BASE}/privacy/`;
export const TERMS = `${ORIGIN}${BASE}/terms/`;
