const MOTION_KEY = "hoc-skip-motion";

export function shouldSkipMotion(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(MOTION_KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberVisit(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MOTION_KEY, "1");
  } catch {
    /* private mode */
  }
}
