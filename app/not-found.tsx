import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { pageMetadata, pageSeo } from "@/lib/page-meta";

export const metadata: Metadata = {
  ...pageMetadata({ ...pageSeo.notFound, path: "/404/", noindex: true }),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function NotFound() {
  return <NotFoundView />;
}
