import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata, pageSeo } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({ ...pageSeo.clientStory, path: "/client-story/", type: "article" });

export default function ClientStoryLayout({ children }: { children: ReactNode }) {
  return children;
}
