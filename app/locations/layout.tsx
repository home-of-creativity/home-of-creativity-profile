import type { ReactNode } from "react";

/** Metadata and JSON-LD live on each page, so `/locations/{office}/` inherits nothing from the index. */
export default function LocationsLayout({ children }: { children: ReactNode }) {
  return children;
}
