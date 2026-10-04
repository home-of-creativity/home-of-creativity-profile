import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { TITLE_EN_META, pageSeo } from "@/lib/page-meta";

export const metadata: Metadata = {
  title: { absolute: pageSeo.notFound.title },
  description: pageSeo.notFound.description,
  other: { [TITLE_EN_META]: pageSeo.notFound.titleEn },
  // Next inserts its own noindex meta while rendering this page. Another robots field duplicates it.
  robots: null,
};

export default function NotFound() {
  return <NotFoundView />;
}
