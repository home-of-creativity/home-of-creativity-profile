import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata, pageSeo } from "@/lib/page-meta";

const metadata: Metadata = pageMetadata({ ...pageSeo.articles, path: "/articles/" });

export { metadata };

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return children;
}
