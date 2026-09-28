import type { ReactNode } from "react";

/** Metadata lives on each page, so `/services/{slug}/` inherits nothing from the index. */
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
